<template>
  <div class="page-content">
    <user-table
      :listData="userList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- heaedr中的插槽 -->
      <template #handerHandler>
        <el-button @click="handleNewUser" type="primary" size="medium"
          >新建用户
        </el-button>
        <!-- <el-button icon="el-icon-refresh"></el-button> -->
      </template>
      <!-- 自带的插槽 -->
      <template #status="scope">
        <el-button size="mini" :type="scope.row.enable ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #update="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #handler>
        <div class="handle-btns">
          <el-button icon="el-icon-edit" size="mini" type="text"
            >编辑</el-button
          >
          <el-button icon="el-icon-delete" size="mini" type="text"
            >删除
          </el-button>
        </div>
      </template>
    </user-table>
  </div>
</template>

<script lang="ts">
import UserTable from '@/base-ui/table'
import { useStore } from '@/store'
import { computed, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  components: { UserTable },
  props: {
    contentTableConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const store = useStore()
    //调用发送网络请求
    // 双向绑定pageInfo
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => {
      getPageData()
    })
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    const userList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    //数据总数
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    return {
      userList,
      getPageData,
      dataCount,
      pageInfo
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
