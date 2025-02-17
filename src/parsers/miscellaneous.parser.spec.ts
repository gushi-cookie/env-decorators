import {EnvironmentParseError} from '../errors/environment-parse.error';
import {toBoolean, toDate, toRegExp} from './miscellaneous.parser';

test('should parse booleans: toBoolean()', () => {
  expect(toBoolean('TRUE')).toBe(true);
  expect(toBoolean('FalsE')).toBe(false);
  expect(() => toBoolean('')).toThrow(EnvironmentParseError);
  expect(() => toBoolean('FALSETRUE')).toThrow(EnvironmentParseError);
  expect(() => toBoolean('TRUEFALSE')).toThrow(EnvironmentParseError);
});

test('should parse dates: toDate()', () => {
  const timestamp = 1739746569000;
  const dateString = 'Mon Feb 17 2025 01:56:09 GMT+0300';

  expect(toDate(timestamp.toString()).getTime()).toBe(timestamp);
  expect(toDate(dateString).getTime()).toBe(timestamp);
  expect(() => toDate('')).toThrow(EnvironmentParseError);
});

test('should parse regular expressions: toRegExp()', () => {
  expect(() => toRegExp('\\')).toThrow(EnvironmentParseError);
  expect(() => toRegExp('\\\\')).not.toThrow(EnvironmentParseError);
  expect(() => toRegExp('[A-Za-z_0-9]\\FLAGS:gid\\')).not.toThrow(
    EnvironmentParseError,
  );
  expect(() => toRegExp('\\FLAGS:vu\\')).toThrow(EnvironmentParseError);
});
