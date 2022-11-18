import type { NextPage, NextPageContext } from 'next'
import { Container, Heading, Center, Link, SimpleGrid, Box } from '@chakra-ui/react'
import { getChapterListData, Chapter, Content } from '@/request'
import { FC } from 'react'
import { ErrorAlert } from '@/components'

type BookContent = Content<Chapter[]>

const Book: NextPage<{content: BookContent}> = ({content}) => {
  return (
    <Container maxW="800px">
      <Heading p="4">
        <Center>目录</Center>
      </Heading>
      {
        content.ok ?
        <ChapterList data={content.data}/> :
        <ErrorAlert message={content.error}/>
      }
    </Container>
  )
}

const ChapterList: FC<{data: Chapter[]}> = ({data}) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} >
      {
        data.map(item => (
          <Box key={item.href} py="4" px="6" borderBottom="1px" borderColor="chakra-border-color">
            <Link href={item.href}>{item.title}</Link>
          </Box>
        ))
      }
    </SimpleGrid>
  )
}

export const getServerSideProps = async ({query}: NextPageContext) => {
  const { id } = query
  const data = await getChapterListData(id as string)

  return data
}

export default Book