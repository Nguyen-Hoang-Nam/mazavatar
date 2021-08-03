// Credit https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
const isNumeric = (value) => {
    return /^\d+$/.test(value);
};

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};

// Credit https://stackoverflow.com/questions/1436438/how-do-you-set-clear-and-toggle-a-single-bit-in-javascript/8436459
const getBit = (number, bitPosition) => {
    return (number & (1 << bitPosition)) === 0 ? 0 : 1;
};

const between = (num, max, min = 0) => {
    return num >= min && num <= max;
};

const helpCommand = (alias, mean, pad = 24) => " " + alias.padEnd(pad) + mean;

const help = () => {
    let output = "";

    output += "\n";
    output += "Usage: mazavatar <Options> <Input>";
    output += "\n";
    output += "Options:\n";
    output += helpCommand("-h, --help", "Show help\n");
    output += helpCommand("-v, --version", "Show version\n");
    output += helpCommand("-o, --output", "Create output file\n");
    output += helpCommand("-a, --algorithm", "Change hash algorithm\n");
    output += helpCommand(
        "-s, --style",
        "Change maze style (normal, heavy, arc)\n"
    );
    output += helpCommand("-W, --width", "Set width of maze\n");
    output += helpCommand("-H, --height", "Set height of maze\n");

    output += "\n";
    output += "Examples:\n";
    output += "  $ mazavatar --width 20 --height 20 example";

    console.log(output);
};

export { isNumeric, isEmpty, getBit, between, help };
