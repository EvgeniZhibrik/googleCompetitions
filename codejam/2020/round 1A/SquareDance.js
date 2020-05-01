var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1, R = 0, C = 0;
let test = 0;
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
        R = 0;
        lines = [];
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    const arr = lines.map((line) => line.split(' ').map((v) => +v));

    const field = [];
    let sum = 0;
    let flag = false;

    for (let i = 0; i < R; i++) {
        field[i] = [];
        for (let j = 0; j < C; j++) {
            field[i][j] = {
                value: arr[i][j],
                left: j > 0 ? arr[i][j - 1] : 0,
                right: j < C - 1 ? arr[i][j + 1] : 0,
                top: i > 0 ? arr[i - 1][j] : 0,
                bottom: i < R - 1 ? arr[i + 1][j] : 0
            };
            field[i][j].count = 0;
            if (j > 0) {
                field[i][j].count++;
            }
            if (j < C - 1) {
                field[i][j].count++;
            }
            if (i > 0) {
                field[i][j].count++;
            }
            if (i < R - 1) {
                field[i][j].count++;
            }

            field[i][j].average = field[i][j].count ? (field[i][j].top + field[i][j].bottom + field[i][j].left + field[i][j].right) / field[i][j].count : 0;

            field[i][j].mark = (field[i][j].average > field[i][j].value) ? 1 : 0;
            if (field[i][j].mark) {
                flag = true;
            }
            sum += field[i][j].value;
        }
    }

    let round = 1;
    while (flag) {
        flag = false;
        round++;
        let roundSum = 0;

        for (let i = 0; i < R; i++) {
            for (let j = 0; j < C; j++) {
                if (!field[i][j].mark) {
                    roundSum += field[i][j].value;
                }

                if (field[i][j].mark === round - 1) {
                    for (let r = i - 1; r >= 0; r--) {
                        if (!field[r][j].mark) {
                            field[r][j].bottom = field[i][j].bottom;
                            break;
                        }
                    }
                    for (let r = i + 1; r < R; r++) {
                        if (!field[r][j].mark) {
                            field[r][j].top = field[i][j].top;
                            break;
                        }
                    }
                    for (let c = j - 1; c >= 0; c--) {
                        if (!field[i][c].mark) {
                            field[i][c].right = field[i][j].right;
                            break;
                        }
                    }
                    for (let c = j + 1; c < C; c++) {
                        if (!field[i][c].mark) {
                            field[i][c].left = field[i][j].left;
                            break;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < R; i++) {
            for (let j = 0; j < C; j++) {
                if (!field[i][j].mark) {

                    field[i][j].count = 0;
                    let av = 0;

                    if (field[i][j].top) {
                        field[i][j].count++;
                        av += field[i][j].top;
                    }
                    if (field[i][j].bottom) {
                        field[i][j].count++;
                        av += field[i][j].bottom;
                    }
                    if (field[i][j].left) {
                        field[i][j].count++;
                        av += field[i][j].left;
                    }
                    if (field[i][j].right) {
                        field[i][j].count++;
                        av += field[i][j].right;
                    }

                    field[i][j].average = field[i][j].count ? av / field[i][j].count : 0;
                    if (field[i][j].average > field[i][j].value) {
                        field[i][j].mark = round;
                        flag = true;
                    }
                }
            }
        }

        sum += roundSum;
    }

    console.log('Case #' + (test + 1) + ': ' + sum);
    test++;

}
