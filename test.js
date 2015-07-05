// jshint esnext: true
import browsers2sauce from './index';
import browserslist from 'browserslist';
import { deepEqual } from 'assert';

describe('Browserslist Saucelabs', () => {
    it('parses browserslist input, outputs capabilities', () => {
        deepEqual(
            browsers2sauce({ browsers: browserslist(['ie 9', 'iOS 8.3']) }), 
            [
                {
                    browserName: 'Internet Explorer',
                    version: '9',
                    platform: 'Windows 7'
                },
                {
                    browserName: 'iPhone',
                    version: '8.1',
                    platform: 'OS X 10.10',
                    deviceName: 'iPhone Simulator'
                }
            ]
        ); });

    it('outputs all available platforms for a browser if needed', () => {
        deepEqual(
            browsers2sauce({ browsers: browserslist(['ie 11']), allPlatforms: true }),
            [
                {
                    browserName: 'Internet Explorer',
                    version: '11',
                    platform: 'Windows 8.1'
                },
                {
                    browserName: 'Internet Explorer',
                    version: '11',
                    platform: 'Windows 7'
                },
            ]
        );

        deepEqual(
            browsers2sauce({ browsers: browserslist(['ie 9-11']) }),
            [
                {
                    browserName: 'Internet Explorer',
                    version: '11',
                    platform: 'Windows 8.1'
                },
                {
                    browserName: 'Internet Explorer',
                    version: '10',
                    platform: 'Windows 8'
                },
                {
                    browserName: 'Internet Explorer',
                    version: '9',
                    platform: 'Windows 7'
                }
            ]
        );

        deepEqual(
            browsers2sauce({ browsers: browserslist(['ie >= 8']), allPlatforms: true }),
            [
                {
                    browserName: 'Internet Explorer',
                    version: '11',
                    platform: 'Windows 8.1'
                },
                {
                    browserName: 'Internet Explorer',
                    version: '11',
                    platform: 'Windows 7'
                },
                {
                    browserName: 'Internet Explorer',
                    version: '10',
                    platform: 'Windows 8'
                },
                {
                    browserName: 'Internet Explorer',
                    version: '10',
                    platform: 'Windows 7'
                },
                {
                    browserName: 'Internet Explorer',
                    version: '9',
                    platform: 'Windows 7'
                },
                {
                    browserName: 'Internet Explorer',
                    version: '8',
                    platform: 'Windows XP'
                },
                {
                    browserName: 'Internet Explorer',
                    version: '8',
                    platform: 'Windows 7'
                },
            ]
        );
    });
});
