<template>
  <div class="home">
    <el-container class="content">
      <el-aside :width="isCollapse ? '0px' : '300px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page-container">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="pageinfo">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import NavHeader from '@/components/layui/NavHeader.vue'
import NavMenu from '@/components/layui/NavMenu.vue'
import { useRouter } from 'vue-router'
// @ is an alias to /src

export default defineComponent({
  components: { NavHeader, NavMenu },
  name: 'Home',
  setup() {
    const router = useRouter()
    console.log(router)
    const routerList = router.options.routes
    const isCollapse = ref(false)
    /**控制菜单栏折叠
     * @param {boolean} 传进布尔值true/false控制折叠
     */
    const handleFoldChange = (isFold) => {
      isCollapse.value = isFold
    }
    return {
      isCollapse,
      routerList,
      handleFoldChange
    }
  }
})
</script>

<style lang="less" scoped>
.home {
  background: url('../../assets/img/bg.jpg') top center no-repeat;
}
</style>
