// jshint esnext: true
import browsers2sauce from './index';
import browserslist from 'browserslist';
import { deepEqual } from 'assert';

describe('Browserslist Saucelabs', () => {
    it('parses browserslist input, outputs capabilities', () => {
        deepEqual(
            browsers2sauce({ browsers: browserslist(['ie 9', 'ios_saf 8.3']) }), 
            [
                {
                    browserName: 'internet explorer',
                    version: '9',
                    platform: 'Windows 7'
                },
                {
                    browserName: 'iphone',
                    version: '8.1',
                    platform: 'OS X 10.10',
                    deviceName: 'iphone'
                }
            ]
        );
    });

    it('outputs all available platforms for a browser if needed', () => {
        deepEqual(
            browsers2sauce({ browsers: browserslist(['ie 11']), allPlatforms: true }),
            [
                {
                    browserName: 'internet explorer',
                    version: '11',
                    platform: 'Windows 8.1'
                },
                {
                    browserName: 'internet explorer',
                    version: '11',
                    platform: 'Windows 7'
                },
            ]
        );
    });
});
