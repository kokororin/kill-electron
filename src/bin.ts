import { execFileSync } from 'node:child_process';
import { getExecutablePath } from '.';

execFileSync(getExecutablePath(), process.argv.slice(2), {
  windowsHide: true,
  stdio: ['pipe', 'pipe', 'inherit']
});
