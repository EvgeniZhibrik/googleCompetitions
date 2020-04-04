const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T = -1;
let N;
let trace;

let count = 1;


rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!N && T !== 0) {
        [N, trace] = line.split(' ').map((val) => +val);
        return;
    }

    runSolution();
    N = null;
    trace = null;

    T--;

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});


function runSolution() {
    



    console.log(`Case #${count}:\n`);
    count++;
}
