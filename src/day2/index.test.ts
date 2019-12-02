import { executeIntcodeProgram } from './computer'
import { getInputProgram } from './input'
import { findNounAndVerbForOutput } from './solver'

const EXAMPLE_PROGRAM_AND_SOLUTIONS = [
  [
    [1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50],
    [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50],
  ],
  [
    [1, 0, 0, 0, 99],
    [2, 0, 0, 0, 99],
  ], // (1 + 1 = 2)
  [
    [2, 3, 0, 3, 99],
    [2, 3, 0, 6, 99],
  ], // (3 * 2 = 6)
  [
    [2, 4, 4, 5, 99, 0],
    [2, 4, 4, 5, 99, 9801],
  ], // (99 * 99 = 9801)
  [
    [1, 1, 1, 4, 99, 5, 6, 0, 99],
    [30, 1, 1, 4, 2, 5, 6, 0, 99],
  ],
]

describe('executeIntcodeProgram', () => {
  EXAMPLE_PROGRAM_AND_SOLUTIONS.map(([program, solution], idx) => {
    it(`calculates example ${idx + 1} correctly`, () => {
      expect(executeIntcodeProgram({ program })).toEqual(solution)
    })
  })

  it('throw an error if the instructions are wrong', () => {
    expect(() => executeIntcodeProgram({ program: [400, 200] })).toThrowError()
  })

  it('solves the first puzzle', () => {
    expect(
      executeIntcodeProgram({
        program: getInputProgram(),
        noun: 12,
        verb: 2,
      })[0]
    ).toMatchInlineSnapshot(`3306701`)
  })
})

describe('findNounAndVerbForOutput', () => {
  it('throws an error if no noun or verb is found', () => {
    expect(() =>
      findNounAndVerbForOutput({ program: [1, 0, 0, 0, 99], output: 19690720 })
    ).toThrowError()
  })

  it('solves the second puzzle', () => {
    const { noun, verb } = findNounAndVerbForOutput({
      program: getInputProgram(),
      output: 19690720,
    })
    expect(100 * noun + verb).toMatchInlineSnapshot(`7621`)
  })
})
