/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0) {
        return false;
    }

    if (x >= 0 && x < 10) {
        return true;
    }

    if (x % 10 === 0) {
        return false;
    }

    let y = 0;
    while (y < x) {
        let z = x % 10;
        x = Math.floor(x / 10);

        if (y && y === x) {
            return true;
        }

        y = y * 10 + z;
    }

    return y === x;
};

console.log(isPalindrome(121));
console.log(isPalindrome(-121));
console.log(isPalindrome(10));