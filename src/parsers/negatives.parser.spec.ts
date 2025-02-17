import {EnvironmentParseError} from '../errors/environment-parse.error';
import {toInfinity, toNaN, toNull, toUndefined} from './negatives.parser';

test('should parse null', () => {
  expect(toNull('NULL')).toBeNull();
  expect(toNull('NuLl')).toBeNull();
  expect(() => toNull('')).toThrow(EnvironmentParseError);
  expect(() => toNull('nil')).toThrow(EnvironmentParseError);
});

test('should parse undefined', () => {
  expect(toUndefined('undefined')).toBeUndefined();
  expect(toUndefined('UndEfInEd')).toBeUndefined();
  expect(toUndefined(undefined as any)).toBeUndefined();
  expect(() => toUndefined('')).toThrow(EnvironmentParseError);
});

test('should parse NaN', () => {
  expect(toNaN('nan')).toBeNaN();
  expect(toNaN('Nan')).toBeNaN();
  expect(() => toNaN('')).toThrow(EnvironmentParseError);
});

test('should parse Infinity', () => {
  expect(toInfinity('infinity')).toBe(Infinity);
  expect(toInfinity('InFiNiTy')).toBe(Infinity);
  expect(() => toInfinity('')).toThrow(EnvironmentParseError);
});
