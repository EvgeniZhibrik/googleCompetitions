/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const obj = {};
    let result;
    nums.some((num, index) => {
        if(obj.hasOwnProperty(target - num)) {
            result = [obj[target-num], index];
            return true;
        }

        obj[num] = index;
        return false;
    });

    return result;
};