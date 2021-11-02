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
    UPDATE_STATUS_REALISASI(state) {
      state.realisasiDone = true
    },
    UPDATE_DETAIL_DATA(state, x) {
      state.detail.tanggal_realisasi_kegiatan = x.tanggal_realisasi_kegiatan
      state.detail.total_realisasi = x.total_realisasi
      state.detail.bendahara = x.bendahara
      state.detail.ppk = x.ppk
      state.detail.checker = x.checker
      state.detail.status_realisasi = 'SUDAH'
    },
  },
  actions: {
    fetchRencanaKegiatan(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}kegiatan?tahun_id=${params.tahun_id}&bidang_id=${params.bidang_id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeRencanaKegiatan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}kegiatan/store-rencana`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteKegiatan(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${axios.defaults.baseURL}kegiatan/delete-kegiatan?id=${id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeLampiranRencanaKegiatan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}kegiatan/upload-lampiran-rencana`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteLampiran(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${axios.defaults.baseURL}kegiatan/delete-lampiran?id=${id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeLampiranKegiatan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}kegiatan/upload-lampiran-tambahan`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    statusKegiatan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}kegiatan/status`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeRealisasi(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}kegiatan/update-realisasi`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    //
    fetchListRealisasiKegiatan(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}realisasi?tahun_id=${params.tahun_id}&bidang_id=${params.bidang_id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchDetailRealisasiKegiatan(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}realisasi/show?id=${id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeRealisasiKegiatan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}realisasi/store`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeLampiranRealisasiKegiatan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}realisasi/upload-lampiran`, data)
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
    updateStatusRealisasiKegiatan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}realisasi/update-status`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    // LAPORAN
    fetchLaporanRincian(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}realisasi/laporan-rincian?tahun_id=${params.tahun_id}&bidang_id=${params.bidang_id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
