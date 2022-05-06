#!/usr/bin/env node
// https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/
// Given a string s of '(' , ')' and lowercase English characters.

// Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.

// Formally, a parentheses string is valid if and only if:

// It is the empty string, contains only lowercase characters, or
// It can be written as AB (A concatenated with B), where A and B are valid strings, or
// It can be written as (A), where A is a valid string.


// Example 1:

// Input: s = "lee(t(c)o)de)"
// Output: "lee(t(c)o)de"
// Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.
// Example 2:

// Input: s = "a)b(c)d"
// Output: "ab(c)d"
// Example 3:

// Input: s = "))(("
// Output: ""
// Explanation: An empty string is also valid.


// Constraints:

// 1 <= s.length <= 105
// s[i] is either'(' , ')', or lowercase English letter.

/**
 * @param {string} s
 * @return {string}
 */
function minRemoveToMakeValid(s) {
    console.log(parse(s));
}

//)))
//(a
//^""
// ^"("
// ^"(a"
function parse(s, i=0, oc=0, r='') {
    for(let c, l=s.length; i<l; i++) {
        c = s[i];
        if(c >= 'a' && c <= 'z') r+=c;
        if(c === '(') {
            r += parse(s, i+1, oc+1, r);
        }
        if(c === ')') {
            if(o>0) {
                o--;
                r + ')';
            }
        }
    }

    return r;
}
