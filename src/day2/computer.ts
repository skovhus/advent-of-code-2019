export enum Instruction {
  EXIT = 99,
  ADD = 1,
  MULTIPLY = 2,
}

export type Program = number[]

export function executeProgram({
  instructionPointer = 0,
  program,
}: {
  instructionPointer?: number
  program: Program
}): Program {
  const instruction = program[instructionPointer]

  if (!(instruction in Instruction)) {
    throw new Error(`Invalid instruction ${instruction}`)
  }

  if (instruction === Instruction.EXIT) {
    return program
  }

  // NOTE: ADD and MULTIPLY takes 3 parameters
  const parameter1Index = program[instructionPointer + 1]
  const parameter2Index = program[instructionPointer + 2]
  const storeIndex = program[instructionPointer + 3]
  const nextInstructionPointer = instructionPointer + 4

  const value1 = program[parameter1Index]
  const value2 = program[parameter2Index]

  if (instruction === Instruction.ADD) {
    program[storeIndex] = value1 + value2
  }

  if (instruction === Instruction.MULTIPLY) {
    program[storeIndex] = value1 * value2
  }

  return executeProgram({ instructionPointer: nextInstructionPointer, program })
}

export function executeIntcodeProgram({
  program,
  noun,
  verb,
}: {
  program: Program
  noun?: number
  verb?: number
}): Program {
  const newProgram = program.slice()
  if (typeof noun === 'number' && typeof verb === 'number') {
    newProgram[1] = noun
    newProgram[2] = verb
  }
  return executeProgram({ program: newProgram })
}
