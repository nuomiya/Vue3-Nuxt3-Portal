<!--
 * @Author: YONG
 * @LastEditors: YONG
 * @Date: 2023-05-25 15:51:40
 * @LastEditTime: 2023-06-25 13:43:41
 * @Description:
-->
<template>
  <NuxtLayout name="custom">
    <div class="safe-service">
      <Banner :describes="description"></Banner>
      <div class="service-advantage"
           v-if="secondTypeList.includes(9)">
        <div class="title">服务优势</div>
        <div class="advantage-box">
          <div class="cards">
            <div class="item"
                 v-for="(item, index) in serviceAdvantageList"
                 :key="index">
              <img :src="item.imgPath"
                   alt="">
              <div class="serviceName">{{ item.name }}</div>
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
      <div class="core-competence"
           v-if="secondTypeList.includes(10)">
        <div class="title">核心能力</div>
        <div class="core-box">
          <div class="cards">
            <div class="item"
                 v-for="(item, index) in mainAbilityList"
                 :key="index">
              <img :src="item.imgPath"
                   alt="">
              <div class="serviceName">{{ item.name }}</div>
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
    </div>
  </NuxtLayout>
</template>

<script setup>
import { reactive, computed } from "vue"
import { useState } from './hooks'

const { description, serviceAdvantageList, mainAbilityList, secondTypeList } = useState()

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
.safe-service {
  .title {
    margin: 0 0 80px;
    text-align: center;
    font-size: 38px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #161b25;
    line-height: 57px;
    letter-spacing: 1.79px;
  }
  .service-advantage {
    padding: 100px 0 110px;
    .advantage-box {
      display: flex;
      justify-content: center;
      .cards {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        max-width: 1240px;
        margin: 0 auto;
        .item {
          width: 31%;
          height: 500px;
          margin: 0 10px;
          padding: 32px 20px;
          margin-bottom: 20px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0px 2px 21px 1px rgba(2, 22, 60, 0.14);
          padding-bottom: 50px;
          box-sizing: border-box;
          position: relative;
          display: flex;
          flex-direction: column;
          &:hover {
            box-shadow: 0px 2px 24px 1px rgba(0, 117, 238, 0.44);
            .serviceName {
              color: #047fff;
            }
          }
          .serviceName {
            font-size: 20px;
            font-family: SourceHanSansCN, SourceHanSansCN-Medium;
            font-weight: bold;
            color: #14172e;
            line-height: 40px;
            padding: 30px 0 10px;
            text-align: center;
            word-break: break-all;
          }
          .serviceDesc {
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
            word-break: break-all;
          }
          img {
            height: 180px;
            margin: 0 auto;
          }
        }
      }
    }
  }
  .core-competence {
    background: #f2f5fa;
    padding: 80px 0 120px;
    .core-box {
      width: 100%;
      display: flex;
      justify-content: center;
      .cards {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        max-width: 1240px;
        margin: 0 auto;
        .item {
          width: 31%;
          height: 460px;
          margin: 0 10px;
          padding: 0 20px 32px;
          margin-bottom: 20px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0px 2px 21px 1px rgba(2, 22, 60, 0.14);
          padding-bottom: 50px;
          box-sizing: border-box;
          position: relative;
          display: flex;
          flex-direction: column;
          &:hover {
            box-shadow: 0px 2px 18px 1px rgba(13, 124, 239, 0.56);
            .serviceName {
              color: #047fff;
            }
          }
          .serviceName {
            font-size: 20px;
            font-family: SourceHanSansCN, SourceHanSansCN-Medium;
            font-weight: bold;
            color: #14172e;
            line-height: 40px;
            padding: 30px 0 10px;
            text-align: center;
            word-break: break-all;
          }
          .serviceDesc {
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
            word-break: break-all;
          }
          img {
            width: 160px;
            height: 160px;
            margin: 40px auto 0;
          }
        }
      }
    }
  }
}
</style>