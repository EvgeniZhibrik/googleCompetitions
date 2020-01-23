var fs = require('fs');
var contents = fs.readFileSync('C-small-practice-1.in', 'utf8');
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
	var U = +line;
	
	var arrP = lines.shift().split(' ').map(function (el) {
		return +el;
	}).sort(function(a,b){
		return b - a;
	});

	console.log(K, U);
	console.log(arrP);
	/*var answer = findMax(arrP, 0, N, K, U);
	answers.push(answer);*/
}
/*
fs.writeFileSync('C-large-practice.out', answers.map(function (ans,ind) {
	return 'Case #' + (ind+1) + ': ' + ans;
}).join('\n'), 'utf8');
*/
function findMax() {
	
}