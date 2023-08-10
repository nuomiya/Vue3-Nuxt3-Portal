/*
 * @Author: YONG
 * @LastEditors: YONG
 * @Date: 2023-06-11 14:18:07
 * @LastEditTime: 2023-06-20 09:12:35
 * @Description:
 */
import { reactive, onBeforeMount, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export function useState () {
  const router = useRouter()
  const state = reactive({
    seachData: {
      issueStatus: 1,
      searchAll:'',
      issuedOrganList: [], //发布机构
      classificationList: [], //主题分类
      issueTimeStart: "",
      issueTimeEnd: "", // 2023-04-03 00:00:00
    },
    optList: [
      {
        name: '发布机构',
        img: '@/assets/images/policy/img1.png',
        list: [],
        ref: 'ref1',
        more: false,
        showMore: true,
      },
      { name: '主题分类', img: '@/assets/images/policy/img2.png', list: [], ref: 'ref2', more: false, showMore: true },
      { name: '发布时间', img: '@/assets/images/policy/img3.png', list: ['近一天', '近一周', '近一个月', '近一年'], ref: 'ref3', more: false, showMore: false },
    ],
    tableData: [],
    total: 0,
    baseEntity: {
      current: 1,
      pageSize: 10,
    }
  })

  onBeforeMount(() => {
    getList()
    getSelectDropdownList()
  })

  function handlePreview (row) {
    router.push({
      path: '/filePreview',
      params: {'a': 1},
      query: {
        id: row.id
      }
    })
  }

  function handleSearch () {
    getList()
  }

  function handleSelected2 (item) {
    state.optList[2].list.forEach(element => {
      if (element.name != item.name) {
        element.selected = false
      } else {
        element.selected = true
      }
    })
    handleSearch()
  }

  function handleCurrentChange (val) {
    state.baseEntity.current = val
    getList()
  }

  async function getList () {
    const issuedOrganList = state.optList[0].list.filter(ele => ele.selected).map(ele => ele.name)
    const classificationList = state.optList[1].list.filter(ele => ele.selected).map(ele => ele.name)
    const timeType = state.optList[2].list.filter(ele => ele.selected).map(ele => ele.name)

    let now = new Date()
    let oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    let sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    let oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    let oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)

    let issueTimeEnd = now
    let issueTimeStart = ''
    let dateType = ''

    switch (timeType[0]) {
      case '近一天':
        issueTimeStart = oneDayAgo
        dateType = 'day'
        break;
        case '近一周':
          issueTimeStart = sevenDaysAgo
          dateType = 'week'
        break;
      case '近一个月':
          issueTimeStart = oneMonthAgo
          dateType = 'month'
        break;
      case '近一年':
          issueTimeStart = oneYearAgo
          dateType = 'year'
          break;
      default:
        break;
    }

    if (issueTimeStart) {
      issueTimeStart = formartData(issueTimeStart)
      issueTimeEnd = formartData(issueTimeEnd)
    } else {
      issueTimeEnd = ''
    }

    state.seachData = {
      ...state.seachData,
      issuedOrganList,
      classificationList,
      issueTimeStart,
      issueTimeEnd,
      dateType
    }

    const params = {
      url: '/outerapi/consoledocumentconfig/selectConsoleDocumentConfigs',
      body: {
        ...state.seachData,
        baseEntity: {
          current: state.baseEntity.current,
          pageSize: state.baseEntity.pageSize,
        },
      },
    }
    const res = await fetch(params)
    if (res.isNormal) {
      const { rows, count } = res.returnModel.data
      state.tableData = rows
      state.total = count
    }
  }

  // 去除富文本中的图片和表格、包裹标签字符和多余的空格
  function clearRichText(texts) {
    let text1 = texts.replace(/<\/?(img|table)[^>]*>/g,"");//去除图片、表格
    let text2 = text1.replace(/<\/?.+?>/g,"");//去除标签包裹
    let text3 = text2.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
    let text4 = text3.replace(/ /g,"");//去除空格
    return text4;
  }

  function formartData (date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
    console.log(formattedDate)
    return formattedDate
  }

  // 政策文件发布机构主题分类筛选集合
  async function getSelectDropdownList () {
    const params = {
      url: '/outerapi/consoledocumentconfig/selectDropdownList',
    }
    const res = await fetch(params)
    if (res.returnModel) {
      const { classList, organList } = res.returnModel.data
      state.optList[0].list = organList.map(ele => {
        return {
          name: ele,
          selected: false
        }
      })
      state.optList[1].list = classList.map(ele => {
        return {
          name: ele,
          selected: false
        }
      })
      state.optList[2].list = state.optList[2].list.map(ele => {
        return {
          name: ele,
          selected: false
        }
      })
    }
  }

  return {
    ...toRefs(state),
    handleSearch,
    handleSelected2,
    handleCurrentChange,
    clearRichText,
    handlePreview
  }
}
