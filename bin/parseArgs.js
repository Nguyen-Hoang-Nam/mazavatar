import { isNumeric } from "./utils.js";

const helpCommand = (alias, mean, pad = 24) => " " + alias.padEnd(pad) + mean;

const help = () => {
    let output = "";

    output += "\n";
    output += "Usage: mazavatar <Options> <Input>";
    output += "\n";
    output += "Options: \n";
    output += helpCommand("-h, --help", "Show help\n");
    output += helpCommand("-v, --version", "Show version\n");
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
    const parseArgs = { width: 5, height: 5, username: "mazavatar" };

    for (let i = 0; i < argsLen; i++) {
        if (args[i][0] === "-") {
            if (args[i] === "-W" || args[i] === "--width") {
                if (isNumeric(args[i + 1])) {
                    parseArgs["width"] = parseInt(args[i + 1]);
                } else {
                    console.log("Width must be a positive number");
                    help();
                    return {};
                }

                i++;
            } else if (args[i] === "-H" || args[i] === "--height") {
                if (isNumeric(args[i + 1])) {
                    parseArgs["height"] = parseInt(args[i + 1]);
                } else {
                    console.log("Height must be a positive number");
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
