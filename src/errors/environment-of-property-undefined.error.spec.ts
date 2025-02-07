import EnvironmentProperty from '../decorators/environment-property.decorator';
import metadataUtil from '../metadata/metadata.util';
import resolver from '../resolver/resolver.util';
import EnvironmentOfPropertyUndefinedError from './environment-of-property-undefined.error';

const envName = 'TEST_ENV_FOR_JEST';
const symbol = Symbol('TEST_SYMBOL_PROPERTY');

describe('should throw the error when a required environment is undefined', () => {
  test('for instance property', () => {
    class Cls {
      @EnvironmentProperty(envName, true)
      prop: string;
    }
    expect(() => resolver.resolveInstanceProperties(new Cls())).toThrow(
      EnvironmentOfPropertyUndefinedError,
    );
  });

  test('for instance symbol property', () => {
    class Cls {
      @EnvironmentProperty(envName, true)
      [symbol]: string;
    }
    expect(() => resolver.resolveInstanceProperties(new Cls())).toThrow(
      EnvironmentOfPropertyUndefinedError,
    );
  });

  test('for static property', () => {
    class Cls {
      @EnvironmentProperty(envName, true)
      static prop: string;
    }
    expect(() => resolver.resolveStaticProperties(Cls)).toThrow(
      EnvironmentOfPropertyUndefinedError,
    );
  });

  test('for static symbol property', () => {
    class Cls {
      @EnvironmentProperty(envName, true)
      static [symbol]: string;
    }
    expect(() => resolver.resolveStaticProperties(Cls)).toThrow(
      EnvironmentOfPropertyUndefinedError,
    );
  });
});

describe('should not throw the error when a non-required environment is undefined', () => {
  test('for instance property', () => {
    class Cls {
      @EnvironmentProperty(envName, false)
      prop: string;
    }
    expect(() => resolver.resolveInstanceProperties(new Cls())).not.toThrow(
      EnvironmentOfPropertyUndefinedError,
    );
  });

  test('for instance symbol property', () => {
    class Cls {
      @EnvironmentProperty(envName, false)
      [symbol]: string;
    }
    expect(() => resolver.resolveInstanceProperties(new Cls())).not.toThrow(
      EnvironmentOfPropertyUndefinedError,
    );
  });

  test('for static property', () => {
    class Cls {
      @EnvironmentProperty(envName, false)
      static prop: string;
    }
    expect(() => resolver.resolveStaticProperties(Cls)).not.toThrow(
      EnvironmentOfPropertyUndefinedError,
    );
  });

  test('for static symbol property', () => {
    class Cls {
      @EnvironmentProperty(envName, false)
      static [symbol]: string;
    }
    expect(() => resolver.resolveStaticProperties(Cls)).not.toThrow(
      EnvironmentOfPropertyUndefinedError,
    );
  });
});

describe('properties of the error object should be correct', () => {
  const propertyName = 'myProperty';

  test('for instance property', () => {
    class Cls {
      @EnvironmentProperty(envName, true)
      [propertyName]: string;
    }

    let err;
    try {
      resolver.resolveInstanceProperties(new Cls());
    } catch (e: any) {
      err = e;
    }

    err = err as EnvironmentOfPropertyUndefinedError;
    expect(err).toBeInstanceOf(EnvironmentOfPropertyUndefinedError);
    expect(err.cls).toBe(Cls);
    expect(err.property).toBe(metadataUtil.extractMetadata(Cls)?.properties[0]);
  });

  test('for instance symbol property', () => {
    class Cls {
      @EnvironmentProperty(envName, true)
      [symbol]: string;
    }

    let err;
    try {
      resolver.resolveInstanceProperties(new Cls());
    } catch (e: any) {
      err = e;
    }

    err = err as EnvironmentOfPropertyUndefinedError;
    expect(err).toBeInstanceOf(EnvironmentOfPropertyUndefinedError);
    expect(err.cls).toBe(Cls);
    expect(err.property).toBe(metadataUtil.extractMetadata(Cls)?.properties[0]);
  });

  test('for static property', () => {
    class Cls {
      @EnvironmentProperty(envName, true)
      static [propertyName]: string;
    }

    let err;
    try {
      resolver.resolveStaticProperties(Cls);
    } catch (e: any) {
      err = e;
    }

    err = err as EnvironmentOfPropertyUndefinedError;
    expect(err).toBeInstanceOf(EnvironmentOfPropertyUndefinedError);
    expect(err.cls).toBe(Cls);
    expect(err.property).toBe(metadataUtil.extractMetadata(Cls)?.properties[0]);
  });

  test('for static symbol property', () => {
    class Cls {
      @EnvironmentProperty(envName, true)
      static [symbol]: string;
    }

    let err;
    try {
      resolver.resolveStaticProperties(Cls);
    } catch (e: any) {
      err = e;
    }

    err = err as EnvironmentOfPropertyUndefinedError;
    expect(err).toBeInstanceOf(EnvironmentOfPropertyUndefinedError);
    expect(err.cls).toBe(Cls);
    expect(err.property).toBe(metadataUtil.extractMetadata(Cls)?.properties[0]);
  });
});
