// jshint esnext: true
const NUMBER_GROUPS = /(\d+)/g;

export default function naturalSort (a, b) {
    var aa = String(a).split(NUMBER_GROUPS);
    var bb = String(b).split(NUMBER_GROUPS);
    var min = Math.min(aa.length, bb.length);

    for (var i = 0; i < min; i++) {
        var x = parseFloat(aa[i]) || aa[i].toLowerCase().trim(),
            y = parseFloat(bb[i]) || bb[i].toLowerCase().trim();
        if (x < y) {
            return -1;
        } else if (x > y) {
            return 1;
        }
    }

    return 0;
};
