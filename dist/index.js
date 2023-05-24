import { MarkdownTransformer } from './markdown-transformer.js';
export { Include, Use } from './enums.js';
export default (pluginOptions) => {
    return {
        name: 'micromark-vite-plugin',
        enforce: 'pre',
        transform: async function (code, id) {
            if (id.endsWith(".md")) {
                const markdownTransformer = new MarkdownTransformer(pluginOptions);
                return await markdownTransformer.transform(code);
            }
        },
    };
};
