/**
 * Format a PropertyDecorator key.
 * @param key - property key.
 * @returns formatted key.
 */
export function formatPropertyDecoratorKey(key: string | symbol): string {
    return typeof key === 'string' ? key : `[${key.description}]`;
}


export default {
    formatPropertyDecoratorKey
};