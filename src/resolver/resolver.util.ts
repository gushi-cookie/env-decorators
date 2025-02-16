import {extractMetadata} from '../metadata/metadata.util';
import {EnvironmentOfPropertyUndefinedError} from '../errors/environment-of-property-undefined.error';

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
export function resolveStaticProperties(
  cls: Function,
  followProtoChain: boolean = true,
): void {
  const metadata = extractMetadata(cls);
  if (!metadata) {
    if (!followProtoChain) return;

    const parentCls = (cls as any)['__proto__'];
    if (parentCls) resolveStaticProperties(parentCls, followProtoChain);
    return;
  }

  for (let property of metadata.properties) {
    if (!property.isStatic) continue;

    let environment: string | undefined = process.env[property.envName];
    if (!environment) {
      if (!property.required) continue;
      throw new EnvironmentOfPropertyUndefinedError(cls, property);
    }

    if (property.parseCallback) {
      (cls as any)[property.key] = property.parseCallback(environment);
    } else {
      (cls as any)[property.key] = environment;
    }
  }

  if (followProtoChain) {
    let parentCls = (cls as any)['__proto__'];
    if (parentCls) resolveStaticProperties(parentCls, followProtoChain);
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
export function resolveInstanceProperties(
  obj: object,
  followProtoChain: boolean = true,
): void {
  const cls = obj.constructor;
  _resolveEnvironmentsByClass(cls, obj);
  if (!followProtoChain) return;

  let parentCls = (cls as any)['__proto__'];
  if (parentCls === null) return;
  while (true) {
    _resolveEnvironmentsByClass(parentCls, obj);
    parentCls = (parentCls as any)['__proto__'];
    if (parentCls === null) break;
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
  if (!metadata) return;

  for (let property of metadata.properties) {
    if (property.isStatic) continue;

    let environment: string | undefined = process.env[property.envName];
    if (!environment) {
      if (!property.required) continue;
      throw new EnvironmentOfPropertyUndefinedError(cls, property);
    }

    if (property.parseCallback) {
      (obj as any)[property.key] = property.parseCallback(environment);
    } else {
      (obj as any)[property.key] = environment;
    }
  }
}

export default {
  resolveStaticProperties,
  resolveInstanceProperties,
};
