const { join } = require("path");
const { readFileSync } = require("fs");
const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");

const rules = input.trim().split("\n");

// Returns an object of `{ [bag]: { [innerBag]: number } }`.
const parseRules = (rules) => {
  return rules.reduce((parsedRules, rule) => {
    const match = /^(.*?) bags contain (.*?).$/.exec(rule);
    const [_, bag, innerBagsString] = match;
    const innerBags = Object.fromEntries(
      innerBagsString
        .split(", ")
        .map(subBag => {
          const [_, none, num, name] = /^(?:(no other bags)|(\d+) (.*?) bags?)$/.exec(subBag);
          if (none) {
            return false;
          } else {
            return [name, num];
          }
        })
        .filter(Boolean)
    );

    return {
      ...parsedRules,
      [bag]: innerBags
    };
  }, {});
}

const bags = parseRules(rules);

// Recursively checks if `outer` bag can contain `inner` bag
const canContainBag = (outer, inner) => {
  const innerBags = bags[outer];
  if (innerBags[inner]) {
    return true;
  } else {
    const innerBagNames = Object.keys(innerBags);
    return innerBagNames.length
      ? innerBagNames.some(outer => canContainBag(outer, inner))
      : false;
  }
};

// Get the total number of bags for which a single outer bag will contain the inner bag.
const getContainsBagCount = (inner) => {
  return Object.keys(bags).map(bag => canContainBag(bag, inner)).filter(Boolean).length;
};

// Get total number of bags required if we have 1 `bag`.
const getTotalBags = (bag) => {
  const innerBags = bags[bag];
  return Object.keys(innerBags).reduce((sum, innerBag) => {
    return sum + innerBags[innerBag] * getTotalBags(innerBag);
  }, 1);
};

console.log(getContainsBagCount("shiny gold"));
console.log(getTotalBags("shiny gold") - 1);
