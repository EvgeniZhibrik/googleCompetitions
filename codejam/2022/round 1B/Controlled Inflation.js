const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1;
let test = 0;
let N = 0;
let P = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        console.time();
        return;
    }

    if (!N) {
        [N, P] = line.split(' ').map((v) => +v);
        return;
    }

    lines.push(line);

    if (lines.length === N && T) {
        runSolution();
        T--;
        lines = [];
        N = 0;
    }

    if (T === 0) {
        console.timeEnd();
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
/*
    const arr = lines.map((line) => {

        let min = Infinity;
        let max = -Infinity;
        line.split(' ').map((v) => {
            const res = BigInt(v);
            if(res > max) {
                max = res;
            }

            if (res < min) {
                min = res;
            }
        });
        return {
            min,
            max
        };
    });

    const result1 = findMinRes(0n, arr, arr[arr.length - 1].min);
    const result2 = findMinRes(0n, arr, arr[arr.length - 1].max);

    const result = result2 < result1 ? result2 : result1;
*/
    const result = findMin();

    console.log('Case #' + (test + 1) + ': ' + result);
    test++;
}

function findMinRes(start, arr, finish) {
    if (arr.length === 1) {
        const res1 = (arr[0].min >= start ? arr[0].min - start : start - arr[0].min) + arr[0].max - arr[0].min + (arr[0].max >= finish ? arr[0].max - finish : finish - arr[0].max);
        const res2 = (arr[0].max >= start ? arr[0].max - start : start - arr[0].max) + arr[0].max - arr[0].min + (arr[0].min >= finish ? arr[0].min - finish : finish - arr[0].min);

        return res1 <= res2 ? res1 : res2;
    }

    const middle = Math.floor(arr.length / 2);
    let minRes = Infinity;

    let temp = findMinRes(start, arr.slice(0, middle), arr[middle - 1].min) + findMinRes(arr[middle - 1].min, arr.slice(middle), finish);
    if (temp < minRes) {
        minRes = temp;
    }

    temp = findMinRes(start, arr.slice(0, middle), arr[middle - 1].max) + findMinRes(arr[middle - 1].max, arr.slice(middle), finish);
    if (temp < minRes) {
        minRes = temp;
    }

    return minRes;
}

function findMin() {
    const d = [];
    for (let i = 0; i <= N; i++) {
        d.push([]);
    }
    d[0][0] = {
        value: 0n,
        paths: [{
            start: 0n,
            finish: 0n
        }]
    }

    lines.forEach((line, index) => {
        let min = Infinity;
        let max = -Infinity;
        line.split(' ').map((v) => {
            const res = BigInt(v);
            if(res > max) {
                max = res;
            }

            if (res < min) {
                min = res;
            }
        });
        d[index + 1][index + 1] = {
            value: max - min,
            paths: [
                {
                    start: min,
                    finish: max,
                },
                {
                    start: max,
                    finish: min
                }
            ]
        };
    });

    for (let k = 1; k <= N; k++) {
        for (let i = 0; i + k <= N; i++) {
            let min = Infinity;

            d[i][i + k] = {
                value: min,
                paths: []
            };
            for (let a = 0; a < k; a++) {
                let start = d[i][i + k - a - 1];
                let finish = d[i + k - a][i + k];
                start.paths.forEach((startPath) => {
                    finish.paths.forEach((finishPath) => {
                        const value = start.value + (startPath.finish - finishPath.start >= 0 ? startPath.finish - finishPath.start : finishPath.start - startPath.finish) + finish.value;
                        if (value < min) {
                            d[i][i + k] = {
                                value,
                                paths: [{
                                    start: startPath.start,
                                    finish: finishPath.finish
                                }]
                            };
                            min = value;
                        } else if (value === min && !d[i][i + k].paths.some((oldPath) => oldPath.start === startPath.start && oldPath.finish === finishPath.finish)) {
                            d[i][i+k].paths.push({
                                start: startPath.start,
                                finish: finishPath.finish
                            })
                        }
                    });
                });
            }
        }

    }

    return d[0][N];
}
