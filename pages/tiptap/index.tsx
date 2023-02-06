import type { NextPage } from 'next'
// import { Box } from '@chakra-ui/react'
// import { useEditor, EditorContent } from '@tiptap/react'
// import { StarterKit } from '@tiptap/starter-kit'

const TipTapEditor: NextPage = () => {
  // const editor = useEditor({
  //   extensions: [
  //     StarterKit,
  //   ],
  //   content: '<p>tiptap editor</p>',
  // })
  // console.log(editor, EditorContent)
  return <h1>tiptap editor</h1>
}


export default TipTapEditor

/**
 * get error 
 * codesandbox: Cannot set property Editor of #<Object> which has only a getter
 * browser: cannot find module loadash
 * https://github.com/ueberdosis/tiptap/issues/3694
 */