const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let matrix = [];
let T = -1;
let N;
let count = 1;

rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!N) {
        N = +line;
        return;
    }

    matrix.push(line.split(' ').map((val) => +val));

    if (matrix.length === N && T) {
        runSolution();
        N = 0;
        matrix = [];
        T--;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    let trace = 0;
    let mapObj = {};
    let dupsCountI = 0;
    let lastDupsI = -1;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (i === j) {
                trace += matrix[i][j];
            }
            if (mapObj[matrix[i][j]] && i !== lastDupsI) {
                dupsCountI++;
                lastDupsI = i;
            }
            mapObj[matrix[i][j]] = true;
        }
        mapObj = {};
    }

    let lastDupsJ = -1;
    let dupsCountJ = 0;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (mapObj[matrix[j][i]] && i !== lastDupsJ) {
                dupsCountJ++;
                lastDupsJ = i;
            }
            mapObj[matrix[j][i]] = true;
        }
        mapObj = {};
    }

    console.log(`Case #${count}: ${trace} ${dupsCountI} ${dupsCountJ}\n`);
    count++;
}
