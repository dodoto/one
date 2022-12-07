import {load} from 'cheerio'
import { NextPageContext } from 'next'
import querysting from 'querystring'
import { FormData } from 'formdata-polyfill/esm.min.js'

export type Content<T> = {ok: true; data: T} | {ok: false; error: string}

// 'https://www.bqg99.com'
const BaseURL = 'https://www.biquge9.com'

const handleSuccess = <T>(data: T) => {
  return  {
    props: {
      content: {ok: true, data},
    }
  }
}

const handleError = (args: {ok: true; res: Response} | {ok: false; error: unknown}) => {
  let error: string
  if (args.ok) {
    error = `code: ${args.res.status}, text: ${args.res.statusText}`
  } else {
    error = (args.error as any).message
  }
  return {
    props: {
      content: {ok: false, error},
    }
  }
}

export type SearchResult = {
  title: string; 
  author: string; 
  des: string; 
  href: string;
}

export const getSearchData = async (q = '') => {
  try {
    const res = await fetch(`${BaseURL}/s?q=${q}`)

    if (res.ok) {
      const rawData = await res.text()

      const $ = load(rawData)
  
      const hrefMap = $('.bookname > a')
      const hrefList: string[] = []
      const titleList: string[] = []
      hrefMap.each((_index, href) => {
        const $bookHref = $(href)
        hrefList.push($bookHref.attr('href')!)
        titleList.push($bookHref.text())
      })
  
      const authorMap = $('.author')
      const authorList: string[] = []
      authorMap.each((_index, author) => {
        authorList.push($(author).text())
      })
  
      const desMap = $('.uptime')
      const desList: string[] = []
      desMap.each((_index, description) => {
        desList.push($(description).text())
      })
  
      const data: SearchResult[] = []
      for (let i = 0; i < hrefMap.length; i++) {
        data.push({
          title: titleList[i],
          author: authorList[i],
          des: desList[i],
          href: hrefList[i],
        })
      }
      return handleSuccess(data)
    } else {
      return handleError({ok: true, res}) 
    }
  } catch (error) {
    return handleError({ok: false, error}) 
  }
}

export type Chapter = {
  href: string;
  title: string;
}

export const getChapterListData = async (id: string) => {
  try {
    const res = await fetch(`${BaseURL}/book/${id}`)

    if (res.ok) {
      const rawData = await res.text()
      const data: {href: string; title: string}[] = []

      const $ = load(rawData)

      const chapterMap = $('dd > a')
      chapterMap.each((_index, chapter) => {
        const $chapter = $(chapter)
        const href = $chapter.attr('href')!
        if (href.endsWith('.html')) {
          data.push({href: href.slice(0, -5) , title: $chapter.text()})
        }
      })

      return handleSuccess(data) 
    } else {
      return handleError({ok: true, res}) 
    }
  } catch (error) {
    return handleError({ok: false, error}) 
  }
}

export type ChapterContent = {
  title: string;
  text: string;
  isLastChapter: boolean;
}

export const getChapterContentData = async (bookId: string, chapterId: string) => {
  try {
    const res = await fetch(`${BaseURL}/book/${bookId}/${chapterId}.html`)

    if (res.ok) {
      const rawData = await res.text()

      const data: ChapterContent = {title: '', text: '', isLastChapter: false}

      const $ = load(rawData)
    
      $('.readinline').remove()
      Object.assign(data, {
        title: $('h1.wap_none').text(),
        text: $('#chaptercontent').html(),
        isLastChapter: $('#pb_next').attr('href')!.endsWith('.html'),
      })

      return handleSuccess(data)
    } else {
      return handleError({ok: true, res})
    }
  } catch (error) {
    return handleError({ok: false, error}) 
  }
} 

export type Teleplay = {
  title: string;
  href: string;
}

// /riju  /hanju
export const TeleplayBaseURL = 'https://www.y3600.cz/'

export type TeleplayType = 'riju' | 'hanju'

export const getTeleplayList = async (type: TeleplayType, index = '1') => {
  const suffix = index === '1' ? 'index.html' : `index_${index}.html`

  try {
    const res = await fetch(`${TeleplayBaseURL}${type}/${suffix}`)
    if (res.ok) {
      const rawData = await res.text()

      const data: Teleplay[] = []

      const $ = load(rawData)

      $('.img.playico').each((_index, item) => {
        const a = $(item)
        data.push({
          title: a.attr('title')!,
          href: `/teleplay/play/${a.attr('href')!.slice(0, -5)}`, // remove .html
        })
      })

      return handleSuccess(data)
    } else {
      return handleError({ok: true, res})
    }
  } catch (error) {
    return handleError({ok: false, error})
  }
}

const parsePlaySorce = (source: string) => {
  return decodeURIComponent(
    source
    .split('(')[1]
    .split(',')[0]
    .replace(/\^/g, '%')
    .replace(/'/g, '')
  )
}

export const getTeleplayEpisodeList = async (href: string) => {
  try {
    const res = await fetch(`${TeleplayBaseURL}${href}`)
    if (res.ok) {
      const rawData = await res.text()

      const data: Teleplay[] = []

      const $ = load(rawData)

      $('#playlist > div > ul li a').each((_index, item) => {
        const a = $(item)
        data.push({
          title: a.attr('title')!,
          href: parsePlaySorce(a.attr('onclick')!),
        })
      })

      return handleSuccess(data)
    } else {
      return handleError({ok: true, res})
    }
  } catch (error) {
    return handleError({ok: false, error})
  }
}

const parseBody = <T>(req: NextPageContext['req']): Promise<T> => {
  return new Promise((resolve) => {
    let data = ''
    req?.once('data', (chunk) => {
      data += chunk
    })
  
    req?.once('end', () => {
      data = decodeURI(data)
      resolve(querysting.parse(data) as T)
    })
  })
}

type TeleplaySearchBody = {
  keyboard: string
  show: string
  tempid: string
  tbname: string
}
// always not found 
export const getTeleplaySearchData = async (req: NextPageContext['req']) => {
  try {
    const body = await parseBody<TeleplaySearchBody>(req)
    console.log('body', body)
    if (body.keyboard) {
      const searchForm = new FormData()
      searchForm.append('keyboard', body.keyboard)
      searchForm.append('show', 'title,keyboard')
      searchForm.append('tempid', '1')
      searchForm.append('tbname', 'news')

      const res = await fetch(`${TeleplayBaseURL}e/search/index.php`, {
        method: 'post',
        body: searchForm,
      })
      console.log('response', res.headers)
      const data = await res.text()
  
      console.log('data', data)


      return data
    }
    return []
  } catch (error) {
    console.log('error', error)
  }
}