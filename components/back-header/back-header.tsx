import { FC } from "react";
import { Heading, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export const BackHeader: FC = () => {
  const router = useRouter()
  return (
    <Heading p="4">
      <IconButton icon={<ArrowBackIcon/>} aria-label="back" onClick={router.back}></IconButton>
    </Heading>
  )
}