<template>
  <div class="app">
    <router-link to="/login">login</router-link> |
    <router-link to="/main">首页</router-link>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>
<style lang="less"></style>
