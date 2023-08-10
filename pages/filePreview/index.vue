<!--
 * @Author: YONG
 * @LastEditors: YONG
 * @Date: 2023-06-12 10:21:11
 * @LastEditTime: 2023-06-20 14:37:36
 * @Description:
-->
<template>
  <NuxtLayout name="custom">
    <div class="preview">
      <el-page-header @back="goBack"
                      :icon="ArrowLeft"
                      title="返回">
      </el-page-header>

      <div class="preview-wrapper">
        <div class="title">{{detailForm.titleName}}</div>
        <div class="tip-wrapper">
          <div>
            <span>发文机关：</span>
            <span>{{detailForm.issuedOrgan}}</span>
          </div>
          <div>
            <span>分类：</span>
            <span>{{detailForm.classification}}</span>
          </div>
          <div>
            <span>发文字号：</span>
            <span>{{detailForm.issuedNumber}}</span>
          </div>
          <div>
            <span>发布机构：</span>
            <span>{{detailForm.enterpriseBureau}}</span>
          </div>
        </div>
        <div v-html="decodeURIComponent(detailForm.content || '')"
             style="min-height:300px"></div>
        <div v-if="detailForm && detailForm.consoleDocumentFileList && detailForm.consoleDocumentFileList.length"
             class="file-wrapper mt-10">
          <div class="mb-10">附件</div>
          <!-- 附件列表 -->
          <a v-for="(item, index) in detailForm.consoleDocumentFileList"
             :key="index"
             :href="`${imgPathPrefix}${item.filePath}`"
             class="link">{{item.fileName}}</a>
        </div>

      </div>
      <el-affix position="bottom"
                :offset="20"
                style="text-align: right;">
        <el-button type="primary"
                   @click="goBack">返回</el-button>
      </el-affix>
    </div>
  </NuxtLayout>
</template>
<script setup>
import { useState } from './hooks'
const { detailForm, goBack } = useState()
import { imgPathPrefix } from '~/env.config.js'

</script>
<style lang="scss" scoped>
.preview {
  background-color: #fff;
  padding: 40px 30px;
  .preview-wrapper {
    max-width: 1000px;
    margin: 0 auto;
    .title {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      line-height: 60px;
      border-bottom: 1px dashed #979797;
      margin-bottom: 20px;
    }
    .tip-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      margin-bottom: 30px;
      div {
        margin: 0 15px;
      }
    }
  }
}
.file-wrapper {
  div {
    font-size: 13px;
  }
  .link {
    display: block;
    padding: 10px 0;
  }
}
</style>
