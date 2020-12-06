const { join } = require("path");
const { readFileSync } = require("fs");
const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");

const passes = input.split("\n");

const getSeatId = ([row, col]) => row * 8 + col;

const getRange = ([start, end], char) => {
  const length = end - start + 1;
  const half = length / 2;
  if (char === "F" || char === "L") {
    return [start, start + half - 1];
  } else {
    return [end - half + 1, end];
  }
}

const getSeatPosition = (input) => {
  let rowRange = [0, 127];
  let colRange = [0, 7];

  for (const char of input) {
    if (char === "F" || char === "B") {
      rowRange = getRange(rowRange, char);
    } else {
      colRange = getRange(colRange, char);
    }
  }

  return [rowRange[0], colRange[0]];
}

const seatIds = passes.map(pass => getSeatId(getSeatPosition(pass))).sort((a, b) => a - b);
const maxId = seatIds[seatIds.length - 1];

console.log(maxId);

// Since it's sorted, just find any 2 seat IDs next to each other with difference of 2.
for (let i = 0; i < seatIds.length; i++) {
  const current = seatIds[i];
  const next = seatIds[i + 1];
  if (next - current === 2) {
    console.log(current + 1);
  }
}
