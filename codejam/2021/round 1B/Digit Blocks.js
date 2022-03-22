var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T = -1, B = 0, N = 0, P = 0;
let state = 0;
let count = 0n;
rl.on('line', function (line) {
    if (state === 0) {
        [T, N, B, P] = line.split(' ').map((v, index) => index === 3 ? BigInt(v) : +v);
        state = 1;
        count = N * B;
        return;
    }

    if (line === '-1') {
        rl.close();
        return;
    }

    if (state === 1) {
        initModel();
        count = N * B;
        state = 2;
    }

    makeMove(line);
    count--;

    if (count === 0) {
        state = 1;
        T--;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

const Model = {
};
function initModel() {
    Model.arr = (new Array(N)).fill(0).map((val, ind) => ([]));
}

function makeMove(line) {
    let digit = +line;

    for (let i = 0; i < Model.arr.length; i++) {
        const tower = Model.arr[i];
        if (tower.length === B) {
            continue;
        }

        if (tower.length === B - 1 && digit === 9) {
            tower.push(digit);
            console.log(i + 1);
            return;
        }

        if (tower.length === B - 1 && digit < 9) {
            continue;
        }

        if (tower.length === B - 2 && digit >= 8) {
            tower.push(digit);
            console.log(i + 1);
            return;
        }

        if (tower.length === B - 2 && digit < 8) {
            continue;
        }

        if (tower.length < B - 2) {
            tower.push(digit);
            console.log(i + 1);
            return;
        }
    }

    for (let i = 0; i < Model.arr.length; i++) {
        const tower = Model.arr[i];

        if (tower.length < B - 1) {
            tower.push(digit);
            console.log(i + 1);
            return;
        }
    }

    for (let i = 0; i < Model.arr.length; i++) {
        const tower = Model.arr[i];

        if (tower.length < B) {
            tower.push(digit);
            console.log(i + 1);
            return;
        }
    }
}
