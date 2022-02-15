<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      @click="handleFoldClick"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
    ></i>
    <div class="content">
      <nav-bread-crumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import NavBreadCrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import UserInfo from './UserInfo.vue'

export default defineComponent({
  components: { UserInfo, NavBreadCrumb },
  emits: ['foldChange'],
  setup(props, context) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      context.emit('foldChange', isFold.value)
    }
    // 面包屑的数据: [{name: , path: }]
    const store = useStore()
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus
      const route = useRoute()
      const currentPath = route.path
      return pathMapBreadcrumbs(userMenus, currentPath)
    })

    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
