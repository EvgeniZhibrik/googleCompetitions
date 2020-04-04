var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1, N = 0, K;
let test = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!N) {
        [N, K] = line.split(' ').map((v) => +v);
        return;
    }

    lines.push(line);

    if (lines.length === 2 && T) {
        runSolution();
        T--;
        N = 0;
        lines = [];
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    const arrC = lines[0].split(' ').map((v) => +v);
    const arrD = lines[1].split(' ').map((v) => +v);

    let maxC = getMaxObj(0, N - 1, null, arrC);
    let maxD = getMaxObj(0, N - 1, null, arrD);

    let counter = 0;

    for (let i = 0; i < N; i++) {

    }
    console.log('Case #' + (test + 1) + ': ' + maxCoord.join(' '));
    test++;

}

function getMaxObj(start, finish, parent, source) {
    if (start === finish) {
        return new Node(source[start], start, parent);
    }

    let max = -1;
    let coord = -1;

    for (let i = start; i <= finish; i++) {
        if (source[i] > max || (source[i] === max && Math.abs((start + finish) / 2 - i) < Math.abs((start + finish) / 2 - coord))) {
            max = source[i];
            coord = i;
        }
    }

    const ans = new Node(max, coord, parent);
    if (coord < finish) {
        ans.rightChild = getMaxObj(coord + 1, finish, ans, source);
    }
    if (coord > start) {
        ans.leftChild = getMaxObj(start, coord - 1, ans, source);
    }

    return ans;
}

class Node {
    constructor(value, coord, parent) {
        this.value = value;
        this.coord = coord;
        this.parent = parent;
        this.leftChild = null;
        this.rightChild = null;
    }
}
