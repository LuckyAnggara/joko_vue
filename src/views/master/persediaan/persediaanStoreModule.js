import axios from '@axios'

export default {
  namespaced: true,
  mutations: {
    SET_LIST_PERSEDIAAN(state, data) {
      state.listPersediaan = data
    },
    SET_KARTU_PERSEDIAAN(state, data) {
      state.kartuPersediaan = data
    },
  },
  actions: {
    login(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}persediaan`, { params: queryParams })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
