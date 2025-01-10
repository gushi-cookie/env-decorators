import { establishMetadata } from '../metadata/metadata.util';
import { EnvironmentParseCallback } from '../metadata/metadata.interface';


/**
 * The decorator is used to associate class properties with environment variables.
 * It stores metadata about a property, to which this decorator was applied, in
 * its class under a special symbol property. It's compatible with **instance**
 * and **static** class properties - common and symbol ones.
 * 
 * @param envName - a name of the environment variable.
 * @param required - is the environment variable required. Default: true.
 * @param parseCallback - function for parsing value of the environment variable. Default: undefined.
 * @returns a decorator function.
 */
export function EnvironmentResolve(envName: string, required: boolean = true, parseCallback?: EnvironmentParseCallback): PropertyDecorator {
    return (object: Object, key: string | symbol) => {
        let cls: Function;
        let isPropertyStatic = false;
        if(object instanceof Function) {
            cls = object;
            isPropertyStatic = true;
        } else {
            let c = (object as any)['constructor'];
            if(!(c instanceof Function)) {
                throw new Error(`Couldn't extract a constructor of '${key.toString()}' field, associated with '${envName}' environment.`);
            }
            cls = c;
        }

        let metadata = establishMetadata(cls);
        metadata.properties.push({
            key,
            envName,
            isStatic: isPropertyStatic,
            required,
            parseCallback,
        });
    };
}