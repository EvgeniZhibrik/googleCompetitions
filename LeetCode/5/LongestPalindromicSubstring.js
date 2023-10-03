/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    const _s = '|' + s.split('').join('|') + '|';

    const radii = (new Array(_s.length)).fill(0);

    let center = 0;
    let radius = 0;
    let oldCenter;
    let oldRadius;

    const max = {
        center: 0,
        radius: 0
    };

    while (center < _s.length) {
        while(center - radius - 1 >= 0 && center + radius + 1 < _s.length && _s[center - radius - 1] === _s[center + radius + 1]) {
            radius++;
        }

        radii[center] = radius;
        if (radii[center] > max.radius) {
            max.center = center;
            max.radius = radii[center];
        }

        oldCenter = center;
        oldRadius = radius;
        center++;

        radius = 0;

        while(center < oldCenter + oldRadius) {
            let mirroredCenter = 2 * oldCenter - center;
            let maxMirroredRadius = oldCenter + oldRadius - center;

            if (radii[mirroredCenter] < maxMirroredRadius) {
                radii[center] = radii[mirroredCenter];
                if (radii[center] > max.radius) {
                    max.center = center;
                    max.radius = radii[center];
                }
                center++;
            } else if (radii[mirroredCenter] > maxMirroredRadius) {
                radii[center] = maxMirroredRadius;
                if (radii[center] > max.radius) {
                    max.center = center;
                    max.radius = radii[center];
                }
                center++;
            } else {
                radius = maxMirroredRadius;
                break;
            }
        }
    }

    return _s.slice(max.center - max.radius, max.center + max.radius + 1).replace(/\|/g, '');
};

console.log(longestPalindrome('babad'));
console.log(longestPalindrome('cbbd'));