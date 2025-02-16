export const flagsPattern = /\\FLAGS:[dgimsuvy]+\\$/;

/**
 * Check if an expression has the flags construction.
 * @param expression - one-line expression to check.
 * @returns `true` if the flags construction was found.
 */
export function hasFlags(expression: string): boolean {
  return flagsPattern.test(expression);
}

/**
 * Extract `RegExp` flags from a one-line regular expression.
 * @param expression - one-line expression to process.
 * @returns extracted flags or an empty string if not found.
 */
export function extractFlags(expression: string): string {
  let result = flagsPattern.exec(expression);
  if (result === null) return '';
  return result[0].split(':')[1].replace('\\', '');
}

/**
 * Parse a one-line regular expression from a string.
 *
 * One-line regexp is a format for describing `RegExp` types
 * with a single string. The format makes it possible to represent
 * both arguments of `RegExp`'s constructor - `pattern` and `flags`,
 * in a string.
 *
 * Passed expression can be an ordinary `RegExp` pattern
 * without any constraint. But if add
 * `\FLAGS:<valid_flags>\` construction to the end of the expression's
 * string, then it's interpreted as a flags argument to a new
 * `RegExp` instance, that is getting prepared. Patterns and flags
 * constructions shouldn't be delimited.
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
 *
 * @param expression - one-line expression to parse.
 * @returns a new `RegExp` instance.
 */
export function parseOneLineRegExp(expression: string): RegExp {
  let flags;
  if (hasFlags(expression)) {
    flags = extractFlags(expression);
    expression = expression.replace(flagsPattern, '');
  }

  return new RegExp(expression, flags);
}
