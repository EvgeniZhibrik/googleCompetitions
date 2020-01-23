function Heap(field, comparator) {
	this.arr = [];
	this.field = field ? field : 'value';
	this.compare = comparator ? comparator : function (a, b) {
		return a[field] - b[field];
	}
}

Heap.prototype.isEmpty = function () {
	return this.arr.length === 0;
};

Heap.prototype.push = function (val) {

	var index = this.arr.length;
	this.arr.push(val);

	while (index > 0 && this.compare(val, this.arr[Math.floor((index - 1) / 2)]) > 0) {
		this.arr[index] = this.arr[Math.floor((index - 1) / 2)];
		this.arr[Math.floor((index - 1) / 2)] = val;
		index = Math.floor((index - 1) / 2);
	}
};

Heap.prototype.pop = function () {
	if(this.isEmpty()) {
		return;
	}

	if (this.arr.length === 1) {
		return this.arr.pop();
	}

	var temp = this.arr[this.arr.length - 1];
	this.arr[this.arr.length - 1] = this.arr[0];
	this.arr[0] = temp;
	var index = 0;

	var result = this.arr.pop();

	while ((2 * index + 2 < this.arr.length  && (this.compare(temp, this.arr[2 * index + 1]) < 0 || this.compare(temp, this.arr[2 * index + 2]) < 0)) ||
	(2 * index + 2 === this.arr.length && this.compare(temp, this.arr[2 * index + 1]) < 0)) {
		if (2 * index + 2 < this.arr.length) {
			if (this.compare(this.arr[2 * index + 1], this.arr[2 * index + 2]) > 0) {
				this.arr[index] = this.arr[2 * index + 1];
				this.arr[2 * index + 1] = temp;
				index = 2 * index + 1;
			} else {
				this.arr[index] = this.arr[2 * index + 2];
				this.arr[2 * index + 2] = temp;
				index = 2 * index + 2;
			}
		} else {
			this.arr[index] = this.arr[2 * index + 1];
			this.arr[2 * index + 1] = temp;
			index = 2 * index + 1;
		}
	}

	return result;
};

Heap.prototype.peek = function () {
	return this.arr[0];
};

var fs = require('fs');
var contents = fs.readFileSync('C-large-practice.in', 'utf8');
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
	var Q = +line[1];

	var horses = [];
	for (var i = 0; i < N; i++) {
		line = lines.shift().split(' ');
		horses.push({
			distance: +line[0],
			speed: +line[1]
		});
	}

	var cities = [];
	for (i = 0; i < N; i++) {
		line = lines.shift().split(' ').map(function (el) {
			return +el;
		});
		var city = {
			name: i,
			horse: horses[i],
			roads: []
		};
		line.forEach(function (el, index) {
			if (el > -1) {
				city.roads.push({
					to: index,
					from: i,
					distance: el
				});
			}
		});
		cities.push(city);
	}

	var answer = '';
	for (var q = 0; q < Q; q++) {
		line = lines.shift().split(' ');
		answer = answer + findMinTime(+line[0] - 1, +line[1] - 1, cities);
		if (q < Q - 1) {
			answer = answer + ' ';
		}
	}
	answers.push(answer);
}

fs.writeFileSync('C-large-practice.out', answers.map(function (ans,ind) {
	return 'Case #' + (ind+1) + ': ' + ans;
}).join('\n'), 'utf8');

function findMinTime (start, finish, cities) {
	var marks = [];
	var startIndex = 0;
	cities.forEach(function (el, ind) {
		marks[ind] = {
			city: el,
			marked: false,
			routes: [],
			minRoute: null
		};
	});

	var current = marks[start];
	current.routes.push({
		time: 0,
		speed: current.city.horse.speed,
		distance: current.city.horse.distance
	});

	while (current !== marks[finish]) {

		current.city.roads.forEach(function(road) {
			if (!marks[road.to].marked) {
				current.routes.forEach(function (route) {
					if (route.distance >= road.distance) {
						var newRoute = {
							time: route.time + (road.distance / route.speed),
							speed: route.speed,
							distance: route.distance - road.distance
						};
						var flag = false;
						for (var i = 0; i < marks[road.to].routes.length; i++) {
							if (marks[road.to].routes[i].time <= newRoute.time &&
								marks[road.to].routes[i].speed >= newRoute.speed &&
								marks[road.to].routes[i].distance >= newRoute.distance) {
								flag = true;
							} else if (marks[road.to].routes[i].time >= newRoute.time &&
								marks[road.to].routes[i].speed <= newRoute.speed &&
								marks[road.to].routes[i].distance <= newRoute.distance) {
								marks[road.to].routes.splice(i, 1);
								i--;
							}
						}
						if (!flag) {
							marks[road.to].routes.push(newRoute);
							if (!marks[road.to].minRoute || marks[road.to].minRoute.time >= newRoute.time) {
								marks[road.to].minRoute = newRoute;
							}
						}

						newRoute = {
							time: route.time + (road.distance / route.speed),
							speed: marks[road.to].city.horse.speed,
							distance: marks[road.to].city.horse.distance
						};

						flag = false;
						for (i = 0; i < marks[road.to].routes.length; i++) {
							if (marks[road.to].routes[i].time <= newRoute.time &&
								marks[road.to].routes[i].speed >= newRoute.speed &&
								marks[road.to].routes[i].distance >= newRoute.distance) {
								flag = true;
							} else if (marks[road.to].routes[i].time >= newRoute.time &&
								marks[road.to].routes[i].speed <= newRoute.speed &&
								marks[road.to].routes[i].distance <= newRoute.distance) {
								marks[road.to].routes.splice(i, 1);
								i--;
							}
						}
						if (!flag) {
							marks[road.to].routes.push(newRoute);
							if (!marks[road.to].minRoute || marks[road.to].minRoute.time >= newRoute.time) {
								marks[road.to].minRoute = newRoute;
							}
						}
					}
				});

			}
		});

		current = {
			minRoute: {
				time: Infinity
			}
		};

		marks.forEach(function (mark) {
			if (!mark.marked && mark.minRoute) {
				if (mark.minRoute.time < current.minRoute.time) {
					current = mark;
				}
			}
		});

		if (!current.city) {
			if (startIndex < marks.length) {
				console.log('grustnyashka ' + startIndex);
				marks.forEach(function (mark) {
					mark.marked = false;
					mark.minRoute = null;
				});
				current = marks[startIndex];
				startIndex++;
			}
		} else {
			current.marked = true;
		}

	}

	return current.minRoute.time;
}