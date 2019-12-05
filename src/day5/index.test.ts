import { Opcode, ParameterMode, parseInstruction, run } from './computer'
import { get8DetectorExample, getInputProgram } from './input'

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

describe('parseInstruction', () => {
  it('parses instruction without explicit parameter modes', () => {
    expect(parseInstruction(2)).toEqual({
      opcode: Opcode.MULTIPLY,
      parameter1Mode: ParameterMode.POSITION,
      parameter2Mode: ParameterMode.POSITION,
      parameter3Mode: ParameterMode.POSITION,
    })
  })

  it('parses instruction with parameter modes', () => {
    expect(parseInstruction(1002)).toEqual({
      opcode: Opcode.MULTIPLY,
      parameter1Mode: ParameterMode.POSITION,
      parameter2Mode: ParameterMode.IMMEDIATE,
      parameter3Mode: ParameterMode.POSITION,
    })

    expect(parseInstruction(11002)).toEqual({
      opcode: Opcode.MULTIPLY,
      parameter1Mode: ParameterMode.POSITION,
      parameter2Mode: ParameterMode.IMMEDIATE,
      parameter3Mode: ParameterMode.IMMEDIATE,
    })

    expect(parseInstruction(10102)).toEqual({
      opcode: Opcode.MULTIPLY,
      parameter1Mode: ParameterMode.IMMEDIATE,
      parameter2Mode: ParameterMode.POSITION,
      parameter3Mode: ParameterMode.IMMEDIATE,
    })

    expect(parseInstruction(101)).toEqual({
      opcode: Opcode.ADD,
      parameter1Mode: ParameterMode.IMMEDIATE,
      parameter2Mode: ParameterMode.POSITION,
      parameter3Mode: ParameterMode.POSITION,
    })
  })
})

describe('run', () => {
  EXAMPLE_PROGRAM_AND_SOLUTIONS.map(([program, solution], idx) => {
    it(`calculates example ${idx + 1} correctly`, () => {
      expect(run({ program })).toEqual(solution)
    })
  })

  it('handles STORE command', () => {
    expect(run({ program: [3, 0, 99], input: 42 })).toEqual([42, 0, 99])
    expect(run({ program: [3, 1, 2, 0, 0, 0, 99], input: 42 })).toEqual([
      9,
      42,
      2,
      0,
      0,
      0,
      99,
    ])
  })

  it('handles OUTPUT command (zero)', () => {
    expect(run({ program: [3, 0, 4, 0, 99], input: 0 })).toEqual([0, 0, 4, 0, 99])
  })

  it('throw an error if the instructions are wrong', () => {
    expect(() => run({ program: [400, 200] })).toThrowError()
  })

  it('handles negative inputs', () => {
    expect(run({ program: [1101, 100, -1, 4, 0] })).toEqual([1101, 100, -1, 4, 99])
  })

  it('handles instructions with parameter modes', () => {
    expect(run({ program: [10001, 0, 0, 0, 99] })).toEqual([10001, 0, 0, 20002, 99])
    expect(run({ program: [11001, 0, -1001, 0, 99] })).toEqual([
      11001,
      0,
      -1001,
      10000,
      99,
    ])
    expect(run({ program: [1001, 0, -1001, 0, 99] })).toEqual([0, 0, -1001, 0, 99])
    expect(run({ program: [11101, 1, 10, 0, 99] })).toEqual([11101, 1, 10, 11, 99])
    expect(run({ program: [11102, 2, 10, 0, 99] })).toEqual([11102, 2, 10, 20, 99])
    expect(run({ program: [101, 1, 0, 0, 99] })).toEqual([102, 1, 0, 0, 99])
  })

  it('solves the first puzzle', () => {
    expect(
      run({
        program: getInputProgram(),
        input: 1, // ID for the ship's air conditioner unit.
      })[0]
    ).toMatchInlineSnapshot(`5821753`)
  })

  it('supports Opcode 5 (jump-if-true)', () => {
    expect(run({ program: [1105, 1, 5, 400, 400, 99], input: 0 })).toEqual([
      1105,
      1,
      5,
      400,
      400,
      99,
    ])

    expect(run({ program: [105, 0, 5, 99] })).toEqual([105, 0, 5, 99])
  })

  it('supports Opcode 6 (jump-if-false)', () => {
    expect(run({ program: [1106, 0, 5, 400, 400, 99], input: 0 })).toEqual([
      1106,
      0,
      5,
      400,
      400,
      99,
    ])

    expect(run({ program: [106, 1, 5, 99] })).toEqual([106, 1, 5, 99])
  })

  it('supports Opcode 7 (less-than)', () => {
    expect(run({ program: [1107, 1, 2, 3, 99], input: 0 })).toEqual([1107, 1, 2, 1, 99])
    expect(run({ program: [1107, 1, 0, 3, 99], input: 0 })).toEqual([1107, 1, 0, 0, 99])
  })

  it('supports Opcode 8 (equals)', () => {
    expect(run({ program: [1108, 1, 2, 3, 99], input: 0 })).toEqual([1108, 1, 2, 0, 99])
    expect(run({ program: [1108, 2, 2, 3, 99], input: 0 })).toEqual([1108, 2, 2, 1, 99])
  })

  it('handles examples', () => {
    expect(
      run({
        program: get8DetectorExample(),
        input: 7,
      })
    ).toEqual([999])

    expect(
      run({
        program: get8DetectorExample(),
        input: 8,
      })
    ).toEqual([1000])

    expect(
      run({
        program: get8DetectorExample(),
        input: 9,
      })
    ).toEqual([1001])
  })

  it('solves the second puzzle', () => {
    expect(
      run({
        program: getInputProgram(),
        input: 5, // ID for the ship's thermal radiator controller
      })[0]
    ).toMatchInlineSnapshot(`11956381`)
  })
})
