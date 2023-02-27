import React, { FC, useRef, useEffect, memo, useMemo } from 'react'
import { Box } from '@chakra-ui/react'

export const Count: FC<{max?: number, min?: number, count?: number}> = memo(({ max = 9, min = 0, count = 0 }) => {
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
  }, [count, max, min])

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

Count.displayName = 'Count'