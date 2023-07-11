import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()
function registerStore(app: App<Element>) {
  // use的pinia
  app.use(pinia)
  // 加载本地的数据
  const LoginStore = useLoginStore()
  LoginStore.loadLocalCacheAction()
}
export default registerStore
