import axios from '@axios'

export default {
  namespaced: true,
  state: {
    pegawai: [],
    detail: {},
  },
  getters: {
    getPegawai: state => state.pegawai,
    getDetail: state => state.detail,
  },
  mutations: {
    SET_PEGAWAI(state, data) {
      state.pegawai = data
    },
    UPDATE_PEGAWAI(state, data) {
      state.pegawai.push(data)
    },
    SET_DETAIL(state, data) {
      state.detail = data
    },
    UPDATE_KOMPETENSI(state, data) {
      state.detail.peta_kompetensi.push(data)
    },
    DELETE_KOMPETENSI(state, id) {
      const b = state.detail.peta_kompetensi.findIndex(x => x.id === id)
      state.detail.peta_kompetensi.splice(b, 1)
    },
  },
  actions: {
    getData() {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL2}`)
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
    store(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}pegawai/store`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeLampiran(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}pegawai/store-lampiran`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeKompetensi(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}pegawai/store-kompetensi`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeLampiranKompetensi(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}pegawai/store-lampiran-kompetensi`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteKompetensi(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${axios.defaults.baseURL}pegawai/delete-kompetensi?id=${id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
