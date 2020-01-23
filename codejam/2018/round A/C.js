var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var lines = [];
var T = -1;
var test = 0;
var state = 0;
var N, P, arr, rows;
rl.on('line', function (line) {
	var tempArr;
	if (state === 0) {
		T = +line;
		state = 1;
	} else if (state === 1) {
		tempArr = line.split(' ');
		N = +tempArr[0];
		P = +tempArr[1];

		arr = [];

		state = 2;
		rows = 0;
	} else if (state === 2) {
		tempArr = line.split(' ');
		arr.push(tempArr);
		rows++;
		if (rows === N) {
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
var globalMax, limit;
function runSolution() {
	var currentPer = 0;
	var possibleValues = [];
	var maxAddition = 0;
	for (var i = 0; i < arr.length; i++) {
		currentPer += (2 * arr[i][0]) + (2 * arr[i][1]);
		possibleValues.push([2 * Math.min(arr[i][0], arr[i][1]), 2 * Math.sqrt((arr[i][0]*arr[i][0]) + (arr[i][1] * arr[i][1]))]);
		maxAddition += possibleValues[i][1];
	}

	if (currentPer === P) {
		console.log('Case #' + (test + 1) + ': ' + P);
		test++;
		return;
	}
	if (currentPer + maxAddition <= P) {
		console.log('Case #' + (test + 1) + ': ' + (currentPer + maxAddition));
		test++;
		return;
	}

	globalMax = 0;
	limit = P - currentPer;

	var answer = findBest(possibleValues, limit, [0,0], 0);
	console.log('Case #' + (test + 1) + ': ' + (currentPer + globalMax));
	test++;
}

function findBest(possibleValues, limit, currentVal, level) {

	if (globalMax === limit) {
		return currentVal;
	}
	if (level >= possibleValues.length) {
		return currentVal;
	}
	if (currentVal[1] === limit) {
		return currentVal;
	}

	if (currentVal[0] + possibleValues[level][0] <= limit && currentVal[1] + possibleValues[level][1] >= limit) {
		globalMax = limit;
		return [currentVal[0] + possibleValues[level][0], limit];
	}

	if (currentVal[0] + possibleValues[level][0] > limit) {
		return findBest(possibleValues,limit,currentVal, level + 1);
	}

	var x, y;
	x = findBest(possibleValues,limit,[currentVal[0] + possibleValues[level][0], currentVal[1] + possibleValues[level][1]], level + 1);
	y = findBest(possibleValues,limit,currentVal, level + 1);
	if (x[1] < y[1]) {
		if (globalMax < y[1]) {
			globalMax = y[1];
		}
		return y;
	} else {
		if (globalMax < x[1]) {
			globalMax = x[1];
		}
		return x;
	}
}
