#!/usr/bin/env node
/* eslint-disable no-console */
/*
https://leetcode.com/problems/insertion-sort-list/
Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list's head.

The steps of the insertion sort algorithm:

Insertion sort iterates, consuming one input element each repetition and growing a sorted output list.
At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list and inserts it there.
It repeats until no input elements remain.
The following is a graphical example of the insertion sort algorithm. The partially sorted list (black) initially contains only the first element in the list. One element (red) is removed from the input data and inserted in-place into the sorted list with each iteration.

Examples:
Input: head = [4,2,1,3]
Output: [1,2,3,4]

Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]

The number of nodes in the list is in the range [1, 5000].
-5000 <= Node.val <= 5000
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {Node} head
 * @return {Node}
 */
let sort = insertionSort;

function insertionSortList(head) {
    let list = [],
        node = head,
        tmp = null;

    while(node !== null) {
        list.push(node);
        node = node.next;
    }

    list = sort(list);

    head = tmp = list[0];
    for(let i=1; i<list.length; i++) {
        tmp.next = list[i];
        tmp = tmp.next;
    }
    tmp = list.pop();
    tmp.next = null;

    return head;
}

function builtIn(array) {
    return array.sort((a, b)=>{
        return a.val - b.val;
    });
}

function insertionSort(array) {                 //          e
    for(let end = 0; end<array.length; end++) { // -1 0 1 2 3
        for(let p=end-1, tmp; p>=0; p--) {      //        ▼
            if(array[p+1].val < array[p].val) { //   [4,2,1,3]
                tmp = array[p];                 //   [1,2,3,4]
                array[p] = array[p+1];
                array[p+1] = tmp;
            }else{
                break;
            }
        }
    }
    return array;
}

function Node(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

Node.prototype = {
    equal: function equal(node) {
        let operand1 = this,
            operand2 = node;

        while(operand1 && operand2) {
            if(operand1.val !== operand2.val) {
                return false;
            }
            operand1 = operand1.next;
            operand2 = operand2.next;
        }

        return true;
    },

    forEach: function forEach(callback) {
        let i = 0;
        for(let val of this) {
            callback(val, i++);
        }
    },

    reduce: function reduce(callback, accu) {
        let i = 0;
        for(let val of this) {
            accu = callback(accu, val, i++);
        }
    },

    toString: function() {
        let str = [];
        for (let val of this) {
            str.push(val);
        }
        return str.join(',');
    },

    [Symbol.iterator]: function() {
        return this._NodeGenerator();
    },

    _NodeGenerator: function *NodeGenerator() {
        let node = this;

        while(node !== undefined && node !== null) {
            yield node.val;
            node = node.next;
        }
    }
};

function toLinkList(array) {
    let head = new Node(array[0]),
        node = head;

    for(let i=1; i<array.length; i++) {
        node.next = new Node(array[i]);
        node = node.next;
    }

    return head;
}

[
    {
        input:    toLinkList([4, 2, 1, 3]),
        expected: toLinkList([1, 2, 3, 4])
    },
    {
        input:    toLinkList([-1, 5, 3, 4, 0]),
        expected: toLinkList([-1, 0, 3, 4, 5])
    },
    {
        input:    toLinkList([4883, 1208, 3344, -1846, -2989, -2893, -2008, 4475, -2655, 3014, 4195, 2077, 3606, -4070, 840, 1558, 1418, 4211, -935, -1968, 2310, 1271, 4258, -2929, -2205, -3785, 437, -2421, 970, -465, 617, -1832, -4508, 3854, 3606, -2205, 2823, 3222, 2743, -3426, -3753, -703, -2093, -4521, -3828, 1875, -4555, 1547, 3227, 4325, 2489, 4893, -1026, 4844, 784, 4956, 3578, 3476, 2553, -4754, 4185, 1352, 589, -1431, -381, 4754, -3160, -4840, 3672, 3216, -3911, 661, 2723, -625, 1613, -2301, -61, 3620, 1123, -3655, 2575, -4596, 988, -2838, 4205, -4099, -4416, 1046, 3792, -1132, 4673, -1379, -257, -473, -3480, -3743, 1691, -4150, -4941, -3132]),
        expected: toLinkList([-4941, -4840, -4754, -4596, -4555, -4521, -4508, -4416, -4150, -4099, -4070, -3911, -3828, -3785, -3753, -3743, -3655, -3480, -3426, -3160, -3132, -2989, -2929, -2893, -2838, -2655, -2421, -2301, -2205, -2205, -2093, -2008, -1968, -1846, -1832, -1431, -1379, -1132, -1026, -935, -703, -625, -473, -465, -381, -257, -61, 437, 589, 617, 661, 784, 840, 970, 988, 1046, 1123, 1208, 1271, 1352, 1418, 1547, 1558, 1613, 1691, 1875, 2077, 2310, 2489, 2553, 2575, 2723, 2743, 2823, 3014, 3216, 3222, 3227, 3344, 3476, 3578, 3606, 3606, 3620, 3672, 3792, 3854, 4185, 4195, 4205, 4211, 4258, 4325, 4475, 4673, 4754, 4844, 4883, 4893, 4956])
    }
].forEach(test=> {
    let actual = insertionSortList(test.input);
    console.assert(test.expected.equal(actual), `Lists do not match. \nExpected \n\t${test.expected}\nActual:\n\t${actual}\n`);
});
/*
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function fill(count, value) {
    let array = [],
        gen = typeof(value) === 'function' ? value : ()=>0;

    for(let i=0; i<count; i++) {
        array.push(gen());
    }

    return array;
}
*/
