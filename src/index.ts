import path from 'node:path';
import { execFileSync } from 'node:child_process';
import os from 'node:os';

const platformKey = `${process.platform} ${os.arch()} ${os.endianness()}`;

const knownWindowsBins: Record<string, string> = {
  'win32 arm64 LE': 'kill-electron_windows_arm64/kill-electron.exe',
  'win32 ia32 LE': 'kill-electron_windows_386/kill-electron.exe',
  'win32 x64 LE': 'kill-electron_windows_amd64_v1/kill-electron.exe'
};

const knownUnixlikeBins: Record<string, string> = {
  'darwin arm64 LE': 'kill-electron_darwin_arm64/kill-electron',
  'darwin x64 LE': 'kill-electron_darwin_amd64_v1/kill-electron',
  'linux arm64 LE': 'kill-electron_linux_arm64/kill-electron',
  'linux ia32 LE': 'kill-electron_linux_386/kill-electron',
  'linux x64 LE': 'kill-electron_linux_amd64_v1/kill-electron'
};

interface Options {
  userModelId?: string;
  zombieOnly?: boolean;
}

function getBinPath() {
  let binPath = '';

  if (platformKey in knownWindowsBins) {
    binPath = knownWindowsBins[platformKey];
  } else if (platformKey in knownUnixlikeBins) {
    binPath = knownUnixlikeBins[platformKey];
  } else {
    throw new Error(`Unsupported platform: ${platformKey}`);
  }
  return binPath;
}

export function getExecutablePath() {
  const binDir = path.join(__dirname, '../bin');
  let binPath = getBinPath();
  binPath = path.join(binDir, binPath);
  return binPath;
}

export function killElectron(options?: Options) {
  const execPath = getExecutablePath();

  const args = [];
  if (options?.userModelId) {
    args.push('--user-model-id', options.userModelId);
  }
  if (options?.zombieOnly) {
    args.push('--zombie-only');
  }

  execFileSync(execPath, args, {
    stdio: 'inherit',
    windowsHide: true
  });
}
