import type { NextPage, NextPageContext } from 'next'
import { Container, SimpleGrid, Link, useColorModeValue } from '@chakra-ui/react'
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
  const shadow = useColorModeValue('lg', 'dark-lg')

  return (
    <SimpleGrid py="2" columns={[1, 2, 3]} gap="2">
      {
        data.map(item => (
          <Link 
            variant="teleplay"
            _hover={{shadow}}
            href={item.href} 
            key={item.href}>
            {item.title}
          </Link>
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