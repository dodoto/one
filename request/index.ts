import {load} from 'cheerio'

export type Content<T> = {ok: true; data: T} | {ok: false; error: string}

export type SearchResult = {
  title: string; 
  author: string; 
  des: string; 
  href: string;
}

export type Chapter = {
  href: string;
  title: string;
}

export type ChapterContent = {
  title: string;
  text: string;
  isLastChapter: boolean;
}

const BaseURL = 'https://www.bqg99.com'

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