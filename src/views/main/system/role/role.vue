<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <page-modal
      :modalConfig="modalConfig"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        ></el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import pageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'
import PageSearch from '@/components/page-search/src/page-search.vue'
import { usePageModal } from '@/hooks/use-page-moadl'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useStore } from '@/store'
import { contentTableConfig } from '../user/config/content.config'
import { searchFormConfig } from '../user/config/search.config'
import { modalConfig } from './config/modal.config'
import { menuMapLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

export default defineComponent({
  components: { pageContent, PageSearch, PageModal },
  name: 'role',
  setup() {
    // 处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(undefined, editCallback)
    const store = useStore()
    const otherInfo = ref({})
    const menus = computed(() => store.state.entireMenu)
    /**
     * el-tree列表数据的点击
     */
    const handleCheckChange = (data1: any, data2: any) => {
      // 拿到keys
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      // 合并到一起
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      // 放到otherInfo里面 要求value是个对象
      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      elTreeRef,
      menus,
      otherInfo,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
