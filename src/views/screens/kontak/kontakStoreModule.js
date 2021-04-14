import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listKontak: [],
    listPelanggan: [],
  },
  getters: {
    getListKontak: state => state.listKontak,
    // GET MASTER DATA
    getListPelanggan: state => state.listKontak.filter(item => item.tipe === 'PELANGGAN'),
    getPelangganById: state => id => state.listPelanggan.find(x => x.id === id),
  },
  mutations: {
    SET_LIST_KONTAK(state, data) {
      state.listKontak = data
    },
    UPDATE_LIST_PELANGGAN(state, data) {
      state.listPelanggan.push(data)
    },
    REMOVE_LIST_PELANGGAN(state, data) {
      state.listPelanggan.splice(data, 1)
    },
  },
  actions: {
    fetchListKontak(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:8000/api/kontak/', { params: queryParams })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchListPelanggan(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:8000/api/kontak/pelanggan', { params: queryParams })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    addPelanggan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8000/api/kontak/pelanggan/store', data)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removePelanggan(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`http://127.0.0.1:8000/api/kontak/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
