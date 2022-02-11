import axios from '@axios'

export default {
  namespaced: true,
  state: {
    rencanaKegiatan: [],
    realisasiKegiatan: [],
  },
  getters: {
    getRencanaKegiatan: state => state.rencanaKegiatan,
    getRealisasiKegiatan: state => state.realisasiKegiatan,
  },
  mutations: {
    SET_RENCANA_KEGIATAN(state, data) {
      state.mak = data
    },
    SET_REALISASI_KEGIATAN(state, data) {
      state.detail = data
    },
  },
  actions: {
    fetchLaporanRencanaKegiatan(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}laporan/kegiatan/rencana?tahun_id=${params.tahun_id}&bidang_id=${params.bidang_id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchLaporanRealisasiKegiatan(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}laporan/kegiatan/realisasi?tahun_id=${params.tahun_id}&bidang_id=${params.bidang_id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
