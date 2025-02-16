import {
  hasFlags,
  extractFlags,
  parseOneLineRegExp,
} from './one-line-regexp.util';

/**
 * Test a regular expression that has `g` - `global flag`, on
 * multiple input strings.
 *
 * Why? - Testing must be comprehensive. Since the `g` flag affects
 * `lastIndex`, expecting that each next call is being performed on a
 * same input, `lastIndex` must be reset for testing new inputs of the
 * same `RegExp`.
 *
 * @param expression - pattern for testing inputs.
 * @param pairs - set of values to test (keys) and expected outputs (values).
 */
function testGlobalRegExp(expression: RegExp, pairs: Map<string, boolean>) {
  if (!expression.flags.includes('g')) {
    throw new Error(
      `Regular expression '${expression.toString()}' must have the 'g' flag.`,
    );
  }

  for (let entry of pairs.entries()) {
    expect(expression.test(entry[0])).toBe(entry[1]);
    expression.lastIndex = 0;
  }
}

test('should detect the flags construction: hasFlags()', () => {
  // From examples:
  expect(hasFlags('match[12345]word\\FLAGS:ig\\')).toBe(true);
  expect(hasFlags('[Hh]ello[\\s]*[Ww]orld')).toBe(false);
  expect(hasFlags('valid_format\\FLAGS:g\\')).toBe(true);
  expect(hasFlags('invalid_format\\FLAG:123\\')).toBe(false);
  expect(hasFlags('invalid_flags\\FLAGS:zxc\\')).toBe(false);

  // Additional:
  expect(hasFlags('\\FLAGS:gi\\ ')).toBe(false);
  expect(hasFlags('\\FLAGS:gi\\ [abc123]')).toBe(false);
});

test('should extract flags: extractFlags()', () => {
  // From examples:
  expect(extractFlags('match[12345]word\\FLAGS:ig\\')).toBe('ig');
  expect(extractFlags('[Hh]ello[\\s]*[Ww]orld')).toBe('');
  expect(extractFlags('valid_format\\FLAGS:dgimsuvy\\')).toBe('dgimsuvy');
  expect(extractFlags('invalid_format\\FLAG:123\\')).toBe('');
  expect(extractFlags('invalid_flags\\FLAGS:zxc\\')).toBe('');

  // Additional:
  expect(extractFlags('')).toBe('');
});

test('should parse one-line regular expression: parseOneLineRegExp()', () => {
  // From examples:
  const rx1 = parseOneLineRegExp('match[12345]word\\FLAGS:ig\\');
  expect(rx1.flags).toMatch(/^[gi]{2}$/);
  testGlobalRegExp(
    rx1,
    new Map<string, boolean>([
      ['match5word', true],
      ['MATCH1worD', true],
      ['match6word', false],
    ]),
  );

  const rx2 = parseOneLineRegExp('[Hh]ello\\s*[Ww]orld');
  expect(rx2.flags).toBe('');
  expect(rx2.test('hello world')).toBe(true);
  expect(rx2.test('HelloWorld')).toBe(true);
  expect(rx2.test('hello_world')).toBe(false);

  const rx3 = parseOneLineRegExp('valid_format\\FLAGS:dgimsuy\\');
  expect(rx3.flags).toMatch(/^[dgimsuy]{7}$/);
  testGlobalRegExp(
    rx3,
    new Map<string, boolean>([
      ['valid_format', true],
      ['VALID_FORMAT', true],
      ['FLAGS', false],
    ]),
  );

  expect(() => parseOneLineRegExp('invalid_format\\FLAG:123\\')).toThrow(
    SyntaxError,
  );
  expect(() => parseOneLineRegExp('invalid_flags\\FLAGS:zxc\\')).toThrow(
    SyntaxError,
  );

  // Additional:
  const rx4 = parseOneLineRegExp('some_pattern\\FLAGS:giuy\\');
  expect(rx4.flags).toMatch(/^[uyig]{4}$/);
  expect(rx4.test('some_pattern')).toBe(true);

  const rx5 = parseOneLineRegExp('\\FLAGS:gi\\');
  expect(rx5.flags).toMatch(/^[ig]{2}$/);
  expect(rx5.test('')).toBe(true);
});
