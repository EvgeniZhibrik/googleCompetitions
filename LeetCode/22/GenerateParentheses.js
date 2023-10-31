/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis1 = function(n) {
    const res = [];

    for (let i = (2**n - 1) * (2**n); i >= 2 * (4**n - 1) / 3; i-=2 ) {
        const s = i.toString(2);
        let counter = 0;

        for (let j = 0; j < s.length; j++) {
            if (s[j] === '1') {
                counter++;
            } else {
                counter--;
            }

            if (counter < 0 || counter > s.length - j - 1) {
                break;
            }
        }

        if (counter === 0) {
            res.push(s.replace(/1/g, '(').replace(/0/g, ')'));
        }
    }

    return res;

};

const a = Date.now();
for (let c = 1; c < 9; c ++) {
    console.log(generateParenthesis1(c));
}
const b = Date.now();
console.log(b - a);

const oldResults = [[], ['()']];
var generateParenthesis = function(n) {
    if (n === 1) {
        return ['()'];
    }

    if (oldResults[n]) {
        return oldResults[n];
    }

    const res = generateCoolParenthesis(n);

    for (let i = 1; i < n; i++) {
        let arr1 = generateCoolParenthesis(i);
        let arr2 = generateParenthesis(n - i);
        arr1.forEach((start) => {
            arr2.forEach((finish) => {
                res.push(start + finish);
            });
        });
    }

    oldResults[n] = res;
    return res;
};

var generateCoolParenthesis = function (n) {
    if (n === 1) {
        return ['()'];
    }

    return generateParenthesis(n - 1).map((val) => `(${val})`);
}


const c = Date.now();
for (let c = 1; c < 9; c ++) {
    console.log(generateParenthesis(c));
}
const d = Date.now();
console.log(d - c);