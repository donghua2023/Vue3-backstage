import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

//以下两行代码是配置
import path from 'path'
const resolve = (dir: string) => path.resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    //这里是别名的映射规则
    alias: {
      '@': resolve('src'),
      '@components': resolve('src/components'),
      '@utils': resolve('src/utils')
    }
  }
})
