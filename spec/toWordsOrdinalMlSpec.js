'use strict';

var MAX_SAFE_INTEGER = 9007199254740991;
var toWords = typeof require !== 'undefined' ? require('../src/toWordsOrdinalMl') : window.numberToWords.toWordsOrdinalMl;

const {mal} = require("./input.json")

describe('toWords', function () {
    var tests = [
        { input: 0, expect: 'പൂജ്യം' },
        { input: 10000, expect: 'പതിനായിരം' },
        { input: null, expect: '' },
    ];

    let i =1;
    while(i<51){
        tests.push({input:i,expect:mal[`${i++}th`]})
    }
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
