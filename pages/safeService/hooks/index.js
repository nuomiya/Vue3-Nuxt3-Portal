/*
 * @Author: YONG
 * @LastEditors: YONG
 * @Date: 2023-06-13 16:34:17
 * @LastEditTime: 2023-06-14 09:25:44
 * @Description:
 */
import { reactive, onBeforeMount, watch, toRefs } from 'vue'
import { useUserStore } from '~/stores/user'
import { imgPathPrefix } from '~/env.config.js'

export function useState() {
  const user = useUserStore()
  const state = reactive({
    description: {
      title: "",
      words: "",
      imageURL: null,
    },
    mainAbilityList: [], // 核心能力
    serviceAdvantageList: [], // 服务优势
    secondTypeList: [],
    curService: ''
  })

  watch(
    () => user.curService,
    (nVal, oVal) => {
      state.curService = nVal
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
      url: '/outerapi/consoleconfig/selectService',
      body: {
        name: state.curService
      },
    }
    const res = await fetch(params)
    if (res.isNormal === true) {
      const data = res.returnModel.data
      state.secondTypeList = data.secondTypeList
      //banner图
      state.description = data.serviceBannerList.map(item => {
        return {
          title: item.titleName,
          words: item.introduceDesc,
          imgPath: `${imgPathPrefix}${item.imgPath}`
        }
      })

      if (state.secondTypeList.includes(9)) {
        //服务优势
        state.serviceAdvantageList  = data.serviceAdvantageList.map(item => {
          return {
            imgPath: `${imgPathPrefix}${item.imgPath}`,
            name: item.titleName,
            introduceDesc: item.introduceDesc
          }
        })
      }
      if (state.secondTypeList.includes(10)) {
        //核心能力
        state.mainAbilityList = data.mainAbilityList.map(item => {
          return {
            imgPath: `${imgPathPrefix}${item.imgPath}`,
            name: item.titleName,
            introduceDesc: item.introduceDesc
          }
        })
      }
    }
  }

  return {
    ...toRefs(state),
  }
}
