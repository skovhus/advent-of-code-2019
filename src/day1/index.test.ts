import {
  calculateFuelUsage,
  calculateTotalFuelUsage,
  getPuzzle1Answer,
  getPuzzle2Answer,
} from '.'

describe('calculateFuelUsage', () => {
  it('calculates example fuel usage correctly', () => {
    expect(calculateFuelUsage(12)).toBe(2)
    expect(calculateFuelUsage(13)).toBe(2)
    expect(calculateFuelUsage(1969)).toBe(654)
    expect(calculateFuelUsage(100756)).toBe(33583)
  })
})

describe('getPuzzle1Answer', () => {
  it('returns the answer', () => {
    expect(getPuzzle1Answer()).toMatchInlineSnapshot(`3329926`)
  })
})

describe('calculateTotalFuelUsage', () => {
  it('calculates example fuel usage correctly', () => {
    expect(calculateTotalFuelUsage(14)).toBe(2)
    expect(calculateTotalFuelUsage(1969)).toBe(966)
    expect(calculateTotalFuelUsage(100756)).toBe(50346)
  })
})

describe('getPuzzle2Answer', () => {
  it('returns the answer', () => {
    expect(getPuzzle2Answer()).toMatchInlineSnapshot(`4992008`)
  })
})
