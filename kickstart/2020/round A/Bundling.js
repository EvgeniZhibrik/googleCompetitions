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

    const bigObj = lines.reduce((obj, line) => {
        if (line.length > obj.max) {
            obj.max = line.length;
        }

        for (let i = 1; i <= line.length; i++) {
            if (!obj[i]) {
                obj[i] = {};
            }
            let substr = line.slice(0, i);
            if (!obj[i][substr]) {
                obj[i][substr] = 1;
            } else {
                obj[i][substr]++;
            }
        }

        return obj;
    }, { max: 0 });

    let ans = 0;
    for (let i = bigObj.max; i > 0; i--) {

        let max = 0, maxField = '';
        for (let substr in bigObj[i]) {
            if (bigObj[i][substr] > max) {
                max = bigObj[i][substr];
                maxField = substr;
            }
        }

        if (max >= K) {
            ans += i;
            for (let j = 1; j <= maxField.length; j++) {
                bigObj[j][maxField.slice(0, j)] -= K;
            }
            i++;
        }
    }

    console.log('Case #' + (test + 1) + ': ' + ans);
    test++;
}
