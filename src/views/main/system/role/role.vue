<template>
  <div>
    <pageSearch
      :searchData="searchConfig"
      @queryClick="handleQueryClick"
    ></pageSearch>
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import { searchConfig } from './config/search.config.ts'

const handleQueryClick = () => {
  console.log('父组件查询')
}
</script>

<style scoped></style>
