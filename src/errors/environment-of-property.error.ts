import {EnvironmentPropertyMetadata} from '../metadata/metadata.interface';

/**
 * Base error class that represents a class property associated with
 * an environment variable.
 */
export default abstract class EnvironmentOfPropertyError extends Error {
  /**
   * Class of the property.
   */
  public abstract readonly cls: Function;

  /**
   * Property that has led to the error.
   */
  public abstract readonly property: EnvironmentPropertyMetadata;
}
