<template>
  <div>
    <page-search
      :searchData="searchConfig"
      @queryClick="handleQueryClick"
      v-show="!isSearchHide"></page-search>
    <page-content
      tableDataUrl="/department"
      :tableConfig="contentconfig"
      :contentData="departTableDate"
      @editClick="editClick"
      @deleteClick="deleteClick">
    </page-content>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue'
import { searchConfig } from './config/search.config.ts'
import { contentconfig } from './config/content.config.ts'
// 这里控制搜索区的显示与隐藏
import useDepartmentStore from '@/stores/main/system/department/department'
import { storeToRefs } from 'pinia'
const departmentStore = useDepartmentStore()
const { isSearchHide, totalCount } = storeToRefs(departmentStore)
const { departTableDate } = storeToRefs(departmentStore)
console.log(departTableDate, 'departTableDate')

provide('isSearchHide', isSearchHide)

// 搜索查询
const handleQueryClick = (seachForm: any) => {
  fecthDepartmentListDate(seachForm)
}

// 获取表格的数据
contentconfig.Epagination = {
  currentPage: ref(1),
  pageSize: ref(10),
  total: totalCount
}
function fecthDepartmentListDate(seachForm = {}) {
  const size = contentconfig.Epagination.pageSize.value
  const offset = (contentconfig.Epagination.currentPage.value - 1) * size
  const pageInfo = { size, offset }
  departmentStore.postDepartmentListAction({ ...pageInfo, ...seachForm })
}
fecthDepartmentListDate()

const editClick = (row: any) => {
  console.log(row, '编辑')
}
const deleteClick = (row: any) => {
  console.log(row, '删除')
}
</script>

<style scoped></style>
