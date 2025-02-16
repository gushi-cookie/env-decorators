import {
  ClassMetadata,
  EnvironmentParseCallback,
  EnvironmentPropertyMetadata,
} from '../metadata/metadata.interface';
import {extractMetadata} from '../metadata/metadata.util';
import {EnvironmentProperty} from './environment-property.decorator';

/**
 * Check relevant properties of an EnvironmentPropertyMetadata object.
 */
function checkMetadataProperty(
  prop: EnvironmentPropertyMetadata | undefined,
  envName: string,
  required: boolean,
  isStatic: boolean,
  parseCallback: EnvironmentParseCallback<any> | undefined,
) {
  expect(prop).not.toBeUndefined();
  prop = prop as EnvironmentPropertyMetadata;

  expect(prop.envName).toBe(envName);
  expect(prop.isStatic).toBe(isStatic);
  expect(prop.required).toBe(required);
  expect(prop.parseCallback).toBe(parseCallback);
}

/**
 * Find EnvironmentProperty object associated with a passed environment name.
 */
function findMetadataPropertyByEnvName(
  metadata: ClassMetadata,
  envName: string,
): EnvironmentPropertyMetadata | undefined {
  for (const prop of metadata.properties) {
    if (prop.envName === envName) return prop;
  }
  return undefined;
}

test('metadata should be set in a class by decorator', () => {
  class A {
    @EnvironmentProperty('TEST')
    instanceProperty: any;
  }
  expect(extractMetadata(A)).not.toBeUndefined();

  class B {
    @EnvironmentProperty('TEST')
    static staticProperty: any;
  }
  expect(extractMetadata(B)).not.toBeUndefined();

  const symbol = Symbol();
  class C {
    @EnvironmentProperty('TEST')
    [symbol]: any;
  }
  expect(extractMetadata(C)).not.toBeUndefined();
});

test("metadata should'nt be set in a class", () => {
  expect(extractMetadata(class TestClass {})).toBeNull();
});

test('metadata properties should be set correctly', () => {
  const parseCallback: EnvironmentParseCallback<any> = function () {};

  const symbolProperty = Symbol();

  class TestClass {
    @EnvironmentProperty('ENV_1', true, parseCallback)
    firstProperty: any;

    @EnvironmentProperty('ENV_2', false)
    secondProperty: any;

    @EnvironmentProperty('ENV_3', true, parseCallback)
    static staticProperty: any;

    @EnvironmentProperty('ENV_4', false)
    [symbolProperty]: any;
  }

  let metadata = extractMetadata(TestClass);
  expect(metadata).not.toBeNull();
  metadata = metadata as ClassMetadata;

  let prop = findMetadataPropertyByEnvName(metadata, 'ENV_1');
  checkMetadataProperty(prop, 'ENV_1', true, false, parseCallback);

  prop = findMetadataPropertyByEnvName(metadata, 'ENV_2');
  checkMetadataProperty(prop, 'ENV_2', false, false, undefined);

  prop = findMetadataPropertyByEnvName(metadata, 'ENV_3');
  checkMetadataProperty(prop, 'ENV_3', true, true, parseCallback);

  prop = metadata.properties.find(prop => prop.key === symbolProperty);
  expect(prop).not.toBeUndefined();
  checkMetadataProperty(prop, 'ENV_4', false, false, undefined);
});
