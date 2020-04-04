const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T = -1;
let S;
let count = 1;

rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!S) {
        S = line;
        runSolution();
        S = '';
        T--;
        return;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function getBracesCount(count, braceChar) {
    let str = '';
    let absCount = Math.abs(count);
    for (let i = 0; i < absCount; i++) {
        str += braceChar;
    }
    return str;
}

function runSolution() {
    const nums = S.split('');
    let braces = `${getBracesCount(nums[0], '(')}${nums[0]}`;
    for (let i = 1; i < nums.length; i++) {
        braces += `${getBracesCount(nums[i] - nums[i - 1], nums[i] - nums[i - 1] < 0 ? ')' : '(')}${nums[i]}`
    }

    braces += `${getBracesCount(nums[nums.length - 1], ')')}`;

    console.log(`Case #${count}: ${braces}\n`);
    count++;
}
