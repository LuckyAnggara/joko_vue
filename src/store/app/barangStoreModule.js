import axios from '@axios'

export default {
  namespaced: true,
  state: {
    barang: [],
    pembelian: [],
    detailBarang: {},
    detailPembelian: {},
  },
  getters: {
    getBarang: state => state.barang,
    getPembelian: state => state.pembelian,
    getDetailBarang: state => state.detailBarang,
    getDetailPembelian: state => state.detailPembelian,
  },
  mutations: {
    SET_BARANG(state, data) {
      state.barang = data
    },
    SET_PEMBELIAN(state, data) {
      state.pembelian = data
    },
    SET_DETAIL_BARANG(state, data) {
      state.detailBarang = data
    },
    SET_DETAIL_PEMBELIAN(state, data) {
      state.detailPembelian = data
    },
  },
  actions: {
    fetchBarang(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}barang/`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeBarang(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}barang/store-barang`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    editBarang(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}barang/edit-barang`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteBarang(ctx, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${axios.defaults.baseURL}barang/delete-barang?id=${id}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchPembelian(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}barang/daftar-pembelian`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storePembelian(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}barang/store-pembelian`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeLampiranPembelian(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}barang/store-pembelian-lampiran`, data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
