import { executeIntcodeProgram, Instruction, Program } from './computer'

type Solution = { noun: number; verb: number }

const MEMORY_START_INDEX = 0

export function findNounAndVerbForOutput({
  program,
  output,
}: {
  program: Program
  output: number
}): Solution {
  for (let noun = MEMORY_START_INDEX; noun <= Instruction.EXIT; noun++) {
    for (let verb = MEMORY_START_INDEX; verb <= Instruction.EXIT; verb++) {
      const result = executeIntcodeProgram({ program, noun, verb })
      if (result[0] === output) {
        return { verb, noun }
      }
    }
  }

  throw new Error('No solution found')
}
