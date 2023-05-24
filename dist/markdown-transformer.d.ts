import { Attributes, PluginOptions } from './interfaces.js';
export declare class MarkdownTransformer {
    private readonly pluginOptions;
    private attributes;
    private HTML;
    constructor(pluginOptions: PluginOptions);
    transform(code: string): Promise<{
        code: string;
        map: null;
    }>;
    includeYAML(code: string): Promise<Attributes>;
    includeHTML(code: string): Promise<string>;
}
