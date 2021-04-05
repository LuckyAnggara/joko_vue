export default {
  namespaced: true,
  state: {
    order: [],
  },
  getters: {
    getJumlahOrder: state => state.order.length,
    getOrder: state => state.order,
  },
  mutations: {
    ADD_ORDER(state, data) {
      state.order.push(data)
    },
  },
  actions: {},
}
