import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
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
