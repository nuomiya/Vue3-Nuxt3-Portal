<template>
  <div class="layout"
       ref="layout">
    <header>
      <div class="main header-content">
        <div class="left-cont">
          <div class="logo"
               @click="router.push('/')">
            <img class="logo-img"
                 src="/images/logo.png"
                 alt="工业互联网安全公共服务平台" />
            <div class="logo-text">工业互联网安全公共服务平台</div>
          </div>
          <el-menu :default-active="activeIndex"
                   class="menu-container"
                   mode="horizontal"
                   @select="handleSelect">
            <el-menu-item class="menu-item"
                          index="index"
                          :class="{ active: activeIndex === 'index' }"> 首页 </el-menu-item>
            <el-menu-item class="menu-item"
                          index="safetyProduct"
                          :class="{ active: activeIndex === 'safetyProduct' }">
              <el-popover placement="bottom"
                          width="220"
                          trigger="hover"
                          popper-class="menus-popover">
                <template #reference>
                  <span class="menu-title">
                    安全产品
                  </span>
                </template>
                <ul class="menu-popover-list">
                  <li v-for="(product, index) in productDropdown"
                      :key="product"
                      @click="changeProduct(product)"
                      :class="['popover-list-item', { active: curProduct === product }]">
                    <img :src="`/images/product_${index+1}.png`" />
                    <span>
                      {{ product }}
                    </span>
                  </li>
                </ul>
              </el-popover>
            </el-menu-item>
            <el-menu-item class="menu-item"
                          index="safeService"
                          :class="{ active: activeIndex === 'safeService' }">
              <el-popover placement="bottom"
                          width="220"
                          trigger="hover"
                          popper-class="menus-popover">
                <template #reference>
                  <span class="menu-title">
                    安全服务
                  </span>
                </template>
                <ul class="menu-popover-list">
                  <li v-for="(service, index) in serviceDropdown"
                      :key="service"
                      @click="changeService(service)"
                      :class="['popover-list-item', { active: curService === service }]">
                    <img :src="`/images/server_${index+1}.png`" />
                    <span>
                      {{ service }}
                    </span>
                  </li>
                </ul>
              </el-popover>
            </el-menu-item>
            <el-menu-item class="menu-item"
                          index="policyDoc"
                          :class="{ active: activeIndex === 'policyDoc' }"> 政策文件 </el-menu-item>
          </el-menu>
        </div>
        <div class="operate-btns">
          <!-- <div class="console" @click="jumpConsole">
            <img class="logo-img" src="@/assets/images/layout/kongzhitai.png" alt="控制台" />
            控制台
          </div> -->
          <div class="entrance"
               @click="jumpEntrance">
            登录入口
            <img class="logo-img"
                 src="@/assets/images/layout/arrow.png"
                 alt="登录入口" />
          </div>
        </div>
      </div>
    </header>
    <div class="main-container" ref="mainContianer">
      <el-config-provider :locale="zhCn">
        <slot />
      </el-config-provider>
    </div>
    <footer>
      <div class="box">
        <div class="classify" v-for="(item, index) in classifyList" :key="index">
          <div v-if="item.visible">
            <div class="title">{{ item.title }}</div>
            <ul>
              <li v-for="(_item, _index) in item.list"
                  :key="_index">
                <span v-if="item.jumpTo == 'product'"
                      class="cur-click"
                      @click="jumpToProduct(_item)">{{ _item }}</span>
                <span v-else-if="item.jumpTo == 'service'"
                      class="cur-click"
                      @click="jumpToService(_item)">{{ _item }}</span>
                <span v-else>{{ _item }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="classify" v-if="classifyList[2].visible">
          <div class="title">官方微信</div>
          <img :src="weChatImg" />
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useScroll } from '@vueuse/core'
import { useUserStore } from '~/stores/user'
import { imgPathPrefix } from '~/env.config.js'
import zhCn from "element-plus/es/locale/lang/zh-cn"
const user = useUserStore()
const router = useRouter()
const route = useRoute()

const activeIndex = ref('index')
const classifyList = ref([
  {
    title: '热门产品',
    jumpTo: 'product',
    list: ['工业互联网安全监测与态势感知平台', 'IDCISP信息安全数据核验系统', '备案信息管理系统', '互联网资源云平台', '互联网诈骗防范与拦截系统'],
    visible: true,
  },
  {
    title: '热门服务',
    jumpTo: 'service',
    list: ['工业互联网安全监测与态势感知平台', 'IDCISP信息安全数据核验系统', '备案信息管理系统', '互联网资源云平台', '互联网诈骗防范与拦截系统'],
    visible: true,
  },
  {
    title: '联系我们',
    jumpTo: '',
    list: ['咨询热线: ', '联系邮箱: '],
    visible: true,
  },
])
const layout = ref(null)
const { x, y } = useScroll(layout)
const isScrolled = ref(false)
const productDropdown = ref([])
const curProduct = ref(user.curProduct)
const serviceDropdown = ref([])
const curService = ref(null)
const weChatImg = ref(null)


function getImg () {
  return `/images/server_0${getRandomInt(1, 8)}.png`
}

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min // 不含最大值，含最小值
}

watch(
  () => y.value,
  (newVal) => {
    if (newVal > 56) {
      isScrolled.value = true
    } else {
      isScrolled.value = false
    }
  }
)
watch(
  () => route.name,
  (nVal, oVal) => {
    activeIndex.value = nVal
  },
  {
    immediate: true,
    deep: true,
  }
)

function handleSelect (index) {
  const route = {
    index: '/',
    safetyProduct: '/safetyProduct',
    safeService: '/safeService',
    policyDoc: '/policyDoc',
    filePreview: '/filePreview',
  }
  router.push(route[index])
}

