<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import login from './views/login/login.vue'
import index from './views/main/index.vue'
import { Store } from './stores'
const store = Store()
</script>

<template>
  <div>
    <login></login>
    <index></index>
    <h2>{{ store.name }}</h2>
    <HelloWorld msg="Vite + Vue" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
