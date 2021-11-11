import axios from '@axios'

export default {
  namespaced: true,
  state: {
    barang: [],
    detailBarang: {},
  },
  getters: {
    getBarang: state => state.barang,
    getDetailBarang: state => state.detailBarang,
  },
  mutations: {
    SET_BARANG(state, data) {
      state.barang = data
    },
    SET_DETAIL_BARANG(state, data) {
      state.detailBarang = data
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
  },
}
