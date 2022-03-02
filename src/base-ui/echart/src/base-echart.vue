<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineProps, withDefaults } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

const echartDivRef = ref<HTMLElement>()
// 定义props
// defineProps<{
//   width?: string
//   height?: string
// }>()
// 加默认值
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options: EChartsOption
  }>(),
  { width: '100%', height: '360px' }
)
//此时用onMounted挂载上去
onMounted(() => {
  const echartInstance = echarts.init(echartDivRef.value!) // 此时未挂载 需要在onMounted里面
  echartInstance.setOption(props.options)
})
</script>

<style lang="less" scoped></style>
