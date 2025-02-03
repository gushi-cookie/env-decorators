/**
 * Base error type for representing the name of an undefined environment
 * that is required.
 */
export default class RequiredEnvironmentUndefinedError extends Error {
    public readonly environmentName: string;

    /**
     * @param environmentName - name of the environment.
     */
    constructor(environmentName: string, message: string) {
        super(message);
        this.environmentName = environmentName;
    }
}