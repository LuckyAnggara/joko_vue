import axios from '@axios'

export default {
  namespaced: true,
  state: {
    kendaraanDinas: [],
  },
  getters: {
    getKendaraanDinas: state => state.kendaraanDinas,
  },
  mutations: {
    SET_KENDARAAN_DINAS(state, data) {
      state.kendaraanDinas = data
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
  },
}
