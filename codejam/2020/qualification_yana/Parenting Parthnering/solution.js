const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let T = -1;
let N;
let activities = [];
let count = 1;

rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!N) {
        N = +line;
        return;
    }

    const tmp = line.split(' ');
    activities.push({
        start: +tmp[0],
        end: +tmp[1],
        ind: activities.length
    });

    if (activities.length === N && T) {
        runSolution();
        activities = [];
        N = null;
        T--;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    let JFinal = -1;
    let CFinal = -1;

    activities.sort((a, b) =>
       a.start - b.start
    );

    const resArr = [];
    let resStr = '';

    for (let i = 0; i < activities.length; i++) {
        if (JFinal <= activities[i].start) {
            JFinal = activities[i].end;
            resArr[activities[i].ind] = 'J';
            continue;
        }

        if (CFinal <= activities[i].start) {
            CFinal = activities[i].end;
            resArr[activities[i].ind] = 'C';
            continue;
        }

        resStr = 'IMPOSSIBLE';
        break;
    }

    console.log(`Case #${count}: ${resStr || resArr.join('')}`);
    count++;
}
