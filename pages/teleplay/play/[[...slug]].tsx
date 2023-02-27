/* eslint-disable */
import type { NextPage, NextPageContext } from 'next'
import { Container, SimpleGrid, Box, Link } from '@chakra-ui/react'
import { getTeleplayEpisodeList, Content, Teleplay } from '@/request'
import { ErrorAlert } from '@/components'
import 'video.js/dist/video-js.css'
import { useVideoJS } from 'react-hook-videojs'
import { FC, memo } from 'react'


const TeleplayDetail: NextPage<{content: Content<Teleplay[]>}> = ({content}) => {
  return (
    <Container maxW="800px" position="relative">
      {
        content.ok ?
        (content.data.length ? <Player sources={content.data}/> : <Box textAlign="center">暂无播放源</Box>) :
        <ErrorAlert message={content.error}/>
      }
    </Container>
  )
}

const EpisodeList: FC<{data: Teleplay[]}> = memo(({ data }) => {
  return (
    <SimpleGrid py="2" columns={[1, 2, 3]} gap="2">
      {
        data.map((episode, index) => (
          <Box 
            key={index} 
            cursor="pointer"
            justifyContent="center" 
            py="1"
            borderRadius="5px"
            textAlign="center"
            // bg={index === activeIndex ? 'primary' : 'unset'}
            // color={index === activeIndex ? 'white' : 'unset'} 
            _hover={{backgroundColor: 'primary', color: 'white'}}>
              <Link href={`https://y3600.net${episode}`} target="_blank">{episode.title}</Link>
          </Box>
        ))
      }
    </SimpleGrid>
  )
})

// const HISTORY_KEY = 'history'

// const getHistory = ():History[] => {
//   const raw = localStorage.getItem(HISTORY_KEY)
//   return raw ? JSON.parse(raw) : []
// }

// const setHistory = (history: any[]) => {
//   localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
// }

// const useHistory = () => {
//   const ref = useRef<History []>([])

//   useEffect(() => {
//     const history = getHistory()
//     ref.current = [...history, ...ref.current]
//   }, [])
//   return ref
// }

const Player: FC<{sources: Teleplay[]}> = ({sources}) => {

  // const handleEpisodeClick = useCallback((i: number) => {
  //   setIndex(i)
  // }, [])

  // const { Video, ready } = useVideoJS({ sources: [{ src }] })

  // useEffect(() => {
  //   if (ready) {
  //     console.log(`播放第 ${index + 1} ${dot.current}`)
  //     dot.current === '..' ? dot.current = '.' : dot.current = '..'
  //   }
  // }, [ready, index])

  return (
    <>
      {/* <AspectRatio maxW="768px" ratio={16/9}>
        <Video 
          style={{
            width: '100%',
            height: '100%',
          }}
          controls 
          autoPlay
        />
      </AspectRatio> */}
      <EpisodeList data={sources}/>
    </>
  )
}


export const getServerSideProps = async ({query}: NextPageContext) => {
  const {slug} = query
  console.log(slug)
  const data = await getTeleplayEpisodeList(`${(slug as string[]).join('/')}`)
  return data
}

export default TeleplayDetail