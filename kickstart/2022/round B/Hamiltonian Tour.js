const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1;
let test = 0;
let R = 0;
let C = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!R) {
        [R, C] = line.split(' ').map((v) => +v);
        return;
    }

    lines.push(line);

    if (lines.length === R && T) {
        runSolution();
        T--;
        lines = [];
        R = 0;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    const unmarked = {};

    for (let i = 0; i < 2 * R; i++) {
        for (let j = 0; j < 2 * C; j++) {
            const block = getBlock(lines, i, j);
            if (block === '*') {
                unmarked[`${i},${j}`] = true;
            }
        }
    }

    let flag = true;
    let i = 0;
    let j = 0;
    let str = '';
    while (flag) {
        flag = false;
        if (unmarked[`${i},${j + 1}`]) {
            str += 'E';
            delete unmarked[`${i},${j + 1}`];
            flag = true;
            j++;
            continue;
        }

        if (unmarked[`${i + 1},${j}`]) {
            str += 'S';
            delete unmarked[`${i + 1},${j}`];
            flag = true;
            i++;
            continue;
        }

        if (unmarked[`${i},${j - 1}`]) {
            str += 'W';
            delete unmarked[`${i},${j - 1}`];
            flag = true;
            j--;
            continue;
        }

        if (unmarked[`${i - 1},${j}`]) {
            str += 'N';
            delete unmarked[`${i - 1},${j}`];
            flag = true;
            i--;
            continue;
        }
    }

    if (i === 0 && j === 0) {
        console.log('Case #' + (test + 1) + ': ' + str);
        test++;
        return;
    }

    console.log('Case #' + (test + 1) + ': IMPOSSIBLE');
    test++;

}

function getBlock(lines, i, j) {
    return lines[Math.floor(i / 2)][Math.floor(j / 2)];
}
