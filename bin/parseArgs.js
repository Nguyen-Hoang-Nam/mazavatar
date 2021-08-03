import { isNumeric, help } from "./utils.js";
import { hashAlgorithms, mazeAlgorithm } from "./global.js";

const parseArg = () => {
    const args = process.argv.slice(2);
    const argsLen = args.length;
    const parseArgs = {
        width: 5,
        height: 5,
        username: "mazavatar",
        style: "normal",
        algorithm: "sha256",
        output: "",
        maze: "growing-tree",
    };

    for (let i = 0; i < argsLen; i++) {
        if (args[i][0] === "-") {
            if (args[i] === "-W" || args[i] === "--width") {
                if (i < argsLen - 1 && isNumeric(args[i + 1])) {
                    parseArgs["width"] = parseInt(args[i + 1]);
                } else {
                    console.log("Width must be a positive number");
                    help();
                    return {};
                }

                i++;
            } else if (args[i] === "-H" || args[i] === "--height") {
                if (i < argsLen - 1 && isNumeric(args[i + 1])) {
                    parseArgs["height"] = parseInt(args[i + 1]);
                } else {
                    console.log("Height must be a positive number");
                    help();
                    return {};
                }

                i++;
            } else if (args[i] === "-s" || args[i] === "--style") {
                if (
                    i < argsLen - 1 &&
                    ["normal", "heavy", "arc"].includes(args[i + 1])
                ) {
                    parseArgs["style"] = args[i + 1];
                } else {
                    console.log("Style not found");
                    help();
                    return {};
                }

                i++;
            } else if (args[i] === "-a" || args[i] === "--algorithm") {
                if (i < argsLen - 1 && hashAlgorithms.includes(args[i + 1])) {
                    parseArgs["algorithm"] = args[i + 1];
                } else {
                    console.log("Algorithms not found");
                    help();
                    return {};
                }

                i++;
            } else if (args[i] === "-o" || args[i] === "--output") {
                if (i < argsLen - 1) {
                    parseArgs["output"] = args[i + 1];
                } else {
                    console.log("File name not found");
                    help();
                    return {};
                }

                i++;
            } else if (args[i] === "-m" || args[i] === "--maze") {
                if (i < argsLen - 1 && mazeAlgorithm.includes(args[i + 1])) {
                    parseArgs["maze"] = args[i + 1];
                } else {
                    console.log("Maze algorithm not found");
                    help();
                    return {};
                }

                i++;
            } else if (args[i] === "-h" || args[i] === "--help") {
                help();
                return {};
            } else if (args[i] === "-v" || args[i] === "--version") {
                console.log("1.1.0");
                return {};
            } else {
                console.log("Argument not found");
                help();
                return {};
            }
        } else {
            parseArgs["username"] = args[i];
        }
    }

    return parseArgs;
};

export default parseArg();
