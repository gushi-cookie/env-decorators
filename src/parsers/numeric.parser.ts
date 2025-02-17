import {EnvironmentParseCallback} from '../metadata/metadata.interface';
import {EnvironmentParseError} from '../errors/environment-parse.error';

/**
 * Parse a value of an environment variable as an integer `number`.
 * @param envValue - value for parsing.
 * @returns a parsed `number` value.
 */
const toInteger: EnvironmentParseCallback<number> = function (
  envValue: string,
) {
  const result = Number.parseInt(envValue);
  if (!isNaN(result)) return result;

  const details = `parseInt function resulted in NaN`;
  throw new EnvironmentParseError(envValue, 'toInteger', {details});
};

/**
 * Parse a value of an environment variable as a float `number`.
 * @param envValue - value for parsing.
 * @returns a parsed `number` value.
 */
const toFloat: EnvironmentParseCallback<number> = function (envValue: string) {
  const result = Number.parseFloat(envValue);
  if (!isNaN(result)) return result;

  const details = `parseFloat function resulted in NaN`;
  throw new EnvironmentParseError(envValue, 'toFloat', {details});
};

/**
 * Parse a value of an environment variable to the `bigint` type.
 * The value is passed to BigInt function as it is, without
 * casting.
 *
 * @param envValue - value for parsing.
 * @returns a parsed `bigint` value.
 */
const toBigInt: EnvironmentParseCallback<bigint> = function (envValue: string) {
  try {
    return BigInt(envValue);
  } catch (err: any) {
    if (!(err instanceof SyntaxError)) throw err;

    let details;
    if (err.message.startsWith('Cannot convert')) {
      details = `conversion issues`;
    } else {
      details = `error message not recognized`;
    }

    throw new EnvironmentParseError(envValue, 'toBigInt', {
      initialError: err,
      details,
    });
  }
};

export {toInteger, toFloat, toBigInt};
