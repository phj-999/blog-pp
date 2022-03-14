<template>
  <header>
    <h1>大数据可视化</h1>
    <div class="container">
      <!-- 左侧 -->
      <section class="itemLeft">
        <item-page>
          <horizontal-bar-chart />
          <gradient-stacked-chart />
        </item-page>
      </section>
      <!-- 中间 -->
      <section class="center">
        <map-chart />
      </section>
      <!-- 右侧 -->
      <section class="itemRight">
        <rose-chart />
        <stacked-column-chart />
      </section>
    </div>
  </header>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import itemPage from '@/components/echarts-page/itemPage.vue'
import horizontalBarChart from '@/components/echarts-page/src/horizontalBarChart.vue' //堆叠条形图
import gradientStackedChart from '@/components/echarts-page/src/gradientStackedChart.vue' //渐变堆叠面积图
import mapChart from '@/components/echarts-page/src/mapChart.vue' //地图
import roseChart from '@/components/echarts-page/src/roseChart.vue' //玫瑰图
import stackedColumnChart from '@/components/echarts-page/src/stackedColumnChart.vue' //堆叠柱状图

const mychart = ref()
onMounted(() => {
  let myEcharts = echarts.init(mychart.value)
  // 配置项
  myEcharts.setOption()
})
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
  display: flex;
  //设置左右份数
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
  min-width: 1200px;
  max-width: 2048px;
  margin: 0 auto;
  padding: 0.125rem 0.125rem 0;
  background-color: gray;
}
</style>
