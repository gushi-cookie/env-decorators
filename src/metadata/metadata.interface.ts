/**
 * Function signature of a callback for parsing environment variables.
 */
export interface EnvironmentParseCallback<T> {
  (val: string): T;
}

/**
 * Metadata type for classes that stores data about decorated class members.
 */
export interface ClassMetadata {
  /**
   * List of the class's properties that are associated with environment variables.
   */
  properties: EnvironmentPropertyMetadata[];
}

/**
 * Represents data of a single class property that is associated with an environment variable.
 */
export interface EnvironmentPropertyMetadata {
  /** Name of the property or its symbol. */
  key: string | symbol;

  /** Name of the associated environment variable with the property. */
  envName: string;

  /** Is property static. */
  isStatic: boolean;

  /** Is property required. */
  required: boolean;

  /** Parse callback function for the environment variable. */
  parseCallback?: EnvironmentParseCallback<any>;
}
