import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listKontak: [],
    listPelanggan: [],
    listSupplier: [],
  },
  getters: {
    getListKontak: state => state.listKontak,
    // GET MASTER DATA
    getListPelanggan: state => state.listKontak,
    getPelangganById: state => id => state.listPelanggan.find(x => x.id === id),
    getListSupplier: state => state.listKontak,
    getSupplierById: state => id => state.listSupplier.find(x => x.id === id),
  },
  mutations: {
    SET_LIST_KONTAK(state, data) {
      state.listKontak = data
      state.listPelanggan = data.filter(item => item.tipe === 'PELANGGAN')
      state.listSupplier = state.listKontak.filter(item => item.tipe === 'SUPPLIER')
    },
    // PELANGGAN
    UPDATE_LIST_KONTAK(state, data) {
      state.listKontak.push(data)
    },
    UPDATE_LIST_PELANGGAN(state, data) {
      state.listPelanggan.push(data)
    },
    REMOVE_LIST_PELANGGAN(state, data) {
      state.listPelanggan.splice(data, 1)
    },
    // SUPPLIER
    UPDATE_LIST_SUPPLIER(state, data) {
      state.listSupplier.push(data)
    },
    REMOVE_LIST_SUPPLIER(state, data) {
      state.listSupplier.splice(data, 1)
    },
  },
  actions: {
    fetchListKontak(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}kontak/`, { params: queryParams })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    addKontak(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}kontak/store`, data)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removePelanggan(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${axios.defaults.baseURL}kontak/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
