export const api_url = 'https://api.vndb.org/kana/vn'

/**
 * 部分内容定义
 */
// 图片
export interface VImage {
  id: string
  url: string
  sexual: number
  dims: [number, number]
}

// 游戏信息
export interface VGame {
  id: string
  title: string
  lang: string
  released?: string
  rating?: number
  image?: VImage
  description?: string
}

/**
 *  接口定义
 */
// 输出数据
export interface VQuery {
  filters: Array<any>
  fields: string
}

// 输入数据
export interface VResponse {
  results: VGame[]
  count?: number
  more: boolean
}

/**
 * 数据处理
 */


/**
 * 发送请求
 */
export async function searchData(query: VQuery): Promise<VResponse> {
  const response = await fetch(api_url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query)
  })

  if (!response.ok) {
    throw new Error()
  }

  const data = await response.json()
  return data
}
