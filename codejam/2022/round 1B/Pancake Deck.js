const readline = require('readline');

const rl = readline.createInterface({
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

    if (lines.length === 2 && T) {
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
    const N = +lines[0];
    const arr = lines[1].split(' ').map((v) => +v);

    let max = -Infinity;
    let start = 0;
    let finish = N;
    let sum = 0;

    while (start < finish) {
        if (arr[start] < arr[finish - 1]) {
            if (arr[start] >= max) {
                sum++;
                max = arr[start];
            }
            start++;
        } else {
            if (arr[finish - 1] >= max) {
                sum++;
                max = arr[finish - 1];
            }
            finish--;
        }
    }

    console.log('Case #' + (test + 1) + ': ' + sum);
    test++;
}
