/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows === 1) {
        return s;
    }

    const partLen = 2 * numRows - 2;
    const fullParts = Math.floor(s.length / partLen);
    const tail = s.length - (partLen * fullParts);

    const lines = [];

    for (let i = 0; i < numRows; i++) {
        if (i === 0) {
            lines[i] = fullParts + (tail > 0 ? 1 : 0);
        } else if (i === numRows - 1) {
            lines[i] = fullParts + (tail >= numRows ? 1 : 0);
        } else {
            lines[i] = (2 * fullParts) + (tail >= partLen - i + 1 ? 2 : tail >= i + 1 ? 1 : 0);
        }
    }

    const arr = [];

    for (let i = 0; i < s.length; i++) {
        const partNum = Math.floor(i / partLen);

        const pos = i - (partNum * partLen);
        const line = pos < numRows ? pos : partLen - pos;

        const addition = pos < numRows ? 0 : 1;

        let index = 0;
        for (let j = 0; j < line; j++) {
            index += lines[j];
        }

        index += line > 0 && line < numRows - 1 ? 2 * partNum : partNum;
        index += addition;
        arr[index] = s[i];
    }

    return arr.join('');
};


console.log(convert("PAYPALISHIRING", 2));
console.log(convert("PAYPALISHIRING", 3));
console.log(convert("PAYPALISHIRING", 4));
console.log(convert("PAYPALISHIRING", 5));