var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var T = -1;
var test = 0;
var state = 0;

var C, columns;

rl.on('line', function (line) {
	if (state === 0) {
		T = +line;
		state = 1;
	} else if (state === 1) {
		C = +line;
		state = 2;
	} else if (state === 2) {
		columns = line.split(' ');
		columns = columns.map(function(col) {
			return +col;
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
	if (!columns[0] || !columns[columns.length - 1]) {
		console.log('Case #' + (test + 1) + ': IMPOSSIBLE');
		test++;
		return;
	}

	var rowsCount = 1;

	var curBall = 0;
	var curColNum = 0;

	var playArr = [];

	while (curColNum < columns.length) {
		var curColVal = columns[curColNum];
		var firstBall;
		if (curColVal) {
			var leftRowsCount = curColNum - curBall;
			if (leftRowsCount > rowsCount) {
				rowsCount = leftRowsCount + 1;
			}

			var rightRowsCount = curBall + curColVal - 1 - curColNum;
			if (rightRowsCount > rowsCount) {
				rowsCount = rightRowsCount + 1;
			}


			firstBall = curBall;
			curBall += curColVal;
			playArr[curColNum] = {
				firstBall: firstBall,
				lastBall: curBall - 1,
				colInd: curColNum
			};
		}

		curColNum++;
	}

	var output = [];

	for (var i = 0; i < rowsCount - 1; i++) {
		output.push([]);
		for (var j = 0; j < columns.length; j++) {
			if(playArr[j]) {
				if (playArr[j].lastBall - i > j) {
					output[i][playArr[j].lastBall - i] = '/';
				}
				if (j > playArr[j].firstBall + i) {
					output[i][playArr[j].firstBall + i] = '\\';

				}
			}
		}
	}
	output.push([]);

	console.log('Case #' + (test + 1) + ': ' + rowsCount);

	for (var i = 0; i < rowsCount; i++) {
		var str = '';
		for (var j = 0; j < columns.length; j++) {
			if (!output[i][j]) {
				str += '.';
			} else {
				str += output[i][j];
			}
		}
		console.log(str);
	}

	test++;
}
