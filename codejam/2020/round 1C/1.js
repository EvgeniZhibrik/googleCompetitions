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

    if (lines.length === 1 && T) {
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
    let [x, y, str] = lines[0].split(' ');
    x = +x;
    y = +y;

    let way = Math.abs(x) + Math.abs(y);
    if (way === 0) {
        console.log('Case #' + (test + 1) + ': ' + 0);
        test++;
        return;
    }

    str = str.split('').reduce((prev, move) => {
        const last = prev[prev.length - 1];
        switch (move) {
            case 'N':
                prev.push([last[0], last[1] + 1]);
                break;
            case 'S':
                prev.push([last[0], last[1] - 1]);
                break;
            case 'E':
                prev.push([last[0] + 1, last[1]]);
                break;
            case 'W':
                prev.push([last[0] - 1, last[1]]);
                break;
        }
        return prev;
    }, [[x, y]]);


    for (let i = 0; i < str.length; i++) {
        const [x1 ,y1] = str[i];
        way = Math.abs(x1) + Math.abs(y1);
        if (way <= i) {
            console.log('Case #' + (test + 1) + ': ' + i);
            test++;
            return;
        }
    }


    console.log('Case #' + (test + 1) + ': ' + 'IMPOSSIBLE');
    test++;
}
