// jshint esnext: true
import browserslist from 'browserslist';
import { assign, flatten } from 'lodash';

const BROWSERS_NAMES = {
    ie: 'internet explorer',
    // FIXME what should we do here?
    ios_saf: 'iphone',
};

const BROWSERS_PLATFORMS = {
    ie: {
        6:  [ 'Windows XP' ],
        7:  [ 'Windows XP' ],
        8:  [ 'Windows XP', 'Windows 7' ],
        9:  [ 'Windows 7' ],
        10: [ 'Windows 7', 'Windows 8' ],
        11: [ 'Windows 7', 'Windows 8.1' ],
    },
};

const normalize = (name, version, platform) => {
    return {
        browserName: BROWSERS_NAMES[name] || name,
        version,
        platform
    };
};

const normalizeVersion = (version) => {
    return version.split('-')[1] || version;
};

const getPlatformsByBrowser = (name, version) => {
    if (BROWSERS_PLATFORMS[name] && BROWSERS_PLATFORMS[name][version]) {
        return BROWSERS_PLATFORMS[name][version];
    }
    return [];
};

export default ({ browsers, allPlatforms } = { browsers: browserslist() }) => {
    console.log(browsers);

    const capabilities = browsers.map((browser) => {
        let [name, version] = browser.split(' ');

        version = normalizeVersion(version);

        let capability = normalize(name, version);

        if (!allPlatforms) {
            return capability;
        }

        let platforms = getPlatformsByBrowser(name, version);
        if (!platforms.length) {
            return capability;
        }
        capability = platforms.map((platform) => {
            return normalize(name, version, platform);
        });
        return capability;
    });

    return flatten(capabilities);
};
