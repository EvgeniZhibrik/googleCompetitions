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
	if (lines.length && T) {
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

	var D = line.split(' ')[0];
	D = +D;
	var P = line.split(' ')[1];

	var sum = 0, dam = 1, c = 0, arr = [0], turns = 0;

	for (var i = 0; i < P.length; i++) {
		if (P[i] === 'S') {
			sum += dam;
			arr[c]++;
		}
		if (P[i] === 'C') {
			c++;
			arr[c] = 0;
			dam *= 2;
		}
	}

	while (sum > D) {
		var level;
		for (var j = arr.length - 1; j >= 0; j--) {
			if (arr[j] > 0) {
				level = j;
				break;
			}
		}
		if (level > 0) {
			var x = Math.pow(2, level);
			sum -= x / 2;
			turns++;
			arr[level]--;
			arr[level - 1]++;
		} else {
			break;
		}
	}
	var answer = sum <= D ? turns : 'IMPOSSIBLE';

	console.log('Case #' + (test + 1) + ': ' + answer);
	test++;
}
