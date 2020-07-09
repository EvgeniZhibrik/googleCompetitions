var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1;
let test = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    lines.push(line);

    if (lines.length === 10001 && T) {
        runSolution();
        T--;
        lines = [];
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});


function runSolution() {
    const U = lines.shift();

    const letters = {
        length: 0
    };
    const digits = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: []
    };

    let arr = lines.map((line) => line.split(' '));
    let nextArr = [];
    const finalMapping = [];

    for (let i = 0; i < arr.length; i++) {
        let [Q, N] = arr[i];
        if (letters.length < 10) {
            for (let j = 0; j < N.length; j++) {
                if (!letters[N[j]]) {
                    letters[N[j]] = j ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [1, 2, 3, 4, 5, 6, 7, 8, 9];
                    letters[N[j]].forEach((d) => {
                        if (!digits[d].includes(N[j])) {
                            digits[d].push(N[j]);
                        }
                    });
                    letters.length++;
                }
            }
        }
        let zeroInd = digits[0].indexOf(N[0]);
        if (zeroInd > -1) {
            digits[0].splice(zeroInd, 1);
            let letInd = letters[N[0]].indexOf(0);
            if (letInd > -1) {
                letters[N[0]].splice(letInd, 1);
            }
        }

        if (Q !== '-1' && Q.length === N.length) {
            nextArr.push([Q, N]);
        }
    }

    if (digits[0].length === 1) {
        removeLettersAndDigits(letters, digits, finalMapping);
    }

    arr = nextArr;
    nextArr = [];
    let flag = true;
    let answerReady = false;
    while (flag && !answerReady) {
        flag = false;
        for (let i = 0; i < arr.length; i++) {
            let [M, N] = arr[i];
            for (let k = 0; k < M.length; k++) {
                if (letters[N[k]].length > 1) {
                    let oldLength = letters[N[k]].length;
                    letters[N[k]] = letters[N[k]].filter((v) => v <= +M[k]);
                    if (oldLength > letters[N[k]].length) {
                        flag = true;
                        removeLettersAndDigits(letters, digits, finalMapping);
                        answerReady = ansReady(letters);
                        if (answerReady) {
                            break;
                        }
                    }
                }
                if (!finalMapping[M[k]] && !finalMapping.includes(N[k])) {
                    nextArr.push([M, N]);
                    break;
                } else if (finalMapping[M[k]] !== N[k]) {
                    break;
                }
            }
            if (answerReady) {
                break;
            }
        }
        arr = nextArr;
        nextArr = [];
    }

    let ans = '';
    for (let i = 0; i < 10; i++) {
        if (finalMapping[i]) {
            ans += finalMapping[i];
            continue;
        }
        for (let j = 0; j < digits[i].length; j++) {
            let temp = digits[i][j];
            let flag = true;
            for (let c = i + 1; c < 10; c++) {
                if (!digits[c].filter((l) => l !== temp).length) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                ans += temp;
                for (let c = i + 1; c < 10; c++) {
                    digits[c] = digits[c].filter((l) => l !== temp);
                }
            }
        }
    }

    console.log('Case #' + (test + 1) + ': ' + ans);
    test++;
}

function removeLettersAndDigits(letters, digits, finalMapping) {
    let flag = false;
    Object.keys(letters).forEach((key) => {
        if (key === 'length') {
            return;
        }
        let oldSize = letters[key].length;
        letters[key] = letters[key].filter((d) => digits[d].includes(key));
        if (letters[key].length === 1 && !finalMapping[letters[key][0]]) {
            finalMapping[letters[key][0]] = key;
            digits[letters[key][0]] = [key];
            flag = true;
        }
        if (oldSize > letters[key].length) {
            flag = true;
        }
    });
    Object.keys(digits).forEach((d) => {
        d = +d;
        let oldSize = digits[d].length;
        digits[d] = digits[d].filter((l) => letters[l].includes(d));
        if (digits[d].length === 1 && !finalMapping[d]) {
            finalMapping[d] = digits[d][0];
            letters[digits[d][0]] = [d];
            flag = true;
        }
        if (oldSize > digits[d].length) {
            flag = true;
        }
    });
    if (flag) {
        removeLettersAndDigits(letters, digits, finalMapping);
    }
}

function ansReady(letters) {
    let flag = true;
    Object.keys(letters).forEach((key) => {
        if (key === 'length') {
            return;
        }
        if (letters[key].length > 1) {
            flag = false;
        }
    });
    return flag;
}
