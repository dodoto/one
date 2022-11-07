import type { NextPage, NextPageContext } from 'next'
import { Container, Text, Heading, Center, Link, Table, Tr, Td, Tbody, useMediaQuery } from '@chakra-ui/react'
import { getChapterListData, Chapter, Content } from '@/request'
import { FC } from 'react'

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
        <Text>{content.error}</Text>
      }
    </Container>
  )
}

const ChapterTd: FC<{data: Chapter[], startIndex: number, count: number}> = ({data, startIndex, count}) => {
  const renderIndex = new Array(count).fill(startIndex).map((item, index) => item + index)
  return (
    <>
      {
        renderIndex.map((index) => (
          data[index] ?
          <Td key={index}>
            <Link href={data[index].href}>{data[index].title}</Link>
          </Td> : null
        ))
      }
    </>
  )
}

const getTrRenderIndex = (data: Chapter[], count: number) => {
  const renderIndex: number[] = []
  for (let i = 0; i < data.length; i++) {
    const threshold = count === 1 ? true : i === 0 || (i + 1) % count === 1
    if (threshold) {
      renderIndex.push(i)
    }
  }
  return renderIndex
}

const useTdCount = () => {
  const [isLargerThan500, isLargerThan850] = useMediaQuery(['(min-width: 500px)', '(min-width: 850px)'])
  if (isLargerThan850) {
    return 3
  } else if (isLargerThan500) {
    return 2
  } else {
    return 1
  }
}

const ChapterTr: FC<{data: Chapter[]}> = ({data}) => {
  const tdCount = useTdCount()
  const renderIndex = getTrRenderIndex(data, tdCount)
  return (
    <>
      {
        renderIndex.map((index) => (
          <Tr key={index}>
            {/* {renderTd(data, index)} */}
            <ChapterTd data={data} startIndex={index} count={tdCount}/>
          </Tr>
        ))
      }
    </>
  )
}

const ChapterList: FC<{data: Chapter[]}> = ({data}) => {
  return (
    <Table>
      <Tbody>
        <ChapterTr data={data}/>
      </Tbody>
    </Table>
  )
}

export const getServerSideProps = async ({query}: NextPageContext) => {
  const { id } = query
  const data = await getChapterListData(id as string)

  return data
}

export default Book