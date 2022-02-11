import axios from '@axios'

export default {
  namespaced: true,
  state: {
    kendaraanDinas: [],
    detailKendaraanDinas: {},
  },
  getters: {
    getKendaraanDinas: state => state.kendaraanDinas,
    getDetailKenderaanDinas: state => state.detailKendaraanDinas,
  },
  mutations: {
    SET_KENDARAAN_DINAS(state, data) {
      state.kendaraanDinas = data
    },
    SET_DETAIL_KENDARAAN_DINAS(state, data) {
      state.detailKendaraanDinas = data
    },
  },
  actions: {
    fetchKenderaanDinas(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}bmn-kendaraan-dinas/`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    getDetailKendaraanDinas(ctx, nopol) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}bmn-kendaraan-dinas/get-detail?nopol=${nopol}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
