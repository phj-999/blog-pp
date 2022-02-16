<template>
  <div class="user">
    <search-form v-bind="searchFormConfig" v-model="formData" />
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SearchForm from '@/base-ui/form'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  components: { SearchForm },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      createTime: ''
    })
    return {
      searchFormConfig,
      formData
    }
  }
})
</script>

<style scoped></style>
