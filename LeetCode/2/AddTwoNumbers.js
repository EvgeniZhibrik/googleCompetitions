/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let addition = 0;
    let result = null;
    let lastNode = null;
    while(l1 || l2 || addition) {
        newVal = ((l1?.val || 0) + (l2?.val || 0) + addition) % 10;
        addition = ((l1?.val ||0) + (l2?.val || 0) + addition - newVal) / 10;

        if(!result) {
            result = new ListNode(newVal, null);
            lastNode = result;
        } else {
            const newNode = new ListNode(newVal, null);
            lastNode.next = newNode;
            lastNode = newNode;
        }

        l1 = l1?.next || null;
        l2 = l2?.next || null;
    }

    if(!result) {
        result = new ListNode(0, null);
    }
    return result;
};

