import * as echarts from 'echarts'

/**
 * echarts功能封装成hooks
 *@module echats
 *@param {HTMLElement} el dom元素
 *@exports echartInstance,setOptions,echarts
 */
export default function useEchats(HTMLElement) {
  // 创建一个 ECharts 实例，返回 echartsInstance，
  const echartInstance = echarts.init(HTMLElement)
  // 设置图表实例的配置项以及数据
  const setOptions = (options) => {
    echartInstance.setOption(options)
  }
  return {
    echartInstance,
    setOptions
  }
}
