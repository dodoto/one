import type { NextPage } from 'next'
import { Box, Wrap, WrapItem, Link, Center, Container } from '@chakra-ui/react'



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
        <Wrap spacing="0">
          <WrapItem bg="red.200" w={TestW} justifyContent="center" py="2"> 
            <Link href="/search">搜索</Link>
          </WrapItem>
          <WrapItem bg="green.200" w={TestW} justifyContent="center" py="2">
            <Link href="/teleplay/riju">日剧</Link>
          </WrapItem>
          <WrapItem bg="tomato" w={TestW} justifyContent="center" py="2">
            <Link href="/teleplay/hanju">韩剧</Link>
          </WrapItem>
          <WrapItem bg="blue.200" w={TestW} justifyContent="center" py="2">box4</WrapItem>
        </Wrap>
      </Container>
    </Box>
  )
}

export const getServerSideProps = async () => {  
  try {
    // https://rsshub.justqyx.com/  504
    // https://rss.injahow.cn/   504
    // http://rsshub.cry33.com/  504 bilibili ok
    // https://rsshub.uneasy.win/ 503 bilibili ok
    // need RssHub
    // const res = await fetch('https://rsshub.uneasy.win/bilibili/user/video/2267573')
    // const data = await res.text()
    // console.log('data', data)

  } catch (error) {
    console.log('error', error)
  }
  return {
    props: {
      data: {}
    }
  }
}

export default Home
