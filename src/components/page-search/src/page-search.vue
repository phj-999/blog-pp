<template>
  <div class="search">
    <search-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <div class="title">高级检索</div>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
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
  emits: ['queryBtnClick'],
  setup(props, context) {
    // 双向绑定的属性应该是由配置文件的field来决定
    // 1.优化一: formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    // const formData = ref({
    //   id: '',
    //   name: '',
    //   password: '',
    //   createTime: ''
    // })
    const formData = ref(formOriginData)

    // 优化当用户点击重置
    const handleResetClick = () => {
      //就是把formData的值再变回原来的
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key]
        console.log(formOriginData[key])
      }
    }
    // 点击搜索
    const handleQueryClick = () => {
      //console.log('search')
      context.emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
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
