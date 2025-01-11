import { arrays } from './collections.util';


/**
 * Represents internal data about substitution of a single
 * environment with a new value.
 */
export interface SubstitutionData {
    /** Name of the environment to substitute. */
    envName: string;

    /** Original value of the environment. */
    originalValue: string | undefined;

    /** Value for substitution. */
    newValue: string | undefined;
}


export class EnvironmentsSubstitutor {
    private substitutions: SubstitutionData[] = [];


    // ------------------------------------------------------------
    // Public interface of the storage.
    // ------------------------------------------------------------

    /**
     * Find a stored substitution by an environment name.
     * @param envName - name of the environment.
     * @returns stored substitution or null if not found.
     */
    getSubstitutionByEnv(envName: string): SubstitutionData | null {
        for(let subst of this.substitutions) {
            if(subst.envName === envName) return subst;
        }
        return null;
    }

    /**
     * Add a new substitution or replace a stored one, by the name
     * of an environment.
     * 
     * @param envName - name of the environment to substitute.
     * @param newValue - value for substitution.
     */
    addSubstitution(envName: string, newValue: string | undefined): void {
        let stored = this.getSubstitutionByEnv(envName);
        let originalValue = process.env[envName];

        if(stored) {
            originalValue = stored.originalValue;
            arrays.removeItem(this.substitutions, stored);
        }

        this.substitutions.push({
            envName,
            newValue,
            originalValue,
        });
    }

    /**
     * Add a list substitutions to the storage.
     * 
     * Note: this function wraps addSubstitution() that
     * overrides stored substitutions.
     * 
     * @param substitutions - key stands for environment name, value stand for a new value.
     */
    addSubstitutions(map: Map<string, string | undefined>): void {
        for(let entry of map.entries()) {
            this.addSubstitution(entry[0], entry[1]);
        }
    }


    // ------------------------------------------------------------
    // Manipulations on process.env
    // ------------------------------------------------------------

    /**
     * Substitute environments with stored ones.
     */
    substitute() {
        for(let substitution of this.substitutions) {
            if(substitution.newValue === undefined) {
                delete process.env[substitution.envName];
            } else {
                process.env[substitution.envName] = substitution.newValue;
            }
        }
    }

    /**
     * Reset stored environments to their original values.
     */
    reset() {
        for(let substitution of this.substitutions) {
            if(substitution.originalValue === undefined) {
                delete process.env[substitution.envName];
            } else {
                process.env[substitution.envName] = substitution.originalValue;
            }
        }
    }
}