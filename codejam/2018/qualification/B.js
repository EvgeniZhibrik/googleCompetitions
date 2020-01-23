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

	var arr = lines.shift().split(' ').map(function (el) {
		return +el;
	});

	var arr1 = [];
	var arr2 = [];

	for (var i = 0; i < N; i++) {
		if (i % 2 === 0) {
			arr1.push(arr.shift());
		} else {
			arr2.push(arr.shift());
		}
	}
	arr1.sort(function (a, b) {
		return a - b;
	});
	arr2.sort(function (a, b) {
		return a - b;
	});
	var flag = -1;
	for (var i = 0; i < N - 1; i++) {
		if (i % 2 === 0) {
			if (arr1[i / 2] > arr2[i / 2]) {
				flag = i;
				break;
			}
		} else {
			if (arr2[(i - 1) / 2] > arr1[(i + 1) / 2]) {
				flag = i;
				break;
			}
		}
	}
	var answer;
	if (flag >= 0) {
		answer = flag;
	} else {
		answer = 'OK';
	}

	console.log('Case #' + (test + 1) + ': ' + answer);
	test++;
}

