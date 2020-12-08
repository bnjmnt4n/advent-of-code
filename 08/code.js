const { join } = require("path");
const { readFileSync } = require("fs");
const input = readFileSync(join(__dirname, "./input.txt"), "utf-8");

const instructions = input.trim().split("\n");

// Accepts a callback with params (acc, instructionNum), that returns false to stop execution
// before executing the current instruction.
const executeInstructions = (instructions, cb) => {
  let acc = 0;

  const executeInstruction = (instructionNumber) => {
    const instruction = instructions[instructionNumber];
    if (!instruction || !cb(acc, instructionNumber)) {
      return;
    }

    const [_, op, sign, num] = /^(acc|nop|jmp) ([+-])(\d+)$/.exec(instruction);
    switch (op) {
      case "acc":
        acc += (sign === "+" ? 1 : -1) * Number(num);
        executeInstruction(instructionNumber + 1);
        break;
      case "nop":
        executeInstruction(instructionNumber + 1);
        break;
      case "jmp":
        executeInstruction(instructionNumber + (sign === "+" ? 1 : -1) * Number(num));
        break;
    }
  };

  executeInstruction(0);
}

const getAccumulatorAtFirstLoop = () => {
  let accumulator;
  const execCount = instructions.map(() => 0);

  executeInstructions(instructions, (acc, num) => {
    execCount[num] = execCount[num] + 1;
    if (execCount[num] > 1) {
      accumulator = acc;
      return false;
    }
    return true;
  });

  return accumulator;
};

console.log(getAccumulatorAtFirstLoop());

// Brute-force approach
// For each jmp/nop instruction, manually change it and see if there will still be a loop.
const iterateAll = (index) => {
  const instruction = instructions[index];
  if (!instruction) {
    return;
  }

  // Skip to next instruction if this one can't be modified.
  const op = instruction.slice(0, 3);
  if (op !== "jmp" && op !== "nop") {
    return iterateAll(index + 1);
  }

  const ins = instructions.slice();
  ins[index] = (op === "jmp" ? "nop" : "jmp") + ins[index].slice(3);

  const execCount = ins.map(() => 0);
  let pass = true;
  let accumulator;
  executeInstructions(ins, (acc, num) => {
    execCount[num] = execCount[num] + 1;
    accumulator = acc;
    // Exit the instant we encounter a repeated instruction.
    if (execCount[num] > 1) {
      pass = false;
      return false;
    }
    return true;
  })

  // If there are no repeated instructions, we can return the accumulator.
  if (pass) {
    return accumulator;
  } else {
    return iterateAll(index + 1);
  }
}

console.log(iterateAll(0));
