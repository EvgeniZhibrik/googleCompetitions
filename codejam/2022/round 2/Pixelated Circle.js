const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1;
let test = 0;

rl.on('line', function (line) {
    console.time();
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
        console.timeEnd();
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

const arr = [[0, 0]];

function add(R) {
    for (let r = arr.length; r <= R; r++) {
        let count = arr[r - 1][0] + arr[r - 1][1];
        let nextCount = 0;
        let startA = Math.ceil((1 + Math.sqrt(8 * r * r - 1)) / 4);
        let finishA = Math.floor((Math.sqrt(8 * (r + 1) * (r + 1) - 1) - 1) / 4);

        for (let a = startA; a <= finishA; a++) {
            if (Math.round(Math.sqrt(a * a + a * a)) <= r) {
                count += 4;
            } else {
                nextCount += 4;
            }
            //process.stdout.write(`${r}: (${a}, ${a})` + '\n');
        }

        for (let a = startA; a <= r; a++) {
            let start = Math.ceil(Math.sqrt(((4 * r * r) - (2 * a - 1) * (2 * a - 1)) / 4));
            let finish = Math.floor(Math.sqrt(((4 * (r + 1) * (r + 1)) - ((2 * a + 1) * (2 * a + 1))) / 4));

            for (let b = start; b <= finish && b < a; b++) {
                if (Math.round(Math.sqrt(a * a + b * b)) <= r) {
                    count += 8;
                } else {
                    nextCount += 8;
                    //process.stdout.write(`${r}: (${a}, ${b})` + '\n');
                }
                //process.stdout.write(`${r}: (${a}, ${b})` + '\n');
            }
        }

        arr[r] = [count, nextCount];
    }
}

function runSolution() {
    const R = +lines[0];

    if (R >= arr.length) {
        add(R);
    }

    process.stdout.write('Case #' + (test + 1) + ': ' + arr[R][0] + '\n');

    test++;
}
