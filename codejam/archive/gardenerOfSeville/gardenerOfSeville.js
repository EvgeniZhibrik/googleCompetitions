var fs = require('fs');
var contents = fs.readFileSync('C-large-practice.in', 'utf8');
// const contents = fs.readFileSync('e_high_bonus.in', 'utf8');

var lines = contents.split('\n');
var T = +lines[0];

lines.shift();
lines.pop();

var answers = [];

for (var t = 0; t < T; t++) {
	console.log(t + 1);
	var line = lines.shift();
	line = line.split(' ');

	var R = +line[0];
	var C = +line[1];

	line = lines.shift();
	var arr = line.split(' ').map(function (el) {
		return +el - 1;
	});

	var x = findSolution(R, C, arr);

	answers.push(x);
	//answers.push(answer);

}

fs.writeFileSync('C-large-practice.out', answers.map(function (ans,ind) {
	return 'Case #' + (ind+1) + ':\n' + ans;
}).join('\n'), 'utf8');

function findSolution(r, c, arr) {
	var brackets = [];
	var pairs = {};
	for (var i = 0; i < arr.length; i++) {
		if (i % 2 === 0) {
			if (arr[i] > arr[i + 1]) {
				var temp = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = temp;
			}
			pairs['' + arr[i] + '_' + arr[i + 1]] = true;
			brackets[arr[i]] = '(';
		} else {
			brackets[arr[i]] = ')';
		}
	}

	var count = 0;
	var numbers = [];
	for (var i = 0; i < brackets.length; i++) {
		numbers[i] = i;
		if (brackets[i] === '(') {
			count++;
		} else if (count > 0) {
			count--;
		} else {
			return 'IMPOSSIBLE';
		}
	}

	var map = [];
	for (var i = 0; i < r; i++) {
		map[i] = [];
	}
	var success = true;
	for (var t = 0; t < brackets.length - 1; t++) {
		if (brackets[t] === '(' && brackets[t + 1] === ')') {
			if (!pairs['' + numbers[t] + '_' + numbers[t + 1]]) {
				return 'IMPOSSIBLE';
			}
			success = addPathToMap(numbers[t], numbers[t + 1], r, c, map);
			brackets.splice(t, 2);
			numbers.splice(t, 2);
			t = -1;
			if (!success) {
				return 'IMPOSSIBLE';
			}
		}
	}

	for (var i = 0; i < r; i++) {
		for (var j = 0; j < c; j++) {
			if(!map[i][j]) {
				map[i][j] = '/';
			}
		}
	}

	return map.map(function (row) {
		return row.join('');
	}).join('\n');
}

function addPathToMap(from, to, r, c, map) {
	var half = Math.floor(from / (r + c));
	var side = half === 0 ? from : (from - (r + c));
	var start = (2 * half) + (side >= c ? 1 : 0);
	var iStart, jStart, destStart;
	if (half === 0) {
		if (side < c) {
			iStart = 0;
			jStart = side;
			destStart = 'd';
		} else {
			jStart = c - 1;
			iStart = side - c;
			destStart = 'l';
		}
	} else {
		if (side < c) {
			iStart = r - 1;
			jStart = c - side - 1;
			destStart = 'u';
		} else {
			jStart = 0;
			iStart = r - (side - c) - 1;
			destStart = 'r';
		}
	}

	half = Math.floor(to / (r + c));
	side = half === 0 ? to : (to - (r + c));
	var iFinish, jFinish;
	if (half === 0) {
		if (side < c) {
			iFinish = -1;
			jFinish = side;
		} else {
			jFinish = c;
			iFinish = (side - c);
		}
	} else {
		if (side < c) {
			iFinish = r;
			jFinish = c - side - 1;
		} else {
			jFinish = -1;
			iFinish = r - (side - c) - 1;
		}
	}

	return tryToFindPath(iStart, jStart, iFinish, jFinish, destStart, r, c, map, start);

}

