const { join } = require("path");
const { readFileSync } = require("fs");
const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");
const strings = input.split("\n").filter(Boolean);
const { length: rows } = strings;
const { length: columns } = strings[0];

const isTree = (value) => value == "#";
const getValue = (row, col) => {
  return row >= rows ? "" : strings[row][col % columns];
};

const countTrees = (rowInc, colInc) => {
    let trees = 0;
    let row = 0;
    let col = 0;

    while (row < rows) {
        if (isTree(getValue(row, col))) {
            trees++;
        }
        row += rowInc;
        col += colInc;
    }

    return trees;
}

console.log(countTrees(1, 3));

const product = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]].reduce((prod, [rowInc, colInc]) => {
    return prod * countTrees(rowInc, colInc);
}, 1);

console.log(product);
