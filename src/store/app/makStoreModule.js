import axios from '@axios'

export default {
  namespaced: true,
  state: {
    detail: {},
    mak: [],
  },
  getters: {
    getDetail: state => state.detail,
    getMak: state => state.mak,
  },
  mutations: {
    SET_MAK(state, data) {
      state.mak = data
    },
    SET_DETAIL(state, data) {
      state.detail = data
    },

    /* eslint-disable */
    SET_PASSIVE_PAGU(state) {
      state.mak.forEach(x => {
        x.passive_pagu = x.pagu
      })
    },
    /* eslint-enable */
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
    fetchMak(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}mak?tahun_id=${params.tahun_id}&bidang_id=${params.bidang_id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeMAK(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}mak/store`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeRevisiMak(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}mak/store-revisi`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    cekKodeMak(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}mak/cek-kode-mak`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteMAK(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${axios.defaults.baseURL}mak/delete-kegiatan?id=${data.id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
