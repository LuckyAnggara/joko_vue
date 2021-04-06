export default {
  namespaced: true,
  state: {
    penjualan: [],
    activeOrder: '',
  },
  getters: {
    getJumlahPenjualan: state => state.penjualan.length,
    getActiveOrder: state => state.activeOrder,
    getPenjualan: state => state.penjualan,
  },
  mutations: {
    SET_ACTIVE_ORDER(state, data) {
      state.activeOrder = data
    },
    ADD_DATA_PENJUALAN(state, data) {
      state.penjualan.push(data)
    },
    ADD_ORDER(state, id) {
      console.info(id)
      // state.penjualan[id].orders.push(data)
    },
  },
  actions: {},
}
