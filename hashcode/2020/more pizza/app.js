const fs = require('fs');
//const contents = fs.readFileSync('a_example.in', 'utf8');

//const contents = fs.readFileSync('b_small.in', 'utf8');
//const contents = fs.readFileSync('c_medium.in', 'utf8');
//const contents = fs.readFileSync('d_quite_big.in', 'utf8');
const contents = fs.readFileSync('e_also_big.in', 'utf8');

const [M, N] = contents.split('\n')[0].split(' ').map((v) => +v);
const S = contents.split('\n')[1].split(' ').map((v) => +v).reverse();

let Peek = {};
const max = {
	value: 0,
	peek: []
};
const map = {};

const sumOst = (lev) => {
	let s = 0;
	for (let i = lev; i < N; i++) {
		s += S[i];
		if (s > M) {
			return s;
		}
	}
	return s;
};

const last = {
	level: 0,
	peek: [],
	sum: 0
};

let levelCounter = 0;
let flag = false;
const findMax = (level, sum, peek) => {

	if (map[level] && map[level][sum]) {
		return;
	} else {
		if (!map[level]) {
			map[level] = {};
		}
		map[level][sum] = true;
	}

	if (max.value === M) {
		return;
	}

	if (sum > max.value) {
		max.value = sum;
		max.peek = Object.keys(peek).map((v) => +v);
		console.log(max.value);
		console.log(max.peek.length);
		console.log(JSON.stringify(peek));
		console.log(JSON.stringify(map));
	}

	if (level === N) {
		return;
	}

	let ost = sumOst(level);

	if (sum + ost < max.value) {
		return;
	}

	levelCounter++;

	console.log(levelCounter);
	if (levelCounter === level) {
		last.level = level;
		last.sum = sum;
		last.peek = {...peek};
		return;
	}

	if (levelCounter > 4000) {
		return;
	}

	if (sum + S[level] <= M) {
		flag = true;
		findMax(level + 1, sum + S[level], {
			...peek,
			[level]: true
		});
	}
	flag = true;
	findMax(level + 1, sum, {...peek});
};

do {
	levelCounter = 0;
	flag = false;
	findMax(last.level, last.sum, {...last.peek});
} while (flag);

console.log(max.value);
console.log(max.peek.length);
console.log(max.peek.map((v) => N - 1 - v).reverse());

fs.writeFileSync(
	"e.txt",
	`${max.peek.length}
${max.peek.map((v) => N - 1 - v).reverse().join(' ')}`);
