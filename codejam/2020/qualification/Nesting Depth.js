var readline = require('readline');

var rl = readline.createInterface({
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
    const arr = lines[0].split('').map((v) => +v);

    let str = '';
    for (let i = 0; i < arr.length; i++) {
        let count;
        if (i === 0) {
            count = arr[i];
            while (count) {
                str += '(';
                count--;
            }
        } else {
            count = arr[i] - arr[i - 1];
            if (count > 0) {
                while (count) {
                    str += '(';
                    count--;
                }
            } else {
                while (count) {
                    str += ')';
                    count++;
                }
            }
        }
        str += arr[i];

        if (i === arr.length - 1) {
            count = arr[i];
            while(count) {
                str += ')';
                count--;
            }
        }
    }

    console.log('Case #' + (test + 1) + ': ' + str);
    test++;

}
