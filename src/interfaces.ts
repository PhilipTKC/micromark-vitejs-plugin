import { Include, Use } from "./enums.js";

export interface Attributes { [key: string]: string | number | boolean | (string | number)[] }

export interface Mappings { [key: string]: string }

export interface PluginOptions {
    include: Include[];
    use?: Use[];
};
