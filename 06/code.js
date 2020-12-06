const { join } = require("path");
const { readFileSync } = require("fs");
const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");

const groups = input.trim().split("\n\n");

const getUnionCount = (group) => {
  return Array.from(
    new Set(Array.from(group.replace(/\n/g, "")))
  ).length;
}

const unionCount = groups.reduce((sum, group) => sum + getUnionCount(group), 0);
console.log(unionCount);

const getIntersectCount = (group) => {
  const strings = group.split("\n");
  const allCharacters = Array.from(
    new Set(Array.from(group.replace(/\n/g, "")))
  );

  const count = allCharacters
    .map(char => {
      return strings.every(str => str.indexOf(char) > -1);
    })
    .filter(Boolean)
    .length;

  return count;
}

const intersectCount = groups.reduce((sum, group) => sum + getIntersectCount(group), 0);
console.log(intersectCount);
