const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
let T = -1;
let test = 0;
const obj = {};

rl.on('line', function (line) {
    if (T < 0) {
        T = +line;
        return;
    }

    lines.push(line);

    if (lines.length === 2 && T) {
        runSolution();
        T--;
        lines = [];
    }

    if (T === 0) {
        rl.close();
    }
}).on('close', function () {
    process.exit(0);
});

function runSolution() {
    const N = +lines[0];
    const str = lines[1];

    let p = findSum(str, obj, true);
    let q = 1n;
    for (let i = 1; i <= N; i++) {
        q *= BigInt(i);
    }

    let d = gcd(p, q);

    p /= d;
    q /= d;

    const mod = new Modulo(1000000007);
    const res = mod.mul(p, mod.invert(q));

    console.log('Case #' + (test + 1) + ': ' + res);
    test++;

}

function findSum(str, obj, first = false) {
    if (str.length === 1) {
        return 2n;
    }

    const reObj = {};
    let curLetter = 'a';
    let newStr = '';
    for (let i = 0; i < str.length; i++) {
        if (!reObj[str[i]]) {
            reObj[str[i]] = curLetter;
            curLetter = String.fromCharCode(curLetter.charCodeAt(0) + 1);
        }

        newStr += reObj[str[i]];
    }

    str = newStr;

    if (obj[str] && !first) {
        return obj[str];
    }

    let flag = !first;
    for (let i = 0; i <= Math.floor((str.length - 2) / 2) && flag; i++) {
        if (str[i] !== str[str.length - 1 - i]) {
            flag = false;
            break;
        }
    }
    let sum;

    if (flag) {
        sum = 1n;
        for (let i = 1n; i <= str.length; i++) {
            sum *= i;
        }
    } else {
        sum = 0n;
    }
    for (let i = 0; i < str.length; i++) {
        sum += findSum(str.slice(0, i) + str.slice(i + 1), obj);
    }
    obj[str] = sum;
    return sum;
}

function gcd(a, b, arr) {
    if (typeof a !== 'bigint') {
        a = BigInt(a);
    }

    if (typeof b !== 'bigint') {
        b = BigInt(b);
    }

    if (a < 0) {
        a *= -1n;
    }

    if (b < 0) {
        b *= -1n;
    }

    let r = a % b;
    while (r !== 0n) {
        if (arr) {
            arr.push([(a - r) / b, r])
        }
        a = b;
        b = r;
        r = a % b;
    }

    return b;
}

class Modulo {
    constructor(m) {
        this._m = BigInt(m);
        if (this._m === 0n) {
            throw Error('zero module');
        }

        if (this._m < 0) {
            this._m *= -1n;
        }
    }

    get m() {
        return this._m;
    }

    toMod(a) {
        if (typeof a !== 'bigint') {
            a = BigInt(a);
        }

        a = a % this.m;

        if (a < 0) {
            a = a + this.m;
        }

        return a;
    }

    add(a, b) {
        a = this.toMod(a);
        b = this.toMod(b);

        return this.toMod(a + b);
    }

    sub(a, b) {
        a = this.toMod(a);
        b = this.toMod(b);

        return this.toMod(a - b);
    }

    mul(a, b) {
        a = this.toMod(a);
        b = this.toMod(b);

        return this.toMod(a * b);
    }

    invert(a) {
        a = this.toMod(a);

        const arr = [];
        if (gcd(a, this.m, arr) === 1n) {
            const coef = arr.reduceRight((obj, cur, ind) => {
                if (ind === arr.length - 1) {
                    obj.x = 1n;
                    obj.y = -cur[0];
                } else {
                    let x = obj.x;
                    let y = obj.y;
                    obj.x = y;
                    obj.y = x - cur[0] * y;
                }

                return obj;
            }, {});

            return this.toMod(coef.x);
        }

        throw Error("No invert");
    }
}
