<template>
  <div class="main">
    <page-search :searchData="searchConfig" @queryClick="fecthUserListData" v-show="!isSearchHide"></page-search>
    <page-content
      tableDataUrl="/department"
      :tableConfig="contentconfig"
      :contentData="userTableList"
      @refresh="fecthUserListData"
      @selection-change="selectionChange"
      @edit-click="editClick"
      @delete-click="deleteClick"
      @page-common-btn-click="pageCommonBtnClick">
    </page-content>
  </div>
  <el-dialog v-model="userDialogVisible" :title="userTips" width="30%" center @close="userDialogCancel">
    <el-form :model="userDialogForm" label-width="80px" ref="userDialogFormRef">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userDialogForm.name" />
      </el-form-item>

      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="userDialogForm.realname" />
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="userTips === '新增用户'">
        <el-input v-model="userDialogForm.password" />
      </el-form-item>
      <el-form-item label="手机号码" prop="cellphone">
        <el-input v-model="userDialogForm.cellphone" />
      </el-form-item>

      <el-form-item label="选择角色" prop="roleId">
        <el-select v-model="userDialogForm.roleId" placeholder="请选择角色">
          <el-option v-for="item in roleIdOptions" :key="item['id']" :label="item['name']" :value="item['id']" />
        </el-select>
      </el-form-item>

      <el-form-item label="选择部门" prop="departmentId">
        <el-select v-model="userDialogForm.departmentId" placeholder="请选择部门">
          <el-option v-for="item in departmentIdOptions" :key="item['id']" :label="item['name']" :value="item['id']" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="userDialogCancel">取消</el-button>
        <el-button type="primary" @click="userDialogSave"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, provide } from 'vue'
import useUserstore from '@/stores/main/system/user/user'
import { searchConfig } from './config/search.config.ts'
import { contentconfig } from './config/content.config'
import { fecthUserById, deleteUserById, saveUser, editUser } from '@/service/main/system/user/user'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'

// 从store拿到表格的数据
const userStore = useUserstore()
const { userTableList, totalCount, isSearchHide } = storeToRefs(userStore)
provide('isSearchHide', isSearchHide)

contentconfig.Epagination = {
  currentPage: ref(1),
  pageSize: ref(10),
  total: totalCount ?? 0
}

// 从store拿到表格的数据，发起网络请求
function fecthUserListData(searchForm = {}) {
  const size = contentconfig.Epagination.pageSize.value
  const offset = (contentconfig.Epagination.currentPage.value - 1) * size
  const pageInfo = { size, offset }
  userStore.postUsersListAction({ ...pageInfo, ...searchForm })
}
fecthUserListData()
// 新增、编辑、删除列表
let isEdit = ref(false)
const { roleIdOptions, departmentIdOptions } = storeToRefs(userStore)

interface IuserInfo {
  name: string
  password?: string
  realname: string
  cellphone: string
  roleId: string | number
  departmentId: string | number
}
let userDialogForm: IuserInfo = reactive({
  name: '',
  password: '',
  realname: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
let userDialogFormRef = ref()
const userDialogVisible = ref(false)
const userTips = ref('默认')

const editUserId = ref()

const userDialogCancel = () => {
  userDialogVisible.value = false
  userDialogForm.name = ''
  userDialogForm.password = ''
  userDialogForm.realname = ''
  userDialogForm.cellphone = ''
  userDialogForm.roleId = ''
  userDialogForm.departmentId = ''
}

const userDialogSave = async () => {
  if (isEdit.value) {
    const obj = {
      cellphone: userDialogForm.cellphone,
      departmentId: userDialogForm.departmentId,
      name: userDialogForm.name,
      realname: userDialogForm.realname,
      roleId: userDialogForm.roleId
    }
    const res = await editUser(editUserId.value, obj)
    if (res.code === 0) {
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
    } else {
      ElMessage({
        message: '修改失败',
        type: 'error'
      })
    }
  } else {
    const obj = {
      cellphone: userDialogForm.cellphone,
      departmentId: userDialogForm.departmentId,
      name: userDialogForm.name,
      realname: userDialogForm.realname,
      roleId: userDialogForm.roleId,
      password: userDialogForm.password
    }
    const res = await saveUser(obj)
    console.log(res, 'res')
    if (res.code === 0) {
      ElMessage({
        message: '创建成功',
        type: 'success'
      })
    } else {
      ElMessage({
        message: '创建失败',
        type: 'error'
      })
    }
  }
  fecthUserListData()
  userDialogCancel()
}

const editClick = async (row: any) => {
  // 获取部门角色下拉框的数据
  userStore.getRoleList()
  userStore.getDepartmentList()

  isEdit.value = true
  editUserId.value = row.user_id
  const { data } = await fecthUserById(row.user_id)
  // userDialogForm = reactive(data)
  userDialogForm = reactive({
    name: data.name,
    realname: data.realname,
    cellphone: data.cellphone,
    roleId: data.role.id,
    departmentId: data.department.id
  })
  console.log(userDialogForm, 'row')
  userTips.value = '编辑用户'
  userDialogVisible.value = true
}
const deleteClick = (row: any) => {
  let ids: Array<any> = []
  if (Array.isArray(row)) {
    row.forEach((item) => {
      ids.push(item.user_id)
    })
  } else {
    ids.push(row.user_id)
  }
  ElMessageBox.confirm('确认删除该用户？', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await deleteUserById(ids)
      if (res.code === 0) {
        ElMessage({
          message: '删除成功',
          type: 'success'
        })
      } else {
        ElMessage({
          message: '删除失败',
          type: 'error'
        })
      }
      fecthUserListData()
    })
    .catch(() => {
      ElMessage({
        message: '用户取消删除',
        type: 'info'
      })
    })
}
// 表格的选中事件
let selectRows: Array<any> = []
const selectionChange = (rows: any) => {
  selectRows = rows
}
// 公共组件点击事件
const pageCommonBtnClick = (param: any) => {
  switch (param) {
    case 'add':
      isEdit.value = false
      userStore.getRoleList()
      userStore.getDepartmentList()
      userTips.value = '新增用户'
      userDialogVisible.value = true
      break
    case 'edit':
      if (selectRows.length < 1) {
        ElMessage.error('请选择数据再操作')
      } else if (selectRows.length > 1) {
        ElMessage.error('一次只能修改一条数据')
      } else {
        editClick(selectRows[0])
      }
      break
    case 'delete':
      if (selectRows.length < 1) {
        ElMessage.error('请选择数据再操作')
      } else {
        deleteClick(selectRows)
      }
      break
    case 'into':
      console.log('into')
      break
    case 'out':
      console.log('out')
      break
    default:
      ElMessage('没有该点击事件,请联系管理员！！！')
  }
}
</script>

<style lang="less" scoped>
.mainHeard,
.content {
  padding: 20px;
  background-color: #fff;
  margin-bottom: 10px;
}
.contentHeader {
  display: flex;
  justify-content: space-between;
}

.btns {
  text-align: right;
  padding: 0 50px 10px 0;
}
.el-input {
  width: 300px;
}
.el-select {
  width: 300px;
}
:deep(.el-form-item__content) {
  max-width: 300px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
