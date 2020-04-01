var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1, P = 0, Q;
let test = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!P) {
        [P, Q] = line.split(' ').map((v) => +v);
        return;
    }

    lines.push(line);

    if (lines.length === P && T) {
        runSolution();
        T--;
        P = 0;
        lines = [];
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    const squares = lines.reduce((prev, cur) => {
        let [x, y, z] = cur.split(' ');
        x = +x;
        y = +y;

        switch (z) {
            case 'N':
                prev.push([0, Q, y + 1, Q]);
                break;
            case 'W':
                prev.push([0, x - 1, 0, Q]);
                break;
            case 'E':
                prev.push([x + 1, Q, 0, Q]);
                break;
            case 'S':
                prev.push([0, Q, 0, y - 1]);
                break;
            default:
                break;
        }

        return prev;
    }, []);

    let max = -1;
    let maxCoord;

    for (let i = 0; i <= Q; i++) {
        for (let j = 0; j <= Q; j++) {
            let count = squares.reduce((prev, cur) => {
                if (cur[0] <= i && i <= cur[1] && cur[2] <= j && j <= cur[3]) {
                    prev++;
                }
                return prev;
            }, 0);

            if (count > max) {
                max = count;
                maxCoord = [i, j];
            }
        }
    }

    console.log('Case #' + (test + 1) + ': ' + maxCoord.join(' '));
    test++;

}