// 进入管理系统
function jumpEntrance () {
  window.open('/biz/', "_blank")
}

async function getDropdownData () {
  const params = {
    url: '/outerapi/consoleconfig/selectDropdownData',
    body: {
      name: ''
    },
  }
  const res = await fetch(params)
  if (res.returnModel) {
    productDropdown.value = res.returnModel.data.productDropdownList.map(item => item.name)
    serviceDropdown.value = res.returnModel.data.serviceDropdownList.map(item => item.name)
    if (user.curProduct) {
      user.setCurProduct(user.curProduct)
      curProduct.value = user.curProduct
    } else {
      user.setCurProduct(productDropdown.value[0])
      curProduct.value = productDropdown.value[0]
    }
    if (user.curService) {
      user.setCurService(user.curService)
      curService.value = user.curService
    } else {
      user.setCurService(serviceDropdown.value[0])
      curService.value = serviceDropdown.value[0]
    }
  }
}

function changeProduct (product) {
  router.push('/safetyProduct')
  curProduct.value = product
  user.setCurProduct(curProduct.value)
}

function changeService (service) {
  router.push('/safeService')
  curService.value = service
  user.setCurService(curService.value)
}

function jumpToProduct (name) {
  router.push('/safetyProduct')
  user.setCurProduct(name)
}

function jumpToService (name) {
  router.push('/safeService')
  user.setCurService(name)
}

async function getBottomData () {
  const params = {
    url: '/outerapi/consoleconfig/selectBottomData',
    body: {},
  }
  const res = await fetch(params)
  if (res.isNormal === true) {
    const data = res.returnModel.data
    classifyList.value[0].list = data.productRecommendList.map(item => item.name)
    classifyList.value[1].list = data.serviceRecommendList.map(item => item.name)
    if (data.contactUsList.length > 0) {
      const contactUsList = [`咨询热线：${data.contactUsList[0].titleName}`, `联系邮箱：${data.contactUsList[0].introduceDesc}`]
      classifyList.value[2].list = contactUsList
    } else {
      classifyList.value[2].visible = false
    }
    weChatImg.value = `${imgPathPrefix}${data.contactUsList[0].imgPath}`
  }
}

onBeforeMount(() => {
  getDropdownData()
  getBottomData()
})

</script>
<style lang="scss" scoped>
.layout {
  position: relative;
  height: 100vh;
  overflow-y: scroll;
  header {
    position: fixed;
    height: 56px;
    width: 100%;
    z-index: 999;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    &.scrolled {
      background: #161a27;
    }
    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left-cont {
        display: flex;
        align-items: center;
        width: calc(100% - 250px);
        .logo {
          height: 100%;
          margin-right: 80px;
          margin-left: 10px;
          display: flex;
          align-items: center;
          cursor: pointer;
          &-img {
            width: 44px;
            height: 49px;
            margin-right: 10px;
          }
          &-text {
            height: 37px;
            font-size: 24px;
            font-family: PingFangSC, PingFangSC-Semibold;
            font-weight: 600;
            text-align: left;
            color: #000;
            line-height: 37px;
            text-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.27);
          }
        }
        .menu-container {
          width: calc(100% - 520px);
          height: 100%;
          border-bottom: none;
          background-color: transparent;
          .menu-item {
            height: 100%;
            line-height: 56px;
            font-size: 16px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 500;
            color: #000;
            border-bottom: 0;
            &.active {
              color: #146aff !important;
              border-bottom: none;
              position: relative;
              &::after {
                background: #146aff;
                width: 16px;
                height: 3px;
                position: absolute;
                content: "";
                left: 50%;
                transform: translateX(-50%);
                bottom: 6px;
              }
            }
            &:hover,
            &:focus {
              color: #146aff !important;
              border-bottom: none;
              position: relative;
              background-color: transparent;
            }
          }
        }
      }
      .operate-btns {
        height: 100%;
        width: 128px;
        display: flex;
        align-items: center;
        .console {
          cursor: pointer;
          margin-right: 8px;
          width: 96px;
          height: 30px;
          box-sizing: border-box;
          border: 2px solid #047fff;
          border-radius: 4px;
          box-shadow: 0px 2px 1px 0px rgba(56, 132, 208, 0);
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          color: #047fff;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 14px;
            height: 12px;
            margin-right: 10px;
          }
        }
        .entrance {
          cursor: pointer;
          width: 112px;
          height: 30px;
          background: #047fff;
          border-radius: 4px;
          box-shadow: 0px 2px 1px 0px rgba(56, 132, 208, 0);
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 16px;
            height: 16px;
            margin-left: 10px;
          }
        }
      }
    }
  }
  .main-container {
    margin-top: 56px;
  }
  footer {
    width: 100%;
    height: 296px;
    background: #161a27;
    .box {
      display: flex;
      justify-content: space-between;
      max-width: 1240px;
      margin: 0 auto;
      .classify {
        color: #ffffff;
        .title {
          margin-top: 56px;
          font-size: 18px;
          font-family: SourceHanSansCN, SourceHanSansCN-Medium;
          font-weight: 500;
          text-align: left;
          color: #ffffff;
          line-height: 27px;
          letter-spacing: 2.25px;
        }
        ul {
          list-style: none;
          padding: 0;
          li {
            font-size: 12px;
            font-family: SourceHanSansCN, SourceHanSansCN-Normal;
            font-weight: normal;
            text-align: left;
            color: #ffffff;
            line-height: 30px;
            letter-spacing: 1px;
            .cur-click {
              cursor: pointer;
            }
          }
        }
        img {
          width: 128px;
          height: 128px;
        }
      }
    }
  }
}
</style>
