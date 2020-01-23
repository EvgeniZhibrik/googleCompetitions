var fs = require('fs');
var contents = fs.readFileSync('B-large-practice.in', 'utf8');
// const contents = fs.readFileSync('e_high_bonus.in', 'utf8');

var lines = contents.split('\n');
var T = +lines[0];

lines.shift();
lines.pop();

var answers = [];

for (var t = 0; t < T; t++) {
	console.log(t + 1);
	var line = lines.shift();

	var C = +line;

	var tours = {};
	for (var i = 0; i < 2*C; i++) {
		var line = lines.shift().split(' ');
		tours['' + Math.floor(i / 2) + '_' + (i % 2)] = {
			from: Math.floor(i / 2),
			to: +line[0] - 1,
			startsAt: +line[1],
			duration: +line[2],
			arrivesAt: ((+line[1]) + (+line[2])) % 24
		};
	}

	var edges = [];
	var indexes = [];

	for (var p = 0; p < P; p++) {
		edges.push(lines.shift().split(' ').map(function (el) {
			return +el - 1;
		}));

		indexes[p] = p;
		map[edges[p][0]][p] = -1;
		map[edges[p][1]][p] = 1;

	}

	var x = findSolution(map, indexes);

	if (x === 'IMPOSSIBLE') {
		answers.push(x);
	} else {
		answers.push(x.join(' '));
	}
	//answers.push(answer);

}

fs.writeFileSync('B-large-practice.out', answers.map(function (ans,ind) {
	return 'Case #' + (ind+1) + ': ' + ans;
}).join('\n'), 'utf8');

function findSolution(map, indexes) {
	var row;
	for (var i = 0; i < map.length; i++) {
		row = -1;
		var col = -1;
		for (var k = i; k < map.length; k++) {
			for (var j = i; j < map[i].length; j++) {
				if (map[k][j] !== 0) {
					row = k;
					col = j;
					break;
				}
			}
			if (row >= 0) {
				break;
			}
		}
		if (col < 0) {
			break;
		}

		if (row > i) {

			for (var j = 0; j < map[i].length; j++) {
				var temp = map[row][j];
				map[row][j] = map[i][j];
				map[i][j] = temp;
			}

		}

		if (col > i) {

			for (var j = 0; j < map.length; j++) {
				var temp = map[j][col];
				map[j][col] = map[j][i];
				map[j][i] = temp;
			}

			var temp = indexes[col];
			indexes[col] = indexes[i];
			indexes[i] = temp;

		}

		var temp = map[i][i];
		for (var j = i; j < map[i].length; j++) {
			map[i][j] /= temp;
		}

		for (var j = 0; j < map.length; j++) {
			if (j === i) {
				continue;
			}

			if (map[j][i] !== 0) {
				var temp = map[j][i];
				for (var k = i; k < map[i].length; k++) {
					map[j][k] -= map[i][k] * temp;
				}
			}
		}

	}

	var depend = [];

	for (var index = 0; index < i; index++) {
		var max = i;
		for (var j = i; j < map[index].length; j++) {
			if (map[index][j] !== 0) {
				max = j + 1;
			}
		}

		depend[index] = max;
	}

	var x = tryToFindSolution(map, i, map.length * map.length, i, map[i].length, [], depend);

	if (x === 'IMPOSSIBLE') {
		return x;
	}

	var y = [];
	for (var i = 0; i < x.length; i++) {
		var ind = indexes.indexOf(i);
		y[i] = x[ind];
	}

	return y;
}

function tryToFindSolution(map, ind, limit, level, maxLevel, changes, dependencyLevels) {
	var x =[];
	for (var i = 0; i < dependencyLevels.length; i++) {
		if (level === dependencyLevels[i]) {
			x[i] = 0;
			for (var j = ind; j < level; j++) {
				x[i] -= map[i][j] * changes[j - ind];
			}

			if (x[i] === 0 || x[i] !== Math.floor(x[i]) || Math.abs(x[i]) > limit) {
				return 'IMPOSSIBLE';
			}
		}
	}

	if (level === maxLevel) {
		for (var i = 0; i < ind; i++) {
			x[i] = 0;
			for (var j = ind; j < maxLevel; j++) {
				x[i] -= map[i][j] * changes[j - ind];
			}
		}

		return x.concat(changes);
	}

	for (var val = 1; val <= limit; val++) {
		x = tryToFindSolution(map,ind,limit,level + 1, maxLevel, changes.concat([val]), dependencyLevels);
		if (x !== 'IMPOSSIBLE') {
			return x;
		}

		x = tryToFindSolution(map,ind,limit,level + 1, maxLevel, changes.concat([-val]), dependencyLevels);
		if (x !== 'IMPOSSIBLE') {
			return x;
		}
	}

	return 'IMPOSSIBLE';
}