const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1;
let N, Q;
let str;

rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!N) {
        [N, Q] = line.split(' ').map((v) => +v);
        return;
    }

    if (!str) {
        str = line;
        return;
    }

    lines.push(line);

    if (lines.length === Q) {
        runSolution();
        N = 0;
        Q = 0;
        str = '';
        lines = [];
        T--;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

let count = 1;
function runSolution() {
    let yesAnswersCount = 0;

    const objDictionary = {};
    const strLength = str.length;
    for (let i = 0; i < strLength; i++) {
        if (objDictionary[str[i]]) {
            objDictionary[str[i]].push(i);
            continue;
        }
        objDictionary[str[i]] = [i];
    }

    const coolDictionary = {};
    for (let key in objDictionary) {
        coolDictionary[key] = {
            count: objDictionary[key].length,
            arr: []
        };

        const keyLength = objDictionary[key].length;
        let count = 0;
        for (let i = 0; i < keyLength; i++) {
            let j = i ? objDictionary[key][i - 1] + 1 : 0;
            while (j < objDictionary[key][i]) {
                coolDictionary[key].arr.push({
                    before: count,
                    after: keyLength - count
                });
                j++;
            }
            coolDictionary[key].arr.push({
                before: count,
                after: keyLength - count - 1
            });
            count++;
        }

        let j = objDictionary[key][keyLength - 1] + 1;
        while (j <= N) {
            coolDictionary[key].arr.push({
                before: keyLength,
                after: 0
            });
            j++;
        }


    }

    lines.forEach((line) => {
        const [L, R] = line.split(' ').map((v) => +v);
        let oddCount = 0;
        let allBad = false;

        for (let key in objDictionary) {
            const obj = coolDictionary[key];
            let countLetters = obj.count - obj.arr[L - 1].before - obj.arr[R - 1].after;

            oddCount = countLetters % 2 === 0 ? oddCount : oddCount + 1;

            if (oddCount > 1) {
                allBad = true;
                break;
            }

            if ((R - L + 1) % 2 === 0 && oddCount === 1) {
                allBad = true;
                break;
            }
        }

        yesAnswersCount = allBad ? yesAnswersCount : yesAnswersCount + 1;
    });

    console.log(`Case #${count}: ${yesAnswersCount}`);
    count++;
}
