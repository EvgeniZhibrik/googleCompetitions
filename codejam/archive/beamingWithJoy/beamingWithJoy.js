var fs = require('fs');
var contents = fs.readFileSync('C-large-practice.in', 'utf8');
// const contents = fs.readFileSync('e_high_bonus.in', 'utf8');

var lines = contents.split('\n');
var T = +lines[0];

lines.shift();
lines.pop();

var answers = [];

var tratata = 0;
for (var t = 0; t < T; t++) {
	console.log(t + 1);
	var line = lines.shift();
	line = line.split(' ');

	var R = +line[0];
	var C = +line[1];

	var map = [];
	var beams = [];
	var emptyCells = {};


	for (var r = 0; r < R; r++) {
		map[r] = lines.shift().split('');
		for (var c = 0; c < C; c++) {
			switch (map[r][c]) {
				case '/':
					break;
				case '\\':
					break;
				case '|':
				case '-':
					beams.push({
						row: r,
						column: c,
						vert: {},
						hori: {}
					});
					break;
				case '.':
					emptyCells['' + r + '_' + c] = {
						row: r,
						column: c,
						marks: []
					};
					break;
				default:
					break;
			}
		}
	}

	if (!checkPossibility(map, beams)) {
		answers.push('IMPOSSIBLE');
		continue;
	}

	for (var i = 0; i < beams.length; i++) {
		if (!beams[i].vertical || !beams[i].horisontal) {
			map[beams[i].row][beams[i].column] = beams[i].horisontal ? '-' : '|';
			coverEmptyCells(map, beams[i], emptyCells, R, C);
			beams.splice(i, 1);
			i--;
		}
	}

	for (var key in emptyCells) {
		if (emptyCells.hasOwnProperty(key)) {
			if (emptyCells[key].covered) {
				delete emptyCells[key];
			}
		}
	}

	for (var i = 0; i < beams.length; i++) {
		tryLaser(beams[i].row + 1, beams[i].column, 'd', map, false,  emptyCells, [i, '|'], beams);
		tryLaser(beams[i].row - 1, beams[i].column, 'u', map, false,  emptyCells, [i, '|'], beams);
		tryLaser(beams[i].row, beams[i].column - 1, 'l', map, false,  emptyCells, [i, '-'], beams);
		tryLaser(beams[i].row, beams[i].column + 1, 'r', map, false,  emptyCells, [i, '-'], beams);
	}

	var flag = true, impossible = false;
	while (flag) {
		flag = false;

		for (var key in emptyCells) {
			if (emptyCells.hasOwnProperty(key)) {
				if (!emptyCells[key].marks.length) {
					flag = false;
					impossible = true;
					break;
				}

				if (emptyCells[key].marks.length === 1) {
					var i = emptyCells[key].marks[0][0];
					map[beams[i].row][beams[i].column] = emptyCells[key].marks[0][1];
					beams[i].horisontal = emptyCells[key].marks[0][1] === '-';
					beams[i].vertical = emptyCells[key].marks[0][1] === '|';
					coverEmptyCells(map, beams[i], emptyCells, R, C);
					beams.splice(i, 1);
					flag = true;
					for (var key1 in emptyCells) {
						if (emptyCells.hasOwnProperty(key1)) {
							for (var ind = 0; ind < emptyCells[key1].marks.length; ind++) {
								if (emptyCells[key1].marks[ind][0] === i) {
									emptyCells[key1].marks.splice(ind, 1);
									ind--;
								} else if (emptyCells[key1].marks[ind][0] > i) {
									emptyCells[key1].marks[ind] = [emptyCells[key1].marks[ind][0] - 1, emptyCells[key1].marks[ind][1]];
								}
							}
						}
					}
					break;
				}
			}
		}

		if (flag && !impossible) {
			for (var key in emptyCells) {
				if (emptyCells.hasOwnProperty(key)) {
					if (emptyCells[key].covered) {
						delete emptyCells[key];
					}
				}
			}
		}
	}

	if (impossible) {
		answers.push('IMPOSSIBLE');
		continue;
	}

	var result = findExample(emptyCells, beams, beams.length, 0, {}, []);

	if (result === 'IMPOSSIBLE') {
		answers.push('IMPOSSIBLE');
		continue;
	}

	var answer = 'POSSIBLE\n';
	result.forEach(function (el) {
		map[beams[el[0]].row][beams[el[0]].column] = el[1];
	});

	answer += map.map(function(row) {
		return row.join('');
	}).join('\n');

	answers.push(answer);

}

fs.writeFileSync('C-large-practice.out', answers.map(function (ans,ind) {
	return 'Case #' + (ind+1) + ': ' + ans;
}).join('\n'), 'utf8');

