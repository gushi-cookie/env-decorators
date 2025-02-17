import {EnvironmentParseCallback} from '../metadata/metadata.interface';
import {EnvironmentParseError} from '../errors/environment-parse.error';

/**
 * Parse a value of an environment variable to `null`
 * value. Passed value must contain `null` word in any
 * letter case, otherwise an error will be thrown.
 * @param envValue - value for parsing.
 * @returns `null` value.
 */
const toNull: EnvironmentParseCallback<null> = function (envValue: string) {
  envValue = envValue.toLowerCase();
  if (envValue === 'null') return null;

  const details = `couldn't recognize 'null' in the passed value in lower case`;
  throw new EnvironmentParseError(envValue, 'toNull', {details});
};

/**
 * Parse a value of an environment variable to `undefined`
 * value. Passed value must contain `undefined` word in any
 * letter case or be actually undefined. Otherwise an error
 * will be thrown.
 * @param envValue - value for parsing.
 * @returns `undefined` value.
 */
const toUndefined: EnvironmentParseCallback<undefined> = function (
  envValue: string,
) {
  if (envValue === undefined || envValue.toLowerCase() === 'undefined') {
    return undefined;
  }

  const details = `couldn't recognize 'undefined' in the passed value in lower case`;
  throw new EnvironmentParseError(envValue, 'toUndefined', {details});
};

/**
 * Parse a value of an environment variable to `NaN`
 * value. Passed value must contain `NaN` word in any
 * letter case, otherwise an error will be thrown.
 * @param envValue - value for parsing.
 * @returns `NaN` value.
 */
const toNaN: EnvironmentParseCallback<typeof NaN> = function (
  envValue: string,
) {
  envValue = envValue.toLowerCase();
  if (envValue === 'nan') return NaN;
  throw new EnvironmentParseError(envValue, 'toNaN');

  const details = `couldn't recognize 'nan' in the passed value in lower case`;
  throw new EnvironmentParseError(envValue, 'toNaN', {details});
};

/**
 * Parse a value of an environment variable to `Infinity`
 * value. Passed value must contain `Infinity` word in any
 * letter case, otherwise an error will be thrown.
 * @param envValue - value for parsing.
 * @returns `Infinity` value.
 */
const toInfinity: EnvironmentParseCallback<typeof Infinity> = function (
  envValue: string,
) {
  envValue = envValue.toLowerCase();
  if (envValue === 'infinity') return Infinity;

  const details = `couldn't recognize 'infinity' in the passed value in lower case`;
  throw new EnvironmentParseError(envValue, 'toInfinity', {details});
};

export {toNull, toUndefined, toNaN, toInfinity};
