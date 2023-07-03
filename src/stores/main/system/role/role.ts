import { postRoleList } from '@/service/role/role'
import { defineStore } from 'pinia'

interface Istate {
  isSearchHide: Boolean,
  roleList: Array<any>,
  totalCount: number
}
const useRoleStore = defineStore('role', {
  state: ():Istate=> ({
    isSearchHide: false,
    roleList: [],
    totalCount: 0
  }),
  actions: {
    async postRoleListAction(param:any) {
      const {data} = await postRoleList(param)
      this.roleList = data.list
      this.totalCount = data.totalCount
    }
  }
})

export default useRoleStore
