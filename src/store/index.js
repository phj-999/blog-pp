import { createStore } from 'vuex'
import global from './modules/global'
import displayEchartsModules from './modules/displayEcharts'

export default createStore({
  ...global,
  //模块
  modules: {
    echartModule: displayEchartsModules
  }
})
