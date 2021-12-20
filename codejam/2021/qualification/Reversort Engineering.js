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
    const [N, C] = lines[0].split(' ').map((v) => +v);

    let cost = 0;
    let arr = [N];

    if (C < N - 1 || C > (N + 2)*(N - 1) / 2) {
        console.log('Case #' + (test + 1) + ': IMPOSSIBLE');
        test++;
        return;
    }

    for (let k = N - 1; k > 0; k--) {
        const newPos = Math.min(C - cost - k, N - k);
        cost += newPos + 1;
        arr = addNumber(k, arr, newPos);
    }

    console.log('Case #' + (test + 1) + ': ' + arr.join(' '));
    test++;
}

function addNumber(num, arr, position) {
    const newArr = [];

    for (let i = position - 1; i >= 0; i--) {
        newArr.push(arr[i]);
    }
    newArr.push(num);
    for (let i = position; i < arr.length; i++) {
        newArr.push(arr[i]);
    }

    return newArr;
}
