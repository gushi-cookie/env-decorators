export const flagsPattern = /\sFLAGS:[dgimsuvy]+$/;

/**
 * Check if an expression has the flags construction.
 * @param expression - one-line expression to check.
 * @returns `true` if the flags construction was found.
 */
export function hasFlags(expression: string): boolean {
  return flagsPattern.test(expression);
}

/**
 * Check if the flags construction is escaped. If there
 * is backslash series, before the flags construction,
 * then odd series of backslashes are considered escaped.
 *
 * @param expression - one-line expression to check.
 * @returns `true` if the flags construction is escaped.
 */
export function areFlagsEscaped(expression: string): boolean {
  let index = expression.search(flagsPattern);
  if (index < 0) return false;

  let backslashes = 0;
  for (let i = index - 1; i >= 0; i--) {
    if (expression.charAt(i) !== '\\') break;
    backslashes++;
  }

  // If backslash series is odd then flags are escaped.
  return Math.abs(backslashes % 2) === 1;
}

/**
 * Extract `RegExp` flags from a one-line regular expression.
 * @param expression - one-line expression to process.
 * @returns extracted flags or an empty string if not found.
 */
export function extractFlags(expression: string): string {
  let result = flagsPattern.exec(expression);
  if (result === null) return '';
  return result[0].split(':')[1];
}

/**
 * Parse a one-line regular expression from a string.
 *
 * One-line regexp is a format for describing `RegExp` types
 * in a single string. The format makes it possible to represent
 * both arguments of `RegExp` - `pattern` and `flags`, in a string.
 *
 * Passed expression can be an ordinary `RegExp` pattern,
 * without any constraint. But if add
 * `FLAGS:<flags>` construction to the end of this expression,
 * then it is interpreted as flags for the returned `RegExp`
 * instance. Patterns and flags constructions must be
 * delimited with a space.
 *
 * The flags construction can be escaped with `\` character, before the
 * space delimiter. If a backslashes series (without other characters)
 * is odd then the flags construction is escaped and ignored.
 *
 * Examples:
 * 1. `match[12345]word FLAGS:ig` becomes: `/match[12345]word/ig`
 * 2. `[Hh]ello[\s]*[Ww]orld` becomes: `/[Hh]ello[\s]*[Ww]orld/`
 * 3. `valid_format FLAGS:g` becomes: `/valid_format/g`
 * 4. `invalid_formatFLAGS:g` becomes: `/invalid_formatFLAGS:g/`
 * 5. `escape_flags\ FLAGS:g` becomes: `/escape_flags FLAGS:g/`
 * 6. `escape_escape\\ FLAGS:g` becomes: `/escape_escape\/g`
 * 7. `odd_escape\\\ FLAGS:gi` becomes: `/odd_escape\\ FLAGS:gi/`
 *
 * @param expression - one-line expression to parse.
 * @returns a new `RegExp` instance.
 */
export function parseOneLineRegExp(expression: string): RegExp {
  let flags;
  if (hasFlags(expression) && !areFlagsEscaped(expression)) {
    flags = extractFlags(expression);
    expression = expression.replace(flagsPattern, '');
  }

  return new RegExp(expression, flags);
}
