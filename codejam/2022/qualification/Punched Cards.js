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
    const [R, C] = lines[0].split(' ').map((v) => +v);
    console.log('Case #' + (test + 1) + ':');
    for (let i = 0; i < 2 * R + 1; i++) {
        let str = '';
        for (let j = 0; j < 2 * C + 1; j++) {
            if (i < 2 && j < 2) {
                str += '.';
                continue;
            }

            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    str += '+';
                } else {
                    str += '-'
                }
            } else {
                if (j % 2 === 0) {
                    str += '|';
                } else {
                    str += '.';
                }
            }
        }
        console.log(str);
    }

    test++;
}
