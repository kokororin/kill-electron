import path from 'node:path';
import { execFileSync } from 'node:child_process';
import os from 'node:os';

const binDir = path.join(__dirname, '../dist-go');

const platformKey = `${process.platform} ${os.arch()} ${os.endianness()}`;

const knownWindowsBins: Record<string, string> = {
  'win32 arm64 LE': 'kill-electron_windows_arm64.exe',
  'win32 ia32 LE': 'kill-electron_windows_386.exe',
  'win32 x64 LE': 'kill-electron_windows_amd64.exe'
};

const knownUnixlikeBins: Record<string, string> = {
  'darwin arm64 LE': 'kill-electron_darwin_arm64',
  'darwin x64 LE': 'kill-electron_darwin_amd64',
  'linux arm64 LE': 'kill-electron_linux_arm64',
  'linux ia32 LE': 'kill-electron_linux_386',
  'linux x64 LE': 'kill-electron_linux_amd64'
};

interface Options {
  userModelId?: string;
  zombieOnly?: boolean;
}

function getBinPath(): string {
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

export function getExecutablePath(): string {
  let binPath = getBinPath();
  binPath = path.join(binDir, binPath);
  return binPath;
}

export function killElectron(options?: Options): void {
  const execPath = getExecutablePath();

  const args = [];
  if (options?.userModelId != null) {
    args.push('--user-model-id', options.userModelId);
  }
  if (options?.zombieOnly === true) {
    args.push('--zombie-only');
  }

  execFileSync(execPath, args, {
    stdio: 'inherit',
    windowsHide: true
  });
}
