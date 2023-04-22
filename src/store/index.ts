import { defineStore } from 'pinia'
import { ref } from 'vue'

export const Store:any = defineStore('counter', () => {
  const name = ref('donghua')
  function edit() {
    name.value = 'zengdonghua'
  }

  return { name, edit }
})
