// jshint esnext: true
import browserslist from 'browserslist';
import { assign, flatten, where } from 'lodash';
import data from './data.json';

const BROWSERS_NAMES = {
    ie: 'internet explorer',
    // FIXME what should we do here? could be ipad or iphone
    ios_saf: 'iphone',
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

export default ({ browsers, allPlatforms } = { browsers: browserslist() }) => {
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

    return flatten(capabilities);
};