function tryToFindPath(iStart, jStart, iFinish, jFinish, destStart, r, c, map, start) {
	if (iStart === iFinish && jStart === jFinish) {
		return true;
	}

	if (iStart < 0 || iStart >= r || jStart < 0 || jStart >= c) {
		return false;
	}

	if (map[iStart][jStart]) {
		switch (destStart) {
			case 'u':
				if (map[iStart][jStart] === '/') {
					return tryToFindPath(iStart, jStart + 1, iFinish, jFinish, 'r', r, c, map, start);
				} else {
					return tryToFindPath(iStart, jStart - 1, iFinish, jFinish, 'l', r, c, map, start);
				}
			case 'd':
				if (map[iStart][jStart] === '/') {
					return tryToFindPath(iStart, jStart - 1, iFinish, jFinish, 'l', r, c, map, start);
				} else {
					return tryToFindPath(iStart, jStart + 1, iFinish, jFinish, 'r', r, c, map, start);
				}
			case 'l':
				if (map[iStart][jStart] === '/') {
					return tryToFindPath(iStart + 1, jStart, iFinish, jFinish, 'd', r, c, map, start);
				} else {
					return tryToFindPath(iStart - 1, jStart, iFinish, jFinish, 'u', r, c, map, start);
				}
			case 'r':
				if (map[iStart][jStart] === '/') {
					return tryToFindPath(iStart - 1, jStart, iFinish, jFinish, 'u', r, c, map, start);
				} else {
					return tryToFindPath(iStart + 1, jStart, iFinish, jFinish, 'd', r, c, map, start);
				}
			default:
				return false;
		}
	} else {
		switch (destStart) {
			case 'u':
				var x;
				//if (start === 2 || start === 3) {
					map[iStart][jStart] = '\\';
					x = tryToFindPath(iStart, jStart - 1, iFinish, jFinish, 'l', r, c, map, start);
					if (x) {
						return true;
					}

					map[iStart][jStart] = '/';
					return tryToFindPath(iStart, jStart + 1, iFinish, jFinish, 'r', r, c, map, start);

				/*} else {
					map[iStart][jStart] = '/';
					x = tryToFindPath(iStart, jStart + 1, iFinish, jFinish, 'r', r, c, map, start);
					if (x) {
						return true;
					}

					map[iStart][jStart] = '\\';
					return tryToFindPath(iStart, jStart - 1, iFinish, jFinish, 'l', r, c, map, start);

				}*/
			case 'd':
				var x;
				/*if (start === 2 || start === 3) {
					map[iStart][jStart] = '/';
					x = tryToFindPath(iStart, jStart - 1, iFinish, jFinish, 'l', r, c, map, start);
					if (x) {
						return true;
					}

					map[iStart][jStart] = '\\';
					return tryToFindPath(iStart, jStart + 1, iFinish, jFinish, 'r', r, c, map, start);

				} else {*/
					map[iStart][jStart] = '\\';
					x = tryToFindPath(iStart, jStart + 1, iFinish, jFinish, 'r', r, c, map, start);
					if (x) {
						return true;
					}

					map[iStart][jStart] = '/';
					return tryToFindPath(iStart, jStart - 1, iFinish, jFinish, 'l', r, c, map, start);

				//}
			case 'l':
				var x;
				/*if (start === 0 || start === 3) {
					map[iStart][jStart] = '\\';
					x = tryToFindPath(iStart - 1, jStart, iFinish, jFinish, 'u', r, c, map, start);
					if (x) {
						return true;
					}

					map[iStart][jStart] = '/';
					return tryToFindPath(iStart + 1, jStart, iFinish, jFinish, 'd', r, c, map, start);

				} else {*/
					map[iStart][jStart] = '/';
					x = tryToFindPath(iStart + 1, jStart, iFinish, jFinish, 'd', r, c, map, start);
					if (x) {
						return true;
					}

					map[iStart][jStart] = '\\';
					return tryToFindPath(iStart - 1, jStart, iFinish, jFinish, 'u', r, c, map, start);

				//}
			case 'r':
				var x;
				//if (start === 0 || start === 3) {
					map[iStart][jStart] = '/';
					x = tryToFindPath(iStart - 1, jStart, iFinish, jFinish, 'u', r, c, map, start);
					if (x) {
						return true;
					}

					map[iStart][jStart] = '\\';
					return tryToFindPath(iStart + 1, jStart, iFinish, jFinish, 'd', r, c, map, start);

				/*} else {
					map[iStart][jStart] = '\\';
					x = tryToFindPath(iStart + 1, jStart, iFinish, jFinish, 'd', r, c, map, start);
					if (x) {
						return true;
					}

					map[iStart][jStart] = '/';
					return tryToFindPath(iStart - 1, jStart, iFinish, jFinish, 'u', r, c, map, start);

				}*/
			default:
				return false;
		}
	}
}