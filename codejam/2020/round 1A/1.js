var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1, N = 0;
let test = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!N) {
        N = +line;
        return;
    }

    lines.push(line);

    if (lines.length === N && T) {
        runSolution();
        T--;
        N = 0;
        lines = [];
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    const arr = lines.map((line) => line.split('*'));

    let maxW = '', maxL = 0;
    for (let i = 0; i < N; i++) {
        let word = arr[i][0];
        if (word.length > maxL) {
            if (word.slice(0, maxL) === maxW) {
                maxW = word;
                maxL = word.length;
                continue;
            }
            console.log('Case #' + (test + 1) + ': ' + '*');
            test++;
            return;
        }
        if (word === maxW.slice(0, word.length)) {
            continue;
        }
        console.log('Case #' + (test + 1) + ': ' + '*');
        test++;
        return;
    }

    let start = maxW;

    maxW = '';
    maxL = 0;
    for (let i = 0; i < N; i++) {
        let word = arr[i][arr[i].length - 1];
        if (word.length > maxL) {
            if (word.slice(-maxL) === maxW || maxL === 0) {
                maxW = word;
                maxL = word.length;
                continue;
            }
            console.log('Case #' + (test + 1) + ': ' + '*');
            test++;
            return;
        }
        if (word === maxW.slice(-word.length) || word.length === 0) {
            continue;
        }
        console.log('Case #' + (test + 1) + ': ' + '*');
        test++;
        return;
    }

    let finish = maxW;

    for (let i = 0; i < N; i++) {
        for (let j = 1; j < arr[i].length - 1; j++) {
            start += arr[i][j];
        }
    }

    start += finish;

    console.log('Case #' + (test + 1) + ': ' + start);
    test++;

}
