#!/usr/bin/python3
# A decimal number is called deci-binary if each of its digits is either 0 or 1
# without any leading zeros. For example, 101 and 1100 are deci-binary, while 112 and 3001 are not.
# Given a string n that represents a positive decimal integer, return the
# minimum number of positive deci-binary numbers needed so that they sum up to n.

# Example 1:

# Input: n = "32"
# Output: 3
# Explanation: 10 + 11 + 11 = 32
# Example 2:
# 32
# 11
# 11
# 10

# Input: n = "82734"
# Output: 8
# 82734
# 11111
# 11111
# 10111
# 10101
# 10100
# 10100
# 10100
# 10000

# Example 3:

# Input: n = "27346209830709182346"
# Output: 9
# 27346209830709182346
# 11111  11
# 11111  11
#  1111  11
#  1 11  11
#  1  1  11
#  1  1  11
#  1     11
#        11
#        1
###################################################


class Solution:
    def minPartitions(self, n: str) -> int:
        return int(max(list(n)))
