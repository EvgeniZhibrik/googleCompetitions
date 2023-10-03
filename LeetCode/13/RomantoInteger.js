/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    switch (s[0]) {
        case 'M':
            return 1000 + romanToInt(s.slice(1));
        case 'D':
            return 500 + romanToInt(s.slice(1));
        case 'C':
            if (s[1] === 'M') {
                return 900 + romanToInt(s.slice(2));
            } else if (s[1] === 'D') {
                return 400 + romanToInt(s.slice(2));
            } else {
                return 100 + romanToInt(s.slice(1));
            }
        case 'L':
            return 50 + romanToInt(s.slice(1));
        case 'X':
            if (s[1] === 'C') {
                return 90 + romanToInt(s.slice(2));
            } else if (s[1] === 'L') {
                return 40 + romanToInt(s.slice(2));
            } else {
                return 10 + romanToInt(s.slice(1));
            }
        case 'V':
            return 5 + romanToInt(s.slice(1));
        case 'I':
            if (s[1] === 'X') {
                return 9 + romanToInt(s.slice(2));
            } else if (s[1] === 'V') {
                return 4 + romanToInt(s.slice(2));
            } else {
                return 1 + romanToInt(s.slice(1));
            }
        default:
            return 0;
    }
};

console.log(romanToInt('III'));
console.log(romanToInt('LVIII'));
console.log(romanToInt('MCMXCIV'));