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

    if (lines.length === 3 && T) {
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
    const arr = lines[1].split(' ').map((v) => BigInt(v));
    const links = lines[2].split(' ').map((v) => +v);


    const root = new Node(0, 0n);
    const nodes = [root];
    for (let i = 0; i < N; i++) {
        const newNode = new Node(i + 1, arr[i]);
        nodes.push(newNode);
        nodes[links[i]].addChild(newNode);
    }

    const [max, firstTurn] = findMax(root);

    console.log('Case #' + (test + 1) + ': ' + max);
    test++;
}

function findMax(node) {
    if (!node.children.length) {
        return [node.value, node.value];
    }

    let min = Number.MAX_SAFE_INTEGER;
    let sum = 0n;
    node.children.forEach((child) => {
        const [res, firstTurn] = findMax(child);
        if (min > firstTurn) {
            min = firstTurn;
        }
        sum += res;
    });

    if (min < node.value) {
        return [sum - min + node.value, node.value];
    }

    return [sum, min];
}

class Node {
    constructor(id, value) {
        this.id = id;
        this.value = value;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
    }
}
