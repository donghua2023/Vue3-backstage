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
app.use(router).use(store).use(ElementPlus).use(icons)

app.mount('#app')

