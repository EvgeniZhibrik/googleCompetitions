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

function myMin(a, b) {
    if (a.length !== b.length) {
        return a.length < b.length ? a : b;
    }

    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return +a[i] < +b[i] ? a : b;
        }
    }

    return a;
}

function mySub(a, b) {
    var c = '';

    var dec = 0;
    while (b.length < a.length) {
        b = '0' + b;
    }
    for (var i = a.length - 1; i >= 0; i--) {
        if (+a[i] - dec >= +b[i]) {
            c = '' + ((+a[i]) - dec - (+b[i])) + c;
            dec = 0;
        } else {
            c = '' + (10 + (+a[i]) - dec - (+b[i])) + c;
            dec = 1;
        }
    }

    while (c[0] === '0' && c.length > 1) {
        c = c.slice(1);
    }

    return c;
}

function runSolution() {
    var N = lines.shift();
    var M = '', m = '', n = '';
    var flag = false;
    for (var i = 0; i < N.length; i++) {
        if ((+N[i]) % 2 === 1 ) {
            flag = (N[i] === '9');
            break;
        }

    }

    if (i === N.length) {
        console.log('Case #' + (test + 1) + ': ' + 0);
        test++;
        return;
    }

    M += +N[i] + 1;
    m += +N[i] - 1;
    n += N[i];
    i++;
    for(; i < N.length; i++) {
        M += '0';
        m += '8';
        n += N[i];
    }

    var answer = flag ? mySub(n, m) : myMin(mySub(n, m), mySub(M, n));

    console.log('Case #' + (test + 1) + ': ' + answer);
    test++;
}
