var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var T = -1;
var state = 0;
rl.on('line', function (line) {
	if (state === 0) {
		T = +line;
		state = 1;
		return;
	}

	if (state === 1) {
		initModel(line);
		state = 2;
		return;
	}

	if (state === 2) {
		state = 3;
		makeMove();
		return;
	}

	switch (line) {
		case 'CORRECT':
			T--;
			state = 1;
			break;
		case 'WRONG_ANSWER':
			rl.close();
			break;
		default:
			changeModel(line);
			makeMove();
			break;
	}
	if (T === 0) {
		rl.close();
	}
}).on('close', function () {
	process.exit(0);
});

var Model = {
};

function initModel(line) {
	Model.A = +line.split(' ')[0];
	Model.B = +line.split(' ')[1];
}

function makeMove() {
	console.log(Math.ceil((Model.A + Model.B) / 2));
}

function changeModel(line) {
	switch (line) {
		case 'TOO_SMALL':
			Model.A = Math.ceil((Model.A + Model.B) / 2);
			break;
		case 'TOO_BIG':
			Model.B = Math.ceil((Model.A + Model.B) / 2) - 1;
			break;
		default:
			break;
	}
}
