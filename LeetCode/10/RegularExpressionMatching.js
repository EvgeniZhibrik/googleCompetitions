/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    const possibleEmpty = p.length % 2 === 0 && p.split('').every((c, i) => i % 2 === 0 || c === '*');
    if (s.length === 0 && possibleEmpty) {
        return true;
    } else if (s.length === 0 || p.length === 0) {
        return false;
    }

    let star;
    for (let j = 0; j < p.length; j++) {
        if (p[j] === '*') {
            star = {
                char: p[j - 1],
                index: j - 1,
            };
            break;
        }
    }

    if (!star) {
        if (s.length !== p.length) {
            return false;
        }

        for (let i = 0; i < s.length; i++) {
            if (s[i] !== p[i] && p[i] !== '.') {
                return false;
            }
        }

        return true;
    }

    for (let i = 0; i < star.index; i++) {
        if (s[i] !== p[i] && p[i] !== '.') {
            return false;
        }
    }

    let flag = false;
    let i = star.index;

    while (i <= s.length && (i === star.index || s[i - 1] === star.char || star.char === '.')) {
        flag = isMatch(s.slice(i), p.slice(star.index + 2));
        if (flag) {
            return true;
        }
        i++;
    }

    return false;
};
/*
console.log(isMatch('aa', 'a'));
console.log(isMatch('aa', 'a*'));
console.log(isMatch('ab', '.*'));
*/
console.log(isMatch('aabcbcbcaccbcaabc', '.*a*aa*.*b*.c*.*a*'));