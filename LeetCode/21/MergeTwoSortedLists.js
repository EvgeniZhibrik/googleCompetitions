/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    if (!list1) {
        return list2;
    }

    if (!list2) {
        return list1;
    }

    let start, current;

    if (list1.val > list2.val) {
        start = list2;
        current = list2;
        list2 = list2.next;
    } else {
        start = list1;
        current = list1;
        list1 = list1.next;
    }

    while(list1 && list2) {
        if (list1.val > list2.val) {
            current.next = list2;
            current = list2;
            list2 = list2.next;
        } else {
            current.next = list1;
            current = list1;
            list1 = list1.next;
        }
    }

    if (list1) {
        current.next = list1;
    }

    if (list2) {
        current.next = list2;
    }

    return start;
};

function arrToList(arr) {
    return arr.reduceRight((head, val) => {
        return {
            val: val,
            next: head
        };

    }, null);
}

function listToArr(head) {
    const arr = [];
    while (head) {
        arr.push(head.val);
        head = head.next;
    }

    return arr;
}

console.log(listToArr(mergeTwoLists(arrToList([1, 2, 4]), arrToList([1,3,4]))));