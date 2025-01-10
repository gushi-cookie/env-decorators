import { extractMetadata } from '../metadata/metadata.util';


/**
 * Write environments to static properties of a class, according to its metadata.
 * Nothing changes if the class doesn't have metadata.
 * 
 * Parameter 'followProtoChain' decides whether environments from metadata of
 * parent classes chain should be written. If it's' 'false' then only static
 * properties from the class metadata are considered.
 * 
 * @param cls - target class.
 * @param followProtoChain - should parent classes metadata be considered too. Default: true.
 */
function resolveStaticProperties(cls: Function, followProtoChain: boolean = true): void {
    const metadata = extractMetadata(cls);
    if(!metadata) {
        if(!followProtoChain) return;

        const parentCls = (cls as any)['__proto__'];
        if(parentCls) resolveStaticProperties(parentCls, followProtoChain);
        return;
    }


    for(let property of metadata.properties) {
        if(!property.isStatic) continue;

        let environment: any = process.env[property.envName];
        if(!environment) {
            if(!property.required) continue;
            throw new Error(`Environment property '${property.envName}' associated with '${property.key.toString()}' static property is undefined but required.`);
        }

        if(property.parseCallback) environment = property.parseCallback(environment);
        (cls as any)[property.key] = environment;
    }


    if(followProtoChain) {
        let parentCls = (cls as any)['__proto__'];
        if(!parentCls) resolveStaticProperties(parentCls, followProtoChain);
    }
}

/**
 * Write environments to instance properties of an object, according to specified
 * metadata of its class.
 * 
 * Parameter 'followProtoChain' decides whether environments from metadata of parent
 * classes chain should be written. If it's 'false' then only properties from
 * object's class metadata are considered.
 * 
 * @param obj - target object.
 * @param followProtoChain - should parent classes metadata be considered too. Default: true.
 */
function resolveInstanceProperties(obj: object, followProtoChain: boolean = true): void {
    const cls = obj.constructor;
    _resolveEnvironmentsByClass(cls, obj);
    if(!followProtoChain) return;


    let parentCls = (cls as any)['__proto__'];
    if(parentCls === null) return;
    while(true) {
        _resolveEnvironmentsByClass(parentCls, obj);
        parentCls = (parentCls as any)['__proto__'];
        if(parentCls === null) break;
    }
}

/**
 * Write environments to an object's properties according to metadata of
 * a specified class. Nothing changes if the class doesn't have metadata.
 * @param cls - class that is expected to be with metadata property set.
 * @param obj - target object.
 */
function _resolveEnvironmentsByClass(cls: Function, obj: object): void {
    const metadata = extractMetadata(cls);
    if(!metadata) return;

    for(let property of metadata.properties) {
        if(property.isStatic) continue;

        let environment: any = process.env[property.envName];
        if(!environment) {
            if(!property.required) continue;
            throw new Error(`Environment property '${property.envName}' associated with '${_metadataKeyToString(property.key)}' instance property is undefined but required.`);
        }

        if(property.parseCallback) environment = property.parseCallback(environment);
        (obj as any)[property.key] = environment;
    }
}

/**
 * Format a metadata key according to its type.
 * @param key - metadata key.
 * @returns formatted key.
 */
function _metadataKeyToString(key: string | symbol): string {
    return typeof key === 'string' ? key : `[${key.toString}]`;
}


export default {
    resolveStaticProperties,
    resolveInstanceProperties,
};