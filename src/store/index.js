import { createStore } from 'vuex'

import displayEchartsModules from './modules/displayEcharts'

export default createStore({
  //模块
  modules: {
    echartModule: displayEchartsModules
  }
})
