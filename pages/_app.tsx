import type { AppProps } from 'next/app'
import { ChakraProvider, Box, IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ThemeModeToggleButton = () => {
  const {colorMode, toggleColorMode} = useColorMode()
  const icon = colorMode === 'dark' ? <MoonIcon /> : <SunIcon />

  return (
    <Box pos="fixed" bottom="20" right="4">
      <IconButton icon={icon} onClick={toggleColorMode} aria-label="switch theme mode"/>
    </Box>
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps}/>
      <ThemeModeToggleButton />
    </ChakraProvider>
  )
}

export default MyApp
