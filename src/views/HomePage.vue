<template>
  <div>
    <header>
      <h1>大数据可视化</h1>
    </header>
    <section class="container">
      <!-- 左容器 -->
      <section class="itemLeft">
        <item-page>
          <horizontal-bar-chart v-bind="hordata" />
        </item-page>
        <item-page>
          <gradient-stacked-chart />
        </item-page>
      </section>
      <!-- 中容器 -->
      <section class="itemCenter">
        <map-chart />
      </section>
      <!-- 右容器 -->
      <section class="itemRight">
        <item-page>
          <rose-chart />
        </item-page>
        <item-page>
          <stacked-column-chart />
        </item-page>
      </section>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
//import { requestHorizontalbar } from '@/service/echarts'
// import * as echarts from 'echarts'
// import { ref, onMounted } from 'vue'
import {
  gradientStackedChart,
  horizontalBarChart,
  mapChart,
  roseChart,
  stackedColumnChart,
  itemPage
} from '@/components/echarts-page'

const store = useStore()
store.dispatch('echartModule/getEchartsListAction')
const hordata = computed(() => {
  const xLabels = []
  const values = []
  const horbarData = store.state.echartModule.horizontalbar

  console.log(horbarData, 'horbarData111')
  for (const item of horbarData) {
    xLabels.push(item.title)
    values.push(item.num)
    console.log(xLabels, 'xLabels')
  }
  return {
    xLabels,
    values
  }
})
// const hordata = requestHorizontalbar()
// console.log(hordata, 'asdasdsdasd')
// const mychart = ref()
// onMounted(() => {
//   let myEcharts = echarts.init(mychart.value)
//   // 配置项
//   myEcharts.setOption()
// })
console.log(hordata.value.xLabels)
</script>

<style lang="less" scoped>
header {
  height: 1rem;
  width: 100%;
  background-color: rgba(0, 0, 255, 0.2);
  h1 {
    font-size: 0.375rem;
    color: #fff;
    text-align: center;
    line-height: 1rem;
  }
}
.container {
  // 最大最小的宽度
  min-width: 1200px;
  max-width: 100vw;
  height: 100vh;
  margin: 0 auto;
  padding: 0.125rem 0.125rem 0;
  // background-color: gray;
  display: flex;
  // 设置左右在页面的份数
  .itemLeft,
  .itemRight {
    flex: 3;
  }
  .itemCenter {
    flex: 5;
    height: 10.5rpx;
    border: 1px solid blue;
    padding: 0.125rem;
    margin: 0.25rem;
  }
}
</style>
