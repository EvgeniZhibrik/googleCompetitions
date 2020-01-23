var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var lines = [];
var T = -1;
var test = 0;
var state = 0;
var N, L, arr, chips, rows;
rl.on('line', function (line) {
	var i, tempArr;
	if (state === 0) {
		T = +line;
		state = 1;
	} else if (state === 1) {
		tempArr = line.split(' ');
		N = +tempArr[0];
		L = +tempArr[1];

		state = 2;

	} else if (state === 2) {
		arr = line.split(' ').map(function(el) {
			return {
				x: +el
			};
		});

		runSolution();
		T--;
		state = 1;
	}

	if (T === 0) {
		rl.close();
	}
}).on('close', function () {
	process.exit(0);
});

function runSolution() {

	if (100 % N === 0) {
		console.log('Case #' + (test + 1) + ': 100');
		test++;
		return;
	}

	var sum = 0;
	var votes = N;
	for (var i = 0; i < L; i++) {
		var r = (100 * arr[i].x) % N;
		if (r >= (N / 2) || r === 0) {
			arr[i].alpha = 0;
		} else {
			arr[i].alpha = Math.ceil((N - 2 * r) / (2 * (100 % N)));
		}
		sum += arr[i].alpha;
		votes -= arr[i].x;
	}

	arr.sort(function(a, b) {
		return a.alpha - b.alpha;
	});

	var addition = Math.ceil(N / (2 * (100 % N)));

	while (votes > sum) {
		arr.push({
			x: 0,
			alpha: addition
		});
		sum += addition;
	}

	i = 0;
	while (votes > 0) {
		if (votes >= arr[i].alpha) {
			arr[i].x += arr[i].alpha;
			votes -= arr[i].alpha;
			i++;
		} else {
			arr[i].x += votes;
			votes = 0;
			i++;
		}
	}

	var answer = 0;
	for (var i = 0; i < arr.length; i++) {
		answer += Math.round(100 * arr[i].x / N);
	}

	console.log('Case #' + (test + 1) + ': ' + answer);
	test++;
}
