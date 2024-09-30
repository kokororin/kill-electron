import { execFileSync } from 'node:child_process';
import { getExecutablePath } from '.';

try {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const result = execFileSync(getExecutablePath(), process.argv.slice(2), {
    windowsHide: true,
    stdio: ['inherit']
  });
  process.stdout.write(`${String(result)}\n`);
} catch (err) {
  process.stderr.write(`${err.stderr}\n`);
  process.exit(err.status);
}
