// Copyright (c) 2020 Luca Cappa
// Released under the term specified in file LICENSE.txt
// SPDX short identifier: MIT

import * as process from 'process';
import * as os from 'os';
import { ToolsGetter } from '../src/get-ninja';
import * as toolcache from '@actions/tool-cache';

jest.setTimeout(15 * 1000)

const toolDownloadTool = jest.spyOn(toolcache, 'downloadTool').mockImplementation(() =>
    Promise.resolve('/path/to/download')
);

const toolExtractZip = jest.spyOn(toolcache, 'extractZip').mockImplementation(() =>
    Promise.resolve('/path/to/extracted')
);

const toolFind = jest.spyOn(toolcache, 'find').mockImplementation(() =>
    '/path/to/cache/'
);

const toolCacheDir = jest.spyOn(toolcache, 'cacheDir').mockImplementation(() =>
    Promise.resolve("/path/to/cache")
);

test('testing action-get-ninja with cache-hit...', async () => {
    process.env.RUNNER_TEMP = os.tmpdir();
    const getter: ToolsGetter = new ToolsGetter();
    await getter.run();
    expect(toolFind).toBeCalledTimes(1);
    expect(toolCacheDir).not.toHaveBeenCalled();
    expect(toolDownloadTool).not.toHaveBeenCalled();
    expect(toolExtractZip).not.toHaveBeenCalled();
});
