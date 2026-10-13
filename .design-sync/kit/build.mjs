// Builds dist/ for /design-sync: ESM bundle + .d.ts + the site's own stylesheet.
// The stylesheet is css/style.css verbatim, prefixed with the Inter webfont
// import that index.html loads via <link>.
import { build } from 'esbuild';
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  external: ['react', 'react/jsx-runtime'],
  outfile: 'dist/index.js',
});
execSync('npx tsc -p tsconfig.json', { stdio: 'inherit' });
const siteCss = readFileSync('../../css/style.css', 'utf8');
writeFileSync(
  'dist/style.css',
  "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');\n" + siteCss,
);
console.log('built dist/');
