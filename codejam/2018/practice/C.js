var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var lines = [];
var T;
var status = 0;
var test = 0;
var N, D, horses;
rl.on('line', function (line) {
	if (status === 0) {
		T = +line;
		status = 1;
		return;
	}

	if (status === 1) {
		D = +line.split(' ')[0];
		N = +line.split(' ')[1];
		horses = [];
		status = 2;
		return;
	}

	if (status === 2) {
		horses.push({
			K: +line.split(' ')[0],
			S: +line.split(' ')[1]
		});
		N--;
		if (!N) {
			runSolution();
			T--;
			status = 1;
		}
	}
	if (T === 0) {
		rl.close();
	}
}).on('close', function () {
	process.exit(0);
});

function runSolution() {
	var maxT = 0;

	horses.forEach(function (horse) {
		var time = (D - horse.K) / horse.S;
		if (time > maxT) {
			maxT = time;
		}
	});

	var answer = D / maxT;

	console.log('Case #' + (test + 1) + ': ' + answer);
	test++;
}
