import { Plugin } from 'vite';

import { MarkdownTransformer } from './markdown-transformer.js';
import { PluginOptions } from './interfaces.js';

export { Include, Use } from './enums.js';
export { PluginOptions } from './interfaces.js';

export default (pluginOptions: PluginOptions): Plugin => {
    return {
        name: 'micromark-vite-plugin',
        enforce: 'pre',
        transform: async function (code: string, id: string) {
            if (id.endsWith(".md")) {
                const markdownTransformer = new MarkdownTransformer(pluginOptions);
                return await markdownTransformer.transform(code);
            }
        },
    };
}
