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

export { isNumeric, isEmpty, getBit, between };
