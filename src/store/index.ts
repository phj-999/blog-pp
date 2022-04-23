import { createStore, Store, useStore as useVuexStore } from 'vuex'
// import global from './modules/global'
import { IRootState, IStoreType } from './types'
// import displayEchartsModules from './modules/displayEcharts'

const store =
  createStore <
  IRootState >
  ({
    state() {
      return {}
    }
    //模块
    // modules: {
    //   echartModule: displayEchartsModules
    // }
  })
export default store
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}