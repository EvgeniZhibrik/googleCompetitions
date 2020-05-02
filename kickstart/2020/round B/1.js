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
    let line = lines.shift();
    const N = +line;

    const arr = lines.shift().split(' ').map((val) => +val );

   let count = 0;

   for (let i = 0; i < N - 1; i++) {
       if (arr[i] > arr[i-1] && arr[i] > arr[i+1]) {
           count++;
       }
   }

    console.log('Case #' + (test + 1) + ': ' + count);
    test++;
}
