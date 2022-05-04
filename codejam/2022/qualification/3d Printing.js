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

    if (lines.length === 3 && T) {
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
    const printers = lines.map((line) => line.split(' ').map((v) => +v));

    let sumMin = 0;
    const minColors = [];
    for (let i = 0; i < 4; i++) {
        let minCol = Infinity;
        for (let j = 0; j < 3; j++) {
            if (minCol > printers[j][i]) {
                minCol = printers[j][i];
            }
        }
        if (sumMin + minCol > 1000000) {
            minColors.push(1000000 - sumMin);

            while (minColors.length < 4) {
                minColors.push(0);
            }

            console.log('Case #' + (test + 1) + ': ' + minColors.join(' '));
            test++;
            return;
        } else {
            minColors.push(minCol);
            sumMin += minCol;
        }
    }

    if (sumMin < 1000000) {
        console.log('Case #' + (test + 1) + ': IMPOSSIBLE');
        test++;
        return;
    }

    console.log('Case #' + (test + 1) + ': ' + minColors.join(' '));
    test++;
}
