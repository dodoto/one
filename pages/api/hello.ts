// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// RSSHub example
// const RSSHub = require('rsshub')
// RSSHub.init({})
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const data = await RSSHub.request('/bilibili/bangumi/media/9192')
//     console.log('data', data)
//   } catch (error) {
//     console.log('error', error)
//   }
//   res.status(200).json({ name: 'John Doe' })
// }
// export default handler

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}

