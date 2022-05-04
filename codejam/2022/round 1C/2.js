const readline = require('readline');

const rl = readline.createInterface({
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

    if (lines.length === 2 && T) {
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
    const [N, K] = lines[0].split(' ').map((v) => +v);

    const arr = lines[1].split(' ').map((v) => BigInt(v));

    let dobSum = 0n;
    let oneSum = 0n;
    for (let i = 0; i < N - 1; i++) {
        oneSum += 2n * arr[i];
        for (let j = i + 1; j < N; j++) {
            dobSum += 2n * arr[i] * arr[j];
        }
    }

    oneSum += 2n * arr[N - 1];

    if (K === 1) {
        if (oneSum === 0n && dobSum === 0n) {
            console.log('Case #' + (test + 1) + ': ' + 0);
            test++;
            return;
        }

        if (oneSum === 0n && dobSum !== 0n) {
            console.log('Case #' + (test + 1) + ': IMPOSSIBLE');
            test++;
            return;
        }

        if (dobSum % oneSum !== 0n) {
            console.log('Case #' + (test + 1) + ': IMPOSSIBLE');
            test++;
            return;
        }

    }

    if (oneSum !== 0n && dobSum % oneSum === 0n) {
        console.log('Case #' + (test + 1) + ': ' + ( -dobSum / oneSum ));
        test++;
        return;
    }

    console.log('Case #' + (test + 1) + ': ' + ( 1n - (oneSum / 2n) ) + ' ' + ( - (dobSum / 2n) + (oneSum * oneSum / 4n) - ( oneSum / 2n) ));
    test++;
}
