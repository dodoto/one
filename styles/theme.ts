import { extendTheme } from '@chakra-ui/react'

export const ColorTheme = extendTheme({
  semanticTokens: {
    colors: {
      primary: {
        default: 'blue.300',
        _dark: 'blue.200',
      },
    },
  },
})
// export const ColorTheme = extendTheme({})


