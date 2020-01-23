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
    if (lines.length && T) {
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
    var line = lines.shift();

    var a = '';
    var b = '';
    for (var i = 0; i < line.length; i++) {
        if (line[i] !== '4') {
            a += line[i];
            if (b.length) {
                b += '0';
            }
        } else {
            a += '3';
            b += '1';
        }
    }

    var answer = a + ' ' + b;

    console.log('Case #' + (test + 1) + ': ' + answer);
    test++;
}
