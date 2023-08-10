<!--
 * @Author: YONG
 * @LastEditors: YONG
 * @Date: 2023-06-13 14:50:10
 * @LastEditTime: 2023-06-15 16:03:54
 * @Description:
-->
<template>
  <el-carousel :interval="5000" :arrow="describes && describes.length > 1 ? 'always':'never'" class="carousel">
    <el-carousel-item v-for="(describe, index) in describes" :key="index">
      <div v-if="describe" class="banner" :style="{ background: `url(${describe.imgPath}) no-repeat center/100% 100%` }">
        <div class="banner-desc">
          <div class="title">{{ describe.title }}</div>
          <p class="words">{{ describe.words }}</p>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
const props = defineProps({
  describes: {
    type: Array,
    default: () => []
  },
});
</script>

<style lang="scss" scoped>
.carousel {
  height: 560px;
}
:deep(.el-carousel__container) {
  height: 100%;
}

.banner {
  height: 560px;
  width: 100%;
  background-size: 100% 100% !important;
  position: relative;
  .banner-desc {
    position: absolute;
    left: 16%;
    top: 38%;
    .title {
      font-size: 48px;
      font-family: SourceHanSansSC, SourceHanSansSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #272d39;
    }
    .words {
      font-size: 16px;
      font-family: SourceHanSansCN, SourceHanSansCN-Normal;
      font-weight: normal;
      text-align: left;
      color: #272d39;
      line-height: 28px;
      width: 530px;
      word-break: break-all;
    }
  }
}
</style>
