/* eslint-disable @typescript-eslint/explicit-function-return-type */
type WirePointStepMap = { [point: string]: number }
type Direction = 'U' | 'R' | 'D' | 'L'

const CENTRAL_PORT_X = 0
const CENTRAL_PORT_Y = 0

/**
 * Converts the given wire paths (e.g. ["U20", "R2"]) into an object mapping
 * from points the wire goes through (represented as a string "x,y") to the
 * number of to the number of steps (i.e. grid squares) the wire has entered to
 * get to that location.
 */
export function getWirePointStepMap(wirePaths: string[]): WirePointStepMap {
  const wirePointToStepsMap: WirePointStepMap = {}

  let x = CENTRAL_PORT_X
  let y = CENTRAL_PORT_Y
  let steps = 0

  const updatePointerMap: { [key in Direction]: () => void } = {
    U: () => {
      y += 1
    },
    R: () => {
      x += 1
    },
    D: () => {
      y -= 1
    },
    L: () => {
      x -= 1
    },
  }

  wirePaths.map(wirePath => {
    const direction = wirePath[0] as Direction
    const amount = Number(wirePath.slice(1))

    for (let index = 0; index < amount; index++) {
      updatePointerMap[direction]()
      steps += 1

      const point = `${x},${y}`
      if (!(point in wirePointToStepsMap)) {
        wirePointToStepsMap[point] = steps
      }
    }
  })

  return wirePointToStepsMap
}

function getIntersectingPoints(
  map1: WirePointStepMap,
  map2: WirePointStepMap
): Set<string> {
  const intersectionSet = new Set<string>([])

  const set1 = new Set(Object.keys(map1))
  const set2 = new Set(Object.keys(map2))

  set1.forEach(element => {
    if (set2.has(element)) {
      intersectionSet.add(element)
    }
  })

  return intersectionSet
}

function parseWireStrings(wireStrings: [string, string]) {
  const [wire1Paths, wire2Paths] = wireStrings.map(wireString => wireString.split(','))

  const wire1PointStepMap = getWirePointStepMap(wire1Paths)
  const wire2PointStepMap = getWirePointStepMap(wire2Paths)

  const intersectingPoints = getIntersectingPoints(wire1PointStepMap, wire2PointStepMap)

  return {
    wire1PointStepMap,
    wire2PointStepMap,
    intersectingPoints,
  }
}

/**
 * Returns the manhattan distance to the closets wire intersection from
 * the central port.
 */
export function getDistanceToWireIntersection(wireStrings: [string, string]): number {
  const { intersectingPoints } = parseWireStrings(wireStrings)

  let distanceToClosestIntersection = Infinity

  intersectingPoints.forEach(intersectionPoint => {
    const [x, y] = intersectionPoint.split(',').map(p => Number(p))
    const distance = Math.abs(x - CENTRAL_PORT_X) + Math.abs(y - CENTRAL_PORT_Y)
    if (distance < distanceToClosestIntersection) {
      distanceToClosestIntersection = distance
    }
  })

  return distanceToClosestIntersection
}

/**
 * Returns the minimum number of steps that both wires enters to reach
 * an intersection.
 */
export function getMinimumStepsToWireIntersection(wireStrings: [string, string]): number {
  const { intersectingPoints, wire1PointStepMap, wire2PointStepMap } = parseWireStrings(
    wireStrings
  )

  let minimumSteps = Infinity

  intersectingPoints.forEach(point => {
    const steps = wire1PointStepMap[point] + wire2PointStepMap[point]
    if (steps < minimumSteps) {
      minimumSteps = steps
    }
  })

  return minimumSteps
}
