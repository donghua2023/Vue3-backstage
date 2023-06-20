<template>
  <div class="container">
    <div class="btnArea">按钮</div>
    <div class="content">
      <el-table
        :data="contentData"
        border
        style="width: 100%"
        max-height="400"
        fit
      >
        <template v-for="item in tableColumns">
          <template v-if="item.type === 'handler'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                <el-button
                  v-if="item.isEdit"
                  icon="Edit"
                  text
                  type="primary"
                  @click="handleEditClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="item.isDelete"
                  icon="Edit"
                  text
                  type="danger"
                  @click="handleDeleteClick(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item" align="center" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="Ipagination" v-if="isPagination">
      <el-pagination
        v-model:current-page="page"
        v-model:page-size="per_page"
        :page-sizes="[10, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  tableConfig: {
    type: Object,
    require: true
  },
  contentData: {
    type: Array,
    require: true
  },
  tableDataUrl: {
    type: String,
    require: true
  }
})
// 定义分页的数据
const page = ref(1)
const per_page = ref(10)
const total = ref(0)

const emit = defineEmits(['editClick', 'deleteClick'])
const tableColumns: any = props.tableConfig?.tableColumns
const isPagination: Boolean = props.tableConfig?.isPagination ?? false
const contentData: any = props.contentData
// 编辑按钮事件
const handleEditClick = (row: any) => {
  emit('editClick', row)
}
// 删除按钮事件
const handleDeleteClick = (row: any) => {
  emit('deleteClick', row)
}
// 分页
const handleCurrentChange = () => {}
const handleSizeChange = () => {}
</script>

<style lang="less" scoped>
.Ipagination {
  display: flex;
  justify-content: end;
  padding: 10px 40px 10px 0;
}
</style>