const { join } = require("path");
const { readFileSync } = require("fs");
const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");
