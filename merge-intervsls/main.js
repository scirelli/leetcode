#!/usr/bin/env node
/* eslint-disable no-console */
/* https://leetcode.com/problems/merge-intervals/
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.



Example 1:

Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.


Constraints:

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104
*/
function merge(intervals) {
    return intervals.sort((a, b)=>a[0]-b[0]).reduce((a, interval)=> {
        for(let i=0; i<a.length; i++) {
            if(interval[0] >= a[i][0] && interval[0] <= a[i][1]) {
                a[i][1] = Math.max(interval[1], a[i][1]);
                interval = [];
                break;
            }
        }
        if(interval.length) {
            a.push(interval);
        }
        return a;
    }, []);
}


[
    {
        input:    [[1, 3], [2, 6], [8, 10], [15, 18]],
        expected: [[1, 6], [8, 10], [15, 18]]
    },
    {
        input:    [[1, 4], [4, 5]],
        expected: [[1, 5]]
    }

].forEach(test=>{
    let actual = merge(test.input);

    console.assert(test.expected.reduce((a, v, i)=>{
        return a && v[0] === actual[i][0] && v[1] === actual[i][1];
    }, true), `Not equal\n\t${test.expected}\n\t${actual}`);
});
