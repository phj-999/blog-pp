<template>
  <div class="goods">
    <page-content :contentTableConfig="contentTabConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template>
      <template #oldPrice="scope">
        {{ '$' + scope.row.oldPrice }}
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import pageContent from '@/components/page-content'
import { defineComponent } from 'vue'

import { contentTabConfig } from './config/content.config'

export default defineComponent({
  name: 'goods',
  components: { pageContent },
  setup() {
    return {
      contentTabConfig
    }
  }
})
</script>

<style scoped></style>
