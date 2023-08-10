<template>
  <NuxtLayout name="custom">
    <div class="safetyProduct">
      <Banner :describes="description"></Banner>
      <div class="product-func"
           v-if="secondTypeList.includes(6)">
        <div class="title">产品功能</div>
        <div class="func-box">
          <div class="cards">
            <el-row :gutter="20">
              <el-col :span="8"
                      v-for="(item, index) in funcData"
                      :key="index">
                <div class="item">
                  <img :src="item.imgPath"
                       alt="">
                  <div class="funcName">{{ item.name }}</div>
                  <el-tooltip placement="bottom"
                              effect="light">
                    <template #content>
                      <div v-html="getDescContent(item.funcDesc)"></div>
                    </template>
                    <div class="funcDesc">{{ item.funcDesc }}</div>
                  </el-tooltip>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="product-feature"
           v-if="secondTypeList.includes(7)">
        <div class="title">产品特点</div>
        <div class="feature-box">
          <div class="cards">
            <el-row :gutter="20">
              <el-col :span="8"
                      v-for="(item, index) in featureList"
                      :key="index">
                <div class="item">
                  <div class="subTitle">{{ item.title }}</div>
                  <el-tooltip placement="bottom"
                              effect="light">
                    <template #content>
                      <div v-html="getDescContent(item.describe)"></div>
                    </template>
                    <div class="desc">{{ item.describe }}</div>
                  </el-tooltip>
                  <img :src="item.img"
                       alt="" />
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="application-scene"
           v-if="secondTypeList.includes(8)">
        <div class="title">应用场景</div>
        <el-tabs v-model="activeScene"
                 class="scene-tabs"
                 center>
          <el-tab-pane :label="item.label"
                       :name="item.name"
                       v-for="(item, index) in sceneList"
                       :key="index">
            <div style="text-align: center;">
              <div class="desc mb-8">{{ item.describe }}</div>
              <img :src="item.img" alt="" align="center" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="customer-case"
           v-if="secondTypeList.includes(2)">
        <div class="title">客户案例</div>
        <img :src="clientCaseImg"
             alt="" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { reactive, computed } from "vue"
import { useState } from './hooks'
const {
  description,
  funcData,
  featureList,
  sceneList,
  activeScene,
  secondTypeList,
  clientCaseImg
} = useState()

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
.safetyProduct {
  .title {
    text-align: center;
    font-size: 38px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #161b25;
    line-height: 57px;
    letter-spacing: 1.79px;
  }
  .product-func {
    padding: 100px 0 145px;
    .title {
      margin-bottom: 74px;
    }
    .func-box {
      width: 100%;
      display: flex;
      justify-content: center;
      .cards {
        max-width: 1240px;
        margin: 0 auto;
        .el-row {
          .el-col {
            :deep(.item) {
              width: 100%;
              height: 320px;
              margin-bottom: 20px;
              background: rgba(255, 255, 255, 0.8);
              box-shadow: 0px 2px 21px 1px rgba(2, 22, 60, 0.14);
              box-sizing: border-box;
              position: relative;
              display: flex;
              flex-direction: column;
              padding: 32px 22px 40px;
              &:hover {
                box-shadow: 0px 2px 18px 1px rgba(13, 124, 239, 0.56);
                .funcName {
                  color: #047fff;
                }
              }
              img {
                width: 60px;
                height: 60px;
              }
              .funcName {
                font-size: 20px;
                font-family: SourceHanSansCN, SourceHanSansCN-Medium;
                font-weight: bold;
                color: #14172e;
                text-align: left;
                word-break: break-all;
                margin-top: 24px;
                margin-bottom: 24px;
              }
              .funcDesc {
                font-size: 16px;
                font-family: SourceHanSansSC, SourceHanSansSC-Regular;
                font-weight: 400;
                text-align: justify;
                color: #666666;
                line-height: 28px;
                // padding: 0 28px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
                overflow: hidden;
                text-overflow: ellipsis;
                word-break: break-all;
              }
            }
          }
        }
      }
    }
  }
  .product-feature {
    padding: 78px 0 122px;
    background-color: #ecf5fe;
    // background: url("@/assets/images/product/feature-bg.png") no-repeat center;
    .title {
      margin-bottom: 74px;
    }
    .feature-box {
      width: 100%;
      display: flex;
      justify-content: center;
      .cards {
        max-width: 1240px;
        margin: 0 auto;
        :deep(.item) {
          width: 100%;
          height: 380px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0px 2px 21px 1px rgba(2, 22, 60, 0.14);
          padding: 50px 35px 150px;
          box-sizing: border-box;
          margin-bottom: 15px;
          position: relative;
          &:hover {
            background: #047fff;
            box-shadow: 0px 2px 21px 2px rgba(5, 81, 219, 0.42);
            .subTitle,
            .desc {
              color: #fff;
            }
          }
          .subTitle {
            font-size: 20px;
            font-family: SourceHanSansSC, SourceHanSansSC-Regular;
            font-weight: bold;
            text-align: center;
            color: #14172e;
            line-height: 40px;
            margin-bottom: 12px;
          }
          .desc {
            font-size: 16px;
            font-family: SourceHanSansCN, SourceHanSansCN-Normal;
            font-weight: normal;
            text-align: left;
            color: #666666;
            line-height: 28px;
            letter-spacing: 0.4px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            word-break: break-all;
          }
          img {
            width: 130px;
            position: absolute;
            right: 15px;
            bottom: 15px;
          }
        }
      }
    }
  }
  .application-scene {
    padding: 144px 340px 50px;
    .title {
      margin-bottom: 55px;
    }
    .scene-tabs {
      :deep(.el-tabs__header) {
        .el-tabs__nav {
          justify-content: center;
          float: none;
          .el-tabs__item {
            padding: 0 48px;
            font-size: 20px;
            font-family: SourceHanSansCN, SourceHanSansCN-Medium;
            font-weight: bold;
            text-align: left;
            line-height: 30px;
            color: #999999;
            &.is-active {
              color: #047fff;
            }
          }
          .el-tabs__active-bar {
            background: #1286ff;
          }
        }
      }
      .desc {
        text-align: center;
        margin-top: 20px;
        font-size: 16px;
        font-family: SourceHanSansCN, SourceHanSansCN-Regular;
        font-weight: 400;
        color: #666666;
        line-height: 28px;
      }
      img {
        width: 1000px;
        height: 400px;
        margin: 0 auto;
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