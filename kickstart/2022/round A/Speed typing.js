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
    const [I, P] = lines;

    let j = 0;
    for (let i = 0; i < I.length; i++) {
        if (j >= P.length) {
            console.log('Case #' + (test + 1) + ': IMPOSSIBLE');
            test++;
            return;
        }

        if (I[i] === P[j]) {
            j++;
            continue;
        }

        i--;
        j++;
    }

    console.log('Case #' + (test + 1) + ': ' + (P.length - I.length));
    test++;
}
