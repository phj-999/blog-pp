<template>
  <div class="page-content">
    <user-table :listData="userList" v-bind="contentTableConfig">
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
import { computed, defineComponent } from 'vue'

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
    store.dispatch('system/getPageListAction', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    //数据总数
    //const userCount = computed(() => store.state.system.userCount)

    return {
      userList
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
