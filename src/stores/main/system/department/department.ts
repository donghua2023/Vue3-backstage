import { defineStore } from 'pinia'
import { postDepartmentList } from '@/service/main/system/department/department'

interface Istate {
  isSearchHide: Boolean
  departTableDate: Array<any>
  totalCount: number
}
const useDepartmentStore = defineStore('department', {
  state: (): Istate => ({
    isSearchHide: false,
    departTableDate: [],
    totalCount: 0
  }),
  actions: {
    async postDepartmentListAction(param: any) {
      const { data } = await postDepartmentList(param)
      this.departTableDate = data.list
      this.totalCount = data.totalCount
    }
  }
})

export default useDepartmentStore
