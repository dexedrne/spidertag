import { defineConfig } from 'vite';
import { slots } from './src/render.js';

// Fills the <!-- slot --> markers in index.html from src/token.config.js, so the shipped HTML
// already holds every link and label before any JS runs.
const fromConfig = {
  name: 'from-config',
  transformIndexHtml(html) {
    for (const [marker, render] of Object.entries(slots)) html = html.replaceAll(marker, render());
    return html;
  },
};

export default defineConfig({
  plugins: [fromConfig],
  build: { outDir: 'dist', assetsInlineLimit: 0 },
});
