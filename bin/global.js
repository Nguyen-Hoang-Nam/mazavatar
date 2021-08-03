const hashAlgorithms = [
    "sha1",
    "sha224",
    "sha256",
    "sha384",
    "sha512",
    "md4",
    "md5",
    "whirlpool",
    "shake128",
    "shake256",
    "sm3",
    "ripemd160",
];

const boxDrawing = {
    normal: {
        horizontal: "─",
        vertical: "│",
        downRight: "┌",
        downLeft: "┐",
        upRight: "└",
        upLeft: "┘",
        verticalRight: "├",
        verticalLeft: "┤",
        horizontalDown: "┬",
        horizontalUp: "┴",
        verticalHorizontal: "┼",
        up: "╵",
        down: "╷",
    },

    heavy: {
        horizontal: "━",
        vertical: "┃",
        downRight: "┏",
        downLeft: "┓",
        upRight: "┗",
        upLeft: "┛",
        verticalRight: "┣",
        verticalLeft: "┫",
        horizontalDown: "┳",
        horizontalUp: "┻",
        verticalHorizontal: "╋",
        up: "╹",
        down: "╻",
    },

    arc: {
        horizontal: "─",
        vertical: "│",
        downRight: "╭",
        downLeft: "╮",
        upRight: "╰",
        upLeft: "╯",
        verticalRight: "├",
        verticalLeft: "┤",
        horizontalDown: "┬",
        horizontalUp: "┴",
        verticalHorizontal: "┼",
        up: "╵",
        down: "╷",
    },
};

const mazeAlgorithm = ["recursive-backtracking", "growing-tree"];

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

export {
    hashAlgorithms,
    boxDrawing,
    mazeAlgorithm,
    N,
    S,
    E,
    W,
    DX,
    DY,
    OPPOSITE,
};
