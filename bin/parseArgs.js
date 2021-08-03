import { isNumeric } from "./utils.js";
import { algorithms } from "./global.js";

const helpCommand = (alias, mean, pad = 24) => " " + alias.padEnd(pad) + mean;

const help = () => {
    let output = "";

    output += "\n";
    output += "Usage: mazavatar <Options> <Input>";
    output += "\n";
    output += "Options: \n";
    output += helpCommand("-h, --help", "Show help\n");
    output += helpCommand("-v, --version", "Show version\n");
    output += helpCommand("-a, --algorithm", "Change hash algorithm\n");
    output += helpCommand(
        "-s, --style",
        "Change maze style (normal, heavy, arc)\n"
    );
    output += helpCommand("-W, --width", "Set width of maze\n");
    output += helpCommand("-H, --height", "Set height of maze\n");

    output += "\n";
    output += "Examples: \n";
    output += "  $ mazavatar --width 20 --height 20 example";

    console.log(output);
};

const parseArg = () => {
    const args = process.argv.slice(2);
    const argsLen = args.length;
    const parseArgs = {
        width: 5,
        height: 5,
        username: "mazavatar",
        style: "normal",
        algorithm: "sha256",
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
                if (i < argsLen - 1 && algorithms.includes(args[i + 1])) {
                    parseArgs["algorithm"] = args[i + 1];
                } else {
                    console.log("Algorithms not found");
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
