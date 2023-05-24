import { YAMLParser } from './YAML-parser.js';
import { Include, Use } from './enums.js';
export class MarkdownTransformer {
    constructor(pluginOptions) {
        this.pluginOptions = pluginOptions;
        this.attributes = {};
        this.HTML = '';
    }
    async transform(code) {
        if (this.pluginOptions.include.includes(Include.FRONTMATTER)) {
            this.attributes = await this.includeYAML(code);
        }
        if (this.pluginOptions.include.includes(Include.HTML)) {
            this.HTML = await this.includeHTML(code);
        }
        let includeMappings = {
            [Include.FRONTMATTER]: `export const ${Include.FRONTMATTER} = ${JSON.stringify(this.attributes)};`,
            [Include.HTML]: `export const ${Include.HTML} = ${JSON.stringify(this.HTML)};`,
        };
        const moduleCode = this.pluginOptions.include
            .filter((option) => includeMappings.hasOwnProperty(option))
            .map((option) => includeMappings[option])
            .join('\n');
        return {
            code: moduleCode,
            map: null,
        };
    }
    async includeYAML(code) {
        const { fromMarkdown } = await import('mdast-util-from-markdown');
        const { frontmatter } = await import('micromark-extension-frontmatter');
        const { frontmatterFromMarkdown } = await import('mdast-util-frontmatter');
        const from = fromMarkdown(code, {
            extensions: [frontmatter()],
            mdastExtensions: [frontmatterFromMarkdown(['yaml'])],
        });
        if (from.children[0].type === 'yaml') {
            const yamlParser = new YAMLParser();
            return yamlParser.parse(from.children[0].value);
        }
        return {};
    }
    async includeHTML(code) {
        const { micromark } = await import('micromark');
        const extensions = [];
        const htmlExtensions = [];
        if (this.pluginOptions.use?.includes(Use.FRONTMATTER)) {
            const { frontmatter, frontmatterHtml } = await import('micromark-extension-frontmatter');
            extensions.push(frontmatter());
            htmlExtensions.push(frontmatterHtml());
        }
        if (this.pluginOptions.use?.includes(Use.GFM)) {
            const { gfm, gfmHtml } = await import('micromark-extension-gfm');
            extensions.push(gfm());
            htmlExtensions.push(gfmHtml());
        }
        return micromark(code, {
            extensions,
            htmlExtensions,
        });
    }
}
