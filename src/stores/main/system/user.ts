import { defineStore } from "pinia";
import { postUsersListData, fecthRoleList, fecthDepartmentList } from '@/service/main/system/user/user'

const useUserstore = defineStore('user', {
  state: ()=>({
    userTableList: [],
    totalCount: 0,
    roleIdOptions: [],
    departmentIdOptions: []
  }),
  actions: {
    async postUsersListAction(param: object) {
      const {data} = await postUsersListData(param)
      this.userTableList = data.list
      this.totalCount = data.totalCount
    },
    async getRoleList() {
      const { data } = await fecthRoleList({ offset: 0, size: 100 })
      this.roleIdOptions = data.list
    },
    async getDepartmentList() {
      const {data} = await fecthDepartmentList({offset: 0, size: 100})
      this.departmentIdOptions = data.list
    }
  }
})

export default useUserstore
