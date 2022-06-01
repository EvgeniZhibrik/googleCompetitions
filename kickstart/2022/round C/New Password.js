const readline = require('readline');

const rl = readline.createInterface({
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

    if (lines.length === 2 && T) {
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
    const oldPwd = lines[1];

    let bL = false;
    let sL = false;
    let sC = false;
    let d = false;

    for (let i = 0; i < oldPwd.length; i++) {
        if (!bL && oldPwd[i] >= 'A' && oldPwd[i] <= 'Z') {
            bL = true;
            continue;
        }

        if (!sL && oldPwd[i] >= 'a' && oldPwd[i] <= 'z') {
            sL = true;
            continue;
        }

        if (!sC && (oldPwd[i] === '&' || oldPwd[i] === '*' || oldPwd[i] === '@' || oldPwd[i] === '#')) {
            sC = true;
            continue;
        }

        if (!d && oldPwd[i] >= '0' && oldPwd[i] <= '9') {
            d = true;
        }
    }

    let newPwd = `${oldPwd}${bL ? '' : 'A'}${sL ? '' : 'a'}${sC ? '' : '#'}${d ? '' : '1'}`;

    while (newPwd.length < 7) {
        newPwd += '1';
    }
    console.log('Case #' + (test + 1) + ': ' + newPwd);
    test++;

}
