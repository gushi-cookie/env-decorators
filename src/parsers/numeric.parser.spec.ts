import {EnvironmentParseError} from '../errors/environment-parse.error';
import {toBigInt, toFloat, toInteger} from './numeric.parser';

test('should parse integer numbers', () => {
  expect(toInteger('12345')).toBe(12345);
  expect(toInteger('12345.678')).toBe(12345);
  expect(() => toInteger('abc')).toThrow(EnvironmentParseError);
  expect(() => toInteger('')).toThrow(EnvironmentParseError);
});

test('should parse float numbers', () => {
  expect(toFloat('123.45')).toBe(123.45);
  expect(toFloat('12345')).toBe(12345);
  expect(() => toFloat('abc')).toThrow(EnvironmentParseError);
  expect(() => toFloat('')).toThrow(EnvironmentParseError);
});

test('should parse bigint numbers', () => {
  expect(toBigInt('1234567')).toBe(BigInt(1234567));
  expect(toBigInt('0o377777777777777777')).toBe(BigInt('0o377777777777777777'));
  expect(toBigInt('')).toBe(BigInt(0));
  expect(() => toBigInt('abc')).toThrow(EnvironmentParseError);
});
