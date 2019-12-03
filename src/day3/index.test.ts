import {
  getDistanceToWireIntersection,
  getMinimumStepsToWireIntersection,
  getWirePointStepMap,
} from '.'
import { WIRE1, WIRE2 } from './input'

describe('getWirePointStepMap', () => {
  it('map the wire paths to wire points and steps', () => {
    expect(getWirePointStepMap(['U1', 'R2'])).toEqual({
      '0,1': 1,
      '1,1': 2,
      '2,1': 3,
    })
  })
})

describe('getDistanceToWireIntersection', () => {
  it('solves part one example 1', () => {
    const wire1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'
    const wire2 = 'U62,R66,U55,R34,D71,R55,D58,R83'
    expect(getDistanceToWireIntersection([wire1, wire2])).toEqual(159)
  })

  it('solves part one example 2', () => {
    const wire1 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
    const wire2 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'
    expect(getDistanceToWireIntersection([wire1, wire2])).toEqual(135)
  })

  it('returns an answer for the part one puzzle', () => {
    expect(getDistanceToWireIntersection([WIRE1, WIRE2])).toMatchInlineSnapshot(`399`)
  })
})

describe('getMinimumStepsToWireIntersection', () => {
  it('solves part two example 1', () => {
    const wire1 = 'R75,D30,R83,U83,L12,D49,R71,U7,L72'
    const wire2 = 'U62,R66,U55,R34,D71,R55,D58,R83'
    expect(getMinimumStepsToWireIntersection([wire1, wire2])).toEqual(610)
  })

  it('solves part two example 2', () => {
    const wire1 = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'
    const wire2 = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
    expect(getMinimumStepsToWireIntersection([wire1, wire2])).toEqual(410)
  })

  it('returns an answer for the part two puzzle', () => {
    expect(getMinimumStepsToWireIntersection([WIRE1, WIRE2])).toMatchInlineSnapshot(
      `15678`
    )
  })
})
