'use strict';

var isFinite = require('./isFinite');
var isSafeNumber = require('./isSafeNumber');

/**
 * Converts an integer into a string with an ordinal postfix.
 * If number is decimal, the decimals will be removed.
 * @example toOrdinal(12) => '12th'
 * @example toOrdinal(12,'<sup>','</sup>') => '12<sup>th</sup>'
 * @param {number|string} number
 * @param {number|string} preTag
 * @param {number|string} postTag
 * @returns {string}
 */
function toOrdinal(number, preTag='', postTag='') {
    var num = parseInt(number, 10);

    if (!isFinite(num)) {
        throw new TypeError(
            'Not a finite number: ' + number + ' (' + typeof number + ')'
        );
    }
    if (!isSafeNumber(num)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }
    var str = String(num);
    var lastTwoDigits = Math.abs(num % 100);
    var betweenElevenAndThirteen = lastTwoDigits >= 11 && lastTwoDigits <= 13;
    var lastChar = str.charAt(str.length - 1);
    return str + preTag + (betweenElevenAndThirteen ? 'th'
            : lastChar === '1' ? 'st'
            : lastChar === '2' ? 'nd'
            : lastChar === '3' ? 'rd'
            : 'th') + postTag;
}

module.exports = toOrdinal;
