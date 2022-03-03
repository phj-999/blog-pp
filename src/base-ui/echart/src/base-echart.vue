<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import { useEchart } from '@/hooks/use-echart'
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
  const { setOptions } = useEchart(echartDivRef.value!)
  watchEffect(() => setOptions(props.options))
})
</script>

<style lang="less" scoped></style>
