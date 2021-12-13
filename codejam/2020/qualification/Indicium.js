const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T = -1;
let N;
let trace;

let count = 1;


rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!N && T !== 0) {
        [N, trace] = line.split(' ').map((val) => +val);
    }

    runSolution();
    N = null;
    trace = null;

    T--;

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});


function runSolution() {
    if (trace === N + 1 || trace === N * N - 1) {
        console.log(`Case #${count}: IMPOSSIBLE`);
        count++;
        return;
    }

    let matrix = [];
    for (let i = 0; i < N; i++) {
        matrix[i] = [];
    }

    let ok = false;
    let a, b, c;
    for (let A = 1; A <= N && !ok; A++) {
        for (let B = 1; B <= N && !ok; B++) {
            if (A === B) {
                let C = A;
                if ((N - 2) * A + B + C === trace) {
                    a = A;
                    b = B;
                    c = C;
                    ok = true;
                }
            } else {
                for (let C = 1; C <= N && !ok; C++) {
                    if (C === A) {
                        continue;
                    }
                    if ((N - 2) * A + B + C === trace) {
                        a = A;
                        b = B;
                        c = C;
                        ok = true;
                    }
                }
            }
        }
    }

    for (let i = 2; i < N; i++) {
        matrix[i][i] = a;
    }
    matrix[0][0] = b;
    matrix[1][1] = c;
    if (a !== b) {
        matrix[1][0] = a;
        matrix[0][1] = a;
    }
    let flag = findSolution(matrix);

    if (!flag) {
        console.log(`Case #${count}: IMPOSSIBLE`);
        count++;
    }
}

function findSolution(matrix) {
    for (let i = 0; i < N; i++) {
        const graph = new BipartiteGraph();
        for(let j = 0; j < N; j++) {
            if (!matrix[i][j]) {
                graph.addU(`cell_${j}`);
            }
            if (!matrix[i].includes(j+1)) {
                graph.addV(`number_${j + 1}`);
            }
        }

        for(let j = 0; j < N; j++) {
            if (matrix[i][j]) {
                continue;
            }
            const used = {};
            for (let i1 = 0; i1 < N; i1++) {
                if (matrix[i1][j]) {
                    used[matrix[i1][j]] = true;
                }
                if (matrix[i][i1]) {
                    used[matrix[i][i1]] = true;
                }
            }

            for (let k = 1; k <= N; k++) {
                if (!used[k]) {
                    graph.addEdge(`cell_${j}`, `number_${k}`);
                }
            }
        }

        const [pU, pV, res] = HK(graph);
        if (res < N - matrix[i].filter((v) => !!v).length) {
            return false;
        } else {
            Object.keys(pU).forEach((u) => {
                const cell = +u.split('_')[1];
                const num = +pU[u].name.split('_')[1];
                matrix[i][cell] = num;
            });
        }

    }

    console.log(`Case #${count}: POSSIBLE`);
    for (let i = 0; i < N; i++) {
        console.log(matrix[i].join(' '));
    }
    count++;
    return true;
}

class BipartiteGraph {
    constructor() {
        this.u = [];
        this.v = [];
    }

    addU(name) {
        this.u.push({
            name,
            edges: []
        });
    }

    addV(name) {
        this.v.push({
            name,
            edges: []
        });
    }

    addEdge(u, v) {
        const U = this.u.find((vert) => vert.name === u);
        const V = this.v.find((vert) => vert.name === v);
        if (U && V) {
            U.edges.push(V);
            V.edges.push(U);
        }
    }
}

function HK(graph) {
    const dist = {
        nil: Infinity
    };

    const Nil = {
        name: 'nil',
        edges: []
    };
    const pairU = graph.u.reduce((obj, vert) => {
        obj[vert.name] = Nil;
        dist[vert.name] = null;
        return obj;
    }, {});
    const pairV = graph.v.reduce((obj, vert) => {
        obj[vert.name] = Nil;
        dist[vert.name] = null;
        return obj;
    }, {});
    let matching = 0;
    while(BFS(graph, pairU, pairV, dist, Nil)) {
        graph.u.forEach((u) => {
            if (pairU[u.name] === Nil) {
                if (DFS(u, pairU, pairV, dist, Nil)) {
                    matching += 1;
                }
            }
        });
    }
    return [pairU, pairV, matching];
}

function BFS(graph, pairU, pairV, dist, Nil) {
    const queue = [];
    graph.u.forEach((u) => {
        if (pairU[u.name] === Nil) {
            dist[u.name] = 0;
            queue.push(u);
        } else {
            dist[u.name] = Infinity;
        }
    });
    dist[Nil.name] = Infinity;
    while (queue.length) {
        const u = queue.shift();
        if (dist[u.name] < dist[Nil.name]) {
            u.edges.forEach((v) => {
               if (dist[pairV[v.name].name] === Infinity) {
                   dist[pairV[v.name].name] = dist[u.name] + 1;
                   queue.push(pairV[v.name]);
               }
            });
        }
    }
    return dist[Nil.name] !== Infinity;
}

function DFS(u, pairU, pairV, dist, Nil) {
    if (u !== Nil) {
        for (let i = 0; i < u.edges.length; i++) {
            const v = u.edges[i];
            if (dist[pairV[v.name].name] === dist[u.name] + 1) {
                if (DFS(pairV[v.name], pairU, pairV, dist, Nil)) {
                    pairV[v.name] = u;
                    pairU[u.name] = v;
                    return true;
                }
            }
        }

        dist[u.name] = Infinity;
        return false;
    }
    return true;
}