import EnvironmentProperty from '../decorators/environment-property.decorator';
import { ClassMetadata, EnvironmentPropertyMetadata } from '../metadata/metadata.interface';
import metadataUtil from '../metadata/metadata.util';
import EnvironmentOfPropertyError from './environment-of-property.error';


test('derived class should implement abstract members', () => {
    class Cls {
        @EnvironmentProperty('ENV', true)
        property: string;
    }

    class DerivedError extends EnvironmentOfPropertyError {
        public override readonly cls: Function;
        public override readonly property: EnvironmentPropertyMetadata;

        constructor(cls: Function, property: EnvironmentPropertyMetadata, message: string) {
            super(message);
            this.cls = cls;
            this.property = property;
        }
    }


    let metadata = metadataUtil.extractMetadata(Cls);
    expect(metadata).not.toBeNull();
    metadata = metadata as ClassMetadata;

    const property = metadata.properties[0];
    expect(property).toBeDefined();

    const message = 'test message';
    const error = new DerivedError(Cls, property, message);
    expect(error.cls).toBe(Cls);
    expect(error.property).toBe(property);
    expect(error.message).toBe(message);
});