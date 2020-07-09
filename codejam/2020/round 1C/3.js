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


function runSolution() {
    const [N, D] = lines[0].split(' ').map((v) => +v);
    const slices = lines[1].split(' ').reduce((obj, v) => {
        if (!obj[v]) {
            obj[v] = 1;
        } else {
            obj[v]++;
        }
        return obj;
    }, {});

    const arr = Object.keys(slices).map((key) => ({
        value: +key,
        count: slices[key]
    }));

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].count >= D) {
            console.log('Case #' + (test + 1) + ': 0');
            test++;
            return;
        }
    }

    arr.sort((a, b) => {
        if (a.count === b.count) {
            return a.value - b.value;
        }
        return b.count - a.count;
    });

    let take = 1;
    let minC = D - 1;
    const mapping = {};
    while (take < minC + 1) {
        for (let i = 0; i < arr.length; i++) {
            let main = arr[i].value;
            if (mapping[arr[i].value / take]) {
                continue;
            } else {
                mapping[arr[i].value / take] = true;
            }
            let count = 0;
            let cuts = 0;
            if (arr[i].count * take > D + 1) {
                while (count < D) {
                    count += take;
                    cuts += take - 1;
                }
                if (count > D + 1) {
                    cuts -= (count - D - 1);
                }

                if (cuts < minC) {
                    minC = cuts;

                }
                continue;
            }
            if (arr[i].count * take >= D) {
                if (arr[i].count * (take - 1) < minC) {
                    minC = arr[i].count * (take - 1);

                }
                continue;
            }
            count = arr[i].count * take;
            cuts = arr[i].count * (take - 1);
            const cutArr = [];
            for (let j = 0; j < arr.length; j++) {
                if (j === i) {
                    continue;
                }
                if ((arr[j].value * take) % main === 0) {
                    cutArr.push({
                        slices: (arr[j].value * take) / main,
                        cuts: ((arr[j].value * take) / main) - 1,
                        count: arr[j].count
                    });
                } else if ((arr[j].value * take) > main) {
                    cutArr.push({
                        slices: Math.floor((arr[j].value * take) / main),
                        cuts: Math.floor((arr[j].value * take) / main),
                        count: arr[j].count
                    });
                }
            }
            cutArr.sort((a, b) => {
                if (a.cuts / a.slices === b.cuts / b.slices) {
                    return a.slices - b.slices;
                }
                return (a.cuts / a.slices) - (b.cuts / b.slices);
            });
            for (let index = 0; index < cutArr.length && cuts < minC; index++) {
                if (count + (cutArr[index].slices * cutArr[index].count) > D + 1) {
                    while (count < D) {
                        cuts += cutArr[index].cuts;
                        count += cutArr[index].slices;
                    }
                    if (count > D + 1) {
                        cuts -= count - D - 1;
                    }
                    if (cuts < minC) {
                        minC = cuts;

                    }
                    break;
                } else if (count + (cutArr[index].slices * cutArr[index].count) >= D ) {
                    count += (cutArr[index].slices * cutArr[index].count);
                    cuts += (cutArr[index].cuts * cutArr[index].count);
                    if (cuts < minC) {
                        minC = cuts;

                    }
                    break;
                } else {
                    count += (cutArr[index].slices * cutArr[index].count);
                    cuts += (cutArr[index].cuts * cutArr[index].count);
                }
            }
        }
        take++;
    }


    console.log('Case #' + (test + 1) + ': ' + minC);
    test++;
}
