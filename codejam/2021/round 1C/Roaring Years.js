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
    let min = BigInt('1000000000000000000000');
    let current = BigInt(lines[0]);

    for (let len = lines[0].length; len <= lines[0].length + 1 && min === BigInt('1000000000000000000000'); len++) {
        for (let startLen = 1; startLen < len / 2 + 1; startLen++) {
            for (let nextLenCount = 0; nextLenCount <= len / (startLen + 1); nextLenCount++) {
                if ((len - (nextLenCount * (startLen + 1))) % startLen === 0) {
                    if (nextLenCount === 0) {
                        if (startLen > 1 || len <= 9) {
                            let start = +lines[0].slice(0, startLen);
                            let finish = Math.pow(10, startLen) - (len / startLen);
                            for (let i = start; i <= finish; i++) {
                                let j = i + 1;
                                let str = `${i}${j}`;
                                while (str.length < len) {
                                    j++;
                                    str = `${str}${j}`;
                                }
                                if (str.length > len) {
                                    continue;
                                }
                                let value = BigInt(str);
                                if (value > current) {
                                    if(value < min) {
                                        min = value;
                                    }

                                    break;
                                }
                            }
                        }
                    } else {
                        let i = Math.pow(10, startLen) - ((len - (nextLenCount * (startLen + 1))) / startLen);
                        if (i <= 0) {
                            continue;
                        }
                        let j = i + 1;
                        let str = `${i}${j}`;
                        while (str.length < len) {
                            j++;
                            str = `${str}${j}`;
                        }
                        if (str.length > len) {
                            continue;
                        }
                        let value = BigInt(str);
                        if (value > current && value < min) {
                            min = value;
                        }
                    }
                }
            }
        }
    }


    console.log('Case #' + (test + 1) + ': ' + min);
    test++;
}
