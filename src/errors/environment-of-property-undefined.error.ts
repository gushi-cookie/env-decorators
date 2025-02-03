import { formatPropertyDecoratorKey } from '../utils/general.util';
import RequiredEnvironmentUndefinedError from './required-environment-undefined.error';


/**
 * Error type for representing an undefined environment that is required,
 * and a class property associated with it. Also the constructor prepares
 * the error message.
 */
export default class EnvironmentOfPropertyUndefinedError extends RequiredEnvironmentUndefinedError {
    public readonly propertyKey: string | symbol;
    public readonly isStatic: boolean;

    /**
     * @param environmentName - name of the environment variable.
     * @param propertyKey - key of the associated property.
     * @param isStatic - is the property static.
     */
    constructor(environmentName: string, propertyKey: string | symbol, isStatic: boolean) {
        const prefix = isStatic ? 'static' : 'instance';
        const message = `Environment variable '${environmentName}' associated with '${formatPropertyDecoratorKey(propertyKey)}' ${prefix} property is undefined but required.`;
        super(environmentName, message);

        this.propertyKey = propertyKey;
        this.isStatic = isStatic;
    }
}