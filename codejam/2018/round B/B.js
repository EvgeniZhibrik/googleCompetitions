var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var lines = [];
var T = -1;
var test = 0;
var state = 0;
var S, arr, chips, rows;
rl.on('line', function (line) {
	var i, tempArr;
	if (state === 0) {
		T = +line;
		state = 1;
	} else if (state === 1) {
		S = +line;
		arr = [];
		state = 2;

	} else if (state === 2) {
		tempArr = line.split(' ').map(function (el) {
			return +el;
		});

		arr.push({
			M: tempArr[0] + tempArr[1],
			N: tempArr[0] - tempArr[2]
		});

		if (arr.length === S) {
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
	if (S < 3) {
		console.log('Case #' + (test + 1) + ': ' + S + ' ' + 1);
		test++;
		return;
	}

	var res = findMax(0, S, 1);

	console.log('Case #' + (test + 1) + ': ' + res.length + ' ' + res.count);
	test++;
}

function findMax(start, finish, minLength) {
	if (finish - start < minLength) {
		return {
			length: minLength,
			count: 0
		};
	}

	var i = Math.floor((finish + start) / 2);
	var oldCases = [{
		M: arr[i].M
	}, {
		N: arr[i].N
	}];
	var l = 0, r = 0, newMinLength = 1, right = true, left = true;
	while (i + r + 1 < finish && i - l > start && left && right) {
		var cases;
		r++;
		cases = [];

		oldCases.forEach(function (cas) {
			if (typeof cas.M === 'number' && typeof cas.N === 'number') {
				if (cas.M === arr[i + r].M || cas.N === arr[i + r].N) {
					cases.push(cas);
				}
			} else if (typeof cas.M === 'number') {
				if (cas.M === arr[i + r].M) {
					cases.push(cas);
				} else {
					cases.push({
						M: cas.M,
						N: arr[i + r].N
					});
				}
			} else if (typeof cas.N === 'number') {
				if (cas.N === arr[i + r].N) {
					cases.push(cas);
				} else {
					cases.push({
						N: cas.N,
						M: arr[i + r].M
					});
				}
			}
		});

		if (cases.length) {
			newMinLength++;
			oldCases = cases;
		} else {
			r--;
			right = false;
		}

		l++;
		cases = [];

		oldCases.forEach(function (cas) {
			if (typeof cas.M === 'number' && typeof cas.N === 'number') {
				if (cas.M === arr[i - l].M || cas.N === arr[i - l].N) {
					cases.push(cas);
				}
			} else if (typeof cas.M === 'number') {
				if (cas.M === arr[i - l].M) {
					cases.push(cas);
				} else {
					cases.push({
						M: cas.M,
						N: arr[i - l].N
					});
				}
			} else if (typeof cas.N === 'number') {
				if (cas.N === arr[i - l].N) {
					cases.push(cas);
				} else {
					cases.push({
						N: cas.N,
						M: arr[i - l].M
					});
				}
			}
		});

		if (cases.length) {
			newMinLength++;
			oldCases = cases;
		} else {
			l--;
			left = false;
		}
	}

	while (i + r + 1 < finish && right) {
		var cases;
		r++;
		cases = [];

		oldCases.forEach(function (cas) {
			if (typeof cas.M === 'number' && typeof cas.N === 'number') {
				if (cas.M === arr[i + r].M || cas.N === arr[i + r].N) {
					cases.push(cas);
				}
			} else if (typeof cas.M === 'number') {
				if (cas.M === arr[i + r].M) {
					cases.push(cas);
				} else {
					cases.push({
						M: cas.M,
						N: arr[i + r].N
					});
				}
			} else if (typeof cas.N === 'number') {
				if (cas.N === arr[i + r].N) {
					cases.push(cas);
				} else {
					cases.push({
						N: cas.N,
						M: arr[i + r].M
					});
				}
			}
		});

		if (cases.length) {
			newMinLength++;
			oldCases = cases;
		} else {
			r--;
			right = false;
		}
	}

	while (i - l > start && left) {
		var cases;
		l++;
		cases = [];

		oldCases.forEach(function (cas) {
			if (typeof cas.M === 'number' && typeof cas.N === 'number') {
				if (cas.M === arr[i - l].M || cas.N === arr[i - l].N) {
					cases.push(cas);
				}
			} else if (typeof cas.M === 'number') {
				if (cas.M === arr[i - l].M) {
					cases.push(cas);
				} else {
					cases.push({
						M: cas.M,
						N: arr[i - l].N
					});
				}
			} else if (typeof cas.N === 'number') {
				if (cas.N === arr[i - l].N) {
					cases.push(cas);
				} else {
					cases.push({
						N: cas.N,
						M: arr[i - l].M
					});
				}
			}
		});

		if (cases.length) {
			newMinLength++;
			oldCases = cases;
		} else {
			l--;
			left = false;
		}
	}
	if (newMinLength === finish - start) {
		return {
			length: newMinLength,
			count: 1
		};
	}

	if (r > l + 1) {
		r = l + 1;
	}
	if (l > r) {
		l = r;
	}
	var first = findMax(start, i + r, Math.max(newMinLength, minLength));
	var second = findMax(i - l + 1, finish, Math.max(newMinLength, minLength));
	var resultLength = Math.max(first.length, second.length);
	var result = resultLength === newMinLength ? 1 : 0;
	result += resultLength === first.length ? first.count : 0;
	result += resultLength === second.length ? second.count : 0;
	return {
		length: resultLength,
		count: result
	};

}