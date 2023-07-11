<template>
  <div class="content">
    <el-form :inline="true" ref="searchFormRef" :model="searchForm" class="demo-form-inline" label-width="80px">
      <template v-for="item in searchData">
        <el-form-item v-if="item.type === 'input'" :label="item.label" :prop="item.prop">
          <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" :size="item.size ?? 'large'" />
        </el-form-item>
        <el-form-item v-if="item.type === 'select'" :label="item.label" :prop="item.prop">
          <el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder" :size="item.size ?? 'large'">
            <template v-for="sItem in item.options">
              <el-option :label="sItem.label" :value="sItem.value"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item v-if="item.type === 'radio'" :label="item.label" :prop="item.prop">
          <el-radio-group v-model="searchForm[item.prop]">
            <template v-for="sItem in item.options">
              <el-radio :label="sItem.value" :size="item.size ?? 'large'">{{ sItem.label }}</el-radio>
            </template>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="item.type === 'date'" :label="item.label" :prop="item.prop">
          <el-date-picker
            popper-class="popperClass"
            v-model="searchForm[item.prop]"
            type="daterange"
            unlink-panels
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :size="item.size ?? 'large'" />
        </el-form-item>
      </template>
    </el-form>
    <div class="btnArea">
      <el-button icon="Refresh" size="large" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" size="large" @click="$emit('queryClick', searchForm)">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { ref } from 'vue'

const emit = defineEmits(['queryClick'])
const props = defineProps({
  searchData: {
    type: Array
  }
})

const searchData: any = props.searchData
const searchForm: any = ref({})

let searchFormRef = ref<InstanceType<typeof ElForm>>()
const handleResetClick = () => {
  searchFormRef.value?.resetFields()
  emit('queryClick', searchForm.value)
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 30px;
}
:deep(.el-form) {
  width: 100%;
}
:deep(.el-form-item) {
  width: 25%;
  margin-right: 0px;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 0px;
}
.content .btnArea {
  width: 100%;
  text-align: right;
  padding: 20px 50px 0px 0;
}
</style>
