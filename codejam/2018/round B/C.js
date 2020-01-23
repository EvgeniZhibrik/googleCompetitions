var readline = require('readline');

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var lines = [];
var T = -1;
var test = 0;
var state = 0;
var M, L, arr, metals;
rl.on('line', function (line) {
	var i, tempArr;
	if (state === 0) {
		T = +line;
		state = 1;
	} else if (state === 1) {
		M = +line;
		arr = [];
		state = 2;

	} else if (state === 2) {
		tempArr = line.split(' ').map(function (el) {
			return +el - 1;
		});

		arr.push({
			ingridients: tempArr
		});

		if (arr.length === M) {
			state = 3;
		}
	} else if (state === 3) {
		line.split(' ').forEach(function (el, ind) {
			arr[ind].left = +el;
		});

		runSolution();
		T--;
		state = 1;
	}

	if (T === 0) {
		rl.close();
	}
}).on('close', function () {
	process.exit(0);
});

function runSolution() {
	var answer = 0;

	if (arr[0].left) {
		answer += arr[0].left;
		arr[0].left = 0;
	}

	var flag = true;
	while (flag) {
		flag = tryToGetOneMore(0);
		if (flag) {
			answer++;
			arr[0].left--;
			arr.forEach(function (val) {
				delete val.mark;
			});
		}
	}

	console.log('Case #' + (test + 1) + ': ' + answer);
	test++;
}

function tryToGetOneMore(index) {
	if (arr[index].left) {
		return true;
	}

	if (arr[index].mark) {
		return false;
	}

	arr[index].mark = true;

	if (arr[arr[index].ingridients[0]].left && arr[arr[index].ingridients[1]].left) {
		arr[arr[index].ingridients[0]].left--;
		arr[arr[index].ingridients[1]].left--;
		arr[index].left++;
		return true;
	} else if (!arr[arr[index].ingridients[0]].left && arr[arr[index].ingridients[1]].left) {
		if(tryToGetOneMore(arr[index].ingridients[0])) {
			if (arr[arr[index].ingridients[1]].left) {
				arr[arr[index].ingridients[0]].left--;
				arr[arr[index].ingridients[1]].left--;
				arr[index].left++;
				return true;
			} else {
				deleteMarks(arr[index].ingridients[0]);
				if (tryToGetOneMore(arr[index].ingridients[1])) {
					if (arr[arr[index].ingridients[0]].left) {
						arr[arr[index].ingridients[0]].left--;
						arr[arr[index].ingridients[1]].left--;
						arr[index].left++;
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
		}

	} else if (arr[arr[index].ingridients[0]].left && !arr[arr[index].ingridients[1]].left) {
		if(tryToGetOneMore(arr[index].ingridients[1])) {
			if (arr[arr[index].ingridients[0]].left) {
				arr[arr[index].ingridients[0]].left--;
				arr[arr[index].ingridients[1]].left--;
				arr[index].left++;
				return true;
			} else {
				deleteMarks(arr[index].ingridients[1]);
				if (tryToGetOneMore(arr[index].ingridients[0])) {
					if (arr[arr[index].ingridients[1]].left) {
						arr[arr[index].ingridients[0]].left--;
						arr[arr[index].ingridients[1]].left--;
						arr[index].left++;
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
		}

	} else {
		if(tryToGetOneMore(arr[index].ingridients[0])) {
			deleteMarks(arr[index].ingridients[0]);
			if (tryToGetOneMore(arr[index].ingridients[1])) {
				if (arr[arr[index].ingridients[0]].left) {
					arr[arr[index].ingridients[0]].left--;
					arr[arr[index].ingridients[1]].left--;
					arr[index].left++;
					return true;
				}

				deleteMarks(arr[index].ingridients[1]);
				if (tryToGetOneMore(arr[index].ingridients[0])) {
					if (arr[arr[index].ingridients[1]].left) {
						arr[arr[index].ingridients[0]].left--;
						arr[arr[index].ingridients[1]].left--;
						arr[index].left++;
						return true;
					} else {
						return false;
					}
				}
			}

		}
	}

	return false;
}

function deleteMarks(index) {
	delete arr[index].mark;
	if (arr[arr[index].ingridients[0]].mark) {
		deleteMarks(arr[index].ingridients[0]);
	}

	if (arr[arr[index].ingridients[1]].mark) {
		deleteMarks(arr[index].ingridients[1]);
	}
}