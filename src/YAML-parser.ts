import { Attributes } from "./interfaces.js";

export class YAMLParser {
    parse(YAML: string): Attributes {
        const attributes: Attributes = {};

        try {
            YAML.split('\n').forEach((attribute) => {
                const [property, value] = attribute.split(':').map((attribute) => attribute.trim());
                if (property && value) {
                    let coercedValue;

                    if (this.isStringArray(value)) {
                        coercedValue = this.coerceArray(value);
                    }

                    if (this.isStringNumber(value)) {
                        coercedValue = this.coerceNumber(value);
                    }

                    if (this.isStringBoolean(value)) {
                        coercedValue = this.coerceBoolean(value);
                    }

                    if (coercedValue !== null && coercedValue !== undefined) {
                        attributes[property] = coercedValue;
                    } else {
                        attributes[property] = value;
                    }
                }
            });

            return attributes;
        } catch {
            // TODO: Error Handling
            return {};
        }
    }

    isStringArray(value: string): boolean {
        return value.startsWith('[') && value.endsWith(']');
    }

    isStringNumber(value: string): boolean {
        return !isNaN(Number(value));
    }

    isStringBoolean(value: string): boolean {
        const lowercasedValue = value.toLowerCase();
        return lowercasedValue === 'true' || lowercasedValue === 'false';
    }

    coerceArray(value: string): (string | number)[] | null {
        try {
            const coercedValue: string[] = JSON.parse(value);
            if (!Array.isArray(coercedValue)) {
                return null;
            }

            return coercedValue;
        } catch (error) {
            return null;
        }
    }

    coerceNumber(value: string): number {
        return Number(value);
    }

    coerceBoolean(value: string): boolean {
        return value === 'true';
    }
}
