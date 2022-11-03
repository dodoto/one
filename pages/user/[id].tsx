import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const UserProfile: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <h1>user id {id} profile</h1>
}

export default UserProfile