import path from 'node:path';
import fs from 'node:fs/promises';
import { dirname, filename } from 'dirname-filename-esm';
import fg from 'fast-glob';

const __dirname = dirname(import.meta);

const rootDir = path.join(__dirname, '..');
const binDir = path.join(__dirname, '../dist-go');
const files = await fg('**/*.{json,yaml}', { cwd: binDir, absolute: true });
for (const file of files) {
  await fs.rm(file);
}

const execFiles = await fg('dist-go/kill-electron*', {
  cwd: rootDir,
  ignore: ['**/*.txt']
});

const rootPkgPath = path.join(rootDir, 'package.json');
const rootPkg = JSON.parse(await fs.readFile(rootPkgPath, 'utf8'));
rootPkg.publishConfig = {
  executableFiles: execFiles
};
await fs.writeFile(rootPkgPath, JSON.stringify(rootPkg, null, 2));
