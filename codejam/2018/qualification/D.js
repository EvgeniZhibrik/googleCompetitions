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
	if (lines.length && T) {
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
	var A = +lines.shift();

	var cube = [[0.5, 0, 0], [-0.5, 0, 0], [0, 0.5, 0], [0, -0.5, 0], [0, 0, 0.5], [0, 0, -0.5]];
	var testCube = [];
	var testCube2 = [];

	if (A < 1.000001) {
		output(cube);
		return;
	} else if (A <= 1.414212) {
		output(binarySearch(cube, A, 0, Math.PI / 4, rotateX));
		return;
	} else if (A < 1.414214) {
		for(var i = 0; i < 6; i++) {
			testCube.push(rotateX(cube[i], Math.PI / 4));
		}
		output(testCube);
		return;
	} else if (A > 1.732049) {
		for(var i = 0; i < 6; i++) {
			testCube.push(rotateX(cube[i], Math.PI / 4));
		}
		for(var i = 0; i < 6; i++) {
			testCube2.push(rotateZ(testCube[i], Math.acos(Math.sqrt(2/3))));
		}
		output (testCube2);
	} else {
		for(var i = 0; i < 6; i++) {
			testCube.push(rotateX(cube[i], Math.PI / 4));
		}
		output(binarySearch(testCube, A, 0, Math.acos(Math.sqrt(2/3)), rotateZ));
	}

}

function rotateX(point, angle) {
	var matr = [[1, 0, 0], [0, Math.cos(angle), -Math.sin(angle)], [0, Math.sin(angle), Math.cos(angle)]];
	var tempPoint = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		tempPoint[i] = matr[i][0]*point[0] + matr[i][1]*point[1] + matr[i][2]*point[2];
	}

	return tempPoint;
}

function rotateZ(point, angle) {
	var matr = [[Math.cos(angle), -Math.sin(angle), 0], [Math.sin(angle), Math.cos(angle), 0], [0, 0, 1]];
	var tempPoint = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		tempPoint[i] = matr[i][0]*point[0] + matr[i][1]*point[1] + matr[i][2]*point[2];
	}

	return tempPoint;
}

function shadow(cube) {
	var area = 0;

	for (var i = 0; i < 6; i++) {
		if (cube[i][1] < 0) {
			area += (-cube[i][1])*2;
		}
	}
	return area;
}

function binarySearch (cube, A, min, max, rotation) {
	var temp = [];

	for(var i = 0; i < 6; i++) {
		temp.push(rotation(cube[i], (min + max) / 2));
	}

	if (Math.abs(shadow(temp) - A) < 0.000001) {
		return temp;
	} else {
		if (shadow(temp) < A) {
			return binarySearch(cube, A, (min + max) / 2, max, rotation);
		} else {
			return binarySearch(cube, A, min, (min + max) / 2, rotation);
		}
	}
}

function output(cube) {
	console.log ('Case #' + (test + 1) + ':');
	console.log(cube[0][0] + ' ' + cube[0][1] + ' ' + cube[0][2]);
	console.log(cube[2][0] + ' ' + cube[2][1] + ' ' + cube[2][2]);
	console.log(cube[4][0] + ' ' + cube[4][1] + ' ' + cube[4][2]);
	test++;
}