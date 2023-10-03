/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    if (height.length < 2) {
        return 0;
    }

    if (height.length === 2) {
        return Math.min(...height);
    }

    let leftMax = height[0];
    const posLeft = [{
        height: height[0],
        index: 0
    }];
    let max = -Infinity;

    for (let i = 1; i < height.length; i++) {
        if (height[i] * i < max) {
            continue;
        }
        for (let j = 0; j < posLeft.length; j++) {
            const temp = Math.min(posLeft[j].height, height[i]) * (i - posLeft[j].index);
            if (temp > max) {
                max = temp;
            }

            if(posLeft[j].height >= height[i]) {
                break;
            }
        }

        if(height[i] > leftMax) {
            leftMax = height[i];
            posLeft.push({
                height: height[i],
                index: i
            });
        }
    }

    return max;
};

console.log(maxArea([1,8,6,2,5,4,8,3,7]));
console.log(maxArea([75,21,3,152,13,107,163,166,32,160,41,131,7,67,56,5,153,176,29,139,61,149,176,142,64,75,170,156,73,48,148,101,70,103,53,83,11,168,1,195,81,43,126,88,62,134,45,167,63,26,107,124,128,83,67,192,158,189,149,184,37,49,85,107,152,90,143,115,58,144,62,139,139,189,180,153,75,177,121,138,4,28,15,132,63,82,124,174,23,25,110,60,74,147,120,179,37,63,94,47]));