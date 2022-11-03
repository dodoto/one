import type { NextPage, NextPageContext } from 'next'
import {useRouter} from 'next/router'
import { 
  Container, 
  VStack, 
  Text, 
  Heading, 
  Center, 
  Button, 
  ButtonGroup, 
  Box,
} from '@chakra-ui/react'
import { getChapterContentData, Content, ChapterContent } from '@/request'
import { ReactNode } from 'react'

const Chapter: NextPage<{content: Content<ChapterContent>}> = ({content}) => {


  const {query: {id, chapterId}, push} = useRouter()
  const chapterNo = parseInt(chapterId as string)
  const baseUrl = `/book/${id}`

  const toPrev = () => {
    push(`${baseUrl}/${chapterNo - 1}`)
  }

  const toCatelog = () => {
    push(baseUrl)
  }

  const toNext = () => {
    push(`${baseUrl}/${chapterNo + 1}`)
  }


  if (content.ok) {
    return (
      <Container maxW="800px">
        <Box pt="8" pb="8" pl="2" pr="2">
          <VStack spacing="4">
            <Center>
              <Heading>{content.data.title}</Heading>
            </Center>
            
            <Text dangerouslySetInnerHTML={{__html: content.data.text}} />

            <ButtonGroup gap="6">
              <Button onClick={toPrev} disabled={chapterNo === 1}>上一章</Button>
              <Button onClick={toCatelog}>目录</Button>
              <Button onClick={toNext} disabled={!content.data.isLastChapter}>下一章</Button>
            </ButtonGroup>
          </VStack>
        </Box>
      </Container>
    )
  } else {
    return (
      <Text>{content.error as ReactNode}</Text>
    )
  }
}

export const getServerSideProps = async ({query}: NextPageContext) => {
  const { id, chapterId } = query
  const data = await getChapterContentData(id as string, chapterId as string)

  return data
}

export default Chapter