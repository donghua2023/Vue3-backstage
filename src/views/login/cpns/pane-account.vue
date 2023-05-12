<template>
  <div class="pane-account">
    <el-form
      :model="account"
      :rules="accountRules"
      label-width="60px"
      size="large"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ElForm, ElMessage, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import useLoginStore from '@/stores/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { CACHE_NAME, CACHE_PASSWORD } from '@/types'

// 1. 定义accent数据
const account = reactive({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})
// 2. 定义效验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入账号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或者字母组成~',
      trigger: 'blur'
    }
  ]
}
// 3.执行账号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()

function loginAction(isRemPwd: boolean) {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      // 获取用户输入的账号和密码
      const name = account.name
      const password = account.password
      await loginStore.loginAccountAction({ name, password })
      // 登入成功跳转到主页面
      router.push('/main')

      // 判断是否需要记住密码
      if (isRemPwd) {
        localCache.setCache(CACHE_NAME, name)
        localCache.setCache(CACHE_PASSWORD, password)
      } else {
        localCache.removeCache(CACHE_NAME)
        localCache.removeCache(CACHE_PASSWORD)
      }
    } else {
      ElMessage.error('请输入正确的格式后再操作~')
    }
  })
}
defineExpose({ loginAction })
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
