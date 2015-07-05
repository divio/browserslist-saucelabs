// jshint esnext: true
import browserslistSauce from './index';
import browserslist from 'browserslist';
import { equal, deepEqual } from 'assert';

describe('Browserslist Saucelabs', () => {
    it('should return default browsers', () => {
        deepEqual(browserslistSauce(), browserslist());
    });
});
