import axios from '@axios'

export default {
  namespaced: true,
  state: {
    detail: {},
    log: [],
    realisasiDone: false,
  },
  getters: {
    getDetail: state => state.detail,
    getLog: state => state.log,
    getRealisasi: state => state.realisasiDone,
  },
  mutations: {
    SET_DETAIL(state, data) {
      state.detail = data
    },
    SET_LOG(state, data) {
      state.log = data
    },
    UPDATE_LAMPIRAN(state, data) {
      state.detail.lampiran.push(...data)
    },
    DELETE_LAMPIRAN(state, i) {
      state.detail.lampiran.splice(i, 1)
    },
    UPDATE_STATUS_REALISASI(state, x) {
      state.realisasiDone = x
    },
  },
  actions: {
    fetchPegawaiBelumRealisasi(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}perjadin?tahun_id=${params.tahun_id}&bidang_id=${params.bidang_id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchPerjadin(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}perjadin?tahun_id=${params.tahun_id}&bidang_id=${params.bidang_id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deletePerjadin(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${axios.defaults.baseURL}perjadin/delete-perjadin?perjadin_id=${id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storePerjadin(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}perjadin/store`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeRealisasi(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}perjadin/store-realisasi`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storePerjadinRealisasiLampiran(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}perjadin/upload-perjadin-realisasi-lampiran`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    statusPerjadin(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}perjadin/status`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteLampiran(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${axios.defaults.baseURL}perjadin/delete-lampiran?id=${id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeLampiranPerjadin(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}perjadin/upload-lampiran`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteRealisasiKegiatan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${axios.defaults.baseURL}realisasi/delete-realisasi?id=${data.id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    // PRINT
    printSPD(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}print/download-spd?id=${id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    // EDIT

    editUmum(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}perjadin/edit-umum`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    editMak(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}perjadin/edit-mak`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    editTim(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}perjadin/edit-tim`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
