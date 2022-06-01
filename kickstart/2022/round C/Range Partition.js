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

    if (lines.length === 1 && T) {
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
    const [N, X, Y] = lines[0].split(' ').map((v) => +v);

    if ((N * (N + 1)) % (2 * (X + Y)) === 0 || (X % 2 === 0 && (N * (N + 1)) % (X + Y) === 0)) {
        let s = N * (N + 1) / (X + Y) * X / 2;

        const arr = [];

        let p = 1;
        while (2 * p <= N) {
            p *= 2;
        }

        let coef = 1;
        let t = N;
        while (s > 2 * p - 1) {
            if (t === p / coef) {
                coef *= 2;
                t--;
                continue;
            }

            arr.push(t);
            s -= t;
            t--;
        }

        p = 1;

        while (s) {
            if (s % 2 === 0) {
                s /= 2;
                p *= 2;
            } else {
                arr.push(p);
                s = (s - 1) / 2;
                p *= 2;
            }
        }

        console.log('Case #' + (test + 1) + ': POSSIBLE');
        console.log(arr.length);
        console.log(arr.join(' '));
        test++;
        return;
    }

        console.log('Case #' + (test + 1) + ': IMPOSSIBLE');
        test++;
}
