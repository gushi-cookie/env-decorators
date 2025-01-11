import { EnvironmentsSubstitutor } from './environments-substitutor.util';


const substitutions = new Map<string, string | undefined>([
    ['TEST_A', 'A value'],
    ['TEST_B', 'B value'],
    ['TEST_C', undefined],
]);


test('should reset substituted environments to original values', () => {
    // 1. Creating pseudo substitutions to imitate original
    //    environments.
    const pseudoSubstitutions = new Map(substitutions);
    for(let [key, value] of pseudoSubstitutions) {
        if(value === undefined) continue;
        pseudoSubstitutions.set(key, value + ' pseudo original');
        process.env[key] = value + ' pseudo original';
    }

    // 2. Creating pseudo substitutor for our pseudo
    //    substitutions and then applying them.
    const pseudoSubstitutor = new EnvironmentsSubstitutor();
    pseudoSubstitutor.addSubstitutions(pseudoSubstitutions);
    pseudoSubstitutor.substitute();

    // 3. Creating substitutor for overwriting pseudo
    //    substitutions, applying it and then resetting
    //    back to pseudo substitutions.
    const substitutor = new EnvironmentsSubstitutor();
    substitutor.addSubstitutions(substitutions);
    substitutor.substitute();
    substitutor.reset();

    // 4. Checking if environments were reset to pseudo ones.
    for(let [key, value] of pseudoSubstitutions) {
        expect(process.env[key]).toBe(value);
    }

    // 5. Resetting pseudo substitutions to clear tested environments.
    pseudoSubstitutor.reset();
});


test('should substitute environments', () => {
    const substitutor = new EnvironmentsSubstitutor();

    substitutor.addSubstitutions(substitutions);
    substitutor.substitute();

    for(let [key, value] of substitutions) {
        expect(process.env[key]).toBe(value);
    }

    substitutor.reset();
});