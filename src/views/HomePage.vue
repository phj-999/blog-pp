<template>
  <header>
    <h1>大数据可视化</h1>
  </header>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

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
</style>
