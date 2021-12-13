var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1;
let test = 0;
let C = 0, D = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!C || !D) {
        [C, D] = line.split(' ').map((v) => +v);
        return;
    }

    lines.push(line);

    if (lines.length === D + 1 && T) {
        runSolution(C, D, lines);
        T--;
        C = 0;
        D = 0;
        lines = [];
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

class Node {
    constructor(id) {
        this.id = id;
        this.edges = [];
    }

    addX(x) {
        this.x = x;
    }

    addEdge(edge) {
        this.edges.push(edge);
    }
}

class Edge {
    constructor(id, node1, node2, oriented = false) {
        this.id = id;
        this.nodes = [node1, node2];
        this.oriented = oriented;
    }

    setLen(len) {
        this.length = len;
    }
}

function runSolution(C, D, lines) {
    const x = lines.shift().split(' ').map((v) => +v);

    x.unshift(0);
    let c = C, d = D;
    const graph = [];
    for (let i = 0; i < C; i++) {
        graph.push(new Node(i));
    }

    lines.forEach((line, index) => {
        let [id1, id2] = line.split(' ').map((v) => +v);
        const node1 = graph.find((node) => node.id === id1 - 1);
        const node2 = graph.find((node) => node.id === id2 - 1);
        const edge = new Edge(index, node1, node2);
        node1.addEdge(edge);
        node2.addEdge(edge);
    });

    const visited = [graph.find((node) => node.id === 0)];
    const notVisited = graph.filter((node) => node.id !== 0);

    let edgesLeft = D;
    const result = [];
    while (edgesLeft) {
        visited.forEach((node) => {
            node.edges.forEach((edge) => {
                
            });
        });
    }

}

class Heap {
    constructor(comparator) {
        this.arr = [];
        this.compare = comparator;
    }

    isEmpty() {
        return this.arr.length === 0;
    }

    push(val) {
        let index = this.arr.length;
        this.arr.push(val);

        while (index > 0 && this.compare(val, this.arr[Math.floor((index - 1) / 2)]) > 0) {
            this.arr[index] = this.arr[Math.floor((index - 1) / 2)];
            this.arr[Math.floor((index - 1) / 2)] = val;
            index = Math.floor((index - 1) / 2);
        }
    }

    pop() {
        if(this.isEmpty()) {
            return;
        }

        if (this.arr.length === 1) {
            return this.arr.pop();
        }

        const temp = this.arr[this.arr.length - 1];
        this.arr[this.arr.length - 1] = this.arr[0];
        this.arr[0] = temp;
        let index = 0;

        const result = this.arr.pop();

        while ((2 * index + 2 < this.arr.length  && (this.compare(temp, this.arr[2 * index + 1]) < 0 || this.compare(temp, this.arr[2 * index + 2]) < 0)) ||
        (2 * index + 2 === this.arr.length && this.compare(temp, this.arr[2 * index + 1]) < 0)) {
            if (2 * index + 2 < this.arr.length) {
                if (this.compare(this.arr[2 * index + 1], this.arr[2 * index + 2]) > 0) {
                    this.arr[index] = this.arr[2 * index + 1];
                    this.arr[2 * index + 1] = temp;
                    index = 2 * index + 1;
                } else {
                    this.arr[index] = this.arr[2 * index + 2];
                    this.arr[2 * index + 2] = temp;
                    index = 2 * index + 2;
                }
            } else {
                this.arr[index] = this.arr[2 * index + 1];
                this.arr[2 * index + 1] = temp;
                index = 2 * index + 1;
            }
        }

        return result;
    }

    peek() {
        return this.arr[0];
    }
}
