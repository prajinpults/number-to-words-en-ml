'use strict';

var lessThan100 = require('./lessThan100');
var lessThan1000 = require('./lessThan1000');
/**
* convert number to words in malayalam (less than 100000)
* @function lessThan100000
* @param  {Number|String} number max length 5
* @return {String} words in malayalam
*/

function lessThan100000(number = "") {
    const formatted = `${number}`
        .replace(/[^0-9]+/g, "")
        .replace(/^0+([1-9][0-9]*|0$)/, "$1");

    if (!formatted || 5 < formatted.length)
        return new Error("invalid number format");

    if (formatted.length < 4) return lessThan1000(number);

    const mapping = {
        1000: "ആയിരം",
        3000: "മൂവ്വായിരം",
        8000: "എണ്ണായിരം",

        11000: "പതിനൊന്നായിരം",
        13000: "പതിമൂന്നായിരം",
        18000: "പതിനെട്ടായിരം",

        21000: "ഇരുപത്തൊന്നായിരം",
        23000: "ഇരുപത്തിമൂന്നായിരം",
        28000: "ഇരുപത്തിയെട്ടായിരം",

        31000: "മുപ്പത്തൊന്നായിരം",
        33000: "മുപ്പത്തിമൂന്നായിരം",
        38000: "മുപ്പത്തിയെട്ടായിരം",

        41000: "നാല്പത്തൊന്നായിരം",
        43000: "നാല്പത്തിമൂന്നായിരം",
        48000: "നാല്പത്തിയെട്ടായിരം",

        51000: "അമ്പത്തൊന്നായിരം",
        53000: "അമ്പത്തിമൂന്നായിരം",
        58000: "അമ്പത്തിയെട്ടായിരം",

        61000: "അറുപത്തൊന്നായിരം",
        63000: "അറുപത്തിമൂന്നായിരം",
        68000: "അറുപത്തിയെട്ടായിരം",

        71000: "എഴുപത്തൊന്നായിരം",
        73000: "എഴുപത്തിമൂന്നായിരം",
        78000: "എഴുപത്തിയെട്ടായിരം",

        81000: "എൺപത്തൊന്നായിരം",
        83000: "എൺപത്തിമൂന്നായിരം",
        88000: "എൺപത്തിയെട്ടായിരം",

        91000: "തൊണ്ണൂറ്റൊന്നായിരം",
        93000: "തൊണ്ണൂറ്റിമൂന്നായിരം",
        98000: "തൊണ്ണൂറ്റിയെട്ടായിരം",
    };

    if (mapping[formatted]) return mapping[formatted];

    const parts = formatted.match(/(.{1,2})(.{3})/);

    const part1000 = `${parts[1]}000`;
    let lessThan100000 = "";

    if (mapping[part1000]) lessThan100000 = mapping[part1000];
    else {
        lessThan100000 = `${lessThan100(parts[1])}${mapping[1000]}`;
        console.log(parts[1].substr(-1))
        switch (parts[1].substr(-1)) {
            case "0":{
                lessThan100000 = lessThan100000.replace(/റ്ആ/, "റാ");
                lessThan100000 = lessThan100000.replace(/ത്ആ|ത്ത്ആ/, "തിനാ");
                break;
            }
            case "6": {
                lessThan100000 = lessThan100000.replace(/റ്ആ/, "റാ");
                break;
            }

            case "9": {
                lessThan100000 = lessThan100000.replace(/ത്ആ|ത്ത്ആ/, "തിനാ");
                break;
            }

            case "2": {
                lessThan100000 = lessThan100000.replace(/ണ്ട്ആ/, "ണ്ടാ");
                break;
            }

            case "4": {
                lessThan100000 = lessThan100000.replace(/ല്ആ/, "ലാ");
                break;
            }

            case "5": {
                lessThan100000 = lessThan100000.replace(/ഞ്ച്ആ/, "യ്യാ");
                break;
            }

            case "7": {
                lessThan100000 = lessThan100000.replace(/ഴ്ആ/, "ഴാ");
                break;
            }
        }
    }

    if (parts[2] == "000") return lessThan100000;

    return `${lessThan100000.replace(/ം$/, "ത്തി")} ${lessThan1000(
        parts[2]
    )}`;
}

module.exports = lessThan100000;
