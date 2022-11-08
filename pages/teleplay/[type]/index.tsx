import type { NextPage, NextPageContext } from 'next'

const TeleplayHome: NextPage = () => {
  return <h1>teleplay home</h1>
}

export const getServerSideProps = async ({query}: NextPageContext) => {
  const { type } = query 

  return {
    redirect: {
      destination: `/teleplay/${type}/1`,
      permanent: true,
    },
  }
}

export default TeleplayHome