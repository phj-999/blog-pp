<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search'
import { useStore } from 'vuex'

export default defineComponent({
  components: { PageSearch },
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
      userList
    }
  }
})
</script>

<style scoped lang="less"></style>
