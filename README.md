# Micromark ViteJS Plugin

## TODO

- Extract Headers with option `Include.TOC`

## Usage

```js
import { defineConfig } from 'vite'
import micromarkPlugin, { Include, Use } from ""

export default defineConfig({
  plugins: [
    micromarkPlugin({
      include: [Include.HTML, Include.FRONTMATTER],
      use: [Use.GFM, Use.FRONTMATTER]
    })
  ]
})
```

### Import Single

```js
    try {
      return await import(`./_content/${markdown}.md`);
    } catch {
      return { FRONTMATTER: null, HTML: null };
    }
``` 

### Importing Multiple

```js
    try {
      const modules = import.meta.glob("./_content/**/*.md");
      return await modules[`./_content/path1/${category}/path2/${markdown}.md`]();
    } catch {
      return {
        FRONTMATTER: null, HTML: null
      };
    }
```

```js
// markdown.d.ts
declare module '*.md' {
  export const FRONTMATTER: Record<string, string, number, boolean, (string | number)[]>;

  export const HTML: string;
}
```
