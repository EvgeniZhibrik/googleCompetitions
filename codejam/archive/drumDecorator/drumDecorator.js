var fs = require('fs');
var contents = fs.readFileSync('D-large-practice.in', 'utf8');
// const contents = fs.readFileSync('e_high_bonus.in', 'utf8');

var lines = contents.split('\n');
var T = +lines[0];
var globalMin = Infinity;

lines.shift();
lines.pop();

var answers = [];

for (var t = 0; t < T; t++) {
	console.log(t + 1);
	var line = lines.shift().split(' ');
	var R = +line[0];
	var C = +line[1];

	var x = findSolution(R, C);

	answers.push(x);
	//answers.push(answer);

}

fs.writeFileSync('D-large-practice.out', answers.map(function (ans,ind) {
	return 'Case #' + (ind+1) + ': ' + ans;
}).join('\n'), 'utf8');

function findSolution(r, c) {
	if (r === 2) {
		return 1;
	}

	var obj = {
		count: 0
	};

	var arr = [];
	for (var i = 0; i < r; i++) {
		arr[i] = [];
	}

	tryToBuild(arr, 0, obj, r, c);
}

function tryToBuild(arr, level, obj, R, C) {
	var r = Math.floor(level / C);
	var c = level % C;

	var up = r > 0 ? arr[r - 1][c] : undefined;
	var left = c > 0 ? arr[r][c - 1] : undefined;
	var right = c === (C - 1) ? arr[r][0] : undefined;

	var temp = {
		1: 0,
		2: 0,
		3: 0,
		count: 0
	};
	if (up) {
		temp[up]++;
		temp.count++;
	}
	if (left) {
		temp[left]++;
		temp.count++;
	}
	if (right) {
		temp[right]++;
		temp.count++;
	}

	if (temp[1] > 1 || temp[2] > 2 || (temp.count === 3 && temp[2] === 0) || (temp.count === 3 && temp[3] < 2) || (temp.count === 2 && temp[3] === 0)) {
		return false;
	}

	if (r === R - 1) {
		if ((temp.count === 3 && temp[1] === 0) || temp[2] > 2 || (temp.count === 3 && temp[2] !== 2) || (temp.count === 3 && temp[3] < 2) || (temp.count === 2 && temp[3] === 0)) {
			return false;
		}
	}

	if (temp[1] <= 1) {
		arr[r][c] = 1;
		tryToBuild(arr, level + 1, obj, R, C);
	}

	if (temp[2] <= 2) {
		arr[r][c] = 2;
		tryToBuild(arr, level + 1, obj, R, C);
	}

	arr[r][c] = 3;
	tryToBuild(arr, level + 1, obj, R, C);

}