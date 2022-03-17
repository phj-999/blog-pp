<template>
  <div>
    <h1>表2</h1>
    <base-echart />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import baseEchart from '../baseui/baseEchart.vue'
const props = defineProps({
  //type: Array
  xLabels: {
    type: Array
  },
  values: {
    type: Array
  }
})
console.log(props.xLabels, props.values, 'props')
</script>

<style lang="less" scoped></style>
