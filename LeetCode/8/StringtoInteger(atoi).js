/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    s = s.replace(/^\s*/g, '');
    let sign = 1;
    if (s[0] === '-') {
        sign = -1;
        s = s.slice(1);
    } else if (s[0] === '+') {
        s = s.slice(1);
    }

    let i = 0;
    let res = 0;
    while (s[i] && s[i] >= '0' && s[i] <= '9') {
        res = res * 10 + (+s[i]);
        i++;
        if(res > MAX_INT) {
            break;
        }
    }

    res *= sign;

    if (res > MAX_INT) {
        return MAX_INT;
    } else if (res < MIN_INT) {
        return MIN_INT;
    }

    return res;
};

const MAX_INT = Math.pow(2, 31) - 1;
const MIN_INT = -Math.pow(2, 31);
console.log(myAtoi('   +1239999999999999999'));