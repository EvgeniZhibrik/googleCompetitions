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
	line = line.split(' ');

	var N = +line[0];
	var K = +line[1];

	line = lines.shift();
	var p = line.split(' ').map(function (el) {
		return +el;
	});

	var x = findSolution(N, K, p);

	answers.push(x);
	//answers.push(answer);

}

fs.writeFileSync('B-large-practice.out', answers.map(function (ans,ind) {
	return 'Case #' + (ind+1) + ': ' + ans;
}).join('\n'), 'utf8');

function findSolution(n, k, p) {
	p.sort(function (a, b) {
		return a-b;
	});
	var x = 0;
	for (var m = 0; m <= k; m++) {
		var arr = [];
		for (var i = 0; i < m; i++) {
			arr.push(p[i]);
		}
		for (var j = n - 1; j >= n - k + m; j--) {
			arr.push(p[j]);
		}
		var table = [];
		for (var c = 0; c < k; c++) {
			table[c] = [];
		}
		if (x < calculate(arr, 0, k / 2, table)) {
			x = calculate(arr, 0, k / 2, table);
		}
	}

	return x;
}

function calculate(arr, level, yes, table) {
	if (table[level][yes] !== undefined) {
		return table[level][yes];
	}

	if (arr.length - level < yes) {
		table[level][yes] = 0;
		return 0;
	}

	if (arr.length - level === yes) {
		var mult = 1;
		for (var i = level; i < arr.length; i++) {
			mult *= arr[i];
		}
		table[level][yes] = mult;
		return mult;
	}

	if (yes === 0) {
		var mult = 1;
		for (var i = level; i < arr.length; i++) {
			mult *= (1 - arr[i]);
		}

		table[level][yes] = mult;
		return mult;
	}

	table[level][yes] = ((arr[level] * calculate(arr, level + 1, yes - 1, table)) + ((1 - arr[level]) * calculate(arr, level + 1, yes, table)));
	return table[level][yes];
}