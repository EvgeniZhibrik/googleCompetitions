var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var T = -1;
var test = 0;
var state = 0;

var N, grid;

rl.on('line', function (line) {
	if (state === 0) {
		T = +line;
		state = 1;
	} else if (state === 1) {
		N = +line;
		grid = [];
		state = 2;
	} else if (state === 2) {
		grid.push(line.split(' ').map(function(col) {
			return +col;
		}));
		if (grid.length === N) {
			runSolution();
			T--;
			state = 1;
		}
	}

	if (T === 0) {
		rl.close();
	}
}).on('close', function () {
	process.exit(0);
});

function runSolution() {
	var answer = 0;
	var marks = [];
	var sum = 0;
	for (var i = 0; i < N; i++) {
		marks[i] = [];
		for (var j = 0; j < N; j++) {
			marks[i][j] = {
				count: 0,
				list: []
			};
			for (var k = 1; k < N; k++) {
				if (i + k < N && grid[i][j] === grid[i + k][j]) {
					marks[i][j].count++;
					sum++;
					marks[i][j].list.push([i + k, j]);
				}
				if (i - k >= 0 && grid[i][j] === grid[i - k][j]) {
					marks[i][j].count++;
					sum++;
					marks[i][j].list.push([i - k, j]);
				}
				if (j + k < N && grid[i][j] === grid[i][j + k]) {
					marks[i][j].count++;
					sum++;
					marks[i][j].list.push([i, j + k]);
				}
				if (j - k >= 0 && grid[i][j] === grid[i][j - k]) {
					marks[i][j].count++;
					sum++;
					marks[i][j].list.push([i, j - k]);
				}
			}
		}
	}

	while (sum) {
		var max = 0;
		var coord;
		for (var i = 0; i < N; i++) {
			for (var j = 0; j < N; j++) {
				if (marks[i][j].count > max) {
					max = marks[i][j].count;
					coord = [i, j];
				}
			}
		}

		marks[coord[0]][coord[1]].count = 0;
		sum -= max;
		marks[coord[0]][coord[1]].list.forEach(function (co) {
			if (marks[co[0]][co[1]].count) {
				marks[co[0]][co[1]].count--;
				sum--;
			}
		});
		answer++;
	}
	console.log('Case #' + (test + 1) + ': ' + answer);
	test++;
}
