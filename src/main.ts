import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import { createPinia } from 'pinia'
import dhRequest from './service'

const pinia = createPinia()


createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app')

interface DataType {
  data: any
  returnCode: string
  success: boolean
}
dhRequest.request<DataType>({
  url: '/login/111',
  method: 'POST',
  data: {
    name: 'admin-root',
    password: '88888888'
  },
  showLoading: true
}).then((res) => {
  console.log(res)
})
