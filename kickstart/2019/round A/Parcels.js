const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1;
let test = 0;
let R, C;
rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    if (!R) {
        [R, C] = line.split(' ').map((v) => +v);
        return;
    }

    lines.push(line);

    if (lines.length === R && T) {
        runSolution();
        R = 0;
        lines = [];
        T--;
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    let count = 0, initialNumber, initialZeros = [];
    const arr = lines.map((line, i) => line.split('').map((v, j) => {
        v = +v;
        if (v) {
            count++;
            initialZeros.push([i, j]);
        }
        return v - 1;
    }));
    initialNumber = count;

    const arr2 = [];
    for (let i = 0; i < R; i++) {
        arr2[i] = [];
        for (let j = 0; j < C; j++) {
            arr2[i][j] = arr[i][j];
        }
    }

    let maxCoords = [];

	let max = 0;
	const queue = [];
	for (let i = 0; i < initialZeros.length; i++) {
		const [r, c] = initialZeros[i];
		queue.push([r, c]);
	}

	while (queue.length) {
		const [r, c] = queue.shift();
		if (r > 0 && arr[r - 1][c] < 0) {
			arr[r - 1][c] = arr[r][c] + 1;
			queue.push([r - 1, c]);
			if (arr[r][c] + 1 > max) {
				max = arr[r][c] + 1;
				maxCoords = [[r - 1, c]];
			} else if (arr[r][c] + 1 === max) {
				maxCoords.push([r - 1, c]);
			}
		}
		if (r < R - 1 && arr[r + 1][c] < 0) {
			arr[r + 1][c] = arr[r][c] + 1;
			queue.push([r + 1, c]);
			if (arr[r][c] + 1 > max) {
				max = arr[r][c] + 1;
				maxCoords = [[r + 1, c]];
			} else if (arr[r][c] + 1 === max) {
				maxCoords.push([r + 1, c]);
			}
		}
		if (c > 0 && arr[r][c - 1] < 0) {
			arr[r][c - 1] = arr[r][c] + 1;
			queue.push([r, c - 1]);
			if (arr[r][c] + 1 > max) {
				max = arr[r][c] + 1;
				maxCoords = [[r, c - 1]];
			} else if (arr[r][c] + 1 === max) {
				maxCoords.push([r, c - 1]);
			}
		}
		if (c < C - 1 && arr[r][c + 1] < 0) {
			arr[r][c + 1] = arr[r][c] + 1;
			queue.push([r, c + 1]);
			if (arr[r][c] + 1 > max) {
				max = arr[r][c] + 1;
				maxCoords = [[r, c + 1]];
			} else if (arr[r][c] + 1 === max) {
				maxCoords.push([r, c + 1]);
			}
		}
	}

	if (max === 0) {
		console.log('Case #' + (test + 1) + ': ' + max);
		test++;
		return;
	}

	const totalMax = max;
	let record = max;

	for (let newI = 0; newI < R; newI++) {
		for (let newJ = 0; newJ < C; newJ++) {
			if (arr2[newI][newJ] === -1 &&
				maxCoords.every((val) => {
					return Math.abs(val[0] - newI) + Math.abs(val[1] - newJ) < record;
				})) {
				for (let i = 0; i < R; i++) {
					arr[i] = [];
					for (let j = 0; j < C; j++) {
						arr[i][j] = arr2[i][j];
					}
				}
				arr[newI][newJ] = 0;

				max = 0;
				count = initialNumber + 1;

				max = fillArray(arr, initialZeros.concat([[newI, newJ]]));

				if (record > max) {
					record = max;
				}
			}
		}
	}

    console.log('Case #' + (test + 1) + ': ' + record);
    test++;
}

function fillArray(arr, zeros) {
	let max = 0;
	const queue = [];
	for (let i = 0; i < zeros.length; i++) {
		const [r, c] = zeros[i];
		queue.push([r, c]);
	}

	while (queue.length) {
		const [r, c] = queue.shift();
		if (r > 0 && arr[r - 1][c] < 0) {
			arr[r - 1][c] = arr[r][c] + 1;
			queue.push([r - 1, c]);
			if (arr[r][c] + 1 > max) {
				max = arr[r][c] + 1;
			}
		}
		if (r < R - 1 && arr[r + 1][c] < 0) {
			arr[r + 1][c] = arr[r][c] + 1;
			queue.push([r + 1, c]);
			if (arr[r][c] + 1 > max) {
				max = arr[r][c] + 1;
			}
		}
		if (c > 0 && arr[r][c - 1] < 0) {
			arr[r][c - 1] = arr[r][c] + 1;
			queue.push([r, c - 1]);
			if (arr[r][c] + 1 > max) {
				max = arr[r][c] + 1;
			}
		}
		if (c < C - 1 && arr[r][c + 1] < 0) {
			arr[r][c + 1] = arr[r][c] + 1;
			queue.push([r, c + 1]);
			if (arr[r][c] + 1 > max) {
				max = arr[r][c] + 1;
			}
		}
	}
	return max;
}
