import {EnvironmentParseCallback} from '../metadata/metadata.interface';
import {parseOneLineRegExp} from '../utils/one-line-regexp.util';
import {EnvironmentParseError} from '../errors/environment-parse.error';

/**
 * Parse a value of an environment variable to `boolean` type.
 * Passed value must contain `true` or `false` words in any
 * letter case, otherwise an error will be thrown.
 * @param envValue - value for parsing.
 * @returns a parsed `boolean` value.
 */
const toBoolean: EnvironmentParseCallback<boolean> = function (
  envValue: string,
) {
  envValue = envValue.toLowerCase();
  if (envValue === 'true') {
    return true;
  } else if (envValue === 'false') {
    return false;
  } else {
    const details = `couldn't recognize 'true' or 'false' in the passed value in lower case`;
    throw new EnvironmentParseError(envValue, 'toBoolean', {details});
  }
};

/**
 * Parse a value of an environment variable and initialize a `Date` instance
 * with it. The value can either be an integer `timestamp` or a `dateString`,
 * according to the `Date`'s constructor reference.
 * @param envValue - value for parsing.
 * @returns a new `Date` instance.
 */
const toDate: EnvironmentParseCallback<Date> = function (envValue: string) {
  let date = new Date(envValue);
  if (!isNaN(date.getTime())) return date;

  date = new Date(Number.parseInt(envValue));
  if (!isNaN(date.getTime())) return date;

  const details = `neither string nor integer form of the passed value satisfied Date type and resulted in NaN`;
  throw new EnvironmentParseError(envValue, 'toDate', {details});
};

/**
 * Parse a value of an environment variable and initialize a `RegExp` instance
 * with it. Util `one-line-regexp` is used under the hood.
 *
 * This parser uses an own format for describing `RegExp` types using a
 * single string. First you write an ordinary regular expressing without
 * any constraint. Then, if you need to pass flags to your expression you
 * add this construction to the end of the expression string:
 * `\FLAGS:<valid_flags>\`, without a delimiter.
 *
 * Examples:
 * 1. `match[12345]word\FLAGS:ig\` becomes: `/match[12345]word/gi`
 * 2. `[Hh]ello[\s]*[Ww]orld` becomes: `/[Hh]ello[\s]*[Ww]orld/`
 * 3. `valid_format\FLAGS:dgimsuvy\` becomes: `/valid_format/dgimsuvy`
 * 4. `invalid_format\FLAG:123\` leads to a `SyntaxError`.
 * 5. `invalid_flags\FLAGS:zxc\` leads to a `SyntaxError`.
 *
 * Note that these examples represent actual string values without
 * escapes assumption.
 * @param envValue - value for parsing.
 * @returns a new `RegExp` instance.
 */
const toRegExp: EnvironmentParseCallback<RegExp> = function (envValue: string) {
  try {
    return parseOneLineRegExp(envValue);
  } catch (err: any) {
    if (!(err instanceof SyntaxError)) throw err;

    let details;
    if (err.message.startsWith('Invalid flags supplied')) {
      details = `passed flags are invalid`;
    } else if (err.message.startsWith('Invalid regular expression')) {
      details = `passed regular expression is invalid`;
    } else {
      details = `error message not recognized`;
    }

    throw new EnvironmentParseError(envValue, 'toRegExp', {
      details,
      initialError: err,
    });
  }
};

export {toBoolean, toDate, toRegExp};
