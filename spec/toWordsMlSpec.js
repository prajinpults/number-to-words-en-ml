'use strict';

const {mal} = require("./input.json")

var MAX_SAFE_INTEGER = 9007199254740991;
var toWords = typeof require !== 'undefined' ? require('../src/toWordsMl') : window.numberToWords.toWordsMl;

describe('toWords', function () {
    var tests = [
        { input: 0, expect: 'പൂജ്യം' },
        { input: 1, expect: 'ഒരു' },
        { input: 1.9, expect: 'ഒരു' },
        { input: 100, expect: 'നൂറ്' },
        { input: 10000, expect: 'പതിനായിരം' },
        { input: null, expect: '' },
    ];
    let i =1;
    while(i<51){
        tests.push({input:i,expect:mal[i++]})
    }

    function addTest(test) {
        it('should, if passed ' + formatNumber(test.input) + ', return ' + test.expect, function () {
            expect(toWords(test.input)).toEqual(test.expect);
        });
    }

    tests.forEach(addTest);

    it('should, if passed ' + formatNumber(1) + ', return ഒന്ന്', function () {
        expect(toWords(1,false)).toEqual('ഒന്ന്');
    });
    it('should, if passed ' + formatNumber(1.9) + ', return ഒന്ന്', function () {
        expect(toWords(1.9,false)).toEqual('ഒന്ന്');
    });
});

function formatNumber(number) {
    var result = String(number).split('').reverse().map(function (num, index) {
        if (index % 3 === 2) return '.' + num;
        return num;
    }).reverse();
    var length = result.length;
    return result.join('') + ' (' + length + ')';
}
