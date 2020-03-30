var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T = -1, N = 7, M, _;
var state = 0;
rl.on('line', function (line) {
    if (state === 0) {
        [T, _, M] = line.split(' ').map((v) => +v);
        state = 1;
    }

    if (state === 1) {
        initModel();
        makeMove();
        state = 2;
        return;
    }

    if (line === '-1') {
        rl.close();
        return;
    }

    if (Model.N > -1) {
        changeModel(line);
        makeMove();
    } else {
        if (line === '1') {
            T--;
            state = 1;
        }
    }

    if (T === 0) {
        rl.close();
    }

    if (state === 1) {
        initModel();
        makeMove();
        state = 2;
    }
}).on('close', function () {
    process.exit(0);
});

var Model = {};
const arr = [17, 16, 13, 11, 9, 7, 5];
function initModel() {
    Model.N = N;
    Model.r = 0;
    Model.mod = 1;
}

function makeMove() {
    if (Model.N > 0) {
        console.log((new Array(18)).fill(arr[N - Model.N]).join(' '));
    } else {
        console.log(Model.r);
    }
    Model.N--;
}

function changeModel(line) {
    const mod1 = arr[N - Model.N - 1];
    const r1 = line.split(' ').reduce((prev, cur) => {
        prev += +cur;
        return prev % mod1;
    }, 0);

    for (let i = Model.r; i < Model.mod * mod1; i += Model.mod) {
        if (i % mod1 === r1) {
            Model.r = i;
            Model.mod = Model.mod * mod1;
            break;
        }
    }
}
