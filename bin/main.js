#!/usr/bin/env node

// import crypto from "crypto";
import { writeFile } from "fs";
import args from "./parseArgs.js";
import { isEmpty, help } from "./utils.js";
import { boxDrawing, S, E } from "./global.js";
import { recursiveBacktracking, growingTree } from "./mazeAlgorithms.js";

if (!isEmpty(args)) {
    const width = args["width"];
    const height = args["height"];
    const style = args["style"];
    const output = args["output"];
    const mazeAlgorithms = args["maze"];

    // Initial grid
    const grid = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push(0);
        }

        grid.push(row);
    }

    if (mazeAlgorithms === "growing-tree") {
        growingTree(0, 0, grid);
    } else if (mazeAlgorithms === "recursive-backtracking") {
        recursiveBacktracking(0, 0, grid);
    }

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

        if (output === "") {
            console.log("\n" + maze);
        } else {
            writeFile(output, maze, (err) => {
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
