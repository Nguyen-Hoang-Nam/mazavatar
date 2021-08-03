import { isNumeric } from "./utils.js";

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
                    throw Error("Width must be a positive number");
                }

                i++;
            } else if (args[i] === "-H" || args[i] === "--height") {
                if (isNumeric(args[i + 1])) {
                    parseArgs["height"] = parseInt(args[i + 1]);
                } else {
                    throw Error("Height must be a positive number");
                }

                i++;
            } else if (args[i] === "-h" || args[i] === "--help") {
                console.log("mazavatar");
                return {};
            } else if (args[i] === "-v" || args[i] === "--version") {
                console.log("1.1.0");
                return {};
            }
        } else {
            parseArgs["username"] = args[i];
        }
    }

    return parseArgs;
};

export default parseArg();
