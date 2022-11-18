import type { NextPage, NextPageContext } from 'next'
import { Container, SimpleGrid, Box, Link } from '@chakra-ui/react'
import { getTeleplayList, Teleplay, Content, TeleplayType } from '@/request'
import { ErrorAlert } from '@/components'
import { FC } from 'react'

const Teleplay: NextPage<{content: Content<Teleplay[]>}> = ({content}) => {
  return (
    <Container maxW="800px">
      {
        content.ok ?
        <TeleplayList data={content.data}/> :
        <ErrorAlert message={content.error}/>
      }
    </Container>
  )
}

const TeleplayList: FC<{data: Teleplay[]}> = ({data}) => {
  return (
    <SimpleGrid py="2" columns={[1, 2, 3]}>
      {
        data.map(item => (
          <Box key={item.href} p="2">
            <Link href={item.href}>{item.title}</Link>
          </Box>
        ))
      }
    </SimpleGrid>
  )
}

export const getServerSideProps = async ({query}: NextPageContext) => {
  const {type, index = '1'} = query

  const data = await getTeleplayList(type as TeleplayType, index as string)
  return data
}

export default Teleplay