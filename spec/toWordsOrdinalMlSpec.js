'use strict';

var MAX_SAFE_INTEGER = 9007199254740991;
var toWords = typeof require !== 'undefined' ? require('../src/toWordsOrdinalMl') : window.numberToWords.toWordsOrdinalMl;

describe('toWords', function () {
    var tests = [
        { input: 0, expect: 'പൂജ്യം' },
        { input: 3, expect: 'മൂന്നാം' },
        { input: 1, expect: 'ഒന്നാം' },
        { input: 5, expect: 'അഞ്ചാം' },
        { input: 10, expect: 'പത്താം' },
        { input: 11, expect: 'പതിനൊന്നാം' },
        { input: 14, expect: 'പതിനാലാം' },
        { input: 15, expect: 'പതിനഞ്ചാം' },
        { input: 16, expect: 'പതിനാറാം' },
        { input: 17, expect: 'പതിനേഴാം' },
        { input: 20, expect: 'ഇരുപതാം' },
        { input: 25, expect: 'ഇരുപത്തഞ്ചാം' },
        { input: 35, expect: 'മുപ്പത്തഞ്ചാം' },
        { input: 36, expect: 'മുപ്പത്തിയാറാം' },
        { input: 37, expect: 'മുപ്പത്തിയേഴാം' },
        { input: 1.9, expect: 'ഒന്നാം' },
        { input: 100, expect: 'നൂറാം' },
        { input: 10000, expect: 'പതിനായിരം' },
        { input: null, expect: '' },
    ];

    function addTest(test) {
        it('should, if passed ' + formatNumber(test.input) + ', return ' + test.expect, function () {
            expect(toWords(test.input)).toEqual(test.expect);
        });
    }

    tests.forEach(addTest);

});

function formatNumber(number) {
    var result = String(number).split('').reverse().map(function (num, index) {
        if (index % 3 === 2) return '.' + num;
        return num;
    }).reverse();
    var length = result.length;
    return result.join('') + ' (' + length + ')';
}
