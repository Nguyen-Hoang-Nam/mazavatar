import crypto from "crypto";
import args from "./parseArgs.js";
import { getBit, between } from "./utils.js";
import { N, S, E, W, DX, DY, OPPOSITE } from "./global.js";

const width = args["width"] ?? 1;
const height = args["height"] ?? 1;
const username = args["username"] ?? "";
const algorithm = args["algorithm"] ?? "sha256";

// Hash username
const hash = crypto.createHash(algorithm).update(username).digest("hex");
const hashHexArr = hash.match(/.{1,2}/g);
const hashHexLen = hashHexArr.length;

// Hash to int
const hashArr = [];
for (let i = 0; i < hashHexArr.length; i++) {
    hashArr.push(parseInt(hashHexArr[i], 16));
}

let count = 0;

const sortByRandom = (hashCurrent) => {
    const hashCurrentBits = [[N], [S], [E], [W]];
    for (let i = 0; i < 8; i += 2) {
        const rand = getBit(hashCurrent, i) * 2 + getBit(hashCurrent, i + 1);
        hashCurrentBits[i / 2].push(rand);
    }

    hashCurrentBits.sort((num1, num2) => {
        if (num1[1] > num2[1]) {
            return -1;
        } else if (num1[1] == num2[1]) {
            if (num1[0] > num2[0]) {
                return -1;
            }
        }

        return 1;
    });

    return [
        hashCurrentBits[0][0],
        hashCurrentBits[1][0],
        hashCurrentBits[2][0],
        hashCurrentBits[3][0],
    ];
};

// Credit https://weblog.jamisbuck.org/2010/12/27/maze-generation-recursive-backtracking.html
const recursiveBacktracking = (cx, cy, grid) => {
    const hashCurrent = hashArr[count++];
    if (count > hashHexLen - 1) {
        count = 0;
    }

    const directions = sortByRandom(hashCurrent);

    for (let i = 0; i < 4; i++) {
        const direction = directions[i];
        const nx = cx + DX[direction];
        const ny = cy + DY[direction];

        if (
            between(ny, height - 1) &&
            between(nx, width - 1) &&
            grid[ny][nx] == 0
        ) {
            grid[cy][cx] |= direction;
            grid[ny][nx] |= OPPOSITE[direction];
            recursiveBacktracking(nx, ny, grid);
        }
    }
};

// Credit https://weblog.jamisbuck.org/2011/1/27/maze-generation-growing-tree-algorithm.html
const growingTree = (cx, cy, grid) => {
    const cells = [[cx, cy]];

    while (cells.length > 0) {
        let index = cells.length - 1;
        [cx, cy] = cells[index];

        const hashCurrent = hashArr[count++];
        if (count > hashHexLen - 1) {
            count = 0;
        }

        const directions = sortByRandom(hashCurrent);

        for (let i = 0; i < 4; i++) {
            const direction = directions[i];
            const nx = cx + DX[direction];
            const ny = cy + DY[direction];

            if (
                between(ny, height - 1) &&
                between(nx, width - 1) &&
                grid[ny][nx] == 0
            ) {
                grid[cy][cx] |= direction;
                grid[ny][nx] |= OPPOSITE[direction];

                cells.push([nx, ny]);
                index = -1;
                break;
            }
        }

        if (index != -1) {
            cells.pop();
        }
    }
};

export { recursiveBacktracking, growingTree };
