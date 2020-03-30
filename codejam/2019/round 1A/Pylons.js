var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var lines = [];
var T = -1;
var test = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
    } else {
        lines.push(line);
    }
    if (lines.length === 1 && T) {
        runSolution();
        T--;
    }
    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    let line = lines.shift();

    const [R, C] = line.split(' ').map((v) => +v);

    const nodes = [];
    const marks = [];

    for (let r = 0; r < R; r++) {
        nodes[r] = [];
        marks[r] = [];
        for (let c = 0; c < C; c++) {
            nodes[r][c] = {
                r,
                c,
                children: []
            };
            marks[r][c] = false;
        }
    }

    for (let i = 0; i < R * C; i++) {
        let r = Math.floor(i / C);
        let c = i % C;
        for (let j = 0; j < R * C; j++) {

            let r1 = Math.floor(j / C);
            let c1 = j % C;

            if (r !== r1 && c !== c1 && r - c !== r1 - c1 && r + c !== r1 + c1) {
                nodes[r][c].children.push(nodes[r1][c1]);
            }
        }
    }

    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            shuffle(nodes[r][c].children);
        }
    }

    const path = [], stack = [];


    stack.push({
        vert: Math.floor(Math.random() * (R * C)),
        level: 0
    });
    while (stack.length) {
        let {vert, level} = stack.pop();
        let r = Math.floor(vert / C);
        let c = vert % C;
        if (marks[r][c]) {
            continue;
        }

        while (path.length > level) {
            marks[path[path.length - 1][0]][path[path.length - 1][1]] = false;
            path.pop();
        }

        marks[r][c] = true;
        path.push([r, c]);
        let flag = false;
        for (let j = 0; j < nodes[r][c].children.length; j++) {
            let r1 = nodes[r][c].children[j].r;
            let c1 = nodes[r][c].children[j].c;
            if (!marks[r1][c1]) {
                stack.push({
                    vert: (r1 * C) + c1,
                    level: level + 1
                });
                flag = true;
            }
        }

        if (!flag) {
            if (path.length < R * C) {
                path.pop();
                marks[r][c] = false;
                continue;
            }

            console.log('Case #' + (test + 1) + ': ' + 'POSSIBLE');
            path.forEach((cell) => {
                console.log(`${cell[0] + 1} ${cell[1] + 1}`);
            });
            test++;
            return;
        }
    }

    console.log('Case #' + (test + 1) + ': ' + 'IMPOSSIBLE');
    test++;

}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
