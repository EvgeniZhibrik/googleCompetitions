var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1;
let test = 0;
let E = 0;
let W = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!E) {
        [E, W] = line.split(' ').map((v) => +v);
        return;
    }

    lines.push(line);

    if (lines.length === E && T) {
        runSolution();
        T--;
        lines = [];
        E = 0;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    const arr = lines.map((line) => line.split(' ').map((v) => +v));

    const result = findMin(arr);

    console.log('Case #' + (test + 1) + ': ' + result);
    test++;
}

function findMin(arr) {
    if (arr.length <= 0) {
        return 0;
    }

    if (arr.length === 1) {
        return 2 * arr[0].reduce((sum, cur) => sum + cur, 0);
    }

    const common = (new Array(W)).fill(Infinity);
    let commonSum = 0;
    for (let j = 0; j < W; j++) {
        for (let i = 0; i < arr.length; i++) {
            if (common[j] > arr[i][j]) {
                common[j] = arr[i][j];
            }
        }
        commonSum += common[j];
    }

    let median = -1;
    for (let i = 0; i < arr.length; i++) {
        let flag = true;
        for (let j = 0; j < W; j++) {
            if (common[j] !== arr[i][j]) {
                flag = false;
                break;
            }
        }

        if (flag) {
            median = i;
            break;
        }
    }

    if (median > -1) {
        const firstPart = arr.slice(0, median).map((exercise) => {
            const newExercise = [];
            for (let j = 0; j < W; j++) {
                newExercise.push(exercise[j] - common[j]);
            }
            return newExercise;
        });

        const secondPart = arr.slice(median + 1, arr.length).map((exercise) => {
            const newExercise = [];
            for (let j = 0; j < W; j++) {
                newExercise.push(exercise[j] - common[j]);
            }
            return newExercise;
        });

        return 2 * commonSum + findMin(firstPart) + findMin(secondPart);
    }

    let min = Infinity;

    for (median = 1; median < arr.length; median++) {
        const firstPart = arr.slice(0, median).map((exercise) => {
            const newExercise = [];
            for (let j = 0; j < W; j++) {
                newExercise.push(exercise[j] - common[j]);
            }
            return newExercise;
        });

        const secondPart = arr.slice(median, arr.length).map((exercise) => {
            const newExercise = [];
            for (let j = 0; j < W; j++) {
                newExercise.push(exercise[j] - common[j]);
            }
            return newExercise;
        });

        const temp = 2 * commonSum + findMin(firstPart) + findMin(secondPart);
        if (min > temp) {
            min = temp;
        }
    }

    return min;
}
