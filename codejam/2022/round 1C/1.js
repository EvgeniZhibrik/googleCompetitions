const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines1 = [];
let T = -1;
let test = 0;
let N = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!N) {
        N = +line;
        return;
    }

    lines1.push(line);

    if (lines1.length === 1 && T) {
        runSolution();
        T--;
        lines1 = [];
        N = 0;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});


function runSolution() {
    const lines = lines1[0].split(' ');
    const letters = {};
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if (!letters[lines[i][j]]) {
                letters[lines[i][j]] = {
                    left: j > 0 ? lines[i][j - 1] !== lines[i][j] ? lines[i][j - 1] : null : null,
                    right: j < lines[i].length - 1 ? lines[i][j + 1] !== lines[i][j] ? lines[i][j + 1] : null : null
                };
            } else {
                if (j > 0 && letters[lines[i][j]].left && lines[i][j - 1] !== lines[i][j] && letters[lines[i][j]].left !== lines[i][j - 1]) {
                    console.log('Case #' + (test + 1) + ': IMPOSSIBLE');
                    test++;
                    return;
                } else if (j > 0 && !letters[lines[i][j]].left && lines[i][j - 1] !== lines[i][j]) {
                    letters[lines[i][j]].left = lines[i][j - 1];
                }

                if (j < lines[i].length - 1 && letters[lines[i][j]].right && lines[i][j + 1] !== lines[i][j] && letters[lines[i][j]].right !== lines[i][j + 1]) {
                    console.log('Case #' + (test + 1) + ': IMPOSSIBLE');
                    test++;
                    return;
                } else if (j < lines[i].length - 1 && !letters[lines[i][j]].right && lines[i][j + 1] !== lines[i][j]) {
                    letters[lines[i][j]].right = lines[i][j + 1];
                }
            }
        }
    }

    const keys = Object.keys(letters);
    const sortedChains = [];
    while (keys.length) {
        let a = keys[0];
        while (letters[a].left) {
            a = letters[a].left;
            if (a === keys[0]) {
                console.log('Case #' + (test + 1) + ': IMPOSSIBLE');
                test++;
                return;
            }
        }

        sortedChains.push([]);
        while (a) {
            const ind = keys.indexOf(a);
            if (ind > -1) {
                keys.splice(ind, 1);
            } else {
                console.log('Case #' + (test + 1) + ': IMPOSSIBLE');
                test++;
                return;
            }
            sortedChains[sortedChains.length - 1].push(a);
            a = letters[a].right;
        }
    }



    const indexes = sortedChains.reduce((res, chain) => {
        for (let i = 0; i < chain.length; i++) {
            res[chain[i]] = res.count++;
        }
        return res;
    }, { count: 0});

    for (let i = 0; i < lines.length - 1; i++) {
        let min1 = indexes[lines[i][0]];
        let max1 = indexes[lines[i][lines[i].length - 1]];

        for (let j = i + 1; j < lines.length; j++) {
            let min2 = indexes[lines[j][0]];
            let max2 = indexes[lines[j][lines[j].length - 1]];

            if (min1 >= max2) {
                const temp = lines[i];
                lines[i] = lines[j];
                lines[j] = temp;
                min1 = min2;
                max1 = max2;
            } else if (max1 <= min2) {

            } else {
                console.log('Case #' + (test + 1) + ': IMPOSSIBLE');
                test++;
                return;
            }
        }
    }

    console.log('Case #' + (test + 1) + ': ' + lines.join(''));
    test++;
}
