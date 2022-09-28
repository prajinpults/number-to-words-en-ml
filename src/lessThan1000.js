'use strict';

var lessThan100 = require('./lessThan100');

/**
* convert number to words in malayalam (less than 1000)
* @function lessThan1000
* @param  {Number|String} number max length 3
* @return {String} words in malayalam
*/
function lessThan1000(number = "") {
    const formatted = `${number}`
        .replace(/[^0-9]+/g, "")
        .replace(/^0+([1-9][0-9]*|0$)/, "$1");

    if (!formatted || 3 < formatted.length)
        return new Error("invalid number format");

    if (formatted.length < 3) return lessThan100(formatted);

    const mapping = {
        100: "നൂറ്",
        200: "ഇരുനൂറ്",
        300: "മുന്നൂറ്",
        400: "നാനൂറ്",
        500: "അഞ്ഞൂറ്",
        600: "അറുനൂറ്",
        700: "എഴുനൂറ്",
        800: "എണ്ണൂറ്",
        900: "തൊള്ളായിരം",
    };

    if (mapping[formatted]) return mapping[formatted];

    const part100 = `${formatted.charAt(0)}00`;
    const lessThan100V = lessThan100(
        `${formatted.charAt(1)}${formatted.charAt(2)}`
    );

    switch (part100) {
        case "100":
        case "200":
        case "300":
        case "400":
        case "500":
        case "600":
        case "700":
        case "800":
            return `${mapping[part100].replace(/റ്$/, "റ്റി")} ${lessThan100V}`;

        case "900":
            return `${mapping[part100].replace(/ം$/, "ത്തി")} ${lessThan100V}`;
    }
}

module.exports = lessThan1000;
