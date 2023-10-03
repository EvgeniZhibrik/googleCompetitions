/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    if (!digits.length) {
        return [];
    }

    const map = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    };

    const res = [['']];
    for (let i = 0; i < digits.length; i++) {
        const str = map[digits[i]];
        res[i + 1] = [];
        for (let j = 0; j < res[i].length; j++) {
            let prefix = res[i][j];
            for (let k = 0; k < str.length; k++) {
                res[i + 1].push(prefix + str[k]);
            }
        }
    }

    return res[res.length - 1];
};

console.log(letterCombinations("23"));
console.log(letterCombinations("2"));
