<template>
  <div class="main">
    <div class="mainHeard">
      <el-form :model="seachForm" label-width="120px" ref="seachFormRef">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="seachForm.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="真实姓名" prop="realname">
              <el-input v-model="seachForm.realname" /> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="手机号码" prop="cellphone">
              <el-input v-model="seachForm.cellphone" /> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="enable">
              <el-select v-model="seachForm.enable">
                <el-option label="启用" value="1" />
                <el-option label="禁用" value="0" />
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="8">
            <el-form-item label="创建时间" prop="createAt">
              <el-date-picker
                v-model="seachForm.createAt"
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                size="default" /></el-form-item
          ></el-col>
        </el-row>
      </el-form>

      <div class="btns">
        <el-button icon="Refresh" @click="resetSeachForm">重置</el-button>
        <el-button icon="Search" type="primary" @click="fecthUserListData"
          >查询</el-button
        >
      </div>
    </div>
    <div class="content">
      <div class="contentHeader">
        <h3>{{ '用户列表' }}</h3>
        <el-button type="primary" @click="addUserItem">新增</el-button>
      </div>
      <div class="contentTable">
        <el-table :data="userTableList" stripe style="width: 100%" center>
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="name" label="用户名" />
          <el-table-column prop="realname" label="真实姓名" />
          <el-table-column prop="cellphone" label="手机号码" />
          <el-table-column prop="enable" label="状态" width="120">
            <template #default="scope">
              <el-tag type="success">{{
                scope.row.enable === 1 ? '启用' : '禁用'
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createAt" label="创建时间" width="170">
            <template #default="scope">
              <span>{{ formatUTC(scope.row.createAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updateAt" label="更新时间" width="170">
            <template #default="scope">
              <span>{{ formatUTC(scope.row.updateAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template #default="scope">
              <el-button
                @click="editUserItem(scope.row)"
                text
                icon="Edit"
                type="primary"
                size="small"
                >编辑</el-button
              >
              <el-button
                @click="deleteUserItemm(scope.row)"
                text
                icon="delete"
                type="danger"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 50, 100, 200]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
  <el-dialog
    v-model="userDialogVisible"
    :title="userTips"
    width="30%"
    center
    @close="userDialogCancel"
  >
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
          <el-option
            v-for="item in roleIdOptions"
            :key="item['id']"
            :label="item['name']"
            :value="item['id']"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="选择部门" prop="departmentId">
        <el-select
          v-model="userDialogForm.departmentId"
          placeholder="请选择部门"
        >
          <el-option
            v-for="item in departmentIdOptions"
            :key="item['id']"
            :label="item['name']"
            :value="item['id']"
          />
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
import { ref, reactive, unref } from 'vue'
import useUserstore from '@/stores/main/system/user/user'
import {
  fecthUserById,
  deleteUserById,
  saveUser,
  editUser
} from '@/service/main/system/user/user'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import { formatUTC } from '@/utils/format'

const seachForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt: ''
})
const currentPage = ref(1)
const pageSize = ref(10)

let seachFormRef = ref()

// 从store拿到表格的数据
const userStore = useUserstore()
// userStore.postUsersListAction({ ...seachForm })
fecthUserListData()
const { userTableList, totalCount } = storeToRefs(userStore)

// 分页
const handleSizeChange = () => {
  fecthUserListData()
}
const handleCurrentChange = () => {
  fecthUserListData()
}

// 从store拿到表格的数据，发起网络请求
function fecthUserListData() {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }
  userStore.postUsersListAction({ ...pageInfo, ...seachForm })
}
// 重置搜索表单
const resetSeachForm = () => {
  const form = unref(seachFormRef)
  form.resetFields()
  fecthUserListData()
}
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
const addUserItem = () => {
  isEdit.value = false
  userStore.getRoleList()
  userStore.getDepartmentList()
  userDialogVisible.value = true
  userTips.value = '新增用户'
}
const editUserId = ref()
const editUserItem = async (row: any) => {
  userStore.getRoleList()
  userStore.getDepartmentList()
  isEdit.value = true
  editUserId.value = row.id
  const { data } = await fecthUserById(row.id)
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
const deleteUserItemm = (row: any) => {
  ElMessageBox.confirm('确认删除该用户？', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await deleteUserById(row.id)
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
