import RequiredEnvironmentUndefinedError from './required-environment-undefined.error';


test('should create an instance of the error class', () => {
    const envName = 'test_env';
    const message = 'test_msg';
    const err = new RequiredEnvironmentUndefinedError(envName, message);

    expect(err.environmentName).toBe(envName);
    expect(err.message).toBe(message);
});