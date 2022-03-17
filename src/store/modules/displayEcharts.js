export default {
  namespaced: true,
  state: {
    horizontalbar: []
  },
  mutations: {
    getHorizontalbarList(state, list) {
      state.horizontalbar = list
    }
  },
  action: {
    async getHorizontalbarListAction() {}
  }
}
