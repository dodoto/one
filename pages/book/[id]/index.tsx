import type { NextPage, NextPageContext } from 'next'
import { Container, Wrap, WrapItem, Text, Link } from '@chakra-ui/react'
import { getChapterListData, Chapter, Content } from '@/request'
import { FC, ReactNode } from 'react'

type BookContent = Content<Chapter[]>

const Book: NextPage<{content: BookContent}> = ({content}) => {
  return (
    <Container maxW="800px">
      {
        content.ok ?
        <ChapterList data={content.data}/> :
        <Text>{content.error as ReactNode}</Text>
      }
    </Container>
  )
}

const PlaceItemList: FC = () => {
  const count = new Array(3).fill(1)

  return (
    <>
      {
        count.map((_item, index) => <WrapItem w="240px" key={index}/>)
      }
    </>
  )
}

const ChapterList: FC<{data: Chapter[]}> = ({data}) => {
  return (
    <Wrap pt="8" pb="8" justify="center">
      {
        data.map((item, index) => (
          <WrapItem key={index} w="240px">
            <Link href={item.href}>{item.title}</Link>
          </WrapItem>
        ))
      }
      <PlaceItemList />
    </Wrap>
  )
}

export const getServerSideProps = async ({query}: NextPageContext) => {
  const { id } = query
  const data = await getChapterListData(id as string)

  return data
}

export default Book