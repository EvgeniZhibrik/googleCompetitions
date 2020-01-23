var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var T = -1;
var state = 0, N, counter, arr, sold;
rl.on('line', function (line) {
	if (state === 0) {
		T = +line;
		state = 1;
		return;
	}

	if (state === 1) {
		N = +line;
		arr = [];
		sold = [];
		for (var i = 0; i < N; i++) {
			arr[i] = 0;
			sold[i] = false;
		}
		state = 2;
		counter = 0;
		return;
	}

	switch (line) {
		case '-1':
			rl.close();
			break;
		default:
			makeMove(line);
			counter++;
			break;
	}

	if (counter === N) {
		state = 1;
		T--;
	}

	if (T === 0) {
		rl.close();
	}
}).on('close', function () {
	process.exit(0);
});

function makeMove(line) {
	var tempArr = line.split(' ').map(function (el) {
		return +el;
	});
	tempArr.shift();

	var min = Infinity;
	var index = -1;
	tempArr.forEach(function (el) {
		if (!sold[el]) {
			arr[el]++;
			if (arr[el] < min) {
				min = arr[el];
				index = el;
			}
		}
	});

	if (index > -1) {
		sold[index] = true;
	}

	console.log(index);
}
