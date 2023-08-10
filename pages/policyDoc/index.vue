<template>
  <NuxtLayout name="custom">
    <div class="policyDoc">
      <div class="banner">
        <div class="wrap">
          <div class="title">政策咨询信息</div>
          <div class="search-item">
            <el-input v-model="seachData.searchAll"
                      class="w-50 m-2"
                      size="large"
                      placeholder="请输入搜索内容"
                      :prefix-icon="Search"
                      @keyup.enter.native="handleSearch">
              <template #append>
                <el-button @click="handleSearch">搜索</el-button>
              </template>
            </el-input>
          </div>
        </div>
      </div>

      <div class="table">
        <div class="box-list">
          <div v-for="(item, index) in optList.slice(0,2)"
               :key="index"
               class="box-card">
            <div class="box">
              <div class="img-wrap">
                <img src="@/assets/images/policy/img1.png"
                     alt="" />
              </div>
              <div class="name text-item">{{ `${item.name}:` }}</div>
              <div v-if="!item.more"
                   class="list">
                <div v-for="(x, i) in item.list"
                     :key="i"
                     class="list-item"
                     :class="{'item-selected' : x.selected}"
                     @click="handleSelected(x)">
                  <el-tooltip :disabled="x.name.length <= 10"
                              placement="top"
                              effect="light">
                    <template #content>{{ x.name }}</template>
                    {{ x.name.length > 10 ? `${x.name.slice(0, 10)}...` : x.name }}
                  </el-tooltip>
                </div>
              </div>
              <div v-if="item.more"
                   class="list flex-wrap">
                <div v-for="(x, i) in item.list"
                     :key="i"
                     class="list-item"
                     :class="{'item-selected' : x.selected}"
                     @click="handleSelected(x)">
                  <el-tooltip :disabled="x.name.length < 10"
                              placement="top"
                              effect="light">
                    <template #content>{{ x.name }}</template>
                    {{ x.name.length > 10 ? `${x.name.slice(0, 10)}...` : x.name }}
                  </el-tooltip>
                </div>
              </div>
              <div v-if="item.showMore"
                   class="more text-item"
                   @click="handleMore(item)">更多
                <DArrowRight style="width: 1em; height: 1em; vertical-align: middle; margin-right: 8px" />
              </div>
            </div>
          </div>
        </div>

        <div class="box-list">
          <div v-for="(item, index) in optList.slice(2,3)"
               :key="index"
               class="box-card">
            <div class="box">
              <div class="img-wrap">
                <img src="@/assets/images/policy/img1.png"
                     alt="" />
              </div>
              <div class="name text-item">{{ `${item.name}:` }}</div>
              <div class="list">
                <div v-for="(x, i) in item.list"
                     :key="i"
                     class="list-item"
                     :class="{'item-selected' : x.selected}"
                     @click="handleSelected2(x)">
                  <el-tooltip :disabled="true"
                              placement="top"
                              effect="light">
                    <template #content>{{ x.name }}</template>
                    {{ x.name }}
                  </el-tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

        <el-table :data="tableData">
          <el-table-column prop=""
                           label="">
            <template #default="{row}">
              <div class="title" @click="handlePreview(row)">
                <span>{{ row.titleName }}</span>
                <i class="new"></i>
              </div>
              <div @click="handlePreview(row)"
                   class="content"
                   v-html="clearRichText(decodeURIComponent(row.content))"></div>
              <div class="issueTime">
                <el-tag size="large">发布时间: {{ row.issueTime || row.updateTime }}</el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination"
                       small
                       background
                       layout="total, prev, pager, next"
                       :total="total"
                       @current-change="handleCurrentChange" />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { Search, DArrowRight } from '@element-plus/icons-vue'
import { useState } from './hooks'

const { seachData, handleCurrentChange, optList, tableData, total, handleSearch, handleSelected2, clearRichText, handlePreview } = useState()

definePageMeta({
  layout: 'custom',
})

function handleMore (item) {
  item.more = !item.more
}

function handleSelected (item) {
  item.selected = !item.selected
  handleSearch()
}

</script>
<style lang="scss" scoped>
.list-item {
  cursor: pointer;
}
.item-selected {
  color: #047fff;
}
.policyDoc {
  :deep(.el-input-group__append) {
    color: #fff;
    background: #047fff;
  }
  :deep(.el-input__inner) {
    height: 50px;
  }
  :deep(.el-input-group__append) {
    width: 50px;
  }
  .banner {
    position: relative;
    height: 560px;
    width: 100%;
    background: url("@/assets/images/policy/banner-bg.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 65%;
      position: absolute;
      top: 200px;
      .title {
        font-size: 36px;
        font-family: SourceHanSansSC, SourceHanSansSC-Medium;
        font-weight: bold;
        text-align: justify;
        color: #272d39;
        line-height: 71px;
      }
      .search-item {
        width: 65%;
        margin-bottom: 80px;
      }
    }
  }

  .table {
    width: 65%;
    margin: 0 auto;
    transform: translateY(-140px);
    .box-list {
      .box-card {
        margin-bottom: 10px;
        padding: 20px;
        background: #ffffff;
        border: 1px solid #7ba9ff;
        box-shadow: 0px 2px 16px 1px rgba(3, 67, 179, 0.1);
        .box {
          display: flex;
          width: 100%;
          .img-wrap {
            img {
              width: 46px;
              height: 40px;
            }
          }
          .name {
            height: 32px;
            line-height: 32px;
            font-weight: bold;
            min-width: 80px;
          }
          .list {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            width: 80%;
            height: 32px;
            overflow: hidden;
            .list-item {
              height: 32px;
              line-height: 32px;
              margin: 0 15px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              cursor: pointer;
              &:hover {
                color: #047fff;
              }
            }
          }
          .flex-wrap {
            height: auto;
            flex-wrap: wrap;
          }
          .text-item {
            cursor: pointer;
            margin: 0 10px;
            height: 32px;
            line-height: 32px;
          }
          .more {
            min-width: 65px;
            float: right;
            display: flex;
            align-items: center;
            color: #047fff;
          }
        }
      }
    }
    .title {
      font-size: 18px;
      font-family: SourceHanSansSC, SourceHanSansSC-Medium;
      font-weight: bold;
      text-align: left;
      color: #14172e;
      line-height: 38px;
      position: relative;
      display: flex;
      align-items: center;
      .new {
        background: url("assets/images/policy/new.png") no-repeat;
        width: 30px;
        height: 15px;
        background-size: contain;
        margin-left: 5px;
        margin-bottom: 5px;
      }
    }
    .content {
      text-indent: 2em;
      font-size: 16px;
      font-family: SourceHanSansSC, SourceHanSansSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #666666;
      line-height: 28px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-break: break-all;
      cursor: pointer;
    }
    .issueTime {
      margin-top: 10px;
    }
  }
  .pagination {
    float: right;
    margin: 10px 0;
  }
}
</style>