function checkPossibility(map, beams, R, C) {
	for (var i = 0; i < beams.length; i++) {
		var beam = beams[i];
		var right = tryLaser(beam.row, beam.column + 1, 'r', map);
		var left = tryLaser(beam.row, beam.column - 1, 'l', map);
		beam.horisontal = right && left;

		var up = tryLaser(beam.row - 1, beam.column, 'u', map);
		var down = tryLaser(beam.row + 1, beam.column, 'd', map);
		beam.vertical = up && down;

		if (!beam.horisontal && !beam.vertical) {
			return false;
		}
	}

	return true;
}

function tryLaser (r, c, dest, map, coverEmpty, emptyCells, addMark, beams) {
	var mirrors = [];
	for (var i = 0; i < R; i++) {
		mirrors[i] = [];
		for (var j = 0; j < C; j++) {
			mirrors[i][j] = {
				r: false,
				l: false,
				u: false,
				d: false
			};
		}
	}
	while (r >=0 && r < R && c >= 0 && c < C) {
		switch (map[r][c]) {
			case '#':
				return true;
			case '.':
				if (coverEmpty) {
					emptyCells['' + r + '_' + c].covered = true;
				} else if (addMark && emptyCells['' + r + '_' + c] && !emptyCells['' + r + '_' + c].covered) {
					var flag = false;
					for (var i = 0; i < emptyCells['' + r + '_' + c].marks; i++) {
						if (emptyCells['' + r + '_' + c].marks[i] === addMark) {
							flag = true;
							break;
						}
					}
					if (!flag) {
						emptyCells['' + r + '_' + c].marks.push(addMark);
						var key = addMark[1] === '|' ? 'vert' : 'hori';
						beams[addMark[0]][key]['' + r + '_' + c] = true;
					}
				}
				switch (dest) {
					case 'r':
						c += 1;
						break;
					case 'l':
						c -= 1;
						break;
					case 'u':
						r -= 1;
						break;
					case 'd':
						r += 1;
						break;
				}
				break;
			case '|':
			case '-':
				return false;
			case '/':
				if (mirrors[r][c][dest]) {
					return true;
				} else {
					mirrors[r][c][dest] = true;
					switch (dest) {
						case 'r':
							r -= 1;
							dest = 'u';
							break;
						case 'l':
							r += 1;
							dest = 'd';
							break;
						case 'u':
							c += 1;
							dest = 'r';
							break;
						case 'd':
							c -= 1;
							dest = 'l';
							break;
					}
				}

				break;
			case '\\':
				if (mirrors[r][c][dest]) {
					return true;
				} else {
					mirrors[r][c][dest] = true;
					switch (dest) {
						case 'r':
							r += 1;
							dest = 'd';
							break;
						case 'l':
							r -= 1;
							dest = 'u';
							break;
						case 'u':
							c -= 1;
							dest = 'l';
							break;
						case 'd':
							c += 1;
							dest = 'r';
							break;
					}
				}

				break;
		}
	}

	return true;
}



function coverEmptyCells(map, beam, emptyCells, R, C) {
	if (beam.vertical) {
		tryLaser(beam.row - 1, beam.column, 'u', map, true, emptyCells);
		tryLaser(beam.row + 1, beam.column, 'd', map, true, emptyCells);
	} else {
		tryLaser(beam.row, beam.column + 1, 'r', map, true, emptyCells);
		tryLaser(beam.row, beam.column - 1, 'l', map, true, emptyCells);
	}
}

function findExample(cells, beams, maxLevel, level, cover, beamsPos) {
	//console.log(level, maxLevel);
	//console.log(tratata++);
	var coveredCount = 0;
	var cellsCount = 0;
	var newCover1 = {}, newCover2 = {};

	for (var key in cells) {
		if (cells.hasOwnProperty(key)) {
			cellsCount++;
			if (cover[key]) {
				coveredCount++;
				newCover1[key] = true;
				newCover2[key] = true;
			}
		}
	}

	if (level === maxLevel) {
		if (coveredCount < cellsCount) {
			return 'IMPOSSIBLE';
		}
	}

	if (coveredCount === cellsCount) {
		return beamsPos;
	}

	for (var key in beams[level].hori) {
		if (beams[level].hori.hasOwnProperty(key)) {
			newCover1[key] = true;
		}
	}
	var res = findExample(cells, beams, maxLevel, level + 1, newCover1, beamsPos.concat([[level, '-']]));
	if (res !== 'IMPOSSIBLE') {
		return res;
	} else {
		for (var key in beams[level].vert) {
			if (beams[level].vert.hasOwnProperty(key)) {
				newCover2[key] = true;
			}
		}
		res = findExample(cells, beams, maxLevel, level + 1, newCover2, beamsPos.concat([[level, '|']]));
		return res;
	}
}