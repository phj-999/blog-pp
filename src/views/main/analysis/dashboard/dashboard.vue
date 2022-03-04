<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <card title="分类商品数量（饼图）">
          <pie-echart :pieData="categoryGoodsCount" />
        </card>
      </el-col>
      <el-col :span="10">
        <card title="不同城市商品数量"></card>
      </el-col>
      <el-col :span="7">
        <card title="分类商品数量（玫瑰图）">
          <rose-echart :roseData="categoryGoodsCount" />
        </card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale" />
        </card>
      </el-col>
      <el-col :span="12">
        <card title="分类商品的收藏"> </card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import card from '@/base-ui/card/src/card.vue'
import { LineEchart, PieEchart, RoseEchart } from '@/components/page-echarts'
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  components: { card, PieEchart, RoseEchart, LineEchart },
  name: 'dashboard',
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    //用computd保持实时更新
    // 分类商品数量
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    // 分类商品销量
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []

      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }
      return {
        xLabels,
        values
      }
    })
    return { categoryGoodsCount, categoryGoodsSale }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
