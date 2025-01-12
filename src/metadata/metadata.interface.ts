export type EnvironmentParseCallback = (envValue: string) => any;

/**
 * Metadata type for classes that have environment properties.
 */
export interface ClassMetadata {
    /**
     * List of the class's properties that are associated with environment variables.
     */
    properties: EnvironmentProperty[];
}

/**
 * Represents data of a single class property that is associated with an environment variable.
 */
export interface EnvironmentProperty {
    /** Name of the property or its symbol. */
    key: string | symbol;

    /** Name of the associated environment variable with the property. */
    envName: string;

    /** Is property static. */
    isStatic: boolean;

    /** Is property required. */
    required: boolean;

    /** Parse callback function for the environment variable. */
    parseCallback?: EnvironmentParseCallback;
}