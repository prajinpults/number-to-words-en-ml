'use strict';

var toWordsMl = require('./toWordsMl');

/**
 * Converts a number into ordinal words.
 * @example toWordsOrdinal(12) => 'twelfth'
 * @param {number|string} number
 * @returns {string}
 */
function toWordsOrdinalMl(number) {
    var words = toWordsMl(number, false);
    return words.replace(/്$/,'ാം');
}

module.exports = toWordsOrdinalMl;
