import { FC } from 'react'
import { Alert, AlertIcon } from '@chakra-ui/react'

export const ErrorAlert: FC<{message: string}> = ({message}) => {
  return (
    <Alert status="error">
      <AlertIcon/>
      {message}
    </Alert>
  )
}