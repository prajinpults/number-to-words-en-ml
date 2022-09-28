'use strict';

var lessThan100 = require('./lessThan100');
var lessThan100000 = require('./lessThan100000');


/**
* convert number to words in malayalam (less than 10000000)
* @function lessThan10000000
* @param  {Number|String} number max length 7
* @return {String} words in malayalam
*/
function lessThan10000000(number = "") {
    const formatted = `${number}`
        .replace(/[^0-9]+/g, "")
        .replace(/^0+([1-9][0-9]*|0$)/, "$1");

    if (!formatted || 7 < formatted.length)
        return new Error("invalid number format");

    if (formatted.length < 6) return lessThan100000(number);

    const parts = formatted.match(/(.{1,2})(.{5})/);

    let lessThan10000000 = `${parts[1] == "1" ? "ഒരു" : lessThan100(parts[1])
        } ലക്ഷം`;

    if (parts[2] == "00000") return lessThan10000000;

    return `${lessThan10000000.replace(/ം$/, "ത്തി")} ${lessThan100000(
        parts[2]
    )}`;
}

module.exports = lessThan10000000;
