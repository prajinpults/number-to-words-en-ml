'use strict';

var lessThan10000000 = require('./lessThan10000000');

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

module.exports = toWordsMl;
