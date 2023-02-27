import type { NextPage, NextPageContext } from 'next'
import { Container, SimpleGrid, Link } from '@chakra-ui/react'
import { getTeleplayList, Teleplay, Content, TeleplayType } from '@/request'
import { ErrorAlert } from '@/components'
import { FC } from 'react'
import { useShadow } from '../../../styles/theme'

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
  const shadow = useShadow()
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
  const {type} = query

  const data = await getTeleplayList(type as TeleplayType)
  return data
}

export default Teleplay