import {establishMetadata, extractMetadata} from './metadata.util';

test('metadata should be created in a class and then extracted', () => {
  class TestClass {}
  expect(() => establishMetadata(TestClass)).not.toThrow();
  expect(() => extractMetadata(TestClass)).not.toBeNull();
});
