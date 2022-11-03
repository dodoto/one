import type { NextPage } from 'next'
import Link from 'next/link'
import { Box, Flex, List, ListItem } from '@chakra-ui/react'

const Home: NextPage = () => {

  return (
    <Box minH="100vh">
      <Flex>
        <List>
          <ListItem>
            <Link href="/search">搜索</Link>
          </ListItem>
          <ListItem>
            <Link href="/user/1">user 1</Link>
          </ListItem>
          <ListItem>
            <Link href="user/2">user 2</Link>
          </ListItem>
          <ListItem>
            <Link href="about">about</Link>
          </ListItem>
        </List>
      </Flex>
    </Box>
  )
}



export default Home
