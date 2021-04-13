import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listPelanggan: [],
  },
  getters: {
    getListPelanggan: state => state.listPelanggan,
    getPelangganById: state => id => state.listPelanggan.find(x => x.id === id),
  },
  mutations: {
    SET_LIST_PELANGGAN(state, data) {
      state.listPelanggan = data
    },
    UPDATE_LIST_PELANGGAN(state, data) {
      state.listPelanggan.push(data)
    },
    REMOVE_LIST_PELANGGAN(state, data) {
      state.listPelanggan.splice(data, 1)
    },
  },
  actions: {
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
