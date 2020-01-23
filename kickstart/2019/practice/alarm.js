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
    if (lines.length === 1 && T) {
        runSolution();
        T--;
    }
    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function saveMul(a, b) {
    if (a < b) {
        a = a + b;
        b = a - b;
        a = a - b;
    }
    if (b === 1) {
        return a;
    }
    var ans = 0;
    var c = Math.min(Math.floor(1000000007 / a), b);
    var forDst = Math.floor(b / c);
    for (var i = 0; i < forDst; i++) {
        ans += a * c;
        ans %= 1000000007;
    }
    ans += a * (b % c);
    ans %= 1000000007;
    return ans;
}

function savePow(a, b) {
    var ans = 1;
    var pow = Math.min(b, Math.floor(Math.log(1000000007) / Math.log(a)));

    var forDst = Math.floor(b / pow);
    var arg = Math.pow(a, pow);
    for (var i = 0; i < forDst; i++) {
        ans = saveMul(ans, arg);
    }
    ans = saveMul(ans, Math.pow(a, b % pow));
    return ans;
}

var geomBuffer = [];
for (var i = 0; i < 1000000; i++) {
    geomBuffer[i] = [];
}

function geomProg(a, k) {
    if (a === 1) {
        return k;
    }
    if (geomBuffer[a - 1][k - 1] || geomBuffer[a - 1][k - 1] === 0) {
        return geomBuffer[a - 1][k - 1];
    }
    var d = 1;
    while (geomBuffer[a - 1][d - 1] || geomBuffer[a - 1][d - 1] === 0) {
        d++;
    }
    var sum = d > 1 ? geomBuffer[a - 1][d - 2] : 0;
    for (var c = d; c <= k; c++) {
        sum = (sum + savePow(a, c)) % 1000000007;
        geomBuffer[a - 1][c - 1] = sum;
    }
    return geomBuffer[a - 1][k - 1];
}

function runSolution() {
    var line = lines.shift().split(' ').map(function (val) {
        return +val;
    });

    var N = line[0];
    var K = line[1];
    var x = [line[2]];
    var y = [line[3]];
    var C = line[4];
    var D = line[5];
    var E1 = line[6];
    var E2 = line[7];
    var F = line[8];
    var A = [];

    for (var i = 0; i < N; i++) {
        A[i] = (x[i] + y[i]) % F;
        x[i + 1] = ((C * x[i]) + (D * y[i]) + E1) % F;
        y[i + 1] = ((D * x[i]) + (C * y[i]) + E2) % F;
    }

    var answer = 0;
    for (var i = 0; i < N; i++) {
        var z = saveMul((N - i), A[i]);
        var sum = 0;
        for (var j = 0; j <= i; j++) {
            sum = (sum + geomProg(j + 1, K)) % 1000000007;
        }
        answer = (answer + saveMul(z, sum)) % 1000000007;
    }

    console.log('Case #' + (test + 1) + ': ' + answer);
    test++;
}
