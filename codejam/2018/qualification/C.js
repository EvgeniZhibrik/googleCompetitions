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
		initModel(+line);
		makeMove();
		state = 2;
		return;
	}

	switch (line) {
		case '0 0':
			T--;
			state = 1;
			break;
		case '-1 -1':
			rl.close();
			break;
		default:
			changeModel(line);
			makeMove();
			break;
	}
	if (T === 0) {
		rl.close();
	}
}).on('close', function () {
	process.exit(0);
});

var Model = {};

function initModel(A) {
	var area = 9;
	var count = 3;
	Model.arr = [[],[],[]];
	Model.heap = new Heap('left');
	Model.heap.push({
		r: 2,
		c: 2,
		left: 9
	});
	while (area < A) {
		area += 3;
		Model.arr[count] = [];
		Model.heap.push({
			r: count - 1,
			c: 2,
			left: 9
		});
		count++;
	}
}

function makeMove() {
	var cell = Model.heap.peek();
	console.log(cell.r + ' ' + cell.c);
}

function changeModel(line) {
	var cell = line.split(' ').map(function (el) {
		return +el;
	});

	if (!Model.arr[cell[0] - 1][cell[1] - 1]) {
		Model.arr[cell[0] - 1][cell[1] - 1] = true;
		Model.heap = new Heap('left');

		for (var i = 1; i < Model.arr.length - 1; i++) {
			var left = 9;
			for (var j = -1; j < 2; j++) {
				for (var k = -1; k < 2; k++) {
					if (Model.arr[i + j][1 + k]) {
						left--;
					}
				}
			}
			Model.heap.push({
				r: i + 1,
				c: 2,
				left: left
			});
		}
	}
}

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
