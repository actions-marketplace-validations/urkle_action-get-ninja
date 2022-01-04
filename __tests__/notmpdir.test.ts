// Copyright (c) 2020 Luca Cappa
// Released under the term specified in file LICENSE.txt
// SPDX short identifier: MIT

import { ToolsGetter } from '../src/get-ninja';
import * as toolcache from '@actions/tool-cache';

jest.setTimeout(15 * 1000)

const toolDownloadTool = jest.spyOn(toolcache, 'downloadTool').mockImplementation(() =>
    Promise.resolve('/path/to/download')
);

const toolExtractZip = jest.spyOn(toolcache, 'extractZip').mockImplementation(() =>
    Promise.resolve('/path/to/extracted')
);

const toolCacheDir = jest.spyOn(toolcache, 'cacheDir').mockImplementation(() =>
    Promise.resolve('/path/to/cache')
);

jest.spyOn(toolcache, 'find').mockImplementation(() => {
    throw new Error();
}
);

test('testing action-get-ninja with no temporary directory failure', async () => {
    delete process.env.RUNNER_TEMP;
    const getter: ToolsGetter = new ToolsGetter();
    await expect(getter.run()).rejects.toThrowError();
    expect(toolCacheDir).not.toHaveBeenCalled();
    expect(toolDownloadTool).not.toHaveBeenCalled();
    expect(toolExtractZip).not.toHaveBeenCalled();
});
