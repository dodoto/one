import type { NextPage } from 'next'
import Link from 'next/link'
import { Box, Wrap, WrapItem, Center, Container } from '@chakra-ui/react'


// const breakpoints = {
//   sm: '30em',    480
//   md: '48em',    768
//   lg: '62em',    992
//   xl: '80em',    1280
//   '2xl': '96em', 1536
// }

// const TestW = {
//   base: '100%',
//   md: '50%',
//   lg: '33.3%',
//   xl: '33.3%',
//   '2xl': '33.3%',
// }

const TestW = ['100%', '50%', '33.3%']


const Home: NextPage = () => {

  return (
    <Box minH="100vh">
      <Container maxW="800px">
        <Link href="/search">搜索</Link>
        <Wrap spacing="0">
          <WrapItem bg="red.200" w={TestW}> 
            <Center>
              box1
            </Center>
          </WrapItem>
          <WrapItem bg="green.200" w={TestW}>
            <Center>
              box2
            </Center>
          </WrapItem>
          <WrapItem bg="tomato" w={TestW}>
            <Center>
              box3
            </Center>
          </WrapItem>
          <WrapItem bg="blue.200" w={TestW}>
            <Center>
              box4
            </Center>
          </WrapItem>
        </Wrap>
      </Container>
    </Box>
  )
}



export default Home
