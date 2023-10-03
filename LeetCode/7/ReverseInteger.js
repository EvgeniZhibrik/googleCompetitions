/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let sign = 1;
    if (x < 0) {
        sign = -1;
        x = -x;
    }
    let res = 0;

    while (x) {
        const dig = x % 10;
        res = res * 10 + dig;
        x = Math.floor(x / 10);
    }

    res *= sign;

    if (res > MAX_INT || res < MIN_INT) {
        return 0;
    }

    return res;
};

const MAX_INT = Math.pow(2, 31) - 1;
const MIN_INT = -Math.pow(2, 31);