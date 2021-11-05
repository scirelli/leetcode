from __future__ import annotations

from typing import List, Tuple


class BinaryTreeList:
    def __init__(self, tree: List[int]):
        self._binary_tree: List[int] = tree

    def LeftSibling(self, index: int) -> Tuple[int, int]:
        """
        Left sibling(r) = r−1; if r is even and r≠0.
        """
        if index & 0x00000001 != 0 or index == 0:
            raise IndexError("No left sibling")
        i = index - 1
        return (i, self._binary_tree[i])

    def RightSibling(self, index: int) -> Tuple(int, int):
        """
        Right sibling(r) = r+1; if r is odd and r+1<n.
        """
        i = index + 1
        if index & 0x00000001 == 0 or i >= len(self._binary_tree):
            raise IndexError("No right sibling")

        return (i, self._binary_tree[i])

    def LeftChild(self, index: int) -> Tuple[int, int]:
        """
        Left child(r) = 2r + 1; if 2r + 1 < n.
        """
        lc = (index << 1) + 1
        if lc >= len(self._binary_tree):
            raise IndexError("No left child")
        return (lc, self._binary_tree[lc])

    def RightChild(self, index: int) -> Tuple(int, int):
        """
        Right child(r) = 2r + 2; if 2r+2 < n.
        """
        rc = (index << 1) + 2
        if rc >= len(self._binary_tree):
            raise IndexError("No right child")
        return (rc, self._binary_tree[rc])

    def Parent(self, index: int) -> Tuple[int, int]:
        """
        Parent(r) = ⌊(r−1)/2⌋; if r≠0.
        """
        if index == 0:
            raise IndexError("No parent node")

        p = (index - 1) >> 1
        return (p, self._binary_tree[p])

    def __str__(self) -> str:
        return self._binary_tree.__str__()

    def __repr__(self) -> str:
        return self._binary_tree.__repr__()
