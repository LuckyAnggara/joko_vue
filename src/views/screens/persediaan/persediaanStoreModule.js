import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listPersediaan: [],
    listDetailPersediaan: [],
  },
  getters: {
    getListPersediaan: state => state.listPersediaan,
    getDetailListPersediaan: state => state.listDetailPersediaan,
  },
  mutations: {
    SET_LIST_PERSEDIAAN(state, data) {
      state.listPersediaan = data
    },
    SET_LIST_DETAIL_PERSEDIAAN(state, data) {
      state.listDetailPersediaan = data
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
    fetchDetailPersediaan(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}persediaan/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
