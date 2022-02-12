<template>
  <div class="nav-header">
    <i
      class="fold-menu el-icon-s-fold"
      @click="handleFoldClick"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['foldChange'],
  setup(props, context) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      context.emit('foldChange', isFold.value)
    }
    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
