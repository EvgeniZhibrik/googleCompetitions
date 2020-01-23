var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var lines = [];
var T = -1;
var test = 0;
var state = 0;
var R, C, H, V, arr, chips, rows;
rl.on('line', function (line) {
	var i, tempArr;
	if (state === 0) {
		T = +line;
		state = 1;
	} else if (state === 1) {
		tempArr = line.split(' ');
		R = +tempArr[0];
		C = +tempArr[1];
		H = +tempArr[2];
		V = +tempArr[3];

		arr = [];
		for (i = 0; i < R; i++) {
			arr[i] = [];
		}
		state = 2;
		rows = 0;
		chips = 0;
	} else if (state === 2) {
		tempArr = line.split('');
		for (i = 0; i < C; i++) {
			arr[rows][i] = tempArr[i] === '@' ? true : false;
			if (arr[rows][i]) {
				chips++;
			}
		}
		rows++;
		if (rows === R) {
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
	var answer, piece, cutting = [[0], [0]];
	var each = chips / ((V + 1) * (H + 1));
	if (Math.floor(each) < each) {
		answer = 'IMPOSSIBLE';
		console.log('Case #' + (test + 1) + ': ' + answer);
		test++;
		return;
	} else {
		piece = chips / (H + 1);
		var sum = 0, cut = 0;
		for (var i = 0; i < R; i++){
			for (var j = 0; j < C; j++) {
				if (arr[i][j]) {
					sum++;
				}
			}
			if (sum === (cut + 1) * piece) {
				cut++;
				cutting[0].push(i + 1);
			} else if (sum > (cut + 1) * piece) {
				answer = 'IMPOSSIBLE';
				console.log('Case #' + (test + 1) + ': ' + answer);
				test++;
				return;
			}
		}

		if (!answer) {
			piece = chips / (V + 1);
			var sum = 0, cut = 0;
			for (var j = 0; j < C; j++){
				for (var i = 0; i < R; i++) {
					if (arr[i][j]) {
						sum++;
					}
				}
				if (sum === (cut + 1) * piece) {
					cutting[1].push(j + 1);
					cut++;
				} else if (sum > (cut + 1) * piece) {
					answer = 'IMPOSSIBLE';
					console.log('Case #' + (test + 1) + ': ' + answer);
					test++;
					return;
				}
			}

			if (!answer) {
				for (var limI = 0; limI < cutting[0].length - 1; limI++) {
					for (var limJ = 0; limJ < cutting[1].length - 1; limJ++) {
						sum = 0;
						for (var i = cutting[0][limI]; i < cutting[0][limI + 1]; i++) {
							for (var j = cutting[1][limJ]; j < cutting[1][limJ + 1]; j++) {
								if (arr[i][j]) {
									sum++;
								}
							}
						}
						if (sum !== each) {
							answer = 'IMPOSSIBLE';
							console.log('Case #' + (test + 1) + ': ' + answer);
							test++;
							return;
						}
					}
				}
			}
		}
	}

	answer = 'POSSIBLE';
	console.log('Case #' + (test + 1) + ': ' + answer);
	test++;
}
