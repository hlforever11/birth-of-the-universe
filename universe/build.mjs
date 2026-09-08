import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

process.chdir(fileURLToPath(new URL('.', import.meta.url)));
const result = await build({
  entryPoints: ['src/main.js'],
  bundle: true,
  outdir: 'assets',
  entryNames: 'cosmos-[hash]',
  format: 'esm',
  target: ['es2020'],
  minify: true,
  legalComments: 'eof',
  metafile: true
});
const entry = Object.entries(result.metafile.outputs).find(([, info]) => info.entryPoint);
if (!entry || !entry[1].cssBundle) throw new Error('Application entry or stylesheet missing');
for (const file of Object.keys(result.metafile.outputs).filter(file => file.endsWith('.js'))) {
  execFileSync(process.execPath, ['--check', file]);
}
const template = await readFile('src/index.html', 'utf8');
await writeFile('index.html', template
  .replace('{{SCRIPT}}', `./${entry[0]}`)
  .replace('{{STYLE}}', `./${entry[1].cssBundle}`));
// Old cached HTML still requests this filename. Keep it as a valid module bridge.
await writeFile('assets/index-CHqxocjq.js', `import './${entry[0].split('/').pop()}';\n`);
console.log(`Built and syntax-checked ${entry[0]}`);
