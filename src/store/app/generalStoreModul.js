import axios from '@axios'

export default {
  namespaced: true,
  state: {
    tahun: [],
    pegawai: [],
    peran: [],
    urusan: [],
    mak: [],
    kanwil: [],
  },
  getters: {
    getTahun: state => state.tahun,
    getPegawai: state => state.pegawai,
    getPeran: state => state.peran,
    getUrusan: state => state.urusan,
    getMak: state => state.mak,
    getKanwil: state => state.kanwil,
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
    SET_URUSAN(state, data) {
      state.urusan = data
    },
    SET_MAK(state, data) {
      state.mak = data
    },
    SET_KANWIL(state, data) {
      state.kanwil = data
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
    fetchUrusan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}urusan/`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchMak(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}kegiatan?tahun_id=${params.tahun_id}&bidang_id=${params.bidang_id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchKanwil(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}kanwil/`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
