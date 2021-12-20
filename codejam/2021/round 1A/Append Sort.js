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

    if (lines.length === 2 && T) {
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
    const N = +lines[0];
    const arr = lines[1].split(' ');

    let count = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].length > arr[i-1].length) {
            continue;
        }

        switch (compare(arr[i], arr[i-1].slice(0, arr[i].length))) {
            case 1:
                while (arr[i].length < arr[i-1].length) {
                    arr[i] += '0';
                    count++;
                }
                break;
            case -1:
                while (arr[i].length <= arr[i-1].length) {
                    arr[i] += '0';
                    count++;
                }
                break;
            case 0:
                const x = (BigInt(arr[i-1]) + 1n).toString();
                if (compare(arr[i], x.slice(0, arr[i].length)) === 0) {
                    count += x.length - arr[i].length;
                    arr[i] = x;
                } else {
                    while(arr[i].length <= arr[i-1].length) {
                        arr[i] += '0';
                        count++;
                    }
                }
                break;
            default:
                break;
        }
    }

    console.log('Case #' + (test + 1) + ': ' + count);
    test++;
}

function compare(a, b) {
    if (a.length > b.length) {
        return 1;
    }
    if (a.length < b.length) {
        return -1;
    }

    for (let i = 0; i < a.length; i++) {
        if (+b[i] > +a[i]) {
            return -1;
        }
        if (+b[i] < +a[i]) {
            return 1;
        }
    }

    return 0;
}
