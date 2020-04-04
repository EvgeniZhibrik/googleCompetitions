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
    const arr = lines.map((line, index) => ({
        job: line.split(' ').map((v) => +v),
        index
    }));

    arr.sort((a, b) => a.job[0] - b.job[0]);

    let ans = [];
    let freeC = 0;
    let freeJ = 0;

    for (let i = 0; i < N; i++) {
        if (freeC <= arr[i].job[0]) {
            freeC = arr[i].job[1];
            ans[arr[i].index] = 'C';
            continue;
        }

        if (freeJ <= arr[i].job[0]) {
            freeJ = arr[i].job[1];
            ans[arr[i].index] = 'J';
            continue;
        }

        console.log('Case #' + (test + 1) + ': ' + 'IMPOSSIBLE');
        test++;
        return;
    }

    console.log('Case #' + (test + 1) + ': ' + ans.join(''));
    test++;

}
