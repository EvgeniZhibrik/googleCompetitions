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
    var N = +lines.shift();

    var path = lines.shift().split('');

    var answer = path.map(function(x) {  return x === 'S' ? 'E' : 'S'; }).join('');

    console.log('Case #' + (test + 1) + ': ' + answer);
    test++;
}
