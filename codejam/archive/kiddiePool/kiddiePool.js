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
	var V = +line[1];
	var X = +line[2];
	var arr = [];

	for (var i = 0; i < N; i++) {
		line = lines.shift().split(' ').map(function (value) {
			return +value;
		});
		arr.push({
			R: line[0],
			C: line[1]
		});
	}

	var x = findSolution(N, V, X, arr);

	answers.push(x);
	//answers.push(answer);

}

fs.writeFileSync('B-large-practice.out', answers.map(function (ans,ind) {
	return 'Case #' + (ind+1) + ': ' + ans;
}).join('\n'), 'utf8');

function findSolution(N, V, X, arr) {
	arr.sort(function (a, b) {
		return a.C - b.C;
	});

	var pairs = [];
	for (var i = 0; i < N && arr[i].C < X; i++) {
		for (var j = N - 1; j > i && arr[j].C > X; j--) {
			var temp = [];
			for (var k = 0; k < N; k++) {
				temp[k] = 0;
			}
			temp[i] = ((arr[j].C - X)/(arr[j].C - arr[i].C))/arr[i].R * V;
			temp[j] = ((arr[i].C - X)/(arr[i].C - arr[j].C))/arr[j].R * V;
			pairs.push(temp);
		}
	}
	while (i < N && arr[i].C === X) {
		var temp = [];
		for (var k = 0; k < N; k++) {
			temp[k] = 0;
		}
		temp[i] = V / arr[i].R;
		pairs.push(temp);
		i++;
	}

	if (!pairs.length) {
		return 'IMPOSSIBLE';
	}

	var answer = pairs[0];
	for (var i = 1; i < pairs.length; i++) {
		answer = merge(answer, pairs[i], N);
	}

	var max = 0;
	for (var i = 0; i < N; i++) {
		if (answer[i] > max) {
			max = answer[i];
		}
	}

	return max;
}

function merge(a, b, N) {
	var edges = [];
	for (var i = 0; i < N; i++) {
		if (a[i] > 0 || b[i] > 0) {
			edges.push({
				k: b[i] - a[i],
				m: a[i]
			});
		}
	}
	var min = {
		x: Infinity,
		y: Infinity
	};
	for (var i = 0; i < N - 1; i++) {
		if (a[i] === 0 && b[i] === 0) {
			continue;
		}
		for (var j = i + 1; j < N; j++) {
			if (a[j] === 0 && b[j] === 0) {
				continue;
			}

			if ((a[i] - a[j])*(b[i] - b[j]) < 0) {
				var x = (a[j] - a[i]) / ((a[j] - a[i]) - (b[j] - b[i]));
				var y = Math.max(((b[i] - a[i]) * x) + a[i], ((b[j] - a[j]) * x) + a[j]);
				if (y < min.y) {
					var flag = true;
					for (var c = 0; c < edges.length; c++) {
						if ((edges[c].k * x + edges[c].m) - y > 0.0000001) {
							flag = false;
							break;
						}
					}
					if (flag) {
						min = {
							x: x,
							y: y
						};
					}
				}
			}

			if ((a[i] - a[j])*(b[i] - b[j]) > 0) {
				var x = a[i] > a[j] ? (a[i] > b[i] ? 1 : 0) : (a[j] > b[j] ? 1 : 0);
				var y = a[i] > a[j] ? ((b[i] - a[i]) * x + a[i]) : ((b[j] - a[j]) * x + a[j]);
				if (y < min.y) {
					var flag = true;
					for (var c = 0; c < edges.length; c++) {
						if ((edges[c].k * x + edges[c].m) - y > 0.0000001) {
							flag = false;
							break;
						}
					}
					if (flag) {
						min = {
							x: x,
							y: y
						};
					}
				}
			}

			if ((a[i] - a[j])*(b[i] - b[j]) === 0) {
				var x, y;
				if (Math.abs(a[i] - a[j]) < 0.0000001 && Math.abs(b[i] - b[j]) < 0.0000001) {
					x = a[i] > b[i] ? 1 : 0;
					y = (b[i] - a[i]) * x + a[i];
				} else if (Math.abs(a[i] - a[j]) < 0.0000001) {
					x = a[i] > Math.max(b[i], b[j]) ? 1 : 0;
					y = a[i] > Math.max(b[i], b[j]) ? Math.max(b[i], b[j]) : a[i];
				} else if (Math.abs(b[i] - b[j]) < 0.0000001) {
					x = b[i] > Math.max(a[i], a[j]) ? 0 : 1;
					y = b[i] > Math.max(a[i], a[j]) ? Math.max(a[i], a[j]) : b[i];
				} else {
					continue;
				}
				if (y < min.y) {
					var flag = true;
					for (var c = 0; c < edges.length; c++) {
						if ((edges[c].k * x + edges[c].m) - y > 0.0000001) {
							flag = false;
							break;
						}
					}
					if (flag) {
						min = {
							x: x,
							y: y
						};
					}
				}
			}

		}
	}
	var answer = [];
	for (var i = 0; i < N; i++) {
		answer[i] = (a[i] * (1 - min.x)) + (b[i] * min.x);
	}

	return answer;
}