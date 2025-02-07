import { EnvironmentPropertyMetadata } from '../metadata/metadata.interface';
import { formatPropertyDecoratorKey } from '../utils/general.util';
import EnvironmentOfPropertyError from './environment-of-property.error';


/**
 * Thrown when a required environment, associated with a class
 * property, is undefined.
 */
export default class EnvironmentOfPropertyUndefinedError extends EnvironmentOfPropertyError {
    public override readonly cls: Function;
    public override readonly property: EnvironmentPropertyMetadata;

    constructor(cls: Function, property: EnvironmentPropertyMetadata) {
        const prefix = property.isStatic ? 'static' : 'instance';
        const message = `Environment variable '${property.envName}' associated with '${formatPropertyDecoratorKey(property.key)}' ${prefix} property is undefined but required.`;
        super(message);

        this.cls = cls;
        this.property = property;
    }
}