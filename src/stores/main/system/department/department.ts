import { defineStore } from 'pinia'

interface Istate {
  isSearchHide: Boolean
}
const useDepartmentStore = defineStore('department', {
  state: ():Istate=> ({
    isSearchHide: false
  })
})

export default useDepartmentStore
