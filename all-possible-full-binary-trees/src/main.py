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
from binary_tree.binary_tree_list import BinaryTreeList


def main():
    bt = BinaryTreeList([1, 2, 3, 4])
    print(bt)


if __name__ == "__main__":
    main()
