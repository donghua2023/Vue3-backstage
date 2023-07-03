<template>
  <div>
    <page-search
      :searchData="searchConfig"
      @queryClick="handleQueryClick"
      v-show="!isSearchHide"></page-search>
    <page-content
      tableDataUrl="/user"
      :tableConfig="contentconfig"
      :contentData="roleList"
      @editClick="editClick"
      @deleteClick="deleteClick"></page-content>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { searchConfig } from './config/search.config.ts'
import { contentconfig } from './config/content.config.ts'
// 这里控制搜索区的显示与隐藏
import useRoleStore from '@/stores/main/system/role/role'
import { storeToRefs } from 'pinia'
const roleStore = useRoleStore()
const { isSearchHide, roleList, totalCount } = storeToRefs(roleStore)

// 获取表格的数据
contentconfig.Epagination = {
  currentPage: ref(1),
  pageSize: ref(10),
  total: totalCount
}
function fetchRoleList(seachForm = {}) {
  const size = contentconfig.Epagination.pageSize.value
  const offset = (contentconfig.Epagination.currentPage.value - 1) * size
  const pageInfo = { size, offset }
  roleStore.postRoleListAction({ ...seachForm, ...pageInfo })
}
fetchRoleList()

// 控制搜索区域的显示隐藏
provide('isSearchHide', isSearchHide)

// 查询事件
const handleQueryClick = (seachForm: any) => {
  fetchRoleList(seachForm)
  console.log('父组件查询')
}

const editClick = (row: any) => {
  console.log(row, '编辑')
}
const deleteClick = (row: any) => {
  console.log(row, '删除')
}
</script>

<style scoped></style>
