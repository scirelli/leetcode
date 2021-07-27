#!/usr/bin/env python3
from __future__ import annotations

from typing import Optional


class ListNode():
    def __init__(self, val: int = 0, nextNode: Optional[ListNode] = None):
        self.val = val
        self.next = nextNode

    def __str__(self) -> str:
        return str(self.val)

    def __iter__(self) -> NodeIterator:
        return NodeIterator(self)

    def __eq__(self, node: object) -> bool:
        if not isinstance(node, ListNode):
            return NotImplemented

        operand1: Optional[ListNode] = self
        operand2: Optional[ListNode] = node

        while operand1 is not None and operand2 is not None:
            if operand1.val != operand2.val:
                return False
            operand1 = operand1.next
            operand2 = operand2.next

        return True

    def __lt__(self, node: object) -> bool:
        if not isinstance(node, ListNode):
            return NotImplemented

        return self.val < node.val


class NodeIterator:
    def __init__(self, node: ListNode):
        self.node: Optional[ListNode] = node

    def __next__(self) -> int:
        if self.node is None:
            raise StopIteration
        n = self.node
        self.node = self.node.next
        return n.val


def toLinkList(nums: list[int]) -> Optional[ListNode]:
    head = ListNode(nums[0])
    node = head

    for v in nums[1:]:
        node.next = ListNode(v)
        node = node.next

    return head


def insertionSort(array: list[Optional[ListNode]]) -> list[Optional[ListNode]]:
    for end in range(len(array)):
        for p in range(end - 1, -1, -1):
            if array[p + 1] < array[p]:
                tmp = array[p]
                array[p] = array[p + 1]
                array[p + 1] = tmp
            else:
                break

    return array


sort = insertionSort


class Solution:
    def insertionSortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head is None:
            return head

        node_list: list[Optional[ListNode]] = []
        node: Optional[ListNode] = head
        tmp: Optional[ListNode] = None

        while node is not None:
            node_list.append(node)
            node = node.next

        node_list = sort(node_list)

        head = tmp = node_list[0]
        for i, n in enumerate(node_list):
            tmp.next = n
            tmp = tmp.next
        tmp = node_list.pop()
        tmp.next = None

        return head


tests = [
    {
        "input": toLinkList([4, 2, 1, 3]),
        "expected": toLinkList([1, 2, 3, 4])
    },
    {
        "input": toLinkList([-1, 5, 3, 4, 0]),
        "expected": toLinkList([-1, 0, 3, 4, 5])
    },
    {
        "input": toLinkList([4883, 1208, 3344, -1846, -2989, -2893, -2008, 4475, -2655, 3014, 4195, 2077, 3606, -4070, 840, 1558, 1418, 4211, -935, -1968, 2310, 1271, 4258, -2929, -2205, -3785, 437, -2421, 970, -465, 617, -1832, -4508, 3854, 3606, -2205, 2823, 3222, 2743, -3426, -3753, -703, -2093, -4521, -3828, 1875, -4555, 1547, 3227, 4325, 2489, 4893, -1026, 4844, 784, 4956, 3578, 3476, 2553, -4754, 4185, 1352, 589, -1431, -381, 4754, -3160, -4840, 3672, 3216, -3911, 661, 2723, -625, 1613, -2301, -61, 3620, 1123, -3655, 2575, -4596, 988, -2838, 4205, -4099, -4416, 1046, 3792, -1132, 4673, -1379, -257, -473, -3480, -3743, 1691, -4150, -4941, -3132]),
        "expected": toLinkList([-4941, -4840, -4754, -4596, -4555, -4521, -4508, -4416, -4150, -4099, -4070, -3911, -3828, -3785, -3753, -3743, -3655, -3480, -3426, -3160, -3132, -2989, -2929, -2893, -2838, -2655, -2421, -2301, -2205, -2205, -2093, -2008, -1968, -1846, -1832, -1431, -1379, -1132, -1026, -935, -703, -625, -473, -465, -381, -257, -61, 437, 589, 617, 661, 784, 840, 970, 988, 1046, 1123, 1208, 1271, 1352, 1418, 1547, 1558, 1613, 1691, 1875, 2077, 2310, 2489, 2553, 2575, 2723, 2743, 2823, 3014, 3216, 3222, 3227, 3344, 3476, 3578, 3606, 3606, 3620, 3672, 3792, 3854, 4185, 4195, 4205, 4211, 4258, 4325, 4475, 4673, 4754, 4844, 4883, 4893, 4956])
    }
]

for test in tests:
    actual = Solution().insertionSortList(test.get("input", None))
    assert test.get("expected") == actual, f"Lists do not match. \nExpected \n\t{','.join([str(x) for x in test.get('expected')])}\nActual:\n\t{','.join([str(x) for x in actual])}\n"
