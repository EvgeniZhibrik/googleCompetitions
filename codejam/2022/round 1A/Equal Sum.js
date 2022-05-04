var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T = -1;
let state = 0;

const Model = {
};

rl.on('line', function (line) {
    if (state === 0) {
        T = +line;
        state = 1;
        return;
    }

    if (line === '-1') {
        rl.close();
        return;
    }

    if (state === 1) {
        initModel(line);
        state = 2;
        return;
    }

    if (state === 2) {
        makeMove(line);
        state = 1;
        T--;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function initModel(line) {
    Model.N = +line;
    Model.A = [];
    Model.sumA = 0n;
    let count = 1n;

    for (let i = 0; i < Model.N && count < 1000000000n; i++) {
        Model.A.push(count);
        Model.sumA += count;
        count *= 2n;
    }

    count = 1n;
    while (Model.A.length < Model.N) {
        if (!Model.A.find((num) => num === count)) {
            Model.A.push(count);
            Model.sumA += count;
        }
        count++;
    }

    console.log(Model.A.join(' '));
}

function makeMove(line) {
    Model.sumB = 0n;
    Model.B = line.split(' ').map((val) => {
        const res = BigInt(val);
        Model.sumB += res;
        return res;
    });

    Model.B.sort((a, b) => {
        if (a < b) {
            return 1;
        }
        if (a > b) {
            return -1;
        }
        return 0;
    });

    while (Model.sumA < Model.sumB) {
        const b = Model.B.pop();
        Model.A.push(b);
        Model.sumB -= b;
        Model.sumA += b;
    }

    let diff = (Model.sumA - Model.sumB) / 2n;

    const arr = [];

    while (diff !== 0n) {
        let count = 1n;

        while (count <= diff) {
            count *= 2n;
        }

        count /= 2n;

        arr.push(count);
        diff -= count;
    }

    console.log(Model.B.concat(arr).join(' '));
}
