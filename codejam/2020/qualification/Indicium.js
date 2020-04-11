const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T = -1;
let N;
let trace;

let count = 1;


rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!N && T !== 0) {
        [N, trace] = line.split(' ').map((val) => +val);
    }

    runSolution();
    N = null;
    trace = null;

    T--;

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});


function runSolution() {
    let matrix = [];
    for (let i = 0; i < N; i++) {
        matrix[i] = [];
    }

    let flag = findSolution(0, matrix);

    if (!flag) {
        console.log(`Case #${count}: IMPOSSIBLE`);
        count++;
    }
}

function findSolution(level, matrix) {
    if (level === N * N) {
        console.log(`Case #${count}: POSSIBLE`);
        for (let i = 0; i < N; i++) {
            console.log(matrix[i].join(' '));
        }
        count++;
        return true;
    }

    let j = level % N;
    let i = (level - j) / N;
    let mainFlag = false;
    let curTr = 0;
    if (i === j) {
        for (let i1 = 0; i1 < i; i1++) {
            curTr += matrix[i1][i1];
        }
    }

    for (let n = 1; n <= N; n++) {
        let flag = true;
        for (let i1 = 0; i1 < i; i1++) {
            if (matrix[i1][j] === n) {
                flag = false;
                break;
            }
        }
        if (!flag) {
            continue;
        }
        for (let j1 = 0; j1 < j; j1++) {
            if (matrix[i][j1] === n) {
                flag = false;
                break;
            }
        }
        if (!flag) {
            continue;
        }

        if (i === j) {
            let minTr = curTr;
            let maxTr = curTr;

            minTr += n;
            maxTr += n;
            minTr += N - i - 1;
            maxTr += (N - i - 1) * N;
            if (maxTr < trace || minTr > trace) {
                continue;
            }
        }

        matrix[i][j] = n;
        mainFlag = mainFlag || findSolution(level + 1, matrix);
        if (mainFlag) {
            return true;
        }
    }

    return false;
}
