import axios from '@axios'

export default {
  namespaced: true,
  state: {
    tahun: [],
    pegawai: [],
  },
  getters: {
    getTahun: state => state.tahun,
    getPegawai: state => state.pegawai,
  },
  mutations: {
    SET_TAHUN(state, data) {
      state.tahun = data
    },
    SET_PEGAWAI(state, data) {
      state.pegawai = data
    },
  },
  actions: {
    fetchTahun(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}tahun/`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchPegawai(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}pegawai/`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
