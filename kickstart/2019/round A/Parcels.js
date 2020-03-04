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

    const ways = {
    	0: initialZeros
    };

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

			if (!ways[arr[r][c] + 1]) {
				ways[arr[r][c] + 1] = [];
			}
			ways[arr[r][c] + 1].push([r - 1, c]);

			if (arr[r][c] + 1 > max) {
				max = arr[r][c] + 1;
			}
		}
		if (r < R - 1 && arr[r + 1][c] < 0) {
			arr[r + 1][c] = arr[r][c] + 1;
			queue.push([r + 1, c]);

			if (!ways[arr[r][c] + 1]) {
				ways[arr[r][c] + 1] = [];
			}
			ways[arr[r][c] + 1].push([r + 1, c]);

			if (arr[r][c] + 1 > max) {
				max = arr[r][c] + 1;
			}
		}
		if (c > 0 && arr[r][c - 1] < 0) {
			arr[r][c - 1] = arr[r][c] + 1;
			queue.push([r, c - 1]);

			if (!ways[arr[r][c] + 1]) {
				ways[arr[r][c] + 1] = [];
			}
			ways[arr[r][c] + 1].push([r, c - 1]);

			if (arr[r][c] + 1 > max) {
				max = arr[r][c] + 1;
			}
		}
		if (c < C - 1 && arr[r][c + 1] < 0) {
			arr[r][c + 1] = arr[r][c] + 1;
			queue.push([r, c + 1]);

			if (!ways[arr[r][c] + 1]) {
				ways[arr[r][c] + 1] = [];
			}
			ways[arr[r][c] + 1].push([r, c + 1]);

			if (arr[r][c] + 1 > max) {
				max = arr[r][c] + 1;
			}
		}
	}

	if (max === 0) {
		console.log('Case #' + (test + 1) + ': ' + max);
		test++;
		return;
	}

	let totalMax = max;
	let totalMin = -1;
	let record = Math.floor((totalMax + totalMin) / 2);

	while (totalMax - totalMin > 1) {
		let flag = false;
		for (let newI = 0; newI < R && !flag; newI++) {
			for (let newJ = 0; newJ < C && !flag; newJ++) {
				if (arr2[newI][newJ] === -1) {
					let newFlag = true;
					for (let len = max; len > record; len--) {
						if (!ways[len].every((val) => {
							return Math.abs(val[0] - newI) + Math.abs(val[1] - newJ) <= record;
						})) {
							newFlag = false;
							break;
						}
					}

					if (newFlag) {
						flag = true;
					}
				}
			}
		}

		if (flag) {
			totalMax = record;
		} else {
			totalMin = record;
		}

		record = Math.floor((totalMax + totalMin) / 2);
	}

    console.log('Case #' + (test + 1) + ': ' + totalMax);
    test++;
}
