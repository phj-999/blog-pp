import * as echarts from 'echarts'

import ChinaMapData from '@/base-ui/echart/data/china.json'

echarts.registerMap('china', ChinaMapData) //中国地图注册

export function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el)
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  const updateSize = () => {
    echartInstance.resize()
  }
  // 监听浏览器大小改变  echart就resize
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
