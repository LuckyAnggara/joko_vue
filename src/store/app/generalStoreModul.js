import axios from '@axios'

export default {
  namespaced: true,
  state: {
    tahun: [],
    provinsi: [],
    pegawai: [],
    bidang: [],
    bidangIlmu: [],
    peran: [],
    urusan: [],
    golongan: [],
    jabatan: [],
    mak: [],
    kanwil: [],
    jenisKegiatan: [],
  },
  getters: {
    getTahun: state => state.tahun,
    getProvinsi: state => state.provinsi,
    getPegawai: state => state.pegawai,
    getBidang: state => state.bidang,
    getBidangIlmu: state => state.bidangIlmu,
    getPeran: state => state.peran,
    getUrusan: state => state.urusan,
    getGolongan: state => state.golongan,
    getJabatan: state => state.jabatan,
    getMak: state => state.mak,
    getKanwil: state => state.kanwil,
    getJenisKegiatan: state => state.jenisKegiatan,
  },
  mutations: {
    SET_TAHUN(state, data) {
      state.tahun = data
    },
    SET_PROVINSI(state, data) {
      state.provinsi = data
    },
    SET_PEGAWAI(state, data) {
      state.pegawai = data
    },
    SET_BIDANG(state, data) {
      state.bidang = data
    },
    SET_BIDANG_ILMU(state, data) {
      state.bidangIlmu = data
    },
    SET_PERAN(state, data) {
      state.peran = data
    },
    SET_URUSAN(state, data) {
      state.urusan = data
    },
    SET_GOLONGAN(state, data) {
      state.golongan = data
    },
    SET_JABATAN(state, data) {
      state.jabatan = data
    },
    SET_MAK(state, data) {
      state.mak = data
    },
    SET_KANWIL(state, data) {
      state.kanwil = data
    },
    SET_JENIS_KEGIATAN(state, data) {
      state.jenisKegiatan = data
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
    fetchProvinsi(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}provinsi/`, data)
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
    fetchBidang(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}bidang/`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchBidangIlmu(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}bidang-ilmu/`, data)
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
    fetchJenisKegiatan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}jenis-kegiatan/`, data)
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
    fetchGolongan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}golongan/`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchJabatan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}jabatan/`, data)
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
