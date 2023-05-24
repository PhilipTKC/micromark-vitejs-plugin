import { Attributes } from "./interfaces.js";
export declare class YAMLParser {
    parse(YAML: string): Attributes;
    isStringArray(value: string): boolean;
    isStringNumber(value: string): boolean;
    isStringBoolean(value: string): boolean;
    coerceArray(value: string): (string | number)[] | null;
    coerceNumber(value: string): number;
    coerceBoolean(value: string): boolean;
}
