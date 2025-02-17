import {EnvironmentParseError} from './environment-parse.error';

test('should form the error message properly', () => {
  const value = '[value-bla-bla]';
  const parserName = '[parser-bla-bla]';

  let error = new EnvironmentParseError(value, parserName);
  expect(error.message.includes(value)).toBe(true);
  expect(error.message.includes(parserName)).toBe(true);

  const details = '[some-details]';
  error = new EnvironmentParseError(value, parserName, {details});
  expect(error.message.includes(value)).toBe(true);
  expect(error.message.includes(parserName)).toBe(true);
  expect(error.message.includes(details)).toBe(true);
});
