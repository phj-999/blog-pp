<template>
  <div class="notfound">
    <div>not found</div>
    <el-button type="primary" @click="handleBack">返回上一级</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const handleBack = () => {
      const router = useRouter()
      router.back()
    }
    return {
      handleBack
    }
  }
})
</script>

<style lang="less" scoped>
.notfound {
  position: absolute;
  top: 50%;
  left: 50%;
}
</style>
