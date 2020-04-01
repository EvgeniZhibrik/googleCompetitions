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
    const vertical = (new Array(Q + 1)).fill(0);
    const horizontal = (new Array(Q + 1)).fill(0);
    lines.forEach((cur) => {
        let [x, y, z] = cur.split(' ');
        x = +x;
        y = +y;

        switch (z) {
            case 'N':
                for (let i = y + 1; i <= Q; i++) {
                    vertical[i]++;
                }
                break;
            case 'W':
                for (let i = 0; i < x; i++) {
                    horizontal[i]++;
                }
                break;
            case 'E':
                for (let i = x + 1; i <= Q; i++) {
                    horizontal[i]++;
                }
                break;
            case 'S':
                for (let i = 0; i < y; i++) {
                    vertical[i]++;
                }
                break;
            default:
                break;
        }
    });

    let maxV = -1;
    let maxH = -1;
    let maxCoord = [];

    for (let i = 0; i <= Q; i++) {
        if (vertical[i] > maxV) {
            maxV = vertical[i];
            maxCoord[1] = i;
        }
        if (horizontal[i] > maxH) {
            maxH = horizontal[i];
            maxCoord[0] = i;
        }
    }

    console.log('Case #' + (test + 1) + ': ' + maxCoord.join(' '));
    test++;

}
