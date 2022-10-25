'use strict';

var toWordsOrdinal = typeof require !== 'undefined' ? require('../src/toWordsOrdinal') : window.numberToWords.toWordsOrdinal;

const {eng} = require("./input.json")

describe('toWordsOrdinal', function () {
    var tests = [
        { input: '0', expect: 'Zeroth' },
        { input: '1', expect: 'First' },
        { input: '60', expect: 'Sixtieth' },
        { input: '70', expect: 'Seventieth' },
        { input: '80', expect: 'Eightieth' },
        { input: '90', expect: 'Ninetieth' },
        { input: '100', expect: 'One hundredth' },
        { input: '1000', expect: 'One thousandth' },
        { input: '1000000', expect: 'One millionth' },
        { input: '1000000000', expect: 'One billionth' },
        { input: '1000000000000', expect: 'One trillionth' },
        { input: '1000000000000000', expect: 'One quadrillionth' }
    ];

    let i =1;
    while(i<51){
        tests.push({input:i,expect:eng[`${i++}th`]})
    }
    function addTest(test) {
        it('should, if passed "' + test.input + '", return "' + test.expect + '"', function () {
            expect(toWordsOrdinal(test.input)).toEqual(test.expect);
        });
    }

    tests.forEach(addTest);
});
