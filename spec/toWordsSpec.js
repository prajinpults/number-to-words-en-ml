'use strict';

var MAX_SAFE_INTEGER = 9007199254740991;
var toWords = typeof require !== 'undefined' ? require('../src/toWords') : window.numberToWords.toWords;
const {eng} = require("./input.json")

describe('toWords', function () {
    var tests = [
        { input:  -1, expect: 'Minus one' },
        { input: 0, expect: 'Zero' },
        { input: 55, expect: 'Fifty five' },
        { input: 66, expect: 'Sixty six' },
        { input: 77, expect: 'Seventy seven' },
        { input: 88, expect: 'Eighty eight' },
        { input: 99, expect: 'Ninety nine' },
        { input: 100, expect: 'One hundred' },
        { input: 111, expect: 'One hundred eleven' },
        { input: 1000, expect: 'One thousand' },
        { input: 2222, expect: 'Two thousand, two hundred twenty two' },

    ];

    function addTest(test) {
        it('should, if passed ' + formatNumber(test.input) + ', return ' + test.expect, function () {
            expect(toWords(test.input)).toEqual(test.expect);
        });
    }

    let i =1;
    while(i<51){
        tests.push({input:i,expect:eng[`${i++}`]})
    }

    tests.forEach(addTest);

    
    it('should throw a RangeError if input is greater or lesser than MAX_SAFE_INTEGER', function() {
        var unsafe = MAX_SAFE_INTEGER + 100;

        expect(function() {
            toWords(unsafe);
        }).toThrowError(/Input is not a safe number/);

        expect(function() {
            toWords( unsafe);
        }).toThrowError(/Input is not a safe number/);
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
