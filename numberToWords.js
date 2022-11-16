/*!
 * Number-To-Words util
 * @version v1.1.3
 * @link https://github.com/prajinpults/number-to-words-en-ml
 * @author Prajin (https://github.com/prajinpults)
 * @contributors Martin Eneqvist (https://github.com/marlun78),Aleksey Pilyugin (https://github.com/pilyugin),Jeremiah Hall (https://github.com/jeremiahrhall),Adriano Melo (https://github.com/adrianomelo),dmrzn (https://github.com/dmrzn),HedCET (https://github.com/HedCET)
 * @license MIT
 */
(function () {
    'use strict';

    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this;

    // ========== file: \src\maxSafeInteger.js ==========

var MAX_SAFE_INTEGER = 9007199254740991;


// ========== file: \src\isFinite.js ==========

// Simplified https://gist.github.com/marlun78/885eb0021e980c6ce0fb
function isFinite(value) {
    return !(typeof value !== 'number' || value !== value || value === Infinity || value === -Infinity);
}


// ========== file: \src\isSafeNumber.js ==========


function isSafeNumber(value) {
    return typeof value === 'number' && Math.abs(value) <= MAX_SAFE_INTEGER;
}


// ========== file: \src\makeOrdinal.js ==========

var ENDS_WITH_DOUBLE_ZERO_PATTERN = /(hundred|thousand|(m|b|tr|quadr)illion)$/;
var ENDS_WITH_TEEN_PATTERN = /teen$/;
var ENDS_WITH_Y_PATTERN = /y$/;
var ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN = /(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|Zero|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve)$/;
var ordinalLessThanThirteen = {
    zero: 'zeroth',
    one: 'first',
    two: 'second',
    three: 'third',
    four: 'fourth',
    five: 'fifth',
    six: 'sixth',
    seven: 'seventh',
    eight: 'eighth',
    nine: 'ninth',
    ten: 'tenth',
    eleven: 'eleventh',
    twelve: 'twelfth',
    Zero: 'Zeroth',
    One: 'First',
    Two: 'Second',
    Three: 'Third',
    Four: 'Fourth',
    Five: 'Fifth',
    Six: 'Sixth',
    Seven: 'Seventh',
    Eight: 'Eighth',
    Nine: 'Ninth',
    Ten: 'Tenth',
    Eleven: 'Eleventh',
    Twelve: 'Twelfth'
};

/**
 * Converts a number-word into an ordinal number-word.
 * @example makeOrdinal('one') => 'first'
 * @param {string} words
 * @returns {string}
 */
function makeOrdinal(words) {
    // Ends with *00 (100, 1000, etc.) or *teen (13, 14, 15, 16, 17, 18, 19)
    if (ENDS_WITH_DOUBLE_ZERO_PATTERN.test(words) || ENDS_WITH_TEEN_PATTERN.test(words)) {
        return words + 'th';
    }
    // Ends with *y (20, 30, 40, 50, 60, 70, 80, 90)
    else if (ENDS_WITH_Y_PATTERN.test(words)) {
        return words.replace(ENDS_WITH_Y_PATTERN, 'ieth');
    }
    // Ends with one through twelve
    else if (ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN.test(words)) {
        return words.replace(ENDS_WITH_ZERO_THROUGH_TWELVE_PATTERN, replaceWithOrdinalVariant);
    }
    return words;
}

function replaceWithOrdinalVariant(match, numberWord) {
    return ordinalLessThanThirteen[numberWord];
}


// ========== file: \src\toOrdinal.js ==========


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


// ========== file: \src\toWords.js ==========


var TEN = 10;
var ONE_HUNDRED = 100;
var ONE_THOUSAND = 1000;
var ONE_MILLION = 1000000;
var ONE_BILLION = 1000000000;           //         1.000.000.000 (9)
var ONE_TRILLION = 1000000000000;       //     1.000.000.000.000 (12)
var ONE_QUADRILLION = 1000000000000000; // 1.000.000.000.000.000 (15)
var MAX = 9007199254740992;             // 9.007.199.254.740.992 (15)

var LESS_THAN_TWENTY = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

var TENTHS_LESS_THAN_HUNDRED = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

var isAppendSlash = false
/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'Twelve'
 * @param {number|string} number
 * @param {boolean} [appendSlash] - Append "-" if required defulat is  " "
 * @returns {string}
 */
function toWords(number,appendSlash) {
    isAppendSlash = appendSlash
    var words;
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
    words = generateWords(num);
    return capitalizeFirstLetter(words);
}

function generateWords(number,appendRemainderWith=" ") {
    var remainder, word,
        words = arguments[1];

    // We’re done
    if (number === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (number < 0) {
        words.push('minus');
        number = Math.abs(number);
    }

    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];

    } else if (number < ONE_HUNDRED) {
        remainder = number % TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-” or " " appendRemainderWith
        if (remainder) {
            word += (isAppendSlash?'-':' ')+ LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }

    } else if (number < ONE_THOUSAND) {
        remainder = number % ONE_HUNDRED;
        word = generateWords(Math.floor(number / ONE_HUNDRED)) + ' hundred';

    } else if (number < ONE_MILLION) {
        remainder = number % ONE_THOUSAND;
        word = generateWords(Math.floor(number / ONE_THOUSAND)) + ' thousand,';

    } else if (number < ONE_BILLION) {
        remainder = number % ONE_MILLION;
        word = generateWords(Math.floor(number / ONE_MILLION)) + ' million,';

    } else if (number < ONE_TRILLION) {
        remainder = number % ONE_BILLION;
        word = generateWords(Math.floor(number / ONE_BILLION)) + ' billion,';

    } else if (number < ONE_QUADRILLION) {
        remainder = number % ONE_TRILLION;
        word = generateWords(Math.floor(number / ONE_TRILLION)) + ' trillion,';

    } else if (number <= MAX) {
        remainder = number % ONE_QUADRILLION;
        word = generateWords(Math.floor(number / ONE_QUADRILLION)) +
        ' quadrillion,';
    }

    words.push(word);
    return generateWords(remainder, words);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// ========== file: \src\lessThan100.js ==========



/**
 * convert number to words in malayalam (less than 100)
 * @function lessThan100
 * @param  {Number|String} number max length 2
 * @return {String} words in malayalam
 */
function lessThan100(number = "") {
    const formatted = `${number}`
        .replace(/[^0-9]+/g, "")
        .replace(/^0+([1-9][0-9]*|0$)/, "$1");

    if (!formatted || 2 < formatted.length)
        return new Error("invalid number format");

    const mapping = {
        0: "പൂജ്യം",
        1: "ഒന്ന്",
        2: "രണ്ട്",
        3: "മൂന്ന്",
        4: "നാല്",
        5: "അഞ്ച്",
        6: "ആറ്",
        7: "ഏഴ്",
        8: "എട്ട്",
        9: "ഒൻപത്",

        10: "പത്ത്",
        11: "പതിനൊന്ന്",
        12: "പന്ത്രണ്ട്",
        19: "പത്തൊൻപത്",

        20: "ഇരുപത്",
        30: "മുപ്പത്",
        40: "നാല്പത്",
        50: "അൻപത്",
        60: "അറുപത്",
        70: "എഴുപത്",
        80: "എൺപത്",
        90: "തൊണ്ണൂറ്",
    };

    if (mapping[formatted]) return mapping[formatted];

    const part10 = `${formatted.charAt(0)}0`;
    const part1 = `${formatted.charAt(1)}`;

    const word = `${mapping[part10]}${mapping[part1]}`;

    switch (part10) {
        case "10": {
            switch (part1) {
                case "3":
                    return word.replace(/ത്ത്മ/, "തിമ");

                case "4":
                case "5":
                    return word.replace(/ത്ത്ന|ത്ത്അ/, "തിന");

                case "6":
                    return word.replace(/ത്ത്ആ/, "തിനാ");

                case "7":
                    return word.replace(/ത്ത്ഏ/, "തിനേ");

                case "8":
                    return word.replace(/ത്ത്എ/, "തിനെ");
            }
        }

        case "20":
        case "30":
        case "40":
        case "50":
        case "60":
        case "70":
        case "80": {
            switch (part1) {
                case "1":
                case "9":
                    return word.replace(/ത്ഒ/, "ത്തിയൊ");

                case "2":
                    return word.replace(/ത്ര/, "ത്തിര");

                case "3":
                    return word.replace(/ത്മ/, "ത്തിമ");

                case "4":
                    return word.replace(/ത്ന/, "ത്തിന");

                case "5":
                    return word.replace(/ത്അ/, "ത്തിയ");

                case "6":
                    return word.replace(/ത്ആ/, "ത്തിയാ");

                case "7":
                    return word.replace(/ത്ഏ/, "ത്തിയേ");

                case "8":
                    return word.replace(/ത്എ/, "ത്തിയെ");
            }
        }

        case "90": {
            switch (part1) {
                case "1":
                case "9":
                    return word.replace(/റ്ഒ/, "റ്റൊ");

                case "2":
                    return word.replace(/റ്ര/, "റ്റിര");

                case "3":
                    return word.replace(/റ്മ/, "റ്റിമ");

                case "4":
                    return word.replace(/റ്ന/, "റ്റിന");

                case "5":
                    return word.replace(/റ്അ/, "റ്റ");

                case "6":
                    return word.replace(/റ്ആ/, "റ്റിയാ");

                case "7":
                    return word.replace(/റ്ഏ/, "റ്റിയേ");

                case "8":
                    return word.replace(/റ്എ/, "റ്റിയെ");
            }
        }
    }
}


// ========== file: \src\lessThan1000.js ==========




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


// ========== file: \src\lessThan100000.js ==========




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


// ========== file: \src\lessThan10000000.js ==========






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


// ========== file: \src\toWordsOrdinal.js ==========


/**
 * Converts a number into ordinal words.
 * @example toWordsOrdinal(12) => 'twelfth'
 * @param {number|string} number
 * @returns {string}
 */
function toWordsOrdinal(number) {
    var words = toWords(number);
    return makeOrdinal(words);
}


// ========== file: \src\toWordsOrdinalMl.js ==========


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


// ========== file: \src\toWordsMl.js ==========


function toWordsMl(number,treatOneAsSpacialCase=true) {
    const formatted = `${parseInt(number, 10)}`
        .replace(/[^0-9]+/g, "")
        .replace(/^0+([1-9][0-9]*|0$)/, "$1");

    if (!formatted) return "";

    if(formatted==1 && treatOneAsSpacialCase){
        return "ഒരു"
    }

    let slice = formatted;
    let words = "";

    for (let i = 0; i < 10 && slice; i++) {
        const sliceFromEnd = slice.substr(-7);
        slice = slice.replace(new RegExp(`${sliceFromEnd}$`), "");
        if (sliceFromEnd != "0000000")
            words = `${i && sliceFromEnd == "1" ? "ഒരു" : lessThan10000000(sliceFromEnd)
                }${words ? " " : ""}${words}`;
        if (slice) words = `കോടി${words ? " " : ""}${words}`;
    }

    return words;
}



    var numberToWords = {
        toOrdinal: toOrdinal,
        toWords: toWords,
        toWordsOrdinal: toWordsOrdinal,
        toWordsMl: toWordsMl,
        toWordsOrdinalMl: toWordsOrdinalMl
    };

    if (typeof exports != 'undefined') {
        if (typeof module != 'undefined' && module.exports) {
            exports = module.exports = numberToWords;
        }
        exports.numberToWords = numberToWords;
    } else {
        root.numberToWords = numberToWords;
    }

}());