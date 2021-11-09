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
  },
  actions: {
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
  },
}
