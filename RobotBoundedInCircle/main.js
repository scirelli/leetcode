/*
On an infinite plane, a robot initially stands at (0, 0) and faces north. The robot can receive one of three instructions:

"G": go straight 1 unit;
"L": turn 90 degrees to the left;
"R": turn 90 degrees to the right.
The robot performs the instructions given in order, and repeats them forever.

Return true if and only if there exists a circle in the plane such that the robot never leaves the circle.



Example 1:

Input: instructions = "GGLLGG"
Output: true
Explanation: The robot moves from (0,0) to (0,2), turns 180 degrees, and then returns to (0,0).
When repeating these instructions, the robot remains in the circle of radius 2 centered at the origin.
Example 2:

Input: instructions = "GG"
Output: false
Explanation: The robot moves north indefinitely.
Example 3:

Input: instructions = "GL"
Output: true
Explanation: The robot moves from (0, 0) -> (0, 1) -> (-1, 1) -> (-1, 0) -> (0, 0) -> ...


Constraints:

1 <= instructions.length <= 100
instructions[i] is 'G', 'L' or, 'R'.
*/

/**
 * @param {string} instructions
 * @return {boolean}
 * GGGLGLGLGG = 3
 * GGLLGG = 2
 * GG = 0
 * L = 1
 * R = 1
 * G = 0
 * GL = 1
 */
(()=>{
    const LEFT = 1,
        RIGHT = LEFT + LEFT + LEFT;
    const NORTH = 0,
        EAST = 1,
        SOUTH = 2,
        WEST = 3,
        X = 0,
        Y = 1,
        MOVES = [
            [0, 1], //NORTH
            [1, 0], //EAST
            [0, -1], //SOUTH
            [-1, 0]//WEST
        ];

    function isRobotBounded(instructions) {
        let o = {
            dir: 0,
            x:   0,
            y:   0
        };

        instructions = instructions.split('');


        instructions.reduce((d, c)=>{
            switch (c) {
                case 'L':
                    d.dir = (d.dir + LEFT) % 4;
                    break;
                case 'R':
                    d.dir = (d.dir + RIGHT) % 4;
                    break;
                case 'G':
                    d.x += MOVES[d.dir][X];
                    d.y += MOVES[d.dir][Y];
            }
            return d;
        }, o);
        return (o.x === 0 && o.y === 0) || o.dir !== NORTH;
    }

    (function test(tests) {
        tests.forEach((test=>{
            console.assert(isRobotBounded(test.case) === test.expected, `${test.case} failed. Expected ${test.expected} got ${!test.expected}`);
        }));
    })([
        { case: 'GGLLGG',    expected: true  },
        { case: 'GG',        expected: false },
        { case: 'GL',        expected: true  },
        { case: 'GLGLGGLGL', expected: false }
    ]);
}
)();
