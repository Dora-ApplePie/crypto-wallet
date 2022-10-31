export const roundTo = (value: string) => {
  const number = +value

  if (number < 0.1 && number > 0) {
    const id = value.split('').findIndex(char => {
      if (char === '.') {
        return false
      }
      return +char != 0
    })
    return number.toFixed(id)
  } else if (number < 1 && number > 0.1) {
    return Math.round(number * 10000) / 10000
  }
  //отрицательные числа не правильно округляются
  return number.toFixed(2)
}