#!/usr/bin/env python3
"""
n = 5
[n1,n2,n3,n4,n5]

      (n1)    [n2,n3,n4,n5]


      (n1)    [n4,n5]
      /  \
   (n2)  (n3)



      (n1)   []
      /  \
   (n2)  (n3)
   /  \
(n4)  (n5)


      (n1)    [n4,n5]
      /  \
   (n2)  (n3)


      (n1)   []
      /  \
   (n2)  (n3)
         /. \
      (n4)  (n5)


      (n1)   [n2,n3,n4,n5]
"""
from typing import List

from binary_tree.binary_tree_list import BinaryTreeList, treeFactory

INDEX = 0
VALUE = 0


def fill_node(parent: int, tree: BinaryTreeList) -> int:
    tree.Insert(tree.LeftChild(parent)[INDEX], 0)
    tree.Insert(tree.RightChild(parent)[INDEX], 0)
    return parent


def _list_full_binary_trees(rootIndex: int, tree: BinaryTreeList, remainingNodes: int, allFull: List[BinaryTreeList]) -> List[BinaryTreeList]:
    if rootIndex >= tree.Length() or rootIndex < 0:
        return allFull
    if remainingNodes < 2:
        return allFull

    remainingNodes -= 2
    fill_node(rootIndex, tree)

    if remainingNodes == 0:
        allFull.append(tree)
        return allFull

    try:
        _list_full_binary_trees(tree.LeftChild(rootIndex)[INDEX], tree.Clone(), remainingNodes, allFull)
    except IndexError:
        pass
    try:
        _list_full_binary_trees(tree.RightChild(rootIndex)[INDEX], tree.Clone(), remainingNodes, allFull)
    except IndexError:
        pass

    return allFull


def list_full_binary_trees(nodeCount: int) -> List[BinaryTreeList]:
    if nodeCount == 0:
        return []
    if nodeCount & 0x00000001 == 0:
        return []

    tree = treeFactory(nodeCount * 2)
    tree.Insert(0, 0)
    return _list_full_binary_trees(0, tree, nodeCount - 1, [])


def example_1() -> List[BinaryTreeList]:
    return list_full_binary_trees(7)


def main():
    breakpoint()
    print(example_1())


if __name__ == "__main__":
    main()

#                       (0)
#                /               \
#              (1)               (2)
#             /     \          /       \
#           (3)      (4)      (5)      (6)
#         /    \     /  \    /    \
#       (7)    (8) (9) (10) (11) (12)
#    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

# Mines missing
#                       (0)
#                /               \
#              (1)               (2)
#             /     \          /       \
#           (3)      (4)      (5)      (6)
# [0, 0, 0, 0, 0, 0]


#  0  1  2  3  4   5      6     7    8    9 10
# [0, 0, 0, 0, 0, null, null, null, null, 0, 0]
#
#                  (0)
#                /     \
#              (1)      (2)
#             /     \
#           (3)      (4)
#                    /  \
#                   (9) (10)


# LeetCode answer missing this one
# 0  1  2   3     4    5  6   7     8     9     10  11 12
#[0, 0, 0, null, null, 0, 0, null, null, null, null, 0, 0]
#                  (0)
#                /    \
#              (1)     (2)
#                     /   \
#                   (5)    (6)
#                 /    \
#                (11) (12)
