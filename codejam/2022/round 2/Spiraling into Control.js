const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1;
let test = 0;
const arr = [{ 0: [] }, { 0: [] }];
const count = 39 * 39;
for (let i = 2; i <= count; i++) {
    let n = Math.ceil(Math.sqrt(i));
    if (n % 2 === 0) {
        n++;
    }

    arr[i] = {};
    if (i - 1 === (n - 2) * (n - 2)) {
        Object.keys(arr[i - 1]).forEach((key) => {
            arr[i][+key + 1] = [].concat(arr[i - 1][key].map(([x, y]) => [x + (4 * n) - 4, y + (4 * n) - 4]));
        });
    } else {
        Object.keys(arr[i - 1]).forEach((key) => {
            arr[i][+key + 1] = [].concat(arr[i - 1][key]);
        });
    }

    if (i > (n * n) - n + 1) {
        Object.keys(arr[i - (4 * n) + 5]).forEach((key) => {
            arr[i][+key + 1] = [[(n * n) + 1 - i, (n * n) + 1 - (i - (4 * n) + 5)]].concat(arr[i - (4 * n) + 5][key].map(([x, y]) => [x + (4 * n) - 4, y + (4 * n) - 4]));
        });
    } else if (i < (n * n) - n + 1 && i > (n * n) - (2 * n) + 2) {
        Object.keys(arr[i - (4 * n) + 7]).forEach((key) => {
            arr[i][+key + 1] = [[(n * n) + 1 - i, (n * n) + 1 - (i - (4 * n) + 7)]].concat(arr[i - (4 * n) + 7][key].map(([x, y]) => [x + (4 * n) - 4, y + (4 * n) - 4]));
        });
    } else if (i < (n * n) - (2 * n) + 2 && i > (n * n) - (3 * n) + 3) {
        Object.keys(arr[i - (4 * n) + 9]).forEach((key) => {
            arr[i][+key + 1] = [[(n * n) + 1 - i, (n * n) + 1 - (i - (4 * n) + 9)]].concat(arr[i - (4 * n) + 9][key].map(([x, y]) => [x + (4 * n) - 4, y + (4 * n) - 4]));
        });
    } else if (i < (n * n) - (3 * n) + 3 && i > (n * n) - (4 * n) + 5) {
        Object.keys(arr[i - (4 * n) + 11]).forEach((key) => {
            arr[i][+key + 1] = [[(n * n) + 1 - i, (n * n) + 1 - (i - (4 * n) + 11)]].concat(arr[i - (4 * n) + 11][key].map(([x, y]) => [x + (4 * n) - 4, y + (4 * n) - 4]));
        });
    }
}

rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    lines.push(line);

    if (lines.length === 1 && T) {
        runSolution();
        lines = [];
        T--;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    const [N, K] = lines[0].split(' ').map((v) => +v);

    process.stdout.write('Case #' + (test + 1) + ':');

    if (!arr[N * N][K]) {
        process.stdout.write(' IMPOSSIBLE\n');
    } else {
        process.stdout.write(' ' + arr[N * N][K].length + '\n');

        arr[N * N][K].forEach((x) => {
            process.stdout.write(x[0] + ' ' + x[1] + '\n');
        });
    }

    test++;
}
