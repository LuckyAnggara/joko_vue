import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listPersediaan: [],
    kartuPersediaan: [],
  },
  getters: {
    getListPersediaan: state => state.listPersediaan,
    getKartuPersediaan: state => state.kartuPersediaan,
  },
  mutations: {
    SET_LIST_PERSEDIAAN(state, data) {
      state.listPersediaan = data
    },
    SET_KARTU_PERSEDIAAN(state, data) {
      state.kartuPersediaan = data
    },
  },
  actions: {
    fetchListPersediaan(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}persediaan`, { params: queryParams })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchKartuPersediaan(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}persediaan/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
