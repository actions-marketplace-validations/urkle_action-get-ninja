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

jest.spyOn(toolcache, 'cacheDir').mockImplementation(() =>
    Promise.resolve('/path/to/cache')
);

jest.spyOn(toolcache, 'find').mockImplementation(() => {
    throw new Error();
}
);

test('testing action-get-ninja with tool find failure', async () => {
    process.env.RUNNER_TEMP = os.tmpdir();
    const getter: ToolsGetter = new ToolsGetter();
    await expect(getter.run()).rejects.toThrowError();
    expect(toolDownloadTool).not.toHaveBeenCalled();
    expect(toolExtractZip).not.toHaveBeenCalled();
});
