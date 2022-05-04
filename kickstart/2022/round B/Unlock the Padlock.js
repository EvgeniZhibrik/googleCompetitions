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
const answers = {};

function runSolution() {
    const [N, D] = lines[0].split(' ').map((v) => +v);
    const arr = lines[1].split(' ').map((v) => +v);

    let parts = 0;
    const boundaries = [];
    for (let i = 0; i < N - 1; i++) {
        if (arr[i] !== arr[i + 1]) {
            parts++;
            boundaries.push(i);
        }
    }
    boundaries.push(N - 1);
    parts++;

    let min = Infinity;

    for (let i = 0; i < boundaries.length; i++) {
        let temp;
        if (i === 0) {
            temp = getMin(D, N, arr, 0, boundaries[i] + 1, parts, 0);
        } else {
            temp = getMin(D, N, arr, boundaries[i - 1] + 1, boundaries[i] + 1, parts, 0);
        }

        if (temp < min) {
            min = temp;
        }
    }

    console.log('Case #' + (test + 1) + ': ' + min);
    test++;
}

function getMin(D, N, arr, left, right, parts, currentSum) {
    if (parts === 1) {
        return currentSum + Math.min(arr[0], D - arr[0]);
    }

    let min = Infinity;

    if (right === N) {
        let res = 0;
        for (let i = left; i > 0; i--) {
            const diff = Math.min(Math.abs(arr[i] - arr[i - 1]), D - Math.abs(arr[i] - arr[i - 1]));
            res += diff;
        }
        return getMin(D, 1, [arr[0]], 0, 1, 1, currentSum + res);
    } else if (left === 0) {
        let res = 0;
        for (let i = right; i < N; i++) {
            const diff = Math.min(Math.abs(arr[i] - arr[i - 1]), D - Math.abs(arr[i] - arr[i - 1]));
            res += diff;
        }
        return getMin(D, 1, [arr[N - 1]], 0, 1, 1, currentSum + res);
    } else if (arr[left - 1] === arr[right]) {
        const diff = Math.min(Math.abs(arr[left] - arr[left - 1]), D - Math.abs(arr[left] - arr[left - 1]));
        let newStart = left - 1;
        while(newStart > 0 && arr[newStart] === arr[newStart - 1]) {
            newStart--;
        }
        let newEnd = right + 1;
        while(newEnd < arr.length && arr[newEnd - 1] === arr[newEnd]) {
            newEnd++;
        }
        const newArr = arr.slice(0, newStart).concat((new Array(newEnd - newStart)).fill(arr[newStart])).concat(arr.slice(newEnd));
        return getMin(D, N, newArr, newStart, newEnd, parts - 2, currentSum + diff);
    } else {
        const diffLeft = Math.min(Math.abs(arr[left] - arr[left - 1]), D - Math.abs(arr[left] - arr[left - 1]));
        const diffRight = Math.min(Math.abs(arr[right - 1] - arr[right]), D - Math.abs(arr[right - 1] - arr[right]));
        let leftDown = diffLeft === arr[left] - arr[left - 1] || diffLeft === D - arr[left - 1] + arr[left];
        let leftUp = diffLeft === D - arr[left] + arr[left - 1] || diffLeft === arr[left - 1] - arr[left];
        let rightDown = diffRight === arr[right - 1] - arr[right] || diffRight === D - arr[right] + arr[right - 1];
        let rightUp = diffRight === arr[right] - arr[right - 1] || diffRight === D - arr[right - 1] + arr[right];

        if ((leftUp && rightUp) || (leftDown && rightDown)) {
            if (diffLeft < diffRight) {
                let newStart = left - 1;
                while(newStart > 0 && arr[newStart] === arr[newStart - 1]) {
                    newStart--;
                }
                const newArr = arr.slice(0, newStart).concat((new Array(right - newStart)).fill(arr[newStart])).concat(arr.slice(right));
                return getMin(D, N, newArr, newStart, right, parts - 1, currentSum + diffLeft);
            } else {
                let newEnd = right + 1;
                while(newEnd < arr.length && arr[newEnd - 1] === arr[newEnd]) {
                    newEnd++;
                }
                const newArr = arr.slice(0, left).concat((new Array(newEnd - left)).fill(arr[newEnd - 1])).concat(arr.slice(newEnd));
                return getMin(D, N, newArr, left, newEnd, parts - 1, currentSum + diffRight);
            }
        } else {
            let newStart = left - 1;
            while(newStart > 0 && arr[newStart] === arr[newStart - 1]) {
                newStart--;
            }
            let newArr = arr.slice(0, newStart).concat((new Array(right - newStart)).fill(arr[newStart])).concat(arr.slice(right));
            let temp = getMin(D, N, newArr, newStart, right, parts - 1, currentSum + diffLeft);
            if (temp < min) {
                min = temp;
            }
            let newEnd = right + 1;
            while(newEnd < arr.length && arr[newEnd - 1] === arr[newEnd]) {
                newEnd++;
            }
            newArr = arr.slice(0, left).concat((new Array(newEnd - left)).fill(arr[newEnd - 1])).concat(arr.slice(newEnd));
            temp = getMin(D, N, newArr, left, newEnd, parts - 1, currentSum + diffRight);
            if (temp < min) {
                min = temp;
            }
        }
    }

    return min;
}
