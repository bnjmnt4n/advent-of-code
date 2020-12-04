const { join } = require("path");
const { readFileSync } = require("fs");
const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");

const parse = (input) => {
  let index = 0;
  const { length } = input;
  const passports = [];
  let currPassport;

  const reWhitespace = /\s+/g;
  const getWhitespace = () => {
    reWhitespace.lastIndex = index - 1;
    const match = reWhitespace.exec(input);
    if (!match) {
      throw new Error("Expected whitespace.");
    }
    index += match[0].length;
    return match[0];
  };

  const reValue = /[a-z0-9#]+/g;
  const getValue = () => {
    reValue.lastIndex = index - 1;
    const match = reValue.exec(input);
    if (!match) {
      throw new Error("Expected a value.");
    }
    index += match[0].length;
    return match[0];
  };

  const getColon = () => {
    if (input[index - 1] !== ":") {
      throw new Error("Expected a colon ");
    }
    index++;
  };

  while (index < length) {
    if (getWhitespace() === "\n\n" || !currPassport) {
      passports.push(currPassport = {});
    }

    const property = getValue();
    getColon();
    const value = getValue();
    currPassport[property] = value;
  }

  return passports;
};

const validators = {
  "byr": (input) => input && input.length === 4 && parseInt(input) >= 1920 && parseInt(input) <= 2002,
  "iyr": (input) => input && input.length === 4 && parseInt(input) >= 2010 && parseInt(input) <= 2020,
  "eyr": (input) => input && input.length === 4 && parseInt(input) >= 2020 && parseInt(input) <= 2030,
  "hgt": (input) => {
    const match = /^(\d+)(in|cm)$/.exec(input);
    if (!match) {
      return false;
    }
    let num = parseInt(match[1]);
    return match[2] === "in" ? num >= 59 && num <= 76 : num >= 150 && num <= 193;
  },
  "hcl": (input) => /^#[a-f0-9]{6}$/.test(input),
  "ecl": (input) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(input),
  "pid": (input) => /^\d{9}$/.test(input),
};

const parsedPassports = parse(input);

const presentFieldsPassports = parsedPassports.filter(passport => {
  return Object.keys(validators).every(field => !!passport[field]);
});

console.log(presentFieldsPassports.length);

const validPassports = presentFieldsPassports.filter(passport => {
  return Object.entries(validators).every(([field, validator]) => validator(passport[field]));
});

console.log(validPassports.length);
