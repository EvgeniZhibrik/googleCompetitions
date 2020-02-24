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
	if (lines.length === 2 && T) {
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
	var N = +lines.shift();
	var line = lines.shift();

	var arr = line.split('').map(function(val){
		return +val;
	});

	var sum = 0;
	var arr2 = [];
	var n = Math.ceil(N / 2);
	for (var i = 0; i < N; i++) {
		sum += arr[i];
		if (i >= n) {
			sum -= arr[i - n];
		}
		if (i >= n - 1) {
			arr2.push(sum);
		}
	}

	var answer = arr2[0];
	for (var i = 1; i < arr2.length; i++) {
		if (arr2[i] > answer) {
			answer = arr2[i];
		}
	}

	console.log('Case #' + (test + 1) + ': ' + answer);
	test++;
}
