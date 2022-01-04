// Copyright (c) 2020-2021 Luca Cappa
// Copyright (c) 2021 Edward Rudd - Make Ninja only focused since base images include a newer CMake
// Released under the term specified in file LICENSE.txt
// SPDX short identifier: MIT

import * as core from '@actions/core';
import * as tools from '@actions/tool-cache';
import * as path from 'path';

interface PackageInfo {
  url: string;
}

export class ToolsGetter {
  // Predefined URL for ninja
  private static readonly ninja_linux_x64: string = 'https://github.com/ninja-build/ninja/releases/download/v{VERSION}/ninja-linux.zip';
  private static readonly ninja_macos_x64: string = 'https://github.com/ninja-build/ninja/releases/download/v{VERSION}/ninja-mac.zip';
  private static readonly ninja_windows_x64: string = 'https://github.com/ninja-build/ninja/releases/download/v{VERSION}/ninja-win.zip';

  private static readonly ninjaPackagesMap: { [key: string]: PackageInfo } = {
    "linux": {
      url: ToolsGetter.ninja_linux_x64,
    },
    "win32": {
      url: ToolsGetter.ninja_windows_x64,
    },
    "darwin": {
      url: ToolsGetter.ninja_macos_x64,
    }
  };

  public async run(): Promise<void> {
    const ninjaData = ToolsGetter.ninjaPackagesMap[process.platform];
    await this.get(ninjaData);
  }

  private async get(ninjaData: PackageInfo): Promise<void> {
    // Get an unique output directory name from the URL.
    const version = core.getInput('version');
    const url = ninjaData.url.replace('{VERSION}', version);
    const outPath = ToolsGetter.getOutputPath('ninja-${version}');

    let ninjaDirectory = tools.find('ninja', version);
    if (!ninjaDirectory) {
      await core.group("Download and extract ninja", async () => {
        const downloaded = await tools.downloadTool(url);
        const extractedPath = await tools.extractZip(downloaded, outPath);
        ninjaDirectory = await tools.cacheDir(extractedPath, 'ninja', version);
      });
    }

    try {
      core.startGroup(`Add ninja to PATH`);
      core.debug(`Ninja path: ${ninjaDirectory}`);
      core.addPath(ninjaDirectory);
    } finally {
      core.endGroup();
    }
  }

  private static getOutputPath(subDir: string): string {
    if (!process.env.RUNNER_TEMP)
      throw new Error("Environment variable process.env.RUNNER_TEMP must be set, it is used as destination directory of the cache");
    return path.join(process.env.RUNNER_TEMP, subDir);
  }
}


export async function main(): Promise<void> {
  try {
    const getter: ToolsGetter = new ToolsGetter();
    await getter.run();
    core.info('action-get-ninja action execution succeeded');
    process.exitCode = 0;
  } catch (err) {
    const error: Error = err as Error;
    if (error?.stack) {
      core.info(error.stack);
    }
    const errorAsString = (error ?? "undefined error").toString();
    core.setFailed(`action-get-ninja action execution failed: '${errorAsString}'`);
    process.exitCode = -1000;

  }
}