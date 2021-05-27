import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listJabatan: [],
    listDivisi: [],
    listPegawai: [],
    listSales: [],
  },
  getters: {
    getListPegawai: state => state.listPegawai,
    getListSales: state => state.listSales,
  },
  mutations: {
    SET_LIST_PEGAWAI(state, data) {
      state.listPegawai = data
      state.listSales = state.listPegawai.filter(x => x.jabatan_id === 5)
    },
  },
  actions: {
    fetchListPegawai(ctx, queryParams) {
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
