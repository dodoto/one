import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const ColorTheme = extendTheme({
  components: {
    'Link': {
      variants: {
        'teleplay': (props: StyleFunctionProps) => ({
          padding: 2,
          borderRadius: 4,
          border: '1px',
          borderColor: 'chakra-border-color',
          // shadow: mode('lg', 'dark-lg')(props),
        }),
      }
    }
  },
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


