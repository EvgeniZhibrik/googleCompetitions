var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var lines = [];
var T = -1;
var test = 0;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
    } else {
        lines.push(line);
    }
    if (lines.length === 3 && T) {
        runSolution();
        T--;
    }
    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    var line = lines.shift();
    var L = +line;

    line = lines.shift();
    var dict = line.split(' ').map(function (value) {
        return {
            start
        };
    });

    line = lines.shift();
    var arr = line
        .split(' ')
        .map(function (value) {
            return +value;
        })
        .sort(function(a, b) {
            return b - a;
        });

    arr = arr.reduce(function (previousValue, currentValue, currentIndex) {
        if (!previousValue.length) {
            previousValue.push({
                val: currentValue,
                count: 1
            });
            return previousValue;
        }

        var ind = previousValue.length - 1;
        if (previousValue[ind].val === currentValue) {
            previousValue[ind].count++;
        } else {
            previousValue.push({
                val: currentValue,
                count: 1
            });
        }
        return previousValue;
    }, []);

    var maxValues = arr[0].count;
    var mean = 0;
    var prob = arr.map(function (value) {
        mean += value.val * value.count / N;
        return 1 / N;
    });

    var answer = 0;

    for (var j = 0; j < K; j++) {
        var counter = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].val >= mean) {
                counter += arr[i].count;
            } else {
                break;
            }
        }

        if (counter === N) {
            break;
        }

        if (counter === maxValues) {
            var times = K - j;
            var sum = 0;
            for(var i = 1; i < arr.length; i++) {
                prob[i] *= Math.pow((N - maxValues)/ N, times);
                sum += prob[i] * arr[i].count;
            }
            prob[0] = (1 - sum) / maxValues;

            break;
        }

        var newMean = 0;
        for (var i = 0; i < arr.length; i++) {
            prob[i] *= (N - counter) / N;
            if (arr[i].val >= mean) {
                prob[i] += 1/N;
            }
            newMean += arr[i].val * arr[i].count * prob[i];
        }
        mean = newMean;
    }

    answer = arr.reduce(function (previousValue, currentValue, currentIndex) {
        return previousValue + (currentValue.val * currentValue.count * prob[currentIndex]);
    }, 0);
    console.log('Case #' + (test + 1) + ': ' + answer);
    test++;
}
