import { EnvironmentResolve } from '../decorators/environment-resolve.decorator';
import { EnvironmentParseCallback } from '../metadata/metadata.interface';
import { EnvironmentsSubstitutor } from '../utils/environments-substitutor.util';
import { resolveStaticProperties } from './resolver.util';


test('should resolve static property', () => {
    class TestClass {
        @EnvironmentResolve('ENV_1', true)
        static staticProp1: string;

        static staticProp2: string;
    }


    const substitutor = new EnvironmentsSubstitutor();
    const value = 'ENV_1 value';
    substitutor.addSubstitution('ENV_1', value);
    substitutor.substitute();

    resolveStaticProperties(TestClass);
    expect(TestClass.staticProp1).toBe(value);
    expect(TestClass.staticProp2).toBeUndefined();

    substitutor.reset();
});

test('should resolve static property only for a derived class', () => {
    class A {
        @EnvironmentResolve('ENV_1')
        static parentProperty: string;
    }

    class B extends A {
        @EnvironmentResolve('ENV_2')
        static derivedProperty: string;
    }


    const substitutor = new EnvironmentsSubstitutor();
    const value = 'ENV_2 value';
    substitutor.addSubstitution('ENV_1', 'ENV_1 value');
    substitutor.addSubstitution('ENV_2', value);
    substitutor.substitute();

    resolveStaticProperties(B, false);
    expect(A.parentProperty).toBeUndefined();
    expect(B.derivedProperty).toBe(value);

    substitutor.reset();
});

test('should resolve static properties for the whole parents chain of a class', () => {
    class A {
        @EnvironmentResolve('ENV_1')
        static propA: string;
    }

    class B extends A {
        // Class without metadata
    }

    class C extends B {
        // Class without metadata
    }

    class D extends C {
        @EnvironmentResolve('ENV_2')
        static propD: string;
    }

    class E extends D {
        @EnvironmentResolve('ENV_3')
        static propE: string;
    }


    const substitutor = new EnvironmentsSubstitutor();
    const env1 = 'ENV_1 value';
    const env2 = 'ENV_2 value';
    const env3 = 'ENV_3 value';
    substitutor.addSubstitution('ENV_1', env1);
    substitutor.addSubstitution('ENV_2', env2);
    substitutor.addSubstitution('ENV_3', env3);
    substitutor.substitute();

    resolveStaticProperties(E, true);
    expect(A.propA).toBe(env1);
    expect(D.propD).toBe(env2);
    expect(E.propE).toBe(env3);

    substitutor.reset();
});

test('should resolve static required properties correctly', () => {
    const substitutor = new EnvironmentsSubstitutor();
    const value = 'ENV value';
    substitutor.addSubstitution('ENV', value);
    substitutor.substitute();


    class RequiredSet {
        @EnvironmentResolve('ENV', true)
        static property: string;
    }
    resolveStaticProperties(RequiredSet);
    expect(RequiredSet.property).toBe(value);


    class RequiredUnset {
        @EnvironmentResolve('ENV_UNSET', true)
        static property: string;
    }
    expect(() => resolveStaticProperties(RequiredUnset)).toThrow();


    class NonRequiredSet {
        @EnvironmentResolve('ENV', false)
        static property: string;
    }
    resolveStaticProperties(NonRequiredSet);
    expect(NonRequiredSet.property).toBe(value);


    class NonRequiredUnset {
        @EnvironmentResolve('ENV_UNSET', false)
        static property: string;
    }
    expect(() => resolveStaticProperties(NonRequiredUnset)).not.toThrow();


    substitutor.reset();
});

test('should parse static property', () => {
    const substitutor = new EnvironmentsSubstitutor();
    const value = '1736642467879';
    substitutor.addSubstitution('ENV', value);
    substitutor.substitute();


    const parseCallback: EnvironmentParseCallback = function(envValue: string): any {
        return new Date(parseInt(envValue));
    }

    class TestClass {
        @EnvironmentResolve('ENV', true, parseCallback)
        static date: Date;
    }


    resolveStaticProperties(TestClass);
    expect(new Date(parseInt(value)).toString()).toBe(TestClass.date.toString());


    substitutor.reset();
});