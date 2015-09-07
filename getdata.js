var fs = require('fs');
var request = require('request');

var API_ENDPOINT = 'https://saucelabs.com/rest/v1/info/platforms/all';

var OS_ID_TO_GROUPNAME = {
    "Windows 2003": "Windows XP",
    "Windows 2008": "Windows 7",
    "Windows 2012": "Windows 8",
    "Windows 2012 R2": "Windows 8.1",
    "Mac 10.6": "OS X 10.6",
    "Mac 10.8": "OS X 10.8", // Mountain Lion
    "Mac 10.9": "OS X 10.9", // Mavericks
    "Mac 10.10": "OS X 10.10", // Yosemite
    "Mac 10.11": "OS X 10.11" // El Capitan
};

// The platforms API lists multiple versions of platforms with
// different properties. Pull out just the essentials, and
// eliminate duplicates.
var eliminateDuplicates = function eliminateDuplicates(browsers) {
    var set = {};

    browsers.forEach(function (browser) {
        var osgroup = browser.os;
        var subgroup = browser.long_name;
        var version = browser.short_version;
        var device;
        var browserName;
        if (browser.api_name === "iphone")  {
            osgroup = device = "iPhone Simulator";
        } else if (browser.api_name === "ipad") {
            osgroup = device =  "iPad Simulator";
        } else if (browser.long_name === "Google Chrome") {
            browserName = 'Chrome';
        } else if (browser.long_name === "Microsoft Edge") {
            version = browser.long_version;
        } else if (browser.api_name === "android") {
            browserName = 'Android';
            osgroup = "Android " + browser.short_version;
            device = browser.long_name;
            if (subgroup === "Android") {
                subgroup += " " + version + " Emulator";
                device = "Android Emulator";
            }
        } else if (osgroup in OS_ID_TO_GROUPNAME) {
            osgroup = OS_ID_TO_GROUPNAME[osgroup];
        }
        set[JSON.stringify([osgroup, subgroup, version])] = {
            browserName: browserName || browser.long_name,
            platform: OS_ID_TO_GROUPNAME[browser.os] || browser.os,
            version: version,
            deviceName: device || browser.device
        };
    });

    var uniques = Object.keys(set).sort().map(function (id) {
        return set[id];
    });
    return uniques;
};

request.get(API_ENDPOINT, function (err, result) {
    var browsers = JSON.parse(result.body);
    fs.writeFileSync('rawdata.json', JSON.stringify(browsers, null, 4));

    console.log('Got ' + browsers.length + ' available browsers');
    browsers = eliminateDuplicates(browsers);

    console.log('Without duplicates it is actually ' + browsers.length);
    fs.writeFileSync('data.json', JSON.stringify(browsers, null, 4));
});
