<template>
  <div class="nav-header">
    <el-page-header
      title="当前页"
      :icon="isFold ? CaretRight : CaretLeft"
      content="detail"
      @back="handleisFoldClick"
    ></el-page-header>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { CaretLeft, CaretRight } from '@element-plus/icons-vue'
// @click="handleFoldClick"
export default defineComponent({
  setup(props, { emit }) {
    const isFold = ref(false) //控制菜单栏折叠的布尔值
    const handleisFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    return {
      CaretLeft,
      CaretRight,
      isFold,
      handleisFoldClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  background-color: rgb(84, 92, 100);
}
</style>
