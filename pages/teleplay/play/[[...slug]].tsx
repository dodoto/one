import type { NextPage, NextPageContext } from 'next'
import { Container, Wrap, WrapItem } from '@chakra-ui/react'
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
    <Wrap spacing="0" py="2">
      {
        data.map((episode, index) => (
          <WrapItem 
            // variant="bg-primary"
            key={index} 
            cursor="pointer"
            width="50%" 
            justifyContent="center" 
            py="1"
            borderRadius="5px"
            _hover={{backgroundColor: 'brand.100'}} 
            data-source={episode.href}
            onClick={() => onEpisodeClick(index)}>
            {episode.title}
          </WrapItem>
        ))
      }
      <WrapItem width="30%"/>
      <WrapItem width="30%"/>
      <WrapItem width="30%"/>
    </Wrap>
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