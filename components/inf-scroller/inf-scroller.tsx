import React, { FC, useEffect, useRef, useState } from 'react'
import { Container, Box, HStack, Button, Switch } from '@chakra-ui/react'

type InfScrollerProps = {
  buffer?: number          // 两侧子元素数量, 总量为 2 * buffer + 1
}

const SIZE = 400

export const InfScroller: FC<InfScrollerProps> = ({ buffer = 1 }) => {
  const [visible, setVisible] = useState(true)
  const [index, setIndex] = useState(0)
  const scrollLeft = useRef(0)
  const isScroll = useRef(false)

  const pageIndices = [...Array(buffer * 2 + 1)].map((_, i) => {
    const bufferIndex = i - buffer;
    return Math.round(index - bufferIndex);
  })

  const getLeft = (curIndex: number, pageIndex: number) => (pageIndex - curIndex) * (SIZE - 220)

  const animate = (value: number, dest: number, dir: 1 | -1) => {
    const step = 0.01 * dir
    if (parseFloat(value.toFixed(3)) !== dest) {
      requestAnimationFrame(() => {
        animate(value + step, dest, dir)
        setIndex(value)
      })
    } else {
      requestAnimationFrame(() => {
        setIndex(dest)
        isScroll.current = false
      })
    }
  }

  const scroll = (dir: 1 | -1) => {
    if (!isScroll.current) {
      isScroll.current = true
      animate(index, index + dir, dir)
    }
  }

  useEffect(() => {
    scrollLeft.current = index * SIZE
    console.log(`scroll left = ${Math.round(scrollLeft.current)}`)
  }, [index])


  return (
    <Container >
      <Box 
        pos="relative" 
        h="200px" 
        w={`${SIZE}px`} 
        my="8" 
        mx="auto" 
        borderWidth={2} 
        borderRadius="xl" 
        overflow={visible ? 'visible' : 'hidden'}>
        {
          pageIndices.map((item) => (
            <Box 
              pos="absolute"
              top="50px"
              left="150px"
              borderWidth={2} borderRadius="xl"
              borderColor="blue.400"
              textAlign="center"
              lineHeight="100px"
              fontSize="2xl"
              fontWeight="bold"
              w={`${SIZE - 300}px`}
              key={`item-${item}`} 
              style={{transform: `translateX(${getLeft(index, item)}px)`}}>{item}</Box>
          ))
        }
      </Box>
      <HStack justifyContent="center" gap="8">
        <Button onClick={() => scroll(-1)} colorScheme="blue">prev</Button>
        <Switch onChange={() => setVisible(!visible)}/>
        <Button onClick={() => scroll(1)} colorScheme="blue">next</Button>
      </HStack>
    </Container>
  )
}