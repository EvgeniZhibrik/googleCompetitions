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
