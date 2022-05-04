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
    const [R, A, B] = lines[0].split(' ').map((v) => +v);

    let r = R;
    let sum = R * R;

    while (r > 0) {
        r *= A;
        sum += r * r;

        r = Math.floor(r / B);
        sum += r * r;
    }

    console.log('Case #' + (test + 1) + ': ' + (sum * Math.PI));
    test++;
}
