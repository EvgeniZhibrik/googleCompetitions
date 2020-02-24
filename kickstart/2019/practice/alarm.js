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
	while (a < 0) {
		a += 1000000007;
	}

	while (b < 0) {
		b += 1000000007;
	}
    return (a * b) % 1000000007;
}

function savePow(a, b) {
	var res = a;
	for (; b > 1; b--) {
		res = saveMul(res, a);
	}
	return res;
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
    	var maxPos = i + 1;

    	var sum = saveMul(N - i, K);
    	for (var pos = 2; pos <= maxPos; pos++) {
    		var agg = saveMul(pos, savePow(pos, K) - 1);
    		agg /= (pos - 1);
    		agg = saveMul(agg, N - pos + 1);
    		sum = (sum + agg) % 1000000007;
	    }
    	answer = (answer + saveMul(A[i], sum)) % 1000000007;
    }

    console.log('Case #' + (test + 1) + ': ' + answer);
    test++;
}
