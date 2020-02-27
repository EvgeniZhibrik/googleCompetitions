const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const lines = [];
let T = -1;
let test = 0;
let R, C;
rl.on('line', function (line) {
	if (T < 0) {
		T = +line;
		return;
	}

	if (!R) {
		[R, C] = line.split(' ').map((v) => +v);
		return;
	}

	lines.push(line);

	if (lines.length === R && T) {
		runSolution();
		R = 0;
		T--;
	}

	if (T === 0) {
		rl.close();
	}
}).on('close', function () {
	process.exit(0);
});

function runSolution() {
	const arr = lines.map((line) => line.split('').map((v) => +v));



	console.log('Case #' + (test + 1) + ': ' + min);
	test++;
}
