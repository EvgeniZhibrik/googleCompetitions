/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    nums.sort((a, b) => a-b);

    const res = {};

    for (let i = 0; i < nums.length - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
            break;
        }
        for (let j = i + 1; j < nums.length - 2; j++) {
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }

            if(nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
                break;
            }

            let left = j + 1;
            let right = nums.length - 1;

            while (right - left > 0) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum > target) {
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    res[[nums[i], nums[j], nums[left], nums[right]].join(',')] = true;
                    right--;
                    left++;
                }
            }
        }
    }

    return Object.keys(res).map((key) => key.split(',').map((v) => +v));
};

console.log(fourSum([1,0,-1,0,-2,2], 0));
console.log(fourSum([2,2,2,2,2], 8));