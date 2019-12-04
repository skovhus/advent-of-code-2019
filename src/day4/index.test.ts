import { countPasswordOptions, isPasswordValidPartOne, isPasswordValidPartTwo } from '.'
import { INPUT_RANGE } from './input'

describe('isPasswordValidPartOne', () => {
  it('solves examples', () => {
    expect(isPasswordValidPartOne('111111')).toBe(true)
    expect(isPasswordValidPartOne('223450')).toBe(false) // decreasing pair of digits 50).
    expect(isPasswordValidPartOne('123789')).toBe(false)
  })

  it('solves own examples', () => {
    expect(isPasswordValidPartOne('112345')).toBe(true)
    expect(isPasswordValidPartOne('223456')).toBe(true)
    expect(isPasswordValidPartOne('223256')).toBe(false)
  })
})

describe('isPasswordValidPartTwo', () => {
  it('solves examples', () => {
    expect(isPasswordValidPartTwo('112233')).toBe(true)
    expect(isPasswordValidPartTwo('123444')).toBe(false) // the repeated 44 is part of a larger group of 444
    expect(isPasswordValidPartTwo('111122')).toBe(true)
  })

  it('returns an answer for part one', () => {
    expect(
      countPasswordOptions(INPUT_RANGE, isPasswordValidPartTwo)
    ).toMatchInlineSnapshot(`1253`)
  })
})

describe('countPasswordOptions', () => {
  it('returns an answer for part one', () => {
    expect(
      countPasswordOptions(INPUT_RANGE, isPasswordValidPartOne)
    ).toMatchInlineSnapshot(`1855`)
  })
})
