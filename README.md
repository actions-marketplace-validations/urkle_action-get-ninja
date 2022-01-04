[![Action Status](https://github.com/urkle/action-get-ninja/workflows/build-test/badge.svg)](https://github.com/urkle/action-get-ninja/actions)

[![Coverage Status](https://coveralls.io/repos/github/urkle/action-get-ninja/badge.svg?branch=main)](https://coveralls.io/github/urkle/action-get-ninja?branch=main)

# [The **action-get-ninja** action for downloading and caching ninja binaries](https://github.com/marketplace/actions/action-get-ninja) on the GitHub agents.

Restores from cache, or downloads and caches Ninja.
Works for x64 on Linux/macOS/Windows.

Flowchart of `action-get-ninja`:
  1. If cache hit occurs, ninja is restored from cache in less than 1 second;
  1. If cache miss occurs, the action downloads and installs ninja, then **caches both automatically** with GitHub's [@actions/cache](https://www.npmjs.com/package/@actions/cache) APIs;
  1. Adds to PATH the ninja executables;

## <a id='quickstart'>Quickstart</a>

```yaml
    # - uses: actions/cache@v1  <-----= YOU DO NOT NEED THIS
    #   key: <key>              <-----= YOU DO NOT NEED THIS
    #   path: <path>            <-----= YOU DO NOT NEED THIS

    - name: Get latest ninja
      # Using 'v1' branch, the most recent ninja is installed. (1.10.2)
      uses: urkle/action-get-ninja@v1        ⟸ THIS IS THE ONE LINER YOU NEED
          
    # If you need to pin your workflow to specific ninja you can specify the version.
    - name: Get specific version Ninja 0.9.0
      uses: urkle/action-get-ninja@v1
      with:
        version: 1.9.0 
```

 ## Developer Manual
 * [Developers information](#developers-information)
   * [Prerequisites](#prerequisites)
   * [Packaging](#packaging)
   * [Testing](#testing)
  * [Contributing](#contributing)
  * [License](#license)

### <a id='reference'>Action reference: all input/output parameters</a>

There are no inputs, nor outputs.

[action.yml](https://github.com/urkle/action-get-ninja/blob/main/action.yml)

# Developers information

## Prerequisites
[gulp 4](https://www.npmjs.com/package/gulp4) globally installed.

## Build and lint
Build with `tsc` running:

 > npm run build

Launch `lint` by:

 > npm run lint

## Packaging
To build, lint validate and package the extension for release purpose, run:

  > npm run pack

## Testing

To build, pack and test:
 
 > npm run test

 To run test directly:
 
 > jest

## <a id='contributing'>Contributing</a>

The software is provided as is, there is no warranty of any kind. All users are encouraged to improve the [source code](https://github.com/urkle/action-get-ninja) with fixes and new features.

# License
All the content in this repository is licensed under the [MIT License](LICENSE.txt).

Copyright (c) 2020-2021 Luca Cappa
Copyright (c) 2021 Edward Rudd
