import axios from '@axios'

export default {
  namespaced: true,
  state: {
    tahun: [],
    pegawai: [],
    peran: [],
  },
  getters: {
    getTahun: state => state.tahun,
    getPegawai: state => state.pegawai,
    getPeran: state => state.peran,
  },
  mutations: {
    SET_TAHUN(state, data) {
      state.tahun = data
    },
    SET_PEGAWAI(state, data) {
      state.pegawai = data
    },
    SET_PERAN(state, data) {
      state.peran = data
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
    fetchPeran(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}peran/`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
