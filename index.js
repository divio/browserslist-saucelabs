// jshint esnext: true
import browserslist from 'browserslist';
import { assign, flatten, where, compact } from 'lodash';
import data from './data.json';

const BROWSERS_NAMES = {
    ie: 'Internet Explorer',
    android: 'Android',
    chrome: 'Google Chrome',
    firefox: 'Firefox',
    safari: 'Safari',
    opera: 'Opera',
    // FIXME what should we do here? could be ipad or iphone
    ios_saf: 'iPhone',
    // following ones are not yet supported by saucelabs
    ie_mob: 'Internet Explorer Mobile',
    bb: 'Blackberry',
    and_chr: 'Android Chrome',
    and_ff: 'Android Firefox',
    and_uc: 'Android UC',
};

const getCapabilities = (name, version) => {
    return where(data, { browserName: name, version: version });
};

const normalizeVersion = (version) => {
    // there could be version ranges.
    // in this case we take the beginning of the range 
    // because it is most likely is going to exist on saucelabs
    // e.g. they don't have ios8.3 yet
    return version.split('-')[0] || version;
};

const normalizeName = (name) => {
    return BROWSERS_NAMES[name] || name;
};

export default ({ browsers, allPlatforms } = { allPlatforms: false }) => {
    if (!browsers || !browsers.length) {
        browsers = browserslist();
    }

    const capabilities = browsers.map((browser) => {
        let [name, version] = browser.split(' ');

        version = normalizeVersion(version);
        name = normalizeName(name);

        let capabilities = getCapabilities(name, version);

        if (!allPlatforms) {
            return capabilities[0];
        }

        return capabilities;
    });

    return compact(flatten(capabilities));
};
