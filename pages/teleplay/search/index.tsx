import type { NextPage, NextPageContext } from 'next'
import { Container, Box, Input, FormControl, FormLabel, Button, FormHelperText } from '@chakra-ui/react'
import { getTeleplaySearchData, TeleplayBaseURL } from '@/request'

const TeleplaySearch: NextPage<{data: any}> = ({data}) => {
  // console.log(data)
  return (
    <Container maxW="500px" _before={{content: `""`, display: 'table'}}>
      <Box p="4" shadow="md" borderRadius="md" mt="10">
        <FormControl>
          <form autoComplete="off" method="post" >
            <FormLabel>搜索</FormLabel>
            <Input name="keyboard"/>
            {/* <Input name="show" value="title,keyboard" hidden readOnly/>
            <Input name="tempid" value="1" hidden readOnly/>
            <Input name="tbname" value="news" hidden readOnly/> */}
            <Button type="submit">submit</Button>
          </form>
          <FormHelperText>永远搜不到</FormHelperText>
        </FormControl>
      </Box>
      {/* {
        content.ok ? <SearchResultList data={content.data} /> : <ErrorAlert message={content.error}/>
      } */}
    </Container>
  )
}



export const getServerSideProps = async ({req}: NextPageContext) => {
  const data = await getTeleplaySearchData(req)

  return {
    props: {
      data
    }
  }
}

export default TeleplaySearch