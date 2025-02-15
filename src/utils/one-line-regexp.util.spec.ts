import {
  hasFlags,
  areFlagsEscaped,
  extractFlags,
  parseOneLineRegExp,
} from './one-line-regexp.util';

test('should detect the flags construction: hasFlags()', () => {
  expect(hasFlags('[Hh]ello[\\s]*[Ww]orld')).toBe(false);
  expect(hasFlags('match[12345]word FLAGS:ig')).toBe(true);
  expect(hasFlags('invalid_formatFLAGS:g')).toBe(false);
});

test('should detect if flags are escaped: areFlagsEscaped()', () => {
  expect(areFlagsEscaped('no flags')).toBe(false);
  expect(areFlagsEscaped('escaped\\ FLAGS:g')).toBe(true);
  expect(areFlagsEscaped('not escaped FLAGS:gi')).toBe(false);
  expect(areFlagsEscaped('escape escaped\\\\ FLAGS:giuvy')).toBe(false);
  expect(areFlagsEscaped('odd escape\\\\\\ FLAGS:giuvy')).toBe(true);
});

test('should extract flags: extractFlags()', () => {
  expect(extractFlags('nothing')).toBe('');
  expect(extractFlags('invalidFLAGS:gi')).toBe('');
  expect(extractFlags('valid FLAGS:gims')).toBe('gims');
});

test('should parse one-line regular expression: parseOneLineRegExp()', () => {
  const exp1 = parseOneLineRegExp('[Hh]ello[\\s]*[Ww]orld');
  expect(exp1.flags).toBe('');
  expect(exp1.test('hello world')).toBe(true);

  const exp2 = parseOneLineRegExp('some_pattern FLAGS:giuy');
  expect(exp2.flags).toMatch(/^[uyig]{4}$/);
  expect(exp2.test('some_pattern')).toBe(true);

  const exp3 = parseOneLineRegExp(' FLAGS:gi');
  expect(exp3.flags).toMatch(/^[ig]{2}/);
  expect(exp3.test('')).toBe(true);
});
