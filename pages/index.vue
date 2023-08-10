<template>
  <NuxtLayout name="custom">
    <div class="page-home">
      <Banner :describes="description"></Banner>
      <div class="hot-product">
        <div class="title">热门产品</div>
        <div class="cards">
          <div class="card">
            <div class="item"
                 v-for="(item, index) in productData"
                 :key="index">
              <img :src="item.imgPath"
                   alt="">
              <div class="productName"
                   @click="jumpToProduct(item.name)">{{ item.name }}</div>
              <el-tooltip placement="bottom"
                          effect="light">
                <template #content>
                  <div v-html="getDescContent(item.introduceDesc)"></div>
                </template>
                <div class="productDesc">{{ item.introduceDesc }}</div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="hot-service">
        <div class="title">热门服务</div>
        <div class="cards">
          <div class="card">
            <div class="item"
                 v-for="(item, index) in serviceData"
                 :key="index">
              <div class="top">
                <img :src="item.imgPath"
                     alt="">
                <div class="serviceName"
                     @click="jumpToService(item.name)">{{ item.name }}</div>
              </div>
              <el-tooltip placement="bottom"
                          effect="light">
                <template #content>
                  <div v-html="getDescContent(item.introduceDesc)"></div>
                </template>
                <div class="serviceDesc">{{ item.introduceDesc }}</div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div v-if="clientCaseImg"
           class="customer-case">
        <div class="title">客户案例</div>
        <img :src="clientCaseImg" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { reactive, computed } from "vue"
import { useState } from './hooks'
const { description, productData, serviceData, clientCaseImg, jumpToProduct, jumpToService } = useState()

definePageMeta({
  layout: "custom",
})

const getDescContent = computed(() => {
  return (content) => {
    let newStr = ''
    for (let i = 0; i < content.length; i++) {
      newStr += content[i]
      if ((i + 1) % 30 === 0) {
        newStr += '<br />'
      }
    }
    return newStr
  }
})
</script>
<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 38px;
  font-family: SourceHanSansCN, SourceHanSansCN-Medium;
  font-weight: 500;
  color: #161b25;
  line-height: 57px;
  letter-spacing: 1.79px;
}
.page-home {
  .hot-product {
    margin-bottom: 88px;
    .title {
      margin: 100px 0 22px;
    }
    .desc {
      font-size: 22px;
      font-family: SourceHanSansCN, SourceHanSansCN-Regular;
      font-weight: 400;
      text-align: center;
      color: #989898;
      line-height: 32px;
      letter-spacing: 3.14px;
      margin-bottom: 62px;
    }
    .cards {
      display: flex;
      justify-content: center;
      .card {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        max-width: 1240px;
        margin: 0 auto;
        .item {
          width: 31%;
          height: 480px;
          margin-right: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 32px 20px;
          box-sizing: border-box;
          &:hover {
            border: 1px solid #98caff;
            border-radius: 5px;
            box-shadow: 0px 2px 14px 1px rgba(20, 106, 255, 0.28);
          }
          img {
            width: 192px;
            height: 155px;
          }
          .productName {
            font-size: 20px;
            font-family: SourceHanSansCN, SourceHanSansCN-Medium;
            font-weight: bold;
            color: #14172e;
            line-height: 40px;
            margin: 50px 0 30px;
            cursor: pointer;
          }
          .productDesc {
            font-size: 16px;
            font-family: SourceHanSansSC, SourceHanSansSC-Regular;
            font-weight: 400;
            text-align: justify;
            color: #666666;
            line-height: 28px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .hot-service {
    background: #f2f5fa;
    padding: 100px 0 140px;
    .title {
      margin-bottom: 22px;
    }
    .desc {
      font-size: 22px;
      font-family: SourceHanSansCN, SourceHanSansCN-Regular;
      font-weight: 400;
      text-align: center;
      color: #989898;
      line-height: 32px;
      letter-spacing: 3.14px;
      margin-bottom: 62px;
    }
    .cards {
      display: flex;
      justify-content: center;
      .card {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        max-width: 1240px;
        margin: 0 auto;
        .item {
          width: 31%;
          height: 300px;
          background: #ffffff;
          border: 1px solid #dddddd;
          border-radius: 3px;
          padding: 32px 22px 40px;
          box-sizing: border-box;
          margin-right: 15px;
          margin-bottom: 15px;
          &:hover {
            border: 1px solid #047fff;
            box-shadow: 0px 2px 14px 1px rgba(20, 106, 255, 0.28);
            .serviceName {
              color: #047fff;
            }
            .serviceDesc {
              color: #047fff;
            }
          }
          .top {
            display: flex;
            margin-bottom: 15px;
          }
          img {
            width: 48px;
            height: 48px;
            margin-right: 10px;
          }
          .serviceName {
            font-size: 20px;
            font-family: SourceHanSansSC, SourceHanSansSC-Regular;
            font-weight: bold;
            line-height: 40px;
            text-align: left;
            color: #14172e;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .serviceDesc {
            font-size: 16px;
            font-family: SourceHanSansCN, SourceHanSansCN-Normal;
            font-weight: normal;
            text-align: left;
            color: #666666;
            line-height: 28px;
            letter-spacing: 0.4px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .customer-case {
    padding: 100px 0 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      margin-bottom: 22px;
    }
    img {
      max-width: 1240px;
      margin: 0 auto;
    }
  }
}
</style>
