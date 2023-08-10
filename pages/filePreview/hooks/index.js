/*
 * @Author: YONG
 * @LastEditors: YONG
 * @Date: 2023-06-13 21:59:42
 * @LastEditTime: 2023-06-14 09:53:57
 * @Description:
 */
import { reactive, onBeforeMount, toRefs } from 'vue'
import { useRoute, useRouter  } from 'vue-router'

export function useState () {
  const route = useRoute()
  const router = useRouter()
  const state = reactive({
    detailForm:{}
  })

  onBeforeMount(() => {
    const id = route.query.id
    getDetail(id)
  })

  function goBack () {
    router.go(-1)
  }

  async function getDetail (id) {
    const params = {
      url: `/outerapi/consoledocumentconfig/selectConsoleDocumentConfigs`,
      body: {
        id
      }
    }
    const res = await fetch(params)
    if (res.isNormal) {
      const { rows } = res.returnModel.data
      state.detailForm = rows.find(ele => ele.id == id)
    }
  }

  return {
    ...toRefs(state),
    goBack
  }
}
