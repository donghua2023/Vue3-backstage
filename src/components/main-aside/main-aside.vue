<template>
  <div class="main">
    <div class="title">
      <img src="@/assets/img/logo.svg" alt="logo" class="IMG" />
      <span>冬华后台管理系统</span>
    </div>
    <div class="list">
      <el-menu
        background-color="#001529"
        active-text-color="#fff"
        :default-active="activeNum"
      >
        <template v-for="item in userMenu">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon
                ><component :is="item.icon.split('-icon-')[1]"></component
              ></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group v-for="sItem in item.children">
              <el-menu-item
                :index="sItem.id + ''"
                @click="handleItemclick(sItem)"
                >{{ sItem.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mapMenuToPath } from '@/utils/map-menu'

const loginStore = useLoginStore()
const userMenu = loginStore.roleList
const router = useRouter()
const handleItemclick = (param: any) => {
  router.push(param.url)
}
const route = useRoute()
const defaultIndex = computed(() => {
  const pathmenu = mapMenuToPath(route.path, userMenu)
  return pathmenu + ''
})
const activeNum = ref(defaultIndex)
</script>

<style scoped lang="less">
.main {
  color: #fff;
  .title {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    .IMG {
      height: 30px;
      width: 30px;
      margin-right: 5px;
    }
  }
  .list {
    display: flex;
    padding: 20px 10px;
  }
  .el-menu {
    user-select: none;
    border-right: none;
    width: 100%;
    --el-menu-bg-color: #001529;
    --el-menu-text-color: #b7bdc3;
  }
  .el-menu-item {
    margin-left: 10px;
  }
  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
