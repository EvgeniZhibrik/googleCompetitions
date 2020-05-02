var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var lines = [];
var T = -1;
var test = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
    } else {
        lines.push(line);
    }
    if (lines.length === 2 && T) {
        runSolution();
        T--;
    }
    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    let line = lines.shift().split(' ');
    const N = +line[0];
    const D = +line[1];

    const arr = lines.shift().split(' ').map((val) => +val );

    let index = N - 1, day = D;

    while (index > -1) {
        if (day % arr[index] === 0) {
            index--;
            continue;
        }
        day -= day % arr[index];
    }

    console.log('Case #' + (test + 1) + ': ' + day);
    test++;
}
