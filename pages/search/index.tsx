import type { NextPage, NextPageContext } from 'next'
import {
  Box, 
  Container,
  FormControl, 
  FormLabel, 
  FormHelperText,
  Input,
  Text,
  List,
  ListItem,
  Link,
} from '@chakra-ui/react'
import { FC } from 'react';
import { getSearchData, SearchResult, Content } from '@/request'


type SearchContent = Content<SearchResult[]>

const Search: NextPage<{content: SearchContent}> = ({content}) => {
  return (    
    <Container maxW="500px" _before={{content: `""`, display: 'table'}}>
      <Box p="4" shadow="md" borderRadius="md" mt="10">
        <FormControl>
          <form autoComplete="off">
            <FormLabel>搜索</FormLabel>
            <Input name="q"/>
            <FormHelperText>只支持标题搜索</FormHelperText>
          </form>
        </FormControl>
      </Box>
      {
        content.ok ? <SearchResultList data={content.data} /> : <Text>{content.error }</Text>
      }
    </Container>
  )
}

const SearchResultList: FC<{data: SearchResult[]}> = ({data}) => {
  if (data.length) {
    return (
      <List spacing="3" mt="10" mb="10">
        {
          data.map(item => (
            <ListItem key={item.href} borderRadius="md" shadow="lg" p="4">
              <Link href={item.href}>
                <Text>{item.title}</Text>
              </Link>
              <Text>{item.author}</Text>
              <Text>{item.des}</Text>
            </ListItem>
          ))
        }
      </List>
    )
  } else {
    return null
  }
}


export const getServerSideProps = async ({query}: NextPageContext) => {
  const { q } = query
  const data = await getSearchData(q as string)
  return data
}

export default Search