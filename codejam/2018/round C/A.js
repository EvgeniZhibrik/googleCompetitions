var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var T = -1;
var test = 0;
var state = 0;
var N, L, letters, obj, counter, mask;
rl.on('line', function (line) {
	var i, tempArr;
	if (state === 0) {
		T = +line;
		state = 1;
	} else if (state === 1) {
		tempArr = line.split(' ');
		N = +tempArr[0];
		L = +tempArr[1];
		letters = [];
		for (i = 0; i < L; i++) {
			letters[i] = {};
		}
		obj = {};
		state = 2;
		counter = 0;
	} else if (state === 2) {
		for (i = 0; i < L; i++) {
			letters[i][line[i]] = true;
			obj[line.slice(0, i + 1)] = true;
		}
		counter++;

		if (counter === N) {
			mask = line;
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

	var oldBeginnings = letters[0];
	var i = 1;

	while (i < L) {
		var newBeginnings = {};

		for (var beg in oldBeginnings) {
			if (oldBeginnings.hasOwnProperty(beg)) {
				for (var end in letters[i]) {
					if (letters[i].hasOwnProperty(end)) {
						if (!obj[beg+end]) {
							console.log('Case #' + (test + 1) + ': ' + beg + end + mask.slice(i + 1));
							test++;
							return;
						}

						newBeginnings[beg+end] = true;
					}
				}
			}
		}

		oldBeginnings = newBeginnings;
		i++;
	}

	console.log('Case #' + (test + 1) + ': -');
	test++;
}
