var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var lines = [];
var T = -1, N = 0;
var test = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!N) {
        N = +line;
        return;
    }

    lines.push(line);

    if (lines.length === N && T) {
        runSolution();
        T--;
        N = 0;
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

        for (let i = line.length - 1; i >= 0; i--) {
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

            if (vert.parent && vert.count < 2) {
                delete vert.parent.children[vert.letter];
                continue;
            }

            let children = Object.values(vert.children);
            children.sort((a, b) => a.count - b.count);

            let flag = false;
            for (let i = 0; i < children.length; i++) {
                let child = children[i];
                if (child.count < 2) {
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
                while (vert.parent) {
                    vert.count -= 2;
                    vert = vert.parent;
                }
                sum += 2;
            }
        }
    }

    console.log('Case #' + (test + 1) + ': ' + 'IMPOSSIBLE');
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
