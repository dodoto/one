import React, { FC, useState, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { Count } from './Count'
import { getCount } from './utils'

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