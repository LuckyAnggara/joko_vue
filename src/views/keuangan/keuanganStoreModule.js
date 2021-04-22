import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listJurnal: [],
    // PERSEDIAAN
    listDetailPersediaan: [],
  },
  getters: {
    getListJurnal: state => state.listJurnal,
  },
  mutations: {
    SET_LIST_JURNAL(state, data) {
      state.listJurnal = data
    },
  },
  actions: {
    fetchListJurnal(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:8080/api/jurnal/', { params: queryParams })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
