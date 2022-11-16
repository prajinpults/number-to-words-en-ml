

# Number To Words
Contains some util methods for converting numbers into words, ordinal words and
ordinal numbers. updated with support for mlayalam and english with reference of 2 repositoris
[original repo] https://github.com/marlun78/number-to-words-en-ml 
[reference repo] https://github.com/HedCET/number-to-words-en-ml-in-malayalam


### Install
`npm install number-to-words-en-ml`


### API

#### `toOrdinal(number)`
Converts an integer into a string with an ordinal postfix.
If number is decimal, the decimals will be removed.
```js
var converter = require('number-to-words-en-ml');
converter.toOrdinal(21); // => “21st”
```

#### `toWords(number) | toWordsMl(number)`
Converts an integer into words.
If number is decimal, the decimals will be removed.
```js
var converter = require('number-to-words-en-ml');
converter.toWords(13); // => “thirteen”

// Decimal numbers:
converter.toWords(2.9); // => “two”

// Negative numbers:
converter.toWords(-3); // => “minus three”

// Large numbers:
converter.toWords(9007199254740992); // => “nine quadrillion, seven trillion, one hundred ninety-nine billion, two hundred fifty-four million, seven hundred forty thousand, nine hundred ninety-two”
```

#### `toWordsOrdinal(number) | toWordsOrdinalMl(number)`
Converts a number into ordinal words.
If number is decimal, the decimals will be removed.
```js
var converter = require('number-to-words-en-ml');
converter.toWordsOrdinal(21); // => “twenty first”
```

```js
var converter = require('number-to-words-en-ml');
converter.toWordsOrdinalMl(21); // => “ഇരുപത്തിയൊന്നാം”
```

### Contributions, Comments and Bugs
Contributions, comments and/or bug reports are much appreciated. Open a pull request or add comments on the
[issues page](https://github.com/marlun78/number-to-words-en-ml/issues). Thanks!

