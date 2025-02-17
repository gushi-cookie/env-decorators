/**
 * Additional information for the error.
 */
export interface ParseErrorOptions {
  /**
   * Short description of the error.
   *
   * Should start from a lower case letter and
   * shouldn't be closed with punctuation marks,
   * since the error message get closed in its
   * pattern.
   */
  details?: string;

  /**
   * Expected error that was caught.
   */
  initialError?: Error;
}

/**
 * Error type for representing parsers errors.
 */
export class EnvironmentParseError extends Error {
  /**
   * Value that caused the parsing error.
   */
  public readonly envValue: string;

  /**
   * Name of a parser in which the error has occurred.
   */
  public readonly parserName: string;

  /**
   * Error that was expected, caught and wrapped here.
   * Unexpected errors emerge by default.
   */
  public readonly initialError?: Error;

  /**
   * @param envValue - value that has led to the error.
   * @param parserName - name of the parser.
   * @param initialError - expected error that was caught.
   */
  constructor(
    envValue: string,
    parserName: string,
    options?: ParseErrorOptions,
  ) {
    let message = `Environment value '${envValue}' has led to an error in '${parserName}' parser.`;
    if (options?.details) message += ` Reason: ${options.details}.`;
    super(message);

    this.envValue = envValue;
    this.parserName = parserName;
    this.initialError = options?.initialError;
  }
}
