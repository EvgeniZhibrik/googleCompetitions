/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const br = s[i];
        let pair;
        switch (br) {
            case '(':
            case '[':
            case '{':
                stack.push(br);
                break;
            case ')':
                pair = stack.pop();
                if (pair !== '(') {
                    return false;
                }
                break;
            case ']':
                pair = stack.pop();
                if (pair !== '[') {
                    return false;
                }
                break;
            case '}':
                pair = stack.pop();
                if (pair !== '{') {
                    return false;
                }
                break;
            default:
                return false;
        }
    }

    return stack.length === 0;
};

console.log(isValid("()"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));