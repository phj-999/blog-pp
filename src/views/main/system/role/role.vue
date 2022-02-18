<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content :contentTableConfig="contentTableConfig" pageName="role" />
  </div>
</template>

<script lang="ts">
import pageContent from '@/components/page-content'
import PageSearch from '@/components/page-search/src/page-search.vue'
import { defineComponent } from 'vue'
import { contentTableConfig } from '../user/config/content.config'
import { searchFormConfig } from '../user/config/search.config'

export default defineComponent({
  components: { pageContent, PageSearch },
  name: 'role',
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
