/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a-b);
    let closest = Infinity;

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i-1]) {
            continue;
        }

        if (nums[i] + nums[i + 1] + nums[i + 2] - target > Math.abs(closest - target)) {
            break;
        }

        let left = i + 1;
        let right = nums.length - 1;

        while (right - left > 0) {
            const sum = nums[i] + nums[left] + nums[right];
            if (Math.abs(sum - target) < Math.abs(closest - target)) {
                closest = sum;
            }
            if (sum > target) {
                right--;
            } else if (sum < target) {
                left++;
            } else {
                return closest;
            }
        }
    }

    return closest;
};

console.log(threeSumClosest([-1,2,1,-4], 1));
console.log(threeSumClosest([0,0,0], 1));