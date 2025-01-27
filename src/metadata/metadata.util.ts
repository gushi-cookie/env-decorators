import { ClassMetadata } from './metadata.interface';


/**
 * Symbol property of the current library for accessing metadata objects in classes.
 */
export const symbolProperty = Symbol('env-decorators_class-metadata');

/**
 * Extract a metadata object of a specified class or create and set
 * a new one, if doesn't exist.
 * @param cls - target class.
 * @returns metadata object stored in the class.
 */
export function establishMetadata(cls: Function): ClassMetadata {
    let metadata: ClassMetadata = (cls as any)[symbolProperty];
    if(!metadata) {
        metadata = {
            properties: [],
        };
        (cls as any)[symbolProperty] = metadata;
    }

    return metadata;
}

/**
 * Extract metadata from a class.
 * @param cls - target class.
 * @returns metadata object or null if not found.
 */
export function extractMetadata(cls: Function): ClassMetadata | null {
    let metadata: ClassMetadata = (cls as any)[symbolProperty];
    return metadata ? metadata : null;
}


export default {
    symbolProperty,
    establishMetadata,
    extractMetadata,
}