export const getUnitsAndTens = (value: number) => {
  if (value < 0) {
    return [0, value]
  } else {
    const tens = Math.floor(value / 10)
    const units = value - tens * 10
    return [tens, units]
  }
}

export const getCount = () => {
  let time: number[] = []
  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes()
  const s = now.getSeconds()
  time = time.concat(getUnitsAndTens(h)).concat(getUnitsAndTens(m)).concat(getUnitsAndTens(s))
  return time
}