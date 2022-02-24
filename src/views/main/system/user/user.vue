<template>
  <div class="user">
    <!-- 搜索条件表单 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <!-- list中数据 -->
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfigRef"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { searchFormConfig } from './config/search.config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config' //抽离的表单属性配置
import { usePageSearch } from '@/hooks/use-page-search'
import PageModal from '@/components/page-modal/src/page-modal.vue'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/use-page-moadl'

export default defineComponent({
  components: { PageSearch, PageContent, PageModal },
  setup() {
    const [pageContentRef, handleQueryClick] = usePageSearch()
    // 1.处理密码的逻辑
    /**
     * @todo 把函数处理逻辑传进hook里面 点击了直接调用
     */
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleQueryClick,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped lang="less"></style>
