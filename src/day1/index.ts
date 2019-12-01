import { moduleMasses } from './input'

export function calculateFuelUsage(massOrFuel: number): number {
  return Math.floor(massOrFuel / 3) - 2
}

export function calculateFuelUsageForFuel(fuel: number): number {
  const additionalFuel = calculateFuelUsage(fuel)
  return additionalFuel <= 0
    ? 0
    : additionalFuel + calculateFuelUsageForFuel(additionalFuel)
}

export function calculateTotalFuelUsage(mass: number): number {
  const fuelForModule = calculateFuelUsage(mass)
  return fuelForModule + calculateFuelUsageForFuel(fuelForModule)
}

export function getPuzzle1Answer(): number {
  return moduleMasses.reduce((sum, moduleMass) => sum + calculateFuelUsage(moduleMass), 0)
}

export function getPuzzle2Answer(): number {
  return moduleMasses.reduce(
    (sum, moduleMass) => sum + calculateTotalFuelUsage(moduleMass),
    0
  )
}
