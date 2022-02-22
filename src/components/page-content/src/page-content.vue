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
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </user-table>
  </div>
</template>
2:15:44
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
    // 监听pageInfo
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

    //获取其它动态插槽的名称
    const otherPropSlots = props.contentTableConfig?.propList.fliter(
      (item: any) => {
        if (item.slotName === 'status') return false //false的会被过滤掉 true的会返回
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
      }
    )
    return {
      userList,
      getPageData,
      dataCount,
      pageInfo,
      otherPropSlots
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
