/*
 * @Author: YONG
 * @LastEditors: YONG
 * @Date: 2023-06-11 08:43:06
 * @LastEditTime: 2023-06-25 15:05:59
 * @Description:
 */
// 基于useFetch()的网络请求封装
// 全局基础URL
const BASEURL: string = process.env.NODE_ENV === 'development' ? 'http://172.31.131.216:18088' : ''  //全局后台服务器请求地址 Hurenliang
// const BASEURL: string = 'http://172.31.131.115:18088' //全局后台服务器请求地址 qyz

//定义ts变量类型接口
interface HttpParms {
  baseURL?: string //请求的基本URL
  url: string //请求api接口地址
  method?: any //请求方法
  query?: any //添加查询搜索参数到URL
  body?: any //请求体
}

/**
 * 网络请求方法
 * @param obj 请求参数
 * @returns 响应结果
 */
export const fetch = (obj: HttpParms) => {
  const res = new Promise<void>((resolve, reject) => {
    useFetch((obj.baseURL ?? BASEURL) + obj.url, {
      method: obj.method ?? 'POST',
      query: obj?.query ?? null,
      body: obj?.body ?? null,
      onRequest({ request, options }) {
        // 设置请求报头
        options.headers = options.headers || {}
        // 如果接口需求携带token请求，则可先自行使用官方的useCookie()方法设置Cookie存储后，再使用useCookie()方法，取出token使用
        // const token = useCookie('token')
        // options.headers.Authorization = token.value||null
      },
      onRequestError({ request, options, error }) {
        // 处理请求错误
        console.log('服务器链接失败!')
        reject(error)
      },
      onResponse({ request, response, options }) {
        // 处理响应数据
        resolve(response._data)
      },
      onResponseError({ request, response, options }) {
        // 处理响应错误
      },
    })
  })
  return res
}
