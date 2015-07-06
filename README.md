Browserslist Saucelabs
======================

[![Build Status](https://travis-ci.org/vxsx/browserslist-saucelabs.svg?branch=master)](https://travis-ci.org/vxsx/browserslist-saucelabs)

Converter from browserslist to saucelabs desired capabilities.
Very opinionated, in some places also very silly.

Not every browser that browserslist outputs is present on SauceLabs.

Under the hood uses amazing [Browserslist](https://github.com/ai/browserslist) library.

## Usage

```js
var b2s = require('browserslist-saucelabs');

b2s({ browsers: ['last 2 versions'] });
```

Result would be

```
[
    { browserName: 'Chrome', platform: 'OS X 10.6', version: '43' },
    { browserName: 'Chrome', platform: 'OS X 10.6', version: '42' },
    { browserName: 'Firefox', platform: 'OS X 10.6', version: '38' },
    { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11' },
    { browserName: 'Internet Explorer', platform: 'Windows 8', version: '10' },
    { browserName: 'iPhone', platform: 'OS X 10.10', version: '8.1', deviceName: 'iPhone Simulator' },
    { browserName: 'Safari', platform: 'OS X 10.10', version: '8' }
]
```

Or if you want to test your stuff _thoroughly_

```js
var b2s = require('browserslist-saucelabs');

b2s({ browsers: ['last 2 versions'], allPlatforms: true });
```

Result would be

```
[
    { browserName: 'Chrome', platform: 'OS X 10.6', version: '43' },
    { browserName: 'Chrome', platform: 'OS X 10.9', version: '43' },
    { browserName: 'Chrome', platform: 'Windows XP', version: '43' },
    { browserName: 'Chrome', platform: 'OS X 10.8', version: '43' },
    { browserName: 'Chrome', platform: 'Windows 8', version: '43' },
    { browserName: 'Chrome', platform: 'Linux', version: '43' },
    { browserName: 'Chrome', platform: 'Windows 8.1', version: '43' },
    { browserName: 'Chrome', platform: 'Windows 7', version: '43' },
    { browserName: 'Chrome', platform: 'OS X 10.10', version: '43' },
    { browserName: 'Chrome', platform: 'OS X 10.6', version: '42' },
    { browserName: 'Chrome', platform: 'OS X 10.9', version: '42' },
    { browserName: 'Chrome', platform: 'Windows XP', version: '42' },
    { browserName: 'Chrome', platform: 'OS X 10.8', version: '42' },
    { browserName: 'Chrome', platform: 'Windows 8', version: '42' },
    { browserName: 'Chrome', platform: 'Linux', version: '42' },
    { browserName: 'Chrome', platform: 'Windows 8.1', version: '42' },
    { browserName: 'Chrome', platform: 'Windows 7', version: '42' },
    { browserName: 'Chrome', platform: 'OS X 10.10', version: '42' },
    { browserName: 'Firefox', platform: 'OS X 10.6', version: '38' },
    { browserName: 'Firefox', platform: 'OS X 10.9', version: '38' },
    { browserName: 'Firefox', platform: 'Windows XP', version: '38' },
    { browserName: 'Firefox', platform: 'Windows 8', version: '38' },
    { browserName: 'Firefox', platform: 'Linux', version: '38' },
    { browserName: 'Firefox', platform: 'Windows 8.1', version: '38' },
    { browserName: 'Firefox', platform: 'Windows 7', version: '38' },
    { browserName: 'Firefox', platform: 'OS X 10.10', version: '38' },
    { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11' },
    { browserName: 'Internet Explorer', platform: 'Windows 7', version: '11' },
    { browserName: 'Internet Explorer', platform: 'Windows 8', version: '10' },
    { browserName: 'Internet Explorer', platform: 'Windows 7', version: '10' },
    { browserName: 'iPhone', platform: 'OS X 10.10', version: '8.1', deviceName: 'iPhone Simulator' },
    { browserName: 'iPad', platform: 'OS X 10.10', version: '8.1', deviceName: 'iPad Simulator' },
    { browserName: 'Safari', platform: 'OS X 10.10', version: '8' }
]
```

I'm not even talking about android, there's ton of them available.

It also picks up `browserslist` file, so you don't have to pass an array of browsers.
