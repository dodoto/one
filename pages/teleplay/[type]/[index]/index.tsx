import type { NextPage, NextPageContext } from 'next'
import { Container, Wrap, WrapItem, Link } from '@chakra-ui/react'
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
    <Wrap>
      {
        data.map(item => (
          <WrapItem key={item.href}>
            <Link href={item.href}>{item.title}</Link>
          </WrapItem>
        ))
      }
    </Wrap>
  )
}

export const getServerSideProps = async ({query}: NextPageContext) => {
  const {type, index} = query

  const data = await getTeleplayList(type as TeleplayType, index as string)

  return data
}

export default Teleplay