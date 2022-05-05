#!/usr/bin/env node
//https://leetcode.com/problems/add-two-numbers/
// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
// You may assume the two numbers do not contain any leading zero, except the number 0 itself.
//
// Example 1:
// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.
//
// Example 2:
// Input: l1 = [0], l2 = [0]
// Output: [0]
// Example 3:
//
// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]

// Constraints:

// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.
// Definition for singly-linked list.
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

ListNode.prototype.toArray = function toArray(){
    let ptr = this,
        rtn = [];
    while(ptr){
        rtn.push(ptr.val);
        ptr = ptr.next;
    }
    return rtn;
};

ListNode.toListNode = function toListNode(a) {
    if(!Array.isArray(a)) return null;

    let head = new ListNode(), t;
    a.reduce((a, d)=>{
        a.next = new ListNode(d);
        return a.next;
    }, head);
    t = head.next
    head.next = null;
    return t;
};
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    let sumPtr = new ListNode(),
        sumDigitPtr = sumPtr,
        addend1 = 0,
        addend2 = 0
        carry = 0,
        sum = 0;
   
    while(l1 || l2) {
        addend1 = l1 ? l1.val : 0;
        addend2 = l2 ? l2.val : 0;
        sum = addend1 + addend2 + carry;
        if(sum >= 10) {
            carry = 1;
            sum = sum - 10;
        }else{
            carry = 0;
        }

        sumDigitPtr.next = new ListNode(sum)
        sumDigitPtr = sumDigitPtr.next
        l1 = l1 ? l1.next: null;
        l2 = l2 ? l2.next: null;
    }
    if(carry) {
        sumDigitPtr.next = new ListNode(1)
        sumDigitPtr = sumDigitPtr.next
    }
    return sumPtr.next;
};


[
    [ListNode.toListNode([2,4,3]), ListNode.toListNode([5,6,4]), [7,0,8]],
    [ListNode.toListNode([0]), ListNode.toListNode([0]), [0]],
    [ListNode.toListNode([9,9,9,9,9,9,9]), ListNode.toListNode([9,9,9,9]), [8,9,9,9,0,0,0,1]]
].forEach(test=>{
    let result = addTwoNumbers(test[0], test[1]),
        expected = test[2];
    console.log(result.toArray(), '=', expected);
});
