const input = require("fs").readFileSync("./2.txt", "utf-8");
const passwords = input.split("\n").filter(Boolean);

const parsedPasswords = passwords.map(input => {
  return /^(\d+)-(\d+) ([a-z]): ([a-z]+)$/.exec(input);
});

// Part 1.
const validPasswords = parsedPasswords.filter(([_, min, max, char, password]) => {
  let index = -1, count = 0;
  while ((index = password.indexOf(char, index + char.length)) !== -1) {
    count++;
  }
  return count >= min && count <= max;
});

console.log(validPasswords.length);

// Part 2.
const validPasswords2 = parsedPasswords.filter(([_, i1, i2, char, password]) => {
  const char1 = password[i1 - 1] === char;
  const char2 = password[i2 - 1] === char;
  return char1 !== char2;
});

console.log(validPasswords2.length);
