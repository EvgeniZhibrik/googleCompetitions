var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var max = 50;

var table = [];
for (var i = 0; i <= max; i++) {
	table[i] = [];
	for (var j = 0; j <= i; j++) {
		table[i][j] = 0;
	}
}

var counter = 0;
fillTable(-1, 0, {R: 0, B: 0}, []);
console.log(table);
function fillTable(sum, level, saws, vertices) {
	counter++;
	console.log(counter, sum, level, saws, vertices);
	if (level > (max * (max + 1)) + max) {
		return;
	}
	if (saws.R > max || saws.B > max) {
		return;
	}

	var b = level % (max + 1), r = (level - b) / (max + 1);

	if (vertices[0]) {
		if (b >= vertices[vertices.length - 1][1]) {
			fillTable(sum, level + 1, saws, vertices);
			return;
		}
	}

	var Rmin = -1, Bmin = -1;
	vertices.forEach(function (ver) {
		if (ver[0] < r && ver[0] > Rmin) {
			Rmin = ver[0];
		}
		if (ver[1] < b && ver[1] > Bmin) {
			Bmin = ver[1];
		}
	});

	var newSaws = {
		R: saws.R + (((Rmin + r + 1) * (r - Rmin) * (b - Bmin)) / 2),
		B: saws.B + (((Bmin + b + 1) * (b - Bmin) * (r - Rmin)) / 2)
	};

	if (newSaws.R > max || newSaws.B > max) {
		fillTable(sum, level + 1, saws, vertices);
	} else {
		var newVertices = (b - Bmin) * (r - Rmin);
		for (var i = newSaws.R; i <= max; i++ ) {
			for (var j = newSaws.B; j <= i; j++) {
				if (table[i][j] < sum + newVertices) {
					table[i][j] = sum + newVertices;
				}
			}
		}
		fillTable(sum, level + 1, saws, vertices);

		fillTable(sum + newVertices, level + 1, newSaws, vertices.concat([[r, b]]));
	}

}
/*
var T = -1;
var test = 0;
var state = 0;
var R, B, globalMax;
rl.on('line', function (line) {
	var i, tempArr;
	if (state === 0) {
		T = +line;
		state = 1;
	} else if (state === 1) {
		tempArr = line.split(' ');
		R = +tempArr[0];
		B = +tempArr[1];
		runSolution();
		T--;
	}

	if (T === 0) {
		rl.close();
	}
}).on('close', function () {
	process.exit(0);
});

function runSolution() {

	var obj = {};
	globalMax = {
		r: 0,
		b: 0,
		area: 0,
		arr: [],
		maxLevel: 0
	};
	if (R > B) {
		var temp = R;
		R = B;
		B = temp;
	}
	var x = findMax(R, B, [], {
		r: 0,
		b: 0,
		area: 0,
		arr: [],
		maxLevel: 0
	});
	console.log('Case #' + (test + 1) + ': ' + (x.area - 1));
	test++;
}

function findMax(r, b, arr, current) {
	if (current.area > globalMax.area || (current.area >= globalMax.area && current.maxLevel > globalMax.maxLevel)) {
		globalMax = current;
		console.log(globalMax);
	}

	for (var k = 0; k < arr.length; k++) {
		if (r - current.r <= arr[k][0] && b - current.b <= arr[k][1]) {
			return globalMax;
		}
	}
	var lastPoint;
	if (arr.length) {
		lastPoint = arr[arr.length - 1];
	} else {
		lastPoint = [Math.floor((-1 + Math.sqrt(1 + (8 * r))) / 2) + 1, -1];
	}

	if(globalMax.area && lastPoint[0]) {
		var check = getSum([0, lastPoint[1] + 1], [lastPoint[0] - 1, Math.floor((globalMax.area - current.area) / lastPoint[0]) + lastPoint[1]]);
		if (check.b + current.b > b) {
			return globalMax;
		}
	}

	for (var i = 0; i < lastPoint[0]; i++) {
		for (var j = lastPoint[1] + 1;;j++) {
			if (!arr.length && globalMax.arr.length) {
				console.log('hohoho', i, j);
			}

			var sum = getSum([0, lastPoint[1] + 1], [i, j]);
			if (current.r + sum.r > r || current.b + sum.b > b) {
				break;
			}

			var x = findMax(r, b, arr.concat([[i, j]]), {
				r: current.r + sum.r,
				b: current.b + sum.b,
				area: current.area + sum.area,
				arr: arr.concat([[i, j]]),
				maxLevel: Math.max(current.maxLevel, i + j)
			});
		}
	}

	return globalMax;
}

function getSum(a, b) {
	return {
		r: (a[0] + b[0]) * (b[0] - a[0] + 1) * (b[1] - a[1] + 1) / 2,
		b: (a[1] + b[1]) * (b[0] - a[0] + 1) * (b[1] - a[1] + 1) / 2,
		area: (b[0] - a[0] + 1) * (b[1] - a[1] + 1)
	};
}


*/