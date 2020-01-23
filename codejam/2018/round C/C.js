var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var lines = [];
var T = -1;
var test = 0;
var state = 0;
var N, L, ants, table;
rl.on('line', function (line) {
	var i, tempArr;
	if (state === 0) {
		T = +line;
		state = 1;
	} else if (state === 1) {
		N = +line;

		state = 2;
	} else if (state === 2) {
		ants = line.split(' ').map(function (value) {
			return +value;
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

	var oldObj = {};
	oldObj[1] = ants[0];
	oldObj.max = 1;

	for (var i = 1; i < N; i++) {
		var newObj = {};
		newObj[1] = ants[i];
		newObj.max = 1;
		for (var j = 1; j <= oldObj.max; j++) {
			if (oldObj[j] && oldObj[j] <= ants[i] * 6 ) {
				newObj[j + 1] = oldObj[j] + ants[i];
				newObj.max = j + 1;
			}

			if (oldObj[j]) {
				if (!newObj[j] || newObj[j] > oldObj[j]) {
					newObj[j] = oldObj[j];
					if (newObj.max < j) {
						newObj.max = j;
					}
				}
			}
		}

		oldObj = newObj;
	}

	console.log('Case #' + (test + 1) + ': ' + oldObj.max);
	test++;
}
