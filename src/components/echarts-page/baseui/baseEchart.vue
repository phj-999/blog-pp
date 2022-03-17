<template>
  <div class="base-echart">
    <div ref="echartDivRef" />
  </div>
</template>

<script setup>
import useEchats from '@/hooks/useEchart'
import { ref, onMounted, watchEffect, defineProps } from 'vue'

const props = defineProps({
  options: {
    type: Object
  }
})

const echartDivRef = ref()
onMounted(() => {
  const { setOptions } = useEchats(echartDivRef.value)
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style lang="less" scoped></style>
