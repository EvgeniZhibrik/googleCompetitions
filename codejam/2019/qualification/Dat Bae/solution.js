var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var T = -1;
var state = 0;
rl.on('line', function (line) {
	if (state === 0) {
		T = +line;
		state = 1;
		return;
	}

	if (state === 1) {
		initModel(line);
		makeMove();
		state = 2;
		return;
	}

	if (line === '-1') {
		rl.close();
		return;
	}

	if (Model.F) {
		changeModel(line);
		makeMove();
	} else {
		if (line === '1') {
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

var Model = {};

function initModel(line) {
	Model.N = +line.split(' ')[0];
	Model.B = +line.split(' ')[1];
	Model.F = 5;

	Model.parts = [];
	var n = Model.N;
	while (n >= 16) {
		Model.parts.push({
			total: 16
		});
		n -= 16;
	}

	if (n > 0) {
		Model.parts.push({
			total: n
		});
	}
}

function makeMove() {
	if (Model.F === 0) {
		console.log(Model.parts.map(function(val, ind) {

		}))
	}
	var move = '';
	if (Model.F === 5) {
		Model.parts.forEach(function(val, ind) {
			for (var i = 0; i < val.total; i++) {
				move += ind % 2;
			}
		});
		console.log(move);
		return;
	}

	var count = Math.pow(2, Model.F - 1);
	Model.parts.forEach(function(val, ind) {
		for (var i = 0; i < val.total && i < count; i++) {
			move += '0';
		}

		for (var i = count; i < val.total; i++) {
			move += '1';
		}
	});
	console.log(move);
}

function changeModel(line) {
	if (Model.F === 5) {
		var index = 0;
		Model.parts.forEach(function(value, ind) {
			var count = 0;
			while (line[index] === `${ind % 2}`) {
				count++;
				index++;
			}
			value.broken = value.total - count;
		});
		Model.F--;
		return;
	}

	var arr = [];
	var total = Math.pow(2, Model.F - 1);
	var index = 0;
	Model.parts.forEach(function (val, ind) {
		var count = val.total - val.broken;
		var item1 = {
			total: Math.min(total, val.total),
			broken: Math.min(total, val.total)
		};
		while (count && line[index] === '0') {
			item1.broken--;
			count--;
			index++;
		}
		var item2 = {
			total: val.total - item1.total,
			broken: val.broken - item1.broken
		};
		while (count) {
			count--;
			index++;
		}
		arr.push(item1);
		if (item2.total) {
			arr.push(item2);
		}
	});
	Model.parts = arr;
	Model.F--;
}
