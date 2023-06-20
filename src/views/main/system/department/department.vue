<template>
  <div>
    <page-search
      :searchData="searchConfig"
      @queryClick="handleQueryClick"
    ></page-search>
    <page-content
      tableDataUrl="/department"
      :tableConfig="contentconfig"
      :contentData="tableDate"
      @editClick="editClick"
      @deleteClick="deleteClick"
    >
    </page-content>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import { searchConfig } from './config/search.config.ts'
import PageContent from '@/components/page-content/page-content.vue'
import { contentconfig } from './config/content.config.ts'

const handleQueryClick = () => {
  console.log('父组件查询')
}
const tableDate: any = [
  {
    id: 4738,
    name: '食堂部',
    parentId: 1,
    createAt: '2023-06-20T07:52:56.000Z',
    updateAt: '2023-06-20T07:52:56.000Z',
    leader: '小刘'
  },
  {
    id: 4737,
    name: '开发',
    parentId: 5,
    createAt: '2023-06-20T07:40:09.000Z',
    updateAt: '2023-06-20T07:40:09.000Z',
    leader: '二'
  },
  {
    id: 4736,
    name: '技术部',
    parentId: 2,
    createAt: '2023-06-20T07:39:54.000Z',
    updateAt: '2023-06-20T07:39:54.000Z',
    leader: '下次'
  },
  {
    id: 4735,
    name: '销售部',
    parentId: 1,
    createAt: '2023-06-20T07:39:34.000Z',
    updateAt: '2023-06-20T07:39:34.000Z',
    leader: '位'
  },
  {
    id: 4733,
    name: '行政部',
    parentId: 2,
    createAt: '2023-06-20T07:38:51.000Z',
    updateAt: '2023-06-20T07:38:51.000Z',
    leader: 'whyxyn'
  },
  {
    id: 4732,
    name: '开发部',
    parentId: 5,
    createAt: '2023-06-20T07:38:27.000Z',
    updateAt: '2023-06-20T07:38:27.000Z',
    leader: 'coderxyn'
  },
  {
    id: 4718,
    name: 'dcc',
    parentId: 5,
    createAt: '2023-06-20T01:48:47.000Z',
    updateAt: '2023-06-20T03:43:27.000Z',
    leader: 'fvc'
  },
  {
    id: 5,
    name: '人事部',
    parentId: 1,
    createAt: '2021-01-02T10:04:02.000Z',
    updateAt: '2021-05-02T07:33:08.000Z',
    leader: 'lily'
  },
  {
    id: 4,
    name: '客服部',
    parentId: 2,
    createAt: '2021-01-02T10:04:02.000Z',
    updateAt: '2021-08-03T11:14:32.000Z',
    leader: 'lily'
  },
  {
    id: 3,
    name: '运营部',
    parentId: 1,
    createAt: '2021-01-02T10:03:42.000Z',
    updateAt: '2021-01-05T08:25:52.000Z',
    leader: 'lucy'
  }
]
const editClick = (row: any) => {
  console.log(row, '编辑')
}
const deleteClick = (row: any) => {
  console.log(row, '删除')
}
</script>

<style scoped></style>
