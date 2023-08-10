/*
 * @Author: YONG
 * @LastEditors: YONG
 * @Date: 2023-06-13 16:34:17
 * @LastEditTime: 2023-06-15 18:44:27
 * @Description:
 */
import { reactive, onBeforeMount, toRefs, watch } from 'vue'
import { useUserStore } from '~/stores/user'
import { imgPathPrefix } from '~/env.config.js'

export function useState() {
  const user = useUserStore()
  const state = reactive({
    description: [],
    funcData: [],
    featureList: [],
    sceneList: [],
    activeScene:'',
    secondTypeList: [],
    clientCaseImg: '',
    curProduct: ''
  })

  watch(
    () => user.curProduct,
    (nVal, oVal) => {
      state.curProduct = nVal
      getList()
    },
    {
      immediate: true,
      deep: true,
    }
  )

  onBeforeMount(() => {
    getList()
  })

  async function getList () {
    const params = {
      url: '/outerapi/consoleconfig/selectProduct',
      body: {
        name: state.curProduct
      },
    }
    const res = await fetch(params)
    if (res.isNormal === true) {
      const data = res.returnModel.data
      state.secondTypeList = data.secondTypeList
      //banner图
      state.description = data.productBannerList.map(item => {
        return {
          title: item.titleName,
          words: item.introduceDesc,
          imgPath: `${imgPathPrefix}${item.imgPath}`
        }
      })

      if (state.secondTypeList.includes(6)) {
        //产品功能
        state.funcData = data.productFunctionList.map(item => {
          return {
            imgPath: `${imgPathPrefix}${item.imgPath}`,
            name: item.titleName,
            funcDesc: item.introduceDesc
          }
        })
      }
      if (state.secondTypeList.includes(7)) {
        //产品特点
        state.featureList = data.productFeatureList.map(item => {
          return {
            title: item.titleName,
            describe: item.introduceDesc,
            img: `${imgPathPrefix}${item.imgPath}`
          }
        })
      }
      if (state.secondTypeList.includes(8)) {
        //应用场景
        state.sceneList = data.applyList.map(item => {
          return {
            label: item.titleName,
            name: item.titleName,
            describe: item.introduceDesc,
            img: `${imgPathPrefix}${item.imgPath}`
          }
        })
        state.activeScene = state.sceneList[0].name
      }
      if (state.secondTypeList.includes(2)) {
        //客户案例
        state.clientCaseImg = `${imgPathPrefix}${data.clientCaseList[0] .imgPath}`
      }
    }
  }

  return {
    ...toRefs(state),
  }
}