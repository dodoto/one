import type { NextPage } from 'next'
import { Box, Wrap, WrapItem, Link, Container, Divider } from '@chakra-ui/react'
import { getCool18SearchData } from '../request'
import { FC } from 'react'


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

const Breakpoints = ['100%', '50%', '33.3%']

const NavData = [
  {title: '笔趣阁搜索', href: '/search'},
  {title: '日剧', href: '/teleplay/riju'},
  {title: '韩剧', href: '/teleplay/hanju'},
  {title: '泰剧', href: '/teleplay/taiju'},
  {title: '韩国综艺', href: '/teleplay/hanguozongyi'},
  {title: '网剧', href: '/teleplay/wangluoju'},
]

type Content = {ok: true; data: any} | {ok: false; error: any}

const Card: FC<{content: string, index: number, total: number}> = ({content, index, total}) => {
  return (
    <>
      <Box px="4" py="8">
        <Box dangerouslySetInnerHTML={{__html: content}}/>
      </Box>
      {index !== total - 1 && <Divider/>} 
    </>
  )
}

const Home: NextPage<{content: Content}> = ({content}) => {
  // console.log(content)
  return (
    <Box minH="100vh">
      <Container maxW="800px">
        <Wrap spacing="0">
          {
            NavData.map(nav => (
              <WrapItem key={nav.href} w={Breakpoints} justifyContent="center" py="2"> 
                <Link href={nav.href}>{nav.title}</Link>
              </WrapItem>
            ))
          }
        </Wrap>
          {/* {
            content.ok ? 
            content.data.map((item: string, index: number) => (
              <Card 
                key={index}
                index={index}
                total={content.data.length} 
                content={item}/>
            )) : 
            content.error
          } */}
      </Container>
    </Box>
  )
}

export const getServerSideProps = async () => {  
  // return await getCool18SearchData()
  return {
    props: {
      content: {ok: false, error: 'no error'}
    }
  }
}

export default Home
