var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var lines = [];
var T = -1;
var test = 0;
rl.on('line', function (line) {
	if (T < 0) {
		T = +line;
	} else {
		lines.push(line);
	}
	if (lines.length === 2 && T) {
		runSolution();
		T--;
	}
	if (T === 0) {
		rl.close();
	}
}).on('close', function () {
	process.exit(0);
});

function genCharArray(charA, charZ) {
	var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
	for (; i <= j; ++i) {
		a.push(String.fromCharCode(i));
	}
	return a;
}

var alphabet = genCharArray('A', 'Z');

function runSolution() {
	var N = +lines.shift();
	var line = lines.shift();

	var arr = line.split(' ').map(function(val, ind){
		return {
			value: +val,
			letter: alphabet[ind]
		};
	});

	arr.sort(function (a, b) {
		return b.value-a.value;
	});

	var sum = 0;

	arr.forEach(function (val) {
		sum += val.value;
	});

	var answer = '';

	while (sum) {
		if (arr[0].value >= 2) {
			if (arr[1].value * 2 <= (sum - 2)) {
				answer += arr[0].letter;
				answer += arr[0].letter;
				arr[0].value -= 2;
				sum -= 2;
			} else if ((arr[0].value - 1) * 2 <= (sum - 2) ) {
				answer += arr[0].letter;
				answer += arr[1].letter;
				arr[0].value -= 1;
				arr[1].value -= 1;
				sum -= 2;
			} else {
				answer += arr[0].letter;
				arr[0].value -= 1;
				sum -= 1;
			}
		} else {
			switch (sum) {
				case 3:
					answer += arr[0].letter;
					arr[0].value -= 1;
					sum -= 1;
					break;
				default:
					answer += arr[0].letter;
					answer += arr[1].letter;
					arr[0].value -= 1;
					arr[1].value -= 1;
					sum -= 2;
					break;
			}
		}

		if (sum) {
			answer += ' ';
			arr.sort(function (a, b) {
				return b.value-a.value;
			});
		}
	}
	console.log('Case #' + (test + 1) + ': ' + answer);
	test++;
}
