/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    return removeNthRecursion(head, n, 0).head;
};

function removeNthRecursion(node, n, level) {
    if(!node) {
        return {
            fromEnd: 0,
            head: null
        };
    }

    const result = removeNthRecursion(node.next, n, level + 1);

    if(result.fromEnd === n - 1 && level === 0) {
        return {
            fromEnd: result.fromEnd + 1,
            head: node.next
        };
    }

    if (result.fromEnd === n) {
        node.next = node.next.next;
        return {
            fromEnd: result.fromEnd + 1,
            head: node
        };
    }

    return {
        fromEnd: result.fromEnd + 1,
        head: node
    };
}

function arrToList(arr) {
    return arr.reduceRight((head, val) => {
        return {
            value: val,
            next: head
        };

    }, null);
}

function listToArr(head) {
    const arr = [];
    while (head) {
        arr.push(head.value);
        head = head.next;
    }

    return arr;
}

// console.log(listToArr(removeNthFromEnd(arrToList([1,2,3,4,5]), 2)));
// console.log(listToArr(removeNthFromEnd(arrToList([1]), 1)));
console.log(listToArr(removeNthFromEnd(arrToList([1,2]), 1)));