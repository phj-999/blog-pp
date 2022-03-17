import { requestHorizontalbar } from '@/service/echarts'

const displayEchartsModules = {
  namespaced: true,
  state: () => ({
    horizontalbar: []
  }),
  mutations: {
    getHorizontalbarList(state, list) {
      state.horizontalbar = list
    }
  },
  actions: {
    async getEchartsListAction({ commit }) {
      const horizonResult = await requestHorizontalbar()
      commit('getHorizontalbarList', horizonResult.data.chartData.chartData)
      console.log(horizonResult.data, 'getHorizontalbarListAction')
    }
  }
}

export default displayEchartsModules
