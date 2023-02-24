import React, { FC, useState, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { Count } from './Count'

const getUnitsAndTens = (value: number) => {
  if (value < 0) {
    return [0, value]
  } else {
    const tens = Math.floor(value / 10)
    const units = value - tens * 10
    return [tens, units]
  }
}

const getCount = () => {
  let time: number[] = []
  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes()
  const s = now.getSeconds()
  time = time.concat(getUnitsAndTens(h)).concat(getUnitsAndTens(m)).concat(getUnitsAndTens(s))
  return time
}

export const SlideCountTimer: FC = () => {
  const [counts, setCounts] = useState(getCount())

  const maxUnitH = counts[0] === 2 ? 3 : 9

  useEffect(() => {
    const timer = setInterval(() => {
      setCounts(getCount())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Flex fontSize="3vmin" fontWeight="bold" lineHeight="10" justifyContent="center" pos="fixed" right="0" bottom="20" left="0">
      <Count max={2} count={counts[0]}/>
      <Count max={maxUnitH} count={counts[1]}/>
      :
      <Count max={5} count={counts[2]}/>
      <Count count={counts[3]}/>
      :
      <Count max={5} count={counts[4]}/>
      <Count count={counts[5]}/>
    </Flex>
  )
}