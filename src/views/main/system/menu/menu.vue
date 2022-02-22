<template>
  <div class="menu">
    <page-content :contentTableConfig="contentTableConfig" pageName="menu" />
  </div>
</template>

<script lang="ts">
import pageContent from '@/components/page-content/src/page-content.vue'
import { defineComponent } from 'vue'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  components: { pageContent },
  name: 'menu',
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
