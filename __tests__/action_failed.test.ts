// Copyright (c) 2020 Luca Cappa
// Released under the term specified in file LICENSE.txt
// SPDX short identifier: MIT

import * as os from 'os';
import * as toolcache from '@actions/tool-cache';
import * as core from '@actions/core';
import * as getninja from '../src/get-ninja';

jest.setTimeout(15 * 1000);

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

const coreSetFailed = jest.spyOn(core, 'setFailed');
const coreError = jest.spyOn(core, 'error');

test('testing action-get-ninja action failure', async () => {
    process.env.RUNNER_TEMP = os.tmpdir();
    await getninja.main();
    expect(coreSetFailed).toBeCalledTimes(1);
    expect(coreError).toBeCalledTimes(0);
    expect(toolCacheDir).toBeCalledTimes(0);
    expect(toolDownloadTool).toBeCalledTimes(0);
    expect(toolExtractZip).toBeCalledTimes(0);
});
