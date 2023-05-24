export class YAMLParser {
    parse(YAML) {
        const attributes = {};
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
                    }
                    else {
                        attributes[property] = value;
                    }
                }
            });
            return attributes;
        }
        catch {
            // TODO: Error Handling
            return {};
        }
    }
    isStringArray(value) {
        return value.startsWith('[') && value.endsWith(']');
    }
    isStringNumber(value) {
        return !isNaN(Number(value));
    }
    isStringBoolean(value) {
        const lowercasedValue = value.toLowerCase();
        return lowercasedValue === 'true' || lowercasedValue === 'false';
    }
    coerceArray(value) {
        try {
            const coercedValue = JSON.parse(value);
            if (!Array.isArray(coercedValue)) {
                return null;
            }
            return coercedValue;
        }
        catch (error) {
            return null;
        }
    }
    coerceNumber(value) {
        return Number(value);
    }
    coerceBoolean(value) {
        return value === 'true';
    }
}
