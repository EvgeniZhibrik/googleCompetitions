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
    let p = 0;

    const [N, K] = lines[0].split(' ').map((v) => +v);

    const arr = lines[1].split(' ').map((v) => +v);
    arr.sort((a, b) => a - b);
    arr.unshift(-Infinity);
    arr.push(Infinity);

    let max = -Infinity;
    let submax = -Infinity;
    let alternative = -Infinity;
    for (let i = 0; i < arr.length - 1; i++) {
        let test;
        if (arr[i] === -Infinity) {
            test = arr[i + 1] - 1;
        } else if (arr[i + 1] === Infinity) {
            test = K - arr[i];
        } else {
            test = Math.floor((arr[i] + arr[i + 1]) / 2) - arr[i];
            if (alternative < arr[i + 1] - arr[i] - 1) {
                alternative = arr[i + 1] - arr[i] - 1;
            }
        }

        if (test > max) {
            submax = max;
            max = test;
        } else if (test > submax) {
            submax = test;
        }
    }

    if (max === -Infinity) {
        max = 0;
    }
    if (submax === -Infinity) {
        submax = 0;
    }
    p = Math.max(max + submax, alternative) / K;
    console.log('Case #' + (test + 1) + ': ' + p);
    test++;
}
