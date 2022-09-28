'use strict';

var MAX_SAFE_INTEGER = 9007199254740991;
var toWords = typeof require !== 'undefined' ? require('../src/toWordsMl') : window.numberToWords.toWordsMl;

describe('toWords', function () {
    var tests = [
        { input: 0, expect: 'പൂജ്യം' },
        { input: 1, expect: 'ഒന്ന്' },
        { input: 1.9, expect: 'ഒന്ന്' },
        { input: 100, expect: 'നൂറ്' },
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
