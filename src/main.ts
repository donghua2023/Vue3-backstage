import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/index.less'
import 'normalize.css'
import router from './router'
import store from './stores'
import icons from './global/register-icons'

const app = createApp(App)
// use(store)放在use(router)的前面，保证匹配动态路由时有数据，不然会出现空白页
app.use(store).use(router).use(ElementPlus).use(icons)

app.mount('#app')

