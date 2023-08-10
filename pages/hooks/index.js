/*
 * @Author: YONG
 * @LastEditors: YONG
 * @Date: 2023-06-11 15:43:10
 * @LastEditTime: 2023-06-15 18:44:09
 * @Description:
 */
import { reactive, onBeforeMount, toRefs } from 'vue'
import { imgPathPrefix } from '~/env.config.js'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'

export function useState() {
  const router = useRouter()
  const user = useUserStore()
  const state = reactive({
    clientCaseImg: '',
    description: [],
    productData: [],
    serviceData: []
  })

  onBeforeMount(() => {
    getList()
  })

  async function getList () {
    const params = {
      url: '/outerapi/consoleconfig/selectHomePage',
    }
    const res = await fetch(params)
    if (res.returnModel) {
      const { hotProductList, hotServiceList, clientCaseList, scrollImgList, contactUsList } = res.returnModel.data
      state.description = scrollImgList.map(item => {
        return {
          title: item.titleName,
          words: item.introduceDesc,
          imgPath: `${imgPathPrefix}${item.imgPath}`
        }
      })

      state.productData = hotProductList.map(item => {
        return {
          label: item.titleName,
          name: item.name,
          introduceDesc: item.introduceDesc,
          imgPath: `${imgPathPrefix}${item.imgPath}`
        }
      })
      state.serviceData = hotServiceList.map(item => {
        return {
          label: item.titleName,
          name: item.name,
          introduceDesc: item.introduceDesc,
          imgPath: `${imgPathPrefix}${item.imgPath}`
        }
      })
      state.clientCaseImg = `${imgPathPrefix}${clientCaseList[0].imgPath}`
    }
  }

  function jumpToProduct(name) {
    router.push('/safetyProduct')
    user.setCurProduct(name)
  }

  function jumpToService(name) {
    router.push('/safeService')
    user.setCurService(name)
  }

  return {
    ...toRefs(state),
    jumpToProduct,
    jumpToService
  }
}