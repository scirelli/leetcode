#!/usr/bin/env node
/* eslint-disable no-console */
/*
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
int get(int key) Return the value of the key if the key exists, otherwise return -1.
void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.



Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4


Constraints:

1 <= capacity <= 3000
0 <= key <= 104
0 <= value <= 105
At most 2 * 105 calls will be made to get and put.
*/
(()=>{
    /**
     * @param {number} capacity
     */
    function LRUCache(capacity) {
        this.cache = {};
        this.capacity = Math.abs(parseInt(capacity));
        this.curCapacity = 0;
        this.list = new LRUCache.LRUList();
    }

    LRUCache.prototype = {
        /**
         * @param {number} key
         * @return {number}
         */
        get: function(key) {
            let value = -1;

            if (this.cache[key] !== undefined) {
                value = this.cache[key].value;
                this.list.append(this.list.remove(this.cache[key]));
            }

            return value;
        },

        /**
         * @param {number} key
         * @param {number} value
         * @return {void}
         */
        put: function(key, value) {
            if(this.cache[key]) {
                this.cache[key].value = value;
                this.list.append(this.list.remove(this.cache[key]));
            } else if (this.curCapacity < this.capacity) {
                this.cache[key] = new LRUCache.Node(key, value);
                this.list.append(this.cache[key]);
                this.curCapacity++;
            } else {
                let node = this.list.removeHead();
                delete this.cache[node.key];

                node.value = value;
                node.key = key;
                this.list.append(node);
                this.cache[key] = node;
            }
        }
    };

    LRUCache.Node = function Node(key, value) {
        this.key = key;
        this.value = value;
        this.prevNode = null;
        this.nextNode = null;
    };

    LRUCache.LRUList = function LRUList() {
        this.head = null;
        this.tail = null;
    };

    LRUCache.LRUList.prototype = {
        prepend: function(node) {
            this.head.prevNode = node;
            node.nextNode = this.head;
            node.prevNode = null;
            this.head = node;
            return this.head;
        },

        removeHead: function() {
            return this.remove(this.head);
        },
        remove: function(node) {
            if(!node) return node;

            if(node === this.head) {
                if(this.head === this.tail) {
                    this.head = this.tail = null;
                }else{
                    this.head = this.head.nextNode;
                    this.head.prevNode = null;
                }
            }else if(node === this.tail) {
                this.tail = this.tail.prevNode;
                this.tail.nextNode = null;
            }else{
                node.prevNode.nextNode = node.nextNode;
                node.nextNode.prevNode = node.prevNode;
            }

            node.nextNode = null;
            node.prevNode = null;
            return node;
        },

        append: function(node) {
            if(this.head === null && this.tail === null) {
                return this.head = this.tail = node;
            }
            this.tail.nextNode = node;
            node.prevNode = this.tail;
            node.nextNode = null;
            this.tail = node;
            return this.tail;
        }
    };

    /**
     * Your LRUCache object will be instantiated and called as such:
     * var obj = new LRUCache(capacity)
     * var param_1 = obj.get(key)
     * obj.put(key,value)
     */

    //####################### Tests ###############################
    [
        {
            commands: [
                ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'],
                [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
            ],
            expected: [undefined, undefined, undefined, 1, undefined, -1, undefined, -1, 3, 4]
        },
        {
            commands: [
                ['LRUCache', 'put', 'get'],
                [[1], [2, 1], [2]]
            ],
            expected: [undefined, undefined, 1]
        },
        {
            commands: [
                ['LRUCache', 'put', 'put', 'put', 'put', 'get', 'get'],
                [[2], [2, 1], [1, 1], [2, 3], [4, 1], [1], [2]]
            ],
            expected: [undefined, undefined, undefined, undefined, undefined, -1, 3]
        },
        {
            commands: [
                ['LRUCache', 'put', 'put', 'put', 'put', 'put', 'get', 'put', 'get', 'get', 'put', 'get', 'put', 'put', 'put', 'get', 'put', 'get', 'get', 'get', 'get', 'put', 'put', 'get', 'get', 'get', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get', 'put', 'put', 'put', 'get', 'put', 'get', 'get', 'put', 'put', 'get', 'put', 'put', 'put', 'put', 'get', 'put', 'put', 'get', 'put', 'put', 'get', 'put', 'put', 'put', 'put', 'put', 'get', 'put', 'put', 'get', 'put', 'get', 'get', 'get', 'put', 'get', 'get', 'put', 'put', 'put', 'put', 'get', 'put', 'put', 'put', 'put', 'get', 'get', 'get', 'put', 'put', 'put', 'get', 'put', 'put', 'put', 'get', 'put', 'put', 'put', 'get', 'get', 'get', 'put', 'put', 'put', 'put', 'get', 'put', 'put', 'put', 'put', 'put', 'put', 'put'],
                [[10], [10, 13], [3, 17], [6, 11], [10, 5], [9, 10], [13], [2, 19], [2], [3], [5, 25], [8], [9, 22], [5, 5], [1, 30], [11], [9, 12], [7], [5], [8], [9], [4, 30], [9, 3], [9], [10], [10], [6, 14], [3, 1], [3], [10, 11], [8], [2, 14], [1], [5], [4], [11, 4], [12, 24], [5, 18], [13], [7, 23], [8], [12], [3, 27], [2, 12], [5], [2, 9], [13, 4], [8, 18], [1, 7], [6], [9, 29], [8, 21], [5], [6, 30], [1, 12], [10], [4, 15], [7, 22], [11, 26], [8, 17], [9, 29], [5], [3, 4], [11, 30], [12], [4, 29], [3], [9], [6], [3, 4], [1], [10], [3, 29], [10, 28], [1, 20], [11, 13], [3], [3, 12], [3, 8], [10, 9], [3, 26], [8], [7], [5], [13, 17], [2, 27], [11, 15], [12], [9, 19], [2, 15], [3, 16], [1], [12, 17], [9, 1], [6, 19], [4], [5], [5], [8, 1], [11, 7], [5, 2], [9, 28], [1], [2, 2], [7, 4], [4, 22], [7, 24], [9, 26], [13, 28], [11, 26]]
            ],
            expected: [undefined, undefined, undefined, undefined, undefined, undefined, -1, undefined, 19, 17, undefined, -1, undefined, undefined, undefined, -1, undefined, -1, 5, -1, 12, undefined, undefined, 3, 5, 5, undefined, undefined, 1, undefined, -1, undefined, 30, 5, 30, undefined, undefined, undefined, -1, undefined, -1, 24, undefined, undefined, 18, undefined, undefined, undefined, undefined, -1, undefined, undefined, 18, undefined, undefined, -1, undefined, undefined, undefined, undefined, undefined, 18, undefined, undefined, -1, undefined, 4, 29, 30, undefined, 12, -1, undefined, undefined, undefined, undefined, 29, undefined, undefined, undefined, undefined, 17, 22, 18, undefined, undefined, undefined, -1, undefined, undefined, undefined, 20, undefined, undefined, undefined, -1, 18, 18, undefined, undefined, undefined, undefined, 20, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
        }
    ].forEach(test=>{
        let commands, params, cache,
            actual = [];
        [commands, params] = test.commands;
        commands.forEach((command, index)=> {
            let param = params[index];
            switch(command) {
                case 'LRUCache': cache = new LRUCache(param[0]); actual.push(undefined); break;
                case 'put': cache.put(param[0], param[1]); actual.push(undefined); break;
                case 'get': actual.push(cache.get(param[0])); break;
            }
        });
        test.expected.forEach((v, i)=>{
            console.assert(v === actual[i], `Expected ${v} got ${actual[i]} actual[${i}]`);
        });
    });
})();
