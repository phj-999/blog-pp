<template>
  <div class="user">
    <search-form v-bind="searchFormConfig" />
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  components: { SearchForm },
  setup() {
    return {
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
