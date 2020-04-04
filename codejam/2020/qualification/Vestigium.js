var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1, N = 0;
let test = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!N) {
        N = +line;
        return;
    }

    lines.push(line);

    if (lines.length === N && T) {
        runSolution();
        T--;
        N = 0;
        lines = [];
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    let k = 0, r = 0, c = 0;
    const arr = lines.map((line, i) => {
        const obj = {};
        let flag = false;

        return line.split(' ').map((v, j) => {
            v = +v;
            if (i === j) {
                k += v;
            }
            if (obj[v] && !flag) {
                r++;
                flag = true;
            }
            obj[v] = true;
            return v;
        });
    });

    for (let j = 0; j < N; j++) {
        const obj = {};
        for (let i = 0; i < N; i++) {
            if (obj[arr[i][j]]) {
                c++;
                break;
            }
            obj[arr[i][j]] = true;
        }
    }

    console.log('Case #' + (test + 1) + ': ' + k + ' ' + r + ' ' + c);
    test++;

}
