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
    const K = +line[1];

    let max = 0;
    const arr = lines.shift().split(' ').map((val, index, ar) => {
        val = +val;
        if (index > 0 && val - (+ar[index - 1]) > max) {
            max = val - (+ar[index - 1]);
        }
        return val;
    });

    let min = 0;

    let testVal = Math.floor((max + min) / 2);

    while (max - min > 1) {
        let sum = 0;
        let flag = true;
        for (let i = 1; i < arr.length; i++) {
            sum += Math.ceil((arr[i] - arr[i - 1]) / testVal) - 1;
            if (sum > K) {
                flag = false;
                break;
            }
        }

        if (flag) {
            max = testVal;
        } else {
            min = testVal;
        }
        testVal = Math.floor((max + min) / 2);
    }

    console.log('Case #' + (test + 1) + ': ' + max);
    test++;
}
