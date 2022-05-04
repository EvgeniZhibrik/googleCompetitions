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

    if (Model.count) {
        makeMove(line, state === 2);
        if (state === 2) {
            state = 3;
        }
    }

    if (!Model.count) {
        T--;
        state = 1;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function initModel(line) {
    [Model.N, Model.K] = line.split(' ').map((v) => +v);

    Model.count = Math.min(Model.N, Model.K + 1);
    Model.realK = Math.min(Model.N, Model.K + 1);
    Model.sum = 0n;
}

function makeMove(line, isFirst) {
    const [v, d] = line.split(' ').map((val, i) => i ? BigInt(val) : +val);

    if (isFirst) {
        Model.first = v;
    }
    Model.sum += d;
    Model.count--;

    if (!Model.count) {
        console.log('E ' + Model.sum * BigInt(Model.N) / 2n / BigInt(Model.realK));
    } else {
        if (Model.count === Model.first && Model.N > Model.K) {
            console.log('T ' + (Model.K + 1));
        } else if (Model.count === Model.first) {
            console.log('T ' + (Model.N));
        } else {
            console.log('T ' + (Model.count));
        }
    }

}
