/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let max = -Infinity;

    for (let i = 0; i + max < s.length; i++) {
        const test = count(s, i);
        if (test > max) {
            max = test;
        }
    }

    return max;
};

function count(s, start) {
    const obj = new Set();
    for (let i = start; i < s.length; i++) {
        if(obj.has(s[i])) {
            return i - start;
        }

        obj.add(s[i]);
    }

    return s.length - start;
}