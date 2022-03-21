<template>
  <div>
    <h1>表2</h1>
    <base-echart :options="options" />
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import * as echarts from 'echarts'
import baseEchart from '../baseui/baseEchart.vue'

const props = defineProps({
  //type: Array
  horBardata: {
    type: Object
    // xdatas,
    // ydatas,
    // horbarData
  }
})
console.log(props)
// const { xLabels, values } = JSON.parse(JSON.stringify(props.hordata))
console.log(props.horBardata, 'props')
// options参数配置
const options = computed(() => {
  return {
    grid: {
      top: '3%',
      left: '1%',
      right: '6%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: props.horBardata.xdatas,
      axisLine: {
        lineStyle: {
          color: '#fff'
        }
      }
    },
    series: [
      {
        data: props.horBardata.ydatas,
        type: 'bar',
        itemStyle: {
          normal: {
            barBorderRadius: [0, 20, 20, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: '#005eaa'
              },
              {
                offset: 0.5,
                color: '#339ca8'
              },
              {
                offset: 1,
                color: '#cda819'
              }
            ])
          }
        }
      }
    ]
  }
})
</script>

<style lang="less" scoped></style>
