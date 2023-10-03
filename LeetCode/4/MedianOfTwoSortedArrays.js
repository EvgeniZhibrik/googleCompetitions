/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    const length = nums1.length + nums2.length;



    if (length % 2 === 0) {
        const medium = length / 2 - 1;
        return findSolution(nums1, nums2, medium, true);
    } else {
        const medium = (length - 1) / 2;
        return findSolution(nums1, nums2, medium, false);
    }
};

function findSolution(nums1, nums2, medium, isTwo = true) {
    if (nums1.length < nums2.length) {
        const temp = nums2;
        nums2 = nums1;
        nums1 = temp;
    }

    if (nums1.length + nums2.length <= 8) {
        let i = 0;
        let j = 0;
        let limit = isTwo ? -1 : 0
        let count = medium;
        const arr = [];
        while(i < nums1.length && j < nums2.length && count >= limit) {
            if (nums1[i] <= nums2[j]) {
                arr.push(nums1[i]);
                i++;
                count--;
                continue;
            }

            arr.push(nums2[j]);
            j++;
            count--;
        }

        while(i < nums1.length && count >= limit) {
            arr.push(nums1[i]);
            i++;
            count--;
        }

        while(j < nums2.length && count >= limit) {
            arr.push(nums2[j]);
            j++;
            count--;
        }

        return isTwo ? (arr[arr.length - 1] + arr[arr.length - 2]) / 2 : arr[arr.length - 1];
    }

    if (isTwo) {
        if (nums1[nums1.length - 1] <= nums2[0]) {
            if (nums1.length > medium + 1) {
                return (nums1[medium] + nums1[medium + 1]) / 2;
            } else {
                return (nums1[medium] + nums2[0]) / 2;
            }
        } else if (nums2[nums2.length - 1] <= nums1[0]) {
            if (nums2.length === medium + 1) {
                return (nums2[medium] + nums1[0]) / 2;
            } else {
                return (nums1[medium - nums2.length] + nums1[medium - nums2.length + 1]) / 2;
            }
        }
    } else {
        if(nums1[nums1.length - 1] <= nums2[0]) {
            return nums1[medium];
        } else if (nums2[nums2.length - 1] <= nums1[0]) {
            return nums1[medium - nums2.length];
        }
    }

    let i;
    let j;

    let leftStart = 0;
    let leftFinish = nums1.length - 1;
    let rightStart = 0;
    let rightFinish = nums2.length - 1;

    while (leftFinish - leftStart > 1) {
        i = Math.floor((leftFinish + leftStart) / 2);
        j = medium - i;

        if (j >= 0 && j < nums2.length) {
            if (nums1[i] === nums2[j]) {
                return nums1[i];
            } else if (nums1[i] > nums2[j]) {
                leftFinish = i;
                rightStart = j;
            } else {
                leftStart = i;
                rightFinish = j;
            }

            continue;
        }

        if (j < 0) {
            leftFinish = i;
            continue;
        }

        if (j >= nums2.length) {
            leftStart = i;
        }
    }

    return findSolution(nums1.slice(leftStart, leftFinish + 1), nums2.slice(rightStart, rightFinish + 1), medium - leftStart - rightStart, isTwo);
}

console.log(findMedianSortedArrays([2, 2], [1, 3, 3, 4, 4, 4, 4]));
console.log(findMedianSortedArrays([2, 2, 2], [1, 3, 3, 4, 4, 4, 4]));
console.log(findMedianSortedArrays([2, 2, 2, 2], [1, 3, 3, 4, 4, 4, 4]));
console.log(findMedianSortedArrays([2, 2, 2, 2, 2], [1, 3, 3, 4, 4, 4, 4]));
console.log(findMedianSortedArrays([2, 2, 2, 2, 2, 2], [1, 3, 3, 4, 4, 4, 4]));
console.log(findMedianSortedArrays([2, 2, 2, 2, 2, 2, 2], [1, 3, 3, 4, 4, 4, 4]));
console.log(findMedianSortedArrays([2, 3, 3], [1, 2, 2, 4, 4, 4, 4]));