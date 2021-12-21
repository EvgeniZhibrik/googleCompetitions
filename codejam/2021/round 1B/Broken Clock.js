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

const p = BigInt(360) * BigInt(12) * BigInt(100000) * BigInt(100000);

let x = 11n;

for (let i = 0; i < 10; i++) {
    x **= 5n;
    x %= p;
}

for (let i = 0; i < 2; i++) {
    x **= 3n;
    x %= p;
}

let xArr = [x];

for (let i = 0; i < 16; i++) {
    x *= x;
    x %= p;
    xArr.push(x);
}

x = xArr.reduce((mult, num) => {
    let k = mult * num;
    return k % p;
}, 1n);

let q = 11n ** 293n;
q %= p;

q **= 109n;
q %= p;

q **= 43n;
q %= p;

q **= 64n;
q %= p;

x *= q;
x %= p;

function runSolution() {
    const argArr = lines[0].split(' ').map((v) => BigInt(v));

    for (let aI = 0; aI < 3; aI++) {
        const a = argArr[aI];
        for (let bI = 0; bI < 3; bI++) {
            if (bI === aI) {
                continue;
            }
            const b = argArr[bI];
            for (let cI = 0; cI < 3; cI++) {
                if (cI === bI || cI === aI) {
                    continue;
                }
                const c = argArr[cI];

                let temp = b - a >= 0n ? b - a : b - a + p;

                temp *= x;
                temp %= p;

                let check = (4n * temp) - c - (64n * a) + (65n * b);
                while (check < 0n) {
                    check += p;
                }

                if (check % p === 0n) {
                    getAnswer(temp);
                    return;
                }
            }
        }
    }
}

function getAnswer(t) {
    const n = t % 1000000000n;
    t = (t - n) / 1000000000n;

    const s = t % 60n;
    t = (t - s) / 60n;

    const m = t % 60n;
    t = (t - m) / 60n;

    const h = t;
    console.log('Case #' + (test + 1) + ': ' + h + ' ' + m + ' ' + s + ' ' + n);
    test++;
}
