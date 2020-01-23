var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var pizza = [];
var R, C, L, H;
var input = 0;
rl.on('line', function (line) {
    if (input === 0) {
        R = +line.split(' ')[0];
        C = +line.split(' ')[1];
        L = +line.split(' ')[2];
        H = +line.split(' ')[3];
        input++;
    } else {
        pizza.push(line.split('').map(function(val) {
            return val === 'T' ? 1 : 0;
        }));
    }

    if (pizza.length === R) {
        runSolution();
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function getMasksArray(l, h) {
    var arr = [];
    for (var cells = 2 * l; cells <= h; cells++) {
        for (var r = 1; r <= cells; r++) {
            if (cells % r === 0) {
                arr.push([r, cells / r]);
            }
        }
    }
    return arr.reverse();
}

function getMaxSlices(p, r, c, l) {
    var sum = 0;
    for (var i = 0; i < r; i++) {
        for (var j = 0; j < c; j++) {
            sum += p[i][j];
        }
    }
    sum = Math.min(sum, r*c - sum);
    return Math.floor(sum / l);
}

function maxSlicesLeft(p, t, r, c, l) {
    var sum = 0;
    var cells = 0;
    for (var i = 0; i < r; i++) {
        for (var j = 0; j < c; j++) {
            if (!t[i][j]) {
                sum += p[i][j];
                cells++;
            }
        }
    }
    sum = Math.min(sum, cells - sum);
    return Math.floor(sum / l);
}

var totalMax = 0;
var totalAns = [];

function runSolution() {
    var masks = getMasksArray(L, H);
    var maxSlices = getMaxSlices(pizza, R, C, L);
    var table = [];
    for (var i = 0; i < R; i++) {
        table[i] = [];
        for (var j = 0; j < C; j++) {
            table[i][j] = false;
        }
    }

    getMax(pizza, table, R, C, L, masks, maxSlices, 0, 0, [], 0);
    console.log(totalMax);
    console.log(totalAns);
}

function getMax(pizza, table, R, C, l, masks, maxSlices, level, currentArea, answer, leftEmpty) {
    if (currentArea > totalMax) {
        totalMax = currentArea;
        totalAns = [];
        answer.forEach(function (val) {
            totalAns.push(val);
        });
    }

    if (R * C - level - 1 + currentArea <= totalMax) {
        return;
    }

    if (R * C - leftEmpty <= totalMax) {
        return;
    }

    if (answer.length === maxSlices) {
        return;
    }

    var r = Math.floor(level / C);
    var c = level - (r * C);

    if (table[r][c]) {
        getMax(pizza, table, R, C, l, masks, maxSlices, level + 1, currentArea, answer, leftEmpty);
        return;
    }

    masks.forEach(function(mask) {
        if (r + mask[0] > R || c + mask[1] > C) {
            return;
        }
        var sum = 0;
        for (var i = 0; i < mask[0]; i++) {
            for (var j = 0; j < mask[1]; j++) {
                if (table[r + i][c + j]) {
                    return;
                }
                sum += pizza[r + i][c + j];
            }
        }
        if (sum < l || sum > mask[0] * mask[1] - l) {
            return;
        }

        for (var i = 0; i < mask[0]; i++) {
            for (var j = 0; j < mask[1]; j++) {
                table[r + i][c + j] = true;
            }
        }
        answer.push([r, c, r + mask[0] - 1, c + mask[1] - 1]);
        getMax(pizza, table, R, C, l, masks, answer.length + maxSlicesLeft(pizza, table, R, C, l), level + 1, currentArea + mask[0] * mask[1], answer, leftEmpty);
        answer.pop();
        for (var i = 0; i < mask[0]; i++) {
            for (var j = 0; j < mask[1]; j++) {
                table[r + i][c + j] = false;
            }
        }
    });

    getMax(pizza, table, R, C, l, masks, maxSlices, level + 1, currentArea, answer, leftEmpty + 1);
}
