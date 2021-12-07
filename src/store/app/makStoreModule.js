import axios from '@axios'

export default {
  namespaced: true,
  state: {
    detail: {},
    mak: [],
    penyerapanSemua: [],
    monitoringRencanaRealisasi: [],
    revisiAnggaran: [],
    detailRevisiAnggaran: {},
    detailRevisiAnggaranUser: {},
  },
  getters: {
    getDetail: state => state.detail,
    getMak: state => state.mak,
    getPenyerapanSemua: state => state.penyerapanSemua,
    getMonitoringRencanaRealisasi: state => state.monitoringRencanaRealisasi,
    getRevisiAnggaran: state => state.revisiAnggaran,
    getDetailRevisiAnggaran: state => state.detailRevisiAnggaran,
    getDetailRevisiAnggaranUser: state => state.detailRevisiAnggaranUser,
  },
  mutations: {
    SET_MAK(state, data) {
      state.mak = data
    },
    SET_DETAIL(state, data) {
      state.detail = data
    },
    SET_PENYERAPAN_SEMUA(state, data) {
      state.penyerapanSemua = data
    },
    SET_MONITORING_RENCANA_REALISASI(state, data) {
      state.monitoringRencanaRealisasi = data
    },
    // REVISI ANGGARAN
    SET_REVISI_ANGGARAN(state, data) {
      state.revisiAnggaran = data
    },
    SET_DETAIL_REVISI_ANGGARAN(state, data) {
      state.detailRevisiAnggaran = data
    },
    SET_DETAIL_REVISI_ANGGARAN_USER(state, data) {
      state.detailRevisiAnggaranUser = data
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
    fetchRevisiAnggaran(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}revisi-anggaran?tahun_id=${params.tahun_id}`)
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
    fetchPenyerapanSemua(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}mak/penyerapan-semua?tahun_id=${params.tahun_id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchMonitoringRencanaRealisasi(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}mak/cek?bidang_id=${params.bidang_id}&tahun_id=${params.tahun_id}`)
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
    storeRevisiAnggaran(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}revisi-anggaran/store`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeLampiranRevisiAnggaran(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}revisi-anggaran/upload-lampiran-master`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteRevisiAnggaran(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${axios.defaults.baseURL}revisi-anggaran/delete-revisi-anggaran?id=${data.id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeRevisiAnggaranUser(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}revisi-anggaran/store-revisi`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    editRevisiAnggaran(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}revisi-anggaran/edit-revisi-anggaran`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    prosesRevisiAnggaran(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}revisi-anggaran/proses-revisi`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    editLampiranRevisiAnggaran(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}revisi-anggaran/edit-lampiran-revisi-anggaran`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    statusRevisiAnggaran(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}revisi-anggaran/status-revisi`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    statusRevisiAnggaranDetail(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}revisi-anggaran/status-revisi-detail`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
