// jshint esnext: true
import browserslist from 'browserslist';
import { assign, flatten, where, compact } from 'lodash';
import data from './data.json';
import naturalSort from './utils/sort.es5';

const BROWSERS_NAMES = {
    ie: 'Internet Explorer',
    android: 'Android',
    chrome: 'Chrome',
    firefox: 'Firefox',
    safari: 'Safari',
    opera: 'Opera',
    edge: 'Microsoft Edge',
    // Special case, since for browserslist there is no difference
    // but for us there is
    ios_saf: ['iPhone', 'iPad'],
    // following ones are not yet supported by saucelabs
    ie_mob: 'Internet Explorer Mobile',
    bb: 'Blackberry',
    and_chr: 'Android Chrome',
    and_ff: 'Android Firefox',
    and_uc: 'Android UC',
};

const getCapabilities = (names, version) => {
    return flatten(flatten([names]).map((n) => {
        return where(data, { browserName: n, version: version });
    }));
};

const normalizeVersion = ({ version, name }) => {
    // FIXME special case for ms edge
    // https://github.com/Fyrd/caniuse/issues/1822
    // so browser reports version 20 and on sauce labs it's 20
    // but caniuse guys use UA string where it says it is in fact version 12
    // (while common sense tells me that it is version 1 but anyways)
    // we'll see how things turn out eventually but for now:
    // ¯\_(ツ)_/¯
    if (name === 'edge' && version === '12') {
        version = '20';
    }

    // there could be version ranges.
    // in this case we take the beginning of the range
    // because it is most likely is going to exist on saucelabs
    // e.g. they don't have ios8.3 yet
    return version.split('-')[0] || version;
};

const normalizeName = (name) => {
    return BROWSERS_NAMES[name] || name;
};

export default ({ browsers, allPlatforms = false } = {}) => {
    browsers = browserslist(browsers);

    const capabilities = browsers.map((browser) => {
        let [name, version] = browser.split(' ');

        version = normalizeVersion({ version, name });
        name = normalizeName(name);

        let capabilities = getCapabilities(name, version);

        if (!allPlatforms) {
            return capabilities[0];
        }

        return capabilities;
    });

    return compact(flatten(capabilities)).sort((a,b) => {
        let nameSort = naturalSort(a.browserName, b.browserName),
            versionSort = naturalSort(a.version, b.version),
            platformSort = naturalSort(a.platform, b.platform);
        if (nameSort !== 0) {
            return -nameSort;
        } else if (versionSort !== 0) {
            return -versionSort;
        } else {
            return -platformSort;
        }
    });
};
