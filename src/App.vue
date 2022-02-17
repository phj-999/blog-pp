<template>
  <div class="app">
    <ElConfigProvider :locale="znCn">
      <router-view />
    </ElConfigProvider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus' //国际化
import znCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  name: 'App',
  components: { ElConfigProvider },
  props: {
    name: {
      type: String
    }
  },
  setup(props) {
    return { znCn }
  }
})
</script>

<style lang="less">
.app {
  height: 100%;
}
</style>
