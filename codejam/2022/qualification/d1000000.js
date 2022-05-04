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
    const N = +lines[0];
    const arr = lines[1].split(' ').map((v) => +v);

    arr.sort((a, b) => a - b);

    let cur = 1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= cur) {
            cur++;
        }
    }

    console.log('Case #' + (test + 1) + ': ' + (cur - 1));
    test++;
}
