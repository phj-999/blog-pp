<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <card title="分类商品数量（饼图）"></card>
      </el-col>
      <el-col :span="10">
        <card title="不同城市商品数量"></card>
      </el-col>
      <el-col :span="7">
        <card title="分类商品数量（玫瑰图）"></card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <card title="分类商品的销量"> </card>
      </el-col>
      <el-col :span="12">
        <card title="分类商品的收藏"> </card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import card from '@/base-ui/card/src/card.vue'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: { card },
  name: 'dashboard',
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    return {}
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
