var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var lines = [];
var T = -1;
let N, K, P;
var test = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!N) {
        [N, K, P] = line.split(' ').map((v) => +v);
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
    const arr = lines.map((line) => {
        return line.split(' ').reduce((prev, cur, index) => {
            prev.push(prev[index] + (+cur));
            return prev;
        }, [0]);
    });

    const dyn = [arr[0]];

    for (let i = 1; i < N; i++) {
        dyn.push([]);
        let maxCount = Math.min((i + 1) * K, P);
        for (let j = 0; j <= maxCount; j++) {
            let curMax = 0;
            for (let k = Math.max(0, j - (i * K)); k <= j && k <= K; k++) {
                let testVal = arr[i][k] + dyn[i - 1][j - k];
                if (testVal > curMax) {
                    curMax = testVal;
                }
            }
            dyn[i][j] = curMax;
        }
    }

    console.log('Case #' + (test + 1) + ': ' + dyn[N - 1][P]);
    test++;
}
