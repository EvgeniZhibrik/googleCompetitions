var fs = require('fs');
var contents = fs.readFileSync('D-large-practice.in', 'utf8');
// const contents = fs.readFileSync('e_high_bonus.in', 'utf8');

var lines = contents.split('\n');
var T = +lines[0];
var globalMin = Infinity;

lines.shift();
lines.pop();

var answers = [];

for (var t = 0; t < T; t++) {
	console.log(t + 1);
	var line = lines.shift();

	var N = +line;

	var arr = [];
	for (var i = 0; i < N; i++) {
		line = lines.shift();
		arr[i] = line.split('').map(function (value) {
			return +value;
		});
	}


	var x = findSolution(N, arr);

	answers.push(x);
	//answers.push(answer);

}

fs.writeFileSync('D-large-practice.out', answers.map(function (ans,ind) {
	return 'Case #' + (ind+1) + ': ' + ans;
}).join('\n'), 'utf8');

function findSolution(n, arr) {
	var vertices = [];
	for (var i = 0; i < 2 * n; i ++) {
		vertices[i] = {
			name: i,
			type: i < n ? 'worker' : 'machine',
			edges: []
		};
	}

	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			if (arr[i][j] === 1) {
				vertices[i].edges.push(vertices[n + j]);
				vertices[n + j].edges.push(vertices[i]);
			}
		}
	}

	var groups = makeGroups(vertices);
	var sum = 0;
	var groupObj = {
		count: 0
	};

	for (var i = 0; i < groups.length; i++) {
		sum += (groups[i].worker * groups[i].machine) - groups[i].edges;
		if (groups[i].worker !== groups[i].machine) {
			if (!groupObj['' + groups[i].worker + '_' + groups[i].machine]) {
				groupObj['' + groups[i].worker + '_' + groups[i].machine] = 1;
			} else {
				groupObj['' + groups[i].worker + '_' + groups[i].machine]++;
			}
			groupObj.count++;
		}
	}

	globalMin = Infinity;

	console.log(groupObj);

	sum += countAddition(groupObj, 0);

	return sum;

}

function makeGroups(vertices) {
	var flag = true;
	var groups = [];
	while (flag) {
		var queue = [];
		flag = false;
		for (var i = 0; i < vertices.length; i++) {
			if (!vertices[i].mark){
				flag = true;
				queue.push(vertices[i]);
				var group = {
					name: groups.length,
					worker: 0,
					machine: 0,
					edges: 0
				};
				groups.push(group);
				break;
			}
		}
		while (queue.length) {
			var vertice = queue.shift();

			if (vertice.mark) {
				continue;
			}

			vertice.mark = true;
			groups[groups.length - 1][vertice.type]++;
			for (var i = 0; i < vertice.edges.length; i++) {
				if (!vertice.edges[i].mark) {
					groups[groups.length - 1].edges++;
					queue.push(vertice.edges[i]);
				}
			}
		}
	}

	return groups;
}

function countAddition(groupObj, addition) {

	var groupTypes = Object.keys(groupObj).filter(function (value) {
		return value !== 'count' && groupObj[value] > 0;
	}).sort(function (a, b) {
		return (a.split('_')[0]-a.split('_')[1]) - (b.split('_')[0]-b.split('_')[1]);
	});

	var potential = groupTypes.reduce(function (previousValue, currentValue) {
		var counts = currentValue.split('_').map(function (value) {
			return +value;
		});

		counts.sort(function (a, b) {
			return a - b;
		});

		return previousValue + ((counts[1] - counts[0]) * counts[1] * groupObj[currentValue]);
	}, 0);

	if (addition + (potential / 2) >= globalMin) {
		return Infinity;
	}

	if (groupObj.count === 0) {
		if (addition < globalMin) {
			globalMin = addition;
		}
		return addition;
	}

	var firstGroup = groupTypes[0];
	var first = firstGroup.split('_').map(function (value) {
		return +value;
	});
	for (var i = groupTypes.length - 1; i >= (groupObj[groupTypes[0]] > 1 ? 0 : 1); i--) {
		var secondGroup = groupTypes[i];
		var second = secondGroup.split('_').map(function (value) {
			return +value;
		});
		var newObj = {};
		groupTypes.forEach(function (value) {
			newObj[value] = groupObj[value];
		});
		newObj[firstGroup]--;
		newObj[secondGroup]--;
		if (!newObj[firstGroup]) {
			delete  newObj[firstGroup];
		}
		if (!newObj[secondGroup]) {
			delete newObj[secondGroup];
		}
		if (first[0]+second[0] !== first[1] + second[1]) {
			if (!newObj['' + (first[0]+second[0]) + '_' + (first[1] + second[1])]) {
				newObj['' + (first[0]+second[0]) + '_' + (first[1] + second[1])] = 1;
			} else {
				newObj['' + (first[0]+second[0]) + '_' + (first[1] + second[1])]++;
			}
			newObj.count = groupObj.count - 1;
		} else {
			newObj.count = groupObj.count - 2;
		}

		var x = countAddition(newObj, addition + ((first[0]*second[1]) + (first[1]*second[0])));
		if (x < globalMin) {
			globalMin = x;
		}
	}

	return globalMin;
}