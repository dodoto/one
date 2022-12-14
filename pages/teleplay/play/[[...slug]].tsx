/* eslint-disable */
import type { NextPage, NextPageContext } from 'next'
import { Container, SimpleGrid, Box, AspectRatio, Link } from '@chakra-ui/react'
import { getTeleplayEpisodeList, Content, Teleplay } from '@/request'
import { ErrorAlert } from '@/components'
import 'video.js/dist/video-js.css'
import { useVideoJS } from 'react-hook-videojs'
import { FC, memo, useState, useCallback, useRef, useEffect } from 'react'


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

const EpisodeList: FC<{data: Teleplay[], onEpisodeClick: (index: number) => void, activeIndex: number}> = memo(({
  data, 
  onEpisodeClick, 
  activeIndex,
}) => {
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
            bg={index === activeIndex ? 'primary' : 'unset'}
            color={index === activeIndex ? 'white' : 'unset'} 
            _hover={{backgroundColor: 'primary', color: 'white'}} 
            data-source={episode.href}
            onClick={() => onEpisodeClick(index)}>
            {episode.title}
          </Box>
        ))
      }
    </SimpleGrid>
  )
})

type History = {
  title: string
  date: number
}

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
  const [index, setIndex] = useState(0)
  const src = sources[index].href

  const dot = useRef('..')

  const handleEpisodeClick = useCallback((i: number) => {
    setIndex(i)
  }, [])

  const { Video, ready } = useVideoJS({ sources: [{ src }] })

  useEffect(() => {
    if (ready) {
      console.log(`播放第 ${index + 1} ${dot.current}`)
      dot.current === '..' ? dot.current = '.' : dot.current = '..'
    }
  }, [ready, index])

  return (
    <>
      <AspectRatio maxW="768px" ratio={16/9}>
        <Video 
          style={{
            width: '100%',
            height: '100%',
          }}
          controls 
          autoPlay
        />
      </AspectRatio>
      <EpisodeList data={sources} onEpisodeClick={handleEpisodeClick} activeIndex={index}/>
    </>
  )
}


export const getServerSideProps = async ({query}: NextPageContext) => {
  const {slug} = query
  const data = await getTeleplayEpisodeList(`${(slug as string[]).join('/')}.html`)
  return data
}

export default TeleplayDetail