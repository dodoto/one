import type { NextPage, NextPageContext } from 'next'
import { Container, SimpleGrid, Box } from '@chakra-ui/react'
import { getTeleplayEpisodeList, Content, Teleplay } from '@/request'
import { ErrorAlert } from '@/components'
import 'video.js/dist/video-js.css'
import { useVideoJS } from 'react-hook-videojs'
import { FC, memo, useState, useCallback } from 'react'


const TeleplayDetail: NextPage<{content: Content<Teleplay[]>}> = ({content}) => {
  return (
    <Container maxW="800px">
      {
        content.ok ?
        <Player sources={content.data}/> :
        <ErrorAlert message={content.error}/>
      }
    </Container>
  )
}

const EpisodeList: FC<{data: Teleplay[], onEpisodeClick: (index: number) => void}> = memo(({data, onEpisodeClick}) => {
  return (
    <SimpleGrid py="2" columns={[1, 2, 3]}>
      {
        data.map((episode, index) => (
          <Box 
            key={index} 
            cursor="pointer"
            justifyContent="center" 
            py="1"
            borderRadius="5px"
            _hover={{backgroundColor: 'primary'}} 
            data-source={episode.href}
            onClick={() => onEpisodeClick(index)}>
            {episode.title}
          </Box>
        ))
      }
      <Box width="30%"/>
      <Box width="30%"/>
      <Box width="30%"/>
    </SimpleGrid>
  )
})

const Player: FC<{sources: Teleplay[]}> = ({sources}) => {
  const [index, setIndex] = useState(0)
  const src = sources[index].href

  const handleEpisodeClick = useCallback((i: number) => {
    setIndex(i)
  }, [])

  const { Video } = useVideoJS({ sources: [{ src }] })
  return (
    <>
      <Video 
        width="800"
        height="400"
        controls 
        autoPlay
      />
      <EpisodeList data={sources} onEpisodeClick={handleEpisodeClick}/>
    </>
  )
}


export const getServerSideProps = async ({query}: NextPageContext) => {
  const {slug} = query
  const data = await getTeleplayEpisodeList(`${(slug as string[]).join('/')}.html`)
  return data
}

export default TeleplayDetail