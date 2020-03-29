var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var lines = [];
var T = -1;
let N, K;
var test = 0;
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

    if (lines.length === N && T) {
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

    const graph = lines.reduce((obj, line) => {
        let node = obj.root;

        for (let i = 0; i < line.length; i++) {
            let letter = line[i];
            if (!node.children[letter]) {
                node.children[letter] = new Node(letter, node);
            } else {
                node.children[letter].count++;
            }
            node = node.children[letter];
        }

        return obj;
    }, { root: new Node('', null, 0) });

    let sum = 0;
    let stack = [graph.root];
    let level = 0;

    while (Object.keys(graph.root.children).length) {
        stack = [graph.root];
        while (stack.length) {
            let vert = stack.pop();

            if (vert.parent && vert.count < K) {
                delete vert.parent.children[vert.letter];
                continue;
            }

            let children = Object.values(vert.children);
            children.sort((a, b) => a.count - b.count);

            let flag = false;
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                if (child.count < K) {
                    delete vert.children[child.letter];
                    continue;
                }
                stack.push(child);
                flag = true;
            }

            if (!flag) {
                if (vert.parent) {
                    stack.push(vert);
                }
                level = 0;
                while (vert.parent) {
                    vert.count -= K;
                    vert = vert.parent;
                    level++;
                }
                sum += level;
            }
        }
    }

    console.log('Case #' + (test + 1) + ': ' + sum);
    test++;
}

class Node {
    constructor(letter, parent, count = 1) {
        this.letter = letter;
        this.parent = parent;
        this.children = {};
        this.count = count;
    }
}
