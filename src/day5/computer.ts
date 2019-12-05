export enum Opcode {
  EXIT = 99, // takes no parameters
  ADD = 1, // adds two parameters
  MULTIPLY = 2, // multiply 2 parameters into the third parameter
  STORE = 3, // stores input 1 parameter
  OUTPUT = 4, // outputs the value of 1 parameter
  JUMP_IF_TRUE = 5, // takes two parameters
  JUMP_IF_FALSE = 6,
  LESS_THAN = 7,
  EQUALS = 8,
}

export enum ParameterMode {
  POSITION = 0, // a parameter is interpreted as a position
  IMMEDIATE = 1, // a parameter is interpreted as a value
}

const OpcodeToParameterCount: { [opcode in Opcode]: number } = {
  [Opcode.EXIT]: 0,
  [Opcode.ADD]: 3,
  [Opcode.MULTIPLY]: 3,
  [Opcode.STORE]: 1,
  [Opcode.OUTPUT]: 1,
  [Opcode.JUMP_IF_TRUE]: 2,
  [Opcode.JUMP_IF_FALSE]: 2,
  [Opcode.LESS_THAN]: 3,
  [Opcode.EQUALS]: 3,
}

const DEFAULT_PARAMETER_MODE = ParameterMode.POSITION

export type Program = number[]

export function parseInstruction(
  instruction: number
): {
  opcode: Opcode
  parameter1Mode: ParameterMode
  parameter2Mode: ParameterMode
  parameter3Mode: ParameterMode
} {
  const instructionString = instruction.toString()

  if (instructionString.length > 2) {
    const opcode = Number(instructionString.slice(-2))

    const parameterModes = instructionString
      .slice(0, instructionString.length - 2)
      .split('')
      .map(s => Number(s))

    const parameter1Mode = parameterModes.pop() || DEFAULT_PARAMETER_MODE
    const parameter2Mode = parameterModes.pop() || DEFAULT_PARAMETER_MODE
    const parameter3Mode = parameterModes.pop() || DEFAULT_PARAMETER_MODE

    if (
      !(
        opcode in Opcode &&
        parameter1Mode in ParameterMode &&
        parameter2Mode in ParameterMode &&
        parameter3Mode in ParameterMode
      )
    ) {
      throw new Error(`Failed parsing instruction ${instruction}`)
    }

    return {
      opcode,
      parameter1Mode,
      parameter2Mode,
      parameter3Mode,
    }
  }

  return {
    opcode: instruction,
    parameter1Mode: DEFAULT_PARAMETER_MODE,
    parameter2Mode: DEFAULT_PARAMETER_MODE,
    parameter3Mode: DEFAULT_PARAMETER_MODE,
  }
}

export function executeProgram({
  instructionPointer = 0,
  program,
  input,
}: {
  instructionPointer?: number
  program: Program
  input?: number
}): Program {
  const { opcode, parameter1Mode, parameter2Mode, parameter3Mode } = parseInstruction(
    program[instructionPointer]
  )

  if (opcode === Opcode.EXIT) {
    return program
  }

  const parameter1Value =
    parameter1Mode === ParameterMode.POSITION
      ? program[program[instructionPointer + 1]]
      : program[instructionPointer + 1]

  const parameter2Value =
    parameter2Mode === ParameterMode.POSITION
      ? program[program[instructionPointer + 2]]
      : program[instructionPointer + 2]

  const parameter3Value =
    parameter3Mode === ParameterMode.POSITION
      ? program[instructionPointer + 3]
      : instructionPointer + 3

  const parameterCount = OpcodeToParameterCount[opcode]

  let nextInstructionPointer = instructionPointer + parameterCount + 1

  if (opcode === Opcode.STORE) {
    const storeIndex = program[instructionPointer + 1]
    program[storeIndex] = input
  } else if (opcode === Opcode.OUTPUT) {
    if (parameter1Value !== 0) {
      return [parameter1Value]
    }
  } else if (opcode === Opcode.JUMP_IF_FALSE) {
    if (parameter1Value === 0) {
      nextInstructionPointer = parameter2Value
    }
  } else if (opcode === Opcode.JUMP_IF_TRUE) {
    if (parameter1Value !== 0) {
      nextInstructionPointer = parameter2Value
    }
  } else if (opcode === Opcode.LESS_THAN) {
    program[parameter3Value] = parameter1Value < parameter2Value ? 1 : 0
  } else if (opcode === Opcode.EQUALS) {
    program[parameter3Value] = parameter1Value === parameter2Value ? 1 : 0
  } else if (opcode === Opcode.ADD) {
    program[parameter3Value] = parameter1Value + parameter2Value
  } else if (opcode === Opcode.MULTIPLY) {
    program[parameter3Value] = parameter1Value * parameter2Value
  } else {
    throw new Error(`Opcode not handled ${opcode}`)
  }

  return executeProgram({ instructionPointer: nextInstructionPointer, program, input })
}

export function run({
  program,
  input = undefined,
}: {
  program: Program
  input?: number
}): Program {
  const newProgram = program.slice()
  return executeProgram({ program: newProgram, input })
}
