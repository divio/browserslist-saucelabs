// jshint esnext: true
import browsers2sauce from './index';
import browserslist from 'browserslist';
import { deepEqual } from 'assert';

describe('Browserslist Saucelabs', () => {
    it('parses browserslist input, outputs capabilities', () => {
        deepEqual(
            browsers2sauce({ browsers: browserslist(['ie 9', 'iOS 8.3']) }),
            [
                { browserName: 'Internet Explorer', version: '9', platform: 'Windows 7' },
                { browserName: 'iPhone', version: '8.1', platform: 'OS X 10.10', deviceName: 'iPhone Simulator' },
            ]
        ); });

    it('outputs all available platforms for a browser if needed', () => {
        deepEqual(
            browsers2sauce({ browsers: browserslist(['ie 11']), allPlatforms: true }),
            [
                { browserName: 'Internet Explorer', version: '11', platform: 'Windows 8.1' },
                { browserName: 'Internet Explorer', version: '11', platform: 'Windows 7' },
            ]
        );

        deepEqual(
            browsers2sauce({ browsers: browserslist(['ie 9-11']) }),
            [
                { browserName: 'Internet Explorer', version: '11', platform: 'Windows 8.1' },
                { browserName: 'Internet Explorer', version: '10', platform: 'Windows 8' },
                { browserName: 'Internet Explorer', version: '9', platform: 'Windows 7' },
            ]
        );

        deepEqual(
            browsers2sauce({ browsers: browserslist(['ie >= 8']), allPlatforms: true }),
            [
                { browserName: 'Internet Explorer', version: '11', platform: 'Windows 8.1' },
                { browserName: 'Internet Explorer', version: '11', platform: 'Windows 7' },
                { browserName: 'Internet Explorer', version: '10', platform: 'Windows 8' },
                { browserName: 'Internet Explorer', version: '10', platform: 'Windows 7' },
                { browserName: 'Internet Explorer', version: '9', platform: 'Windows 7' },
                { browserName: 'Internet Explorer', version: '8', platform: 'Windows XP' },
                { browserName: 'Internet Explorer', version: '8', platform: 'Windows 7' },
            ]
        );

        deepEqual(
            browsers2sauce({ browsers: browserslist(['android 4.2']) }),
            [
                { browserName: 'Android', version: '4.2', platform: 'Linux', deviceName: 'Android Emulator' },
            ]
        );

        deepEqual(
            browsers2sauce({ browsers: browserslist(['android 4.2']), allPlatforms: true }),
            [
                { browserName: 'Android', version: '4.2', platform: 'Linux', deviceName: 'Android Emulator' },
                { browserName: "Android", deviceName: "Samsung Galaxy Tab 3 Emulator", platform: "Linux", version: "4.2", },
                { browserName: "Android", deviceName: "LG Nexus 4 Emulator", platform: "Linux", version: "4.2", },
                { browserName: "Android", deviceName: "Samsung Galaxy Nexus Emulator", platform: "Linux", version: "4.2", },
                { browserName: "Android", deviceName: "Samsung Galaxy S3 Emulator", platform: "Linux", version: "4.2" },
                { browserName: "Android", deviceName: "Samsung Galaxy S4 Emulator", platform: "Linux", version: "4.2", },
                { browserName: "Android", deviceName: "Google Nexus 7C Emulator", platform: "Linux", version: "4.2" },
            ]
        );

        deepEqual(
            browsers2sauce({ browsers: browserslist(['chrome 42']) }),
            [
                { browserName: 'Google Chrome', version: '42', platform: 'OS X 10.6' },
            ]
        );

        deepEqual(
            browsers2sauce({ browsers: browserslist(['chrome 42']), allPlatforms: true }),
            [
                { browserName: 'Google Chrome', platform: 'OS X 10.6', version: '42' },
                { browserName: 'Google Chrome', platform: 'OS X 10.9', version: '42' },
                { browserName: 'Google Chrome', platform: 'Windows XP', version: '42' },
                { browserName: 'Google Chrome', platform: 'OS X 10.8', version: '42' },
                { browserName: 'Google Chrome', platform: 'Windows 8', version: '42' },
                { browserName: 'Google Chrome', platform: 'Linux', version: '42' },
                { browserName: 'Google Chrome', platform: 'Windows 8.1', version: '42' },
                { browserName: 'Google Chrome', platform: 'Windows 7', version: '42' },
                { browserName: 'Google Chrome', platform: 'OS X 10.10', version: '42' }
            ]
        );

        deepEqual(
            browsers2sauce({ browsers: browserslist(['ff 38']) }),
            [
                { browserName: 'Firefox', version: '38', platform: 'OS X 10.6' },
            ]
        );

        deepEqual(
            browsers2sauce({ browsers: browserslist(['ff 38']), allPlatforms: true }),
            [
                { browserName: 'Firefox', platform: 'OS X 10.6', version: '38' },
                { browserName: 'Firefox', platform: 'OS X 10.9', version: '38' },
                { browserName: 'Firefox', platform: 'Windows XP', version: '38' },
                { browserName: 'Firefox', platform: 'Windows 8', version: '38' },
                { browserName: 'Firefox', platform: 'Linux', version: '38' },
                { browserName: 'Firefox', platform: 'Windows 8.1', version: '38' },
                { browserName: 'Firefox', platform: 'Windows 7', version: '38' },
                { browserName: 'Firefox', platform: 'OS X 10.10', version: '38' },
            ]
        );
    });
});
