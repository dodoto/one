import type { NextPage } from 'next'
import { Box, Wrap, WrapItem, Link, Container } from '@chakra-ui/react'
import { SlideCountTimer, InfScroller } from '@/components'

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
  {title: '日剧', href: `/teleplay/ribenju`},
  {title: '韩剧', href: '/teleplay/hanguoju'},
  {title: '泰剧', href: '/teleplay/taiguoju'},
  {title: '综艺', href: '/teleplay/zongyi'},
  {title: 'dot-line', href: '/dot-line'}
]

const Home: NextPage = () => {
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
          <InfScroller buffer={2}/>
          <SlideCountTimer/>
      </Container>
    </Box>
  )
}

// export const getServerSideProps = async () => {  
//   // return await getCool18SearchData()
//   return {
//     props: {
//       content: {ok: false, error: 'no error'}
//     }
//   }
// }

export default Home
