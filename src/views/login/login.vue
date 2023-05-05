<template>
  <div class="login">
    <LoginPane />
  </div>
</template>

<script setup lang="ts">
import LoginPane from './cpns/login-pane.vue'
</script>

<style scoped>
.login {
  height: 100vh;
  width: 100%;
  background-image: url('../../assets/img/login-bg.svg');
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
