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
    const [A] = lines[0].split(' ').map((v) => +v);

    const smallFactors = [];
    let sum = 0;

    for (let i = 1; i <= Math.sqrt(A); i++) {
        if (A % i === 0) {
            smallFactors.push(i);
            sum += isPol(i);
        }
    }

    if (Math.round(Math.sqrt(A)) === Math.sqrt(A)) {
        smallFactors.pop();
    }

    smallFactors.forEach((sF) => {
        sum += isPol(A / sF);
    });

    console.log('Case #' + (test + 1) + ': ' + sum);
    test++;
}

function isPol(n) {
    const m = +`${n}`.split('').reverse().join('');
    return m === n ? 1 : 0;
}
