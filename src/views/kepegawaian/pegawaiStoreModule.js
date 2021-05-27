import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listPegawai: [],
    listSales: [],
  },
  getters: {
    getListPegawai: state => state.listPegawai,
    getListSales: state => state.listPegawai.filter(x => x.sales === 1),
  },
  mutations: {
    SET_LIST_PEGAWAI(state, data) {
      state.listPegawai = data
    },
  },
  actions: {
    fetchPegawai(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}pegawai/`, {
            params: queryParams,
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
