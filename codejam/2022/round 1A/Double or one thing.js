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

    if (lines.length === 1 && T) {
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
    const line = lines[0];
    let result = '';

    let start = -1;
    for (let i = 0; i < line.length - 1; i ++) {
        if (line[i] < line[i + 1]) {
            if (start === -1) {
                start = i;
            }

            for (let j = start; j <= i; j++) {
                result += line[j];
                result += line[j];
            }
            start = -1;
        } else if (line[i] === line[i + 1]) {
            if (start === -1) {
                start = i;
            }
        } else {
            if (start === -1) {
                start = i;
            }

            for (let j = start; j <= i; j++) {
                result += line[j];
            }
            start = -1;
        }
    }

    if (start === -1) {
        start = line.length - 1;
    }

    for (let j = start; j < line.length; j++) {
        result += line[j];
    }

    console.log('Case #' + (test + 1) + ': ' + result);
    test++;
}
