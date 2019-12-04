export type InputRange = readonly [number, number]

type PasswordValidator = (password: string) => boolean

function isPasswordIncreasing(password: string): boolean {
  let isIncreasing = true

  for (let j = 0; j < password.length - 1; j++) {
    isIncreasing = isIncreasing && Number(password[j + 1]) >= Number(password[j])
  }

  return isIncreasing
}

function hasPasswordAdjacentDigits(password: string): boolean {
  let hasAdjacentDigits = false

  for (let j = 0; j < password.length - 1; j++) {
    hasAdjacentDigits = hasAdjacentDigits || password[j + 1] === password[j]
  }

  return hasAdjacentDigits
}

function hasPasswordAdjacentDigitsOutsideGroups(password: string): boolean {
  let hasAdjacentDigits = false

  for (let j = 0; j < password.length - 1; j++) {
    const isNextAdjacentDigits = password[j] === password[j + 1]

    // This is not readable... :/
    const isPreviousMatching = j > 0 ? password[j] === password[j - 1] : false
    const isNextNextMatching =
      j < password.length - 2 ? password[j] === password[j + 2] : false

    hasAdjacentDigits =
      hasAdjacentDigits ||
      (isNextAdjacentDigits && !isPreviousMatching && !isNextNextMatching)
  }

  return hasAdjacentDigits
}

export function isPasswordValidPartOne(password: string): boolean {
  return isPasswordIncreasing(password) && hasPasswordAdjacentDigits(password)
}

export function isPasswordValidPartTwo(password: string): boolean {
  return (
    isPasswordIncreasing(password) && hasPasswordAdjacentDigitsOutsideGroups(password)
  )
}

export function countPasswordOptions(
  passwordRange: InputRange,
  validator: PasswordValidator
): number {
  const [low, high] = passwordRange

  let count = 0
  for (let password = low; password < high; password++) {
    if (validator(password.toString())) {
      count++
    }
  }

  return count
}
