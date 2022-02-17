<template>
  <div class="user">
    <!-- 搜索条件表单 -->
    <page-search :searchFormConfig="searchFormConfig" />
    <!-- list中数据 -->
    <page-content :contentTableConfig="contentTableConfig"></page-content>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { useStore } from 'vuex'
import { contentTableConfig } from './config/content.config' //抽离的表单属性配置

export default defineComponent({
  components: { PageSearch, PageContent },
  setup() {
    const store = useStore()
    //调用发送网络请求
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => store.state.system.userList)
    //数据总数
    const userCount = computed(() => store.state.system.userCount)

    return {
      searchFormConfig,
      userList,
      contentTableConfig
    }
  }
})
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
