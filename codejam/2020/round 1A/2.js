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
    const N = +lines[0];

    if (N <= 8) {
        console.log('Case #' + (test + 1) + ':');
        for (let i = 1; i <= N; i++) {
            console.log(`${i} 1`);
        }
        test++;
        return;
    }

    let r = 0, temp = 1;

    while (temp <= N) {
        temp *= 2;
        r++;
    }

    temp = Math.floor(temp / 2);
    r--;

    if (temp - 1 + r > N) {
        console.log('Case #' + (test + 1) + ':');
        let sum = 0;
        for (let i = 1; i <= r; i++) {
            if (i % 2 === 1) {
                for (let j = 1; j <= i; j++) {
                    console.log(`${i} ${j}`);
                }
                sum += Math.pow(2, i - 1)
            }
            if (i % 2 === 0) {
                for (let j = i; j >= 1; j--) {
                    console.log(`${i} ${j}`);
                }
                sum += Math.pow(2, i - 1)
            }
        }
        let row = r + 1;
        let left = (row % 2 === 1);
        while (sum < N) {
            console.log(`${row} ${left ? 1 : row}`);
            row++;
            sum++;
        }
        test++;
        return;
    }


    let result = findPath(N - temp, r, true);
    if (result) {
        console.log('Case #' + (test + 1) + ':');
        for (let i = 0; i < result.length; i++) {
            console.log(`${result[i][0]} ${result[i][1]}`);
        }
        for (let i = 1; i <= r + 1; i++) {
            console.log(`${r + 1} ${i}`);
        }
        test++;
        return;
    }

    result = findPath(N - temp + 1, r, true);
    if (result) {
        console.log('Case #' + (test + 1) + ':');
        for (let i = 0; i < result.length; i++) {
            console.log(`${result[i][0]} ${result[i][1]}`);
        }
        for (let i = 1; i <= r; i++) {
            console.log(`${r + 1} ${i}`);
        }
        test++;
        return;
    }

    let count = 0;
    do {
        count++;
        result = findPath(N - temp - count, r , true);
    } while (!result);

    console.log('Case #' + (test + 1) + ':');
    for (let i = 0; i < result.length; i++) {
        console.log(`${result[i][0]} ${result[i][1]}`);
    }
    for (let i = 1; i <= r + 1; i++) {
        console.log(`${r + 1} ${i}`);
    }
    for (let i = r + 2; i < r + 2 + count; i++) {
        console.log(`${i} ${i}`);
    }
    test++;
}

function findPath(N, level, isLeft) {
    if (level > N || Math.pow(2, level) < N) {
        return null;
    }

    if (level === N) {
        let ans = [];
        for (let i = 1; i <= level; i++) {
            ans.push([i, isLeft ? 1 : i]);
        }
        return ans;
    }

    let r = 0, temp = 1;

    while (temp <= N) {
        temp *= 2;
        r++;
    }

    temp = Math.floor(temp / 2);
    r--;

    if (temp - 2 + level > N) {
        return null;
    }

    let res = findPath(N - temp - level + r + 1, r, !isLeft);
    if (res) {
        let ans = [];
        if (isLeft) {
            for (let i = r + 1; i >= 1; i--) {
                ans.push([r + 1, i]);
            }
        } else {
            for (let i = 1; i <= r + 1; i++) {
                ans.push([r + 1, i]);
            }
        }
        for (let i = r + 2; i <= level; i++) {
            ans.push([i, isLeft ? 1 : i]);
        }
        return res.concat(ans);
    }

    res = findPath(N - temp - level + r + 2, r, !isLeft);
    if (res) {
        let ans = [];
        if (isLeft) {
            for (let i = r; i >= 1; i--) {
                ans.push([r + 1, i]);
            }
        } else {
            for (let i = 2; i <= r + 1; i++) {
                ans.push([r + 1, i]);
            }
        }
        for (let i = r + 2; i <= level; i++) {
            ans.push([i, isLeft ? 1 : i]);
        }
        return res.concat(ans);
    }

    return null;
}
