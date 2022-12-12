import { extendTheme, StyleFunctionProps, useColorModeValue } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const ColorTheme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      '::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      
      '::-webkit-scrollbar-thumb': {
        backgroundColor: mode('rgb(205, 205, 205)', 'rgb(166, 166, 166)')(props),
      },
      
      '::-webkit-scrollbar-thumb:hover': {
        backgroundColor: mode('rgb(114, 116, 123)', 'rgb(95, 97, 104)')(props),
      },
      
      '*': {
        scrollbarWidth: 'thin',
        scrollbarColor: mode('dark', 'light')(props),
      },
    }),
  },
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

export const useShadow = () => {
  const shadow = useColorModeValue('lg', 'dark-lg')
  return shadow
}


