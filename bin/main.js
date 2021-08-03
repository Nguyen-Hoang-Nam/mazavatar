#!/usr/bin/env node

import crypto from "crypto";
import { writeFile } from "fs";
import args from "./parseArgs.js";
import { isEmpty, getBit, between, help } from "./utils.js";
import { boxDrawing } from "./global.js";

if (!isEmpty(args)) {
    const width = args["width"];
    const height = args["height"];
    const username = args["username"];
    const style = args["style"];
    const algorithm = args["algorithm"];

    // Hash username
    const hash = crypto.createHash(algorithm).update(username).digest("hex");
    const hashHexArr = hash.match(/.{1,2}/g);
    const hashHexLen = hashHexArr.length;

    // Hash to int
    const hashArr = [];
    for (let i = 0; i < hashHexArr.length; i++) {
        hashArr.push(parseInt(hashHexArr[i], 16));
    }

    // Initial grid
    const grid = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push(0);
        }

        grid.push(row);
    }

    const N = 1;
    const S = 2;
    const E = 4;
    const W = 8;

    const DX = {
        [E]: 1,
        [W]: -1,
        [N]: 0,
        [S]: 0,
    };

    const DY = {
        [E]: 0,
        [W]: 0,
        [N]: -1,
        [S]: 1,
    };

    const OPPOSITE = {
        [E]: W,
        [W]: E,
        [N]: S,
        [S]: N,
    };

    let count = 0;

    const sortByRandom = (hashCurrent) => {
        const hashCurrentBits = [[N], [S], [E], [W]];
        for (let i = 0; i < 8; i += 2) {
            const rand =
                getBit(hashCurrent, i) * 2 + getBit(hashCurrent, i + 1);
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
    const mazeGeneration = (cx, cy, grid) => {
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
                mazeGeneration(nx, ny, grid);
            }
        }
    };

    mazeGeneration(0, 0, grid);

    const drawMaze = (grid) => {
        const drawGrid = [];

        for (let i = 0; i < height; i++) {
            const row = ["|"];

            for (let j = 0; j < width; j++) {
                if ((grid[i][j] & S) != 0) {
                    row.push(" ");
                } else {
                    row.push("_");
                }

                if ((grid[i][j] & E) != 0) {
                    if (((grid[i][j] | grid[i][j + 1]) & S) != 0) {
                        row.push(" ");
                    } else {
                        row.push("_");
                    }
                } else {
                    row.push("|");
                }
            }

            drawGrid.push(row);
        }

        const drawStyle = boxDrawing[style];
        let maze = "";

        maze += drawStyle["downRight"];
        for (let i = 1; i < width * 2; i++) {
            if (drawGrid[0][i] === "|") {
                maze += drawStyle["horizontalDown"];
            } else {
                maze += drawStyle["horizontal"];
            }
        }
        maze += drawStyle["downLeft"];
        maze += "\n";

        for (let i = 0; i < height - 1; i++) {
            if (drawGrid[i][1] === "_") {
                maze += drawStyle["verticalRight"];
            } else {
                maze += drawStyle["vertical"];
            }

            for (let j = 1; j < width * 2; j++) {
                if (drawGrid[i][j] === "|") {
                    if (drawGrid[i + 1][j] === "|") {
                        if (drawGrid[i][j - 1] === "_") {
                            if (drawGrid[i][j + 1] === "_") {
                                maze += drawStyle["verticalHorizontal"];
                            } else {
                                maze += drawStyle["verticalLeft"];
                            }
                        } else {
                            if (drawGrid[i][j + 1] === "_") {
                                maze += drawStyle["verticalRight"];
                            } else {
                                maze += drawStyle["vertical"];
                            }
                        }
                    } else {
                        if (drawGrid[i][j - 1] === "_") {
                            if (drawGrid[i][j + 1] === "_") {
                                maze += drawStyle["horizontalUp"];
                            } else {
                                maze += drawStyle["upLeft"];
                            }
                        } else {
                            if (drawGrid[i][j + 1] === "_") {
                                maze += drawStyle["upRight"];
                            } else {
                                maze += drawStyle["up"];
                            }
                        }
                    }
                } else if (drawGrid[i][j] === "_") {
                    if (drawGrid[i + 1][j] === "|") {
                        maze += drawStyle["horizontalDown"];
                    } else {
                        maze += drawStyle["horizontal"];
                    }
                } else {
                    if (drawGrid[i + 1][j] === "|") {
                        if (drawGrid[i][j - 1] === "_") {
                            if (drawGrid[i][j + 1] === "_") {
                                maze += drawStyle["horizontalDown"];
                            } else {
                                maze += drawStyle["downLeft"];
                            }
                        } else {
                            if (drawGrid[i][j + 1] === "_") {
                                maze += drawStyle["downRight"];
                            } else {
                                maze += drawStyle["down"];
                            }
                        }
                    } else {
                        maze += " ";
                    }
                }
            }

            if (drawGrid[i][width * 2 - 1] === "_") {
                maze += drawStyle["verticalLeft"];
            } else {
                maze += drawStyle["vertical"];
            }
            maze += "\n";
        }

        maze += drawStyle["upRight"];
        for (let i = 1; i < width * 2; i++) {
            if (drawGrid[height - 1][i] === "|") {
                maze += drawStyle["horizontalUp"];
            } else {
                maze += drawStyle["horizontal"];
            }
        }
        maze += drawStyle["upLeft"];

        if (args["output"] === "") {
            console.log("\n" + maze);
        } else {
            writeFile(args["output"], maze, (err) => {
                if (err) {
                    console.log("Can not write file");
                    return help();
                }

                console.log("Write file sucessful");
            });
        }
    };

    drawMaze(grid);
}
