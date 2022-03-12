<template>
  <div id="mychart" ref="mychart"></div>
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

<style scoped>
#mychart {
  width: 500px;
  height: 500px;
  border: 1px solid red;
}
</style>
