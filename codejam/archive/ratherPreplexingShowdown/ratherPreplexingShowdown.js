var fs = require('fs');
var contents = fs.readFileSync('A-large-practice.in', 'utf8');
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
	var R = +line[1];
	var P = +line[2];
	var S = +line[3];

	var x = findSolution(N, R, P, S);

	answers.push(x);
	//answers.push(answer);

}

fs.writeFileSync('A-large-practice.out', answers.map(function (ans,ind) {
	return 'Case #' + (ind+1) + ': ' + ans;
}).join('\n'), 'utf8');

function findSolution(n, r, p, s) {

	var final = findFinal(n, r, p, s);
	if (!final) {
		return 'IMPOSSIBLE';
	}

	return getBestLine(n, final);

}

function findFinal(n, r, p, s) {
	if (r < 0 || p < 0 || s < 0) {
		return false;
	}

	if (n === 1 && (r === 2 || p === 2 || s === 2)) {
		return false;
	}

	if (n === 1) {
		var ans = '';
		if (p) {
			ans += 'p';
		}
		if (r) {
			ans += 'r';
		}
		if (s) {
			ans += 's';
		}
		return ans;
	}

	return findFinal(n - 1, Math.pow(2, n - 1) - p, Math.pow(2, n - 1) - s, Math.pow(2, n - 1) - r);
}

function getBestLine(n, final) {
	if (n === 1) {
		return final;
	}

	switch (final) {
		case 'pr':
			var arr = [getBestLine(n - 1, 'pr'), getBestLine(n - 1, 'rs')];
			arr.sort();
			return arr.join('');
		case 'ps':
			var arr = [getBestLine(n - 1, 'pr'), getBestLine(n - 1, 'ps')];
			arr.sort();
			return arr.join('');
		case 'rs':
			var arr = [getBestLine(n - 1, 'rs'), getBestLine(n - 1, 'ps')];
			arr.sort();
			return arr.join('');
		default:
			console.log('OOPS');
	}
}