// Copyright (c) 2020 Luca Cappa
// Released under the term specified in file LICENSE.txt
// SPDX short identifier: MIT

import * as os from 'os';
import * as getninja from '../src/get-ninja';
import * as toolcache from '@actions/tool-cache';
import * as core from '@actions/core';

jest.setTimeout(15 * 1000)

jest.spyOn(toolcache, 'downloadTool').mockImplementation(() =>
    Promise.resolve('/path/to/download')
);

jest.spyOn(toolcache, 'extractZip').mockImplementation(() =>
    Promise.resolve('/path/to/extracted')
);

jest.spyOn(toolcache, 'find').mockImplementation(() =>
    ''
);

jest.spyOn(toolcache, 'cacheDir').mockImplementation(() =>
    Promise.resolve("/path/to/cache")
);

const coreSetFailed = jest.spyOn(core, 'setFailed');
const coreError = jest.spyOn(core, 'error');

test('testing action-get-ninja action success', async () => {
    process.env.RUNNER_TEMP = os.tmpdir();
    await getninja.main();
    expect(coreSetFailed).not.toHaveBeenCalled();
    expect(coreError).not.toHaveBeenCalled();
});
