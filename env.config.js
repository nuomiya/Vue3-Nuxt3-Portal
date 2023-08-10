/*
 * @Author: YONG
 * @LastEditors: YONG
 * @Date: 2023-06-13 16:34:17
 * @LastEditTime: 2023-06-26 14:55:17
 * @Description:
 */
// 开发环境的 imgPathPrefix   // 生产环境的 imgPathPrefix
export const imgPathPrefix = process.env.NODE_ENV === 'development' ? 'http://172.31.131.216:80' : '' // 115 'https://172.31.131.115:18080'