import { defineStore } from 'pinia'

interface Istate {
  isSearchHide: Boolean
}
const useRoleStore = defineStore('role', {
  state: ():Istate=> ({
    isSearchHide: false
  })
})

export default useRoleStore
