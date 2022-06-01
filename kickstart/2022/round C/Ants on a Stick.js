const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const functions = [];
let lines = [];
let T = -1;
let test = 0;
let N = 0;
let L = 0;
let arr;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!N) {
        [N, L] = line.split(' ').map((v) => +v);
        arr = [];
        return;
    }

    let [p, d] = line.split(' ').map((v) => +v);
    arr.push({
        p: 2 * p,
        d,
        number: arr.length + 1
    });

    if (arr.length === N && T) {
        runSolution();
        N = 0;
        T--;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {

    arr.sort((a, b) => a.p - b.p);
    let answer = [];

    let left = [];
    let right = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].d === 0) {
            left.push(arr[i].p);
        } else {
            right.push(2 * L - arr[i].p);
        }
    }

    let i = 0;
    let j = right.length - 1;
    let start = 0;
    let finish = arr.length - 1;
    while (i < left.length && j >= 0) {
        if (left[i] < right[j]) {
            answer.push(arr[start].number);
            start++;
            i++;
            continue;
        }

        if (left[i] > right[j]) {
            answer.push(arr[finish].number);
            finish--;
            j--;
            continue;
        }

        if (arr[start].number < arr[finish].number) {
            answer.push(arr[start].number);
            start++;
            i++;
        } else {
            answer.push(arr[finish].number);
            finish--;
            j--;
        }
    }

    while (i < left.length) {
        answer.push(arr[start].number);
        start++;
        i++;
    }

    while (j >= 0) {
        answer.push(arr[finish].number);
        finish--;
        j--;
    }

    process.stdout.write('Case #' + (test + 1) + ':');
    answer.forEach((x) => {
        process.stdout.write(' ' + x);
    });
    process.stdout.write('\n');


    test++;
}
