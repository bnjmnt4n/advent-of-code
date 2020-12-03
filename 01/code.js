const { join } = require("path");
const { readFileSync } = require("fs");
const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");
const numbers = input.split("\n").map(string => Number(string));
const { length } = numbers;

// Part 1.
for (let i = 0; i < length; i++) {
  for (let j = i + 1; j < length; j++) {
    if (numbers[i] + numbers[j] === 2020) {
      console.log(numbers[i] * numbers[j], numbers[i], numbers[j]);
    }
  }
}

// Part 2.
for (let i = 0; i < length; i++) {
  for (let j = i + 1; j < length; j++) {
    for (let k = j + 1; k < length; k++) {
      if (numbers[i] + numbers[j] + numbers[k] === 2020 && numbers[i] !== 0 && numbers[j] !== 0 && numbers[k] !== 0) {
        console.log(numbers[i] * numbers[j] * numbers[k] , numbers[i], numbers[j], numbers[k]);
      }
    }
  }
}
