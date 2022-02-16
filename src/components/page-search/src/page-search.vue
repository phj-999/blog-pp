<template>
  <div class="search">
    <search-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <div class="title">高级检索</div>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh">重置</el-button>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </template>
    </search-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import SearchForm from '@/base-ui/form'

export default defineComponent({
  components: {
    SearchForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true
    }
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      createTime: ''
    })
    return {
      formData
    }
  }
})
</script>

<style lang="less" scoped>
.title {
  font: normal lighter 200%/2.5 '海豹总动员正体字';
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
