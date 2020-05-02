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

let globalMin = Infinity;
function runSolution() {
    const [x, y] = lines[0].split(' ').map((v) => +v);
    globalMin = Infinity;
    let ans = findpath(0, 0, x, y, 1, '');

    console.log('Case #' + (test + 1) + ': ' + (ans ? ans : 'IMPOSSIBLE'));
    test++;
}


function findpath(x, y, targetX, targetY, level, path) {
    if (x === targetX && y === targetY) {
        return path;
    }

    if (level >= Math.pow(2, 50)) {
        return false;
    }

    if (path.length >= globalMin) {
        return false;
    }

    if ((x !== targetX && level >= Math.abs(2 * (x - targetX))) || (y !== targetY && level >= Math.abs(2 * (y - targetY)))) {
        return false;
    }

    const arr = ['N', 'S', 'E', 'W'];

    shuffle(arr);
    let minL = Infinity;
    let ans = false;
    let val;
    for (let i = 0; i < arr.length; i++) {
        switch (arr[i]) {
            case 'N':
                val = findpath(x, y + level, targetX, targetY, 2 * level, path + 'N');
                if (val && val.length < minL) {
                    minL = val.length;
                    ans = val;
                    if (minL < globalMin) {
                        globalMin = minL;
                    }
                }
                break;
            case 'S':
                val = findpath(x, y - level, targetX, targetY, 2 * level, path + 'S');
                if (val && val.length < minL) {
                    minL = val.length;
                    ans = val;
                    if (minL < globalMin) {
                        globalMin = minL;
                    }
                }
                break;
            case 'E':
                val = findpath(x + level, y, targetX, targetY, 2 * level, path + 'E');
                if (val && val.length < minL) {
                    minL = val.length;
                    ans = val;
                    if (minL < globalMin) {
                        globalMin = minL;
                    }
                }
                break;
            case 'W':
                val = findpath(x - level, y, targetX, targetY, 2 * level, path + 'W');
                if (val && val.length < minL) {
                    minL = val.length;
                    ans = val;
                    if (minL < globalMin) {
                        globalMin = minL;
                    }
                }
                break;
        }


    }

    return ans;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
