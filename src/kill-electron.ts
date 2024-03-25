import { execFileSync } from 'node:child_process';
import { getExecutablePath } from '.';

try {
  const result = execFileSync(getExecutablePath(), process.argv.slice(2), {
    windowsHide: true,
    stdio: ['inherit']
  });
  process.stdout.write(`${result}\n`);
} catch (err: any) {
  process.stderr.write(`${err.stderr}\n`);
  process.exit(err.status);
}
