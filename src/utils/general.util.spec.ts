import {formatPropertyDecoratorKey} from './general.util';

test('should format symbol property key', () => {
  const key = 'test-key';
  expect(formatPropertyDecoratorKey(Symbol(key))).toBe(`[${key}]`);
});
