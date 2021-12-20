var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1;
let test = 0;
let M = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (M === 0) {
        M = +line;
        return;
    }

    lines.push(line);

    if (lines.length === M && T) {
        runSolution();
        T--;
        lines = [];
        M = 0;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

let max = 0n;

function runSolution() {
    const primes = lines.map((line) => line.split(' ').map((v) => BigInt(v))).reverse();
    const sum = primes.reduce((acc, prime) => {
        return acc + (prime[0] * prime[1]);
    }, 0n);

    max = 0n;
    const group = [];

    findMax(primes, sum, group, 0n, 0n, 0);

    console.log('Case #' + (test + 1) + ': ' + max);
    test++;
}

function findMax(primes, sum, group, oldSum, oldMult, level) {
    const currentSum = level > 0 ? oldSum + (group[level - 1][0] * group[level - 1][1]) : 0n;
    const currentMult = currentSum > 0n ?
        (oldMult > 0n ? oldMult * (group[level - 1][0] ** group[level - 1][1]) : (group[level - 1][0] ** group[level - 1][1])) : 0n;

    const currentResult = currentSum + currentMult;

    if (currentResult > sum) {
        return false;
    }

    if (currentResult === sum) {
        if (max < currentMult) {
            max = currentMult;
        }
        return false;
    }

    if (level === primes.length) {
        return true;
    }

    if (level === primes.length - 1) {
        if ((sum - currentSum) % primes[level][0] === 0n) {
            const controlNumber = (sum - currentSum) / (currentMult || 1n);
            const minK = getMinK(controlNumber, primes[level][0]);
            for (let i = minK >= 0n ? minK : 0n; i <= primes[level][1]; i++) {
                const flag = findMax(primes, sum, group.concat([[primes[level][0], i]]), currentSum, currentMult, level + 1);
                if (!flag) {
                    break;
                }
            }

            return true;
        } else {
            return true;
        }
    }

    for (let i = 0n; i <= primes[level][1]; i++) {
        const flag = findMax(primes, sum, group.concat([[primes[level][0], i]]), currentSum, currentMult, level + 1);
        if (!flag) {
            break;
        }
    }

    return true;
}

function getMinK(controlNumber, prime) {
    if (controlNumber < Number.MAX_SAFE_INTEGER) {
        return BigInt(Math.round(Math.log(Number(controlNumber)) / Math.log(Number(prime))) - 1);
    }

    let k = 0n;
    let cn = controlNumber;
    while (cn >= 0) {
        k++;
        cn /= prime;
    }

    return k - 1n;
}

