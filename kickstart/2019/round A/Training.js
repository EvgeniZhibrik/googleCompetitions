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
    if (lines.length === 2 && T) {
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
    let line = lines.shift().split(' ');
    const N = +line[0];
    const P = +line[1];

    const arr = lines.shift().split(' ').map(function(val){
        return +val;
    });

    arr.sort((a, b) => a - b);

    let sum = 0;
    let min = Infinity;
    for (let i = 0; i < N; i++) {
    	sum += arr[i];
    	if (i >= P) {
    		sum -= arr[i - P];
	    }
    	if (i >= P - 1) {
    		const val = (arr[i] * P) - sum;
    		if (val < min) {
    			min = val;
		    }
	    }
    }

    console.log('Case #' + (test + 1) + ': ' + min);
    test++;
}
