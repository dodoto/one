import React, { FC, useState, useRef, useEffect, memo, useMemo } from 'react'
import { Box, Flex } from '@chakra-ui/react'

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

const Count: FC<{max?: number, min?: number, count?: number}> = memo(({ max = 9, min = 0, count = 0 }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const countArray = useMemo(() => {
    const arr = new Array(max + 1).fill(1).map((_, index) => index)
    arr.push(min)
    return arr
  }, [max, min])

  const handleTransitionEnd = () => {
    if (count === min) {
      Object.assign(containerRef.current!.style, {
        transform: `translateY(${min * -40}px)`,
        transition: 'none',
      })
    }
  }

  useEffect(() => {
    let translateY = 0
    if (count === min) {
      translateY = (max + 1) * -40
    } else {
      translateY = count * -40
    }
    Object.assign(containerRef.current!.style, {
      transform: `translateY(${translateY}px)`,
      transition: 'transform 0.3s',
    })
  }, [count])

  return (
    <Box h="10" overflow="hidden">
      <Box ref={containerRef} onTransitionEnd={handleTransitionEnd}>
        {
          countArray.map((item, index) => (
            <Box key={index}>{item}</Box>
          ))
        }
      </Box>
    </Box>
  )
})

export const Timer: FC = () => {
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