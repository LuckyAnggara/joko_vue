import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listBarang: [],
    listGudang: [],
    jenis: [],
    satuan: [],
    merek: [],
    barang: '',
  },
  getters: {
    getListBarang: state => state.listBarang,
    getListGudang: state => state.listGudang,
    getListJenis: state => state.jenis,
    getListMerek: state => state.merek,
    getListSatuan: state => state.satuan,
    getBarangById: state => id => state.listBarang.find(x => x.id === id),
  },
  mutations: {
    SET_LIST_BARANG(state, data) {
      state.listBarang = data
    },
    SET_LIST_GUDANG(state, data) {
      state.listGudang = data
    },
    SET_LIST_JENIS(state, data) {
      state.jenis = data
    },
    SET_LIST_MEREK(state, data) {
      state.merek = data
    },
    SET_LIST_SATUAN(state, data) {
      state.satuan = data
    },
    UPDATE_LIST_BARANG(state, data) {
      state.listBarang.push(data)
    },
    UPDATE_LIST_GUDANG(state, data) {
      state.listGudang.push(data)
    },
    UPDATE_LIST_JENIS(state, data) {
      state.jenis.push(data)
    },
    UPDATE_LIST_MEREK(state, data) {
      state.merek.push(data)
    },
    UPDATE_LIST_SATUAN(state, data) {
      state.satuan.push(data)
    },
    REMOVE_LIST_BARANG(state, data) {
      state.listBarang.splice(data, 1)
    },
  },
  actions: {
    fetchListBarang(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:8000/api/barang', { params: queryParams })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchListGudang(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:8000/api/barang/gudang', {
            params: queryParams,
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    // JENIS SATUAN MEREK
    fetchListJenis(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:8000/api/barang/jenis', {
            params: queryParams,
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchListSatuan(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:8000/api/barang/satuan', {
            params: queryParams,
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchListMerek(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:8000/api/barang/merek', {
            params: queryParams,
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    addBarang(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8000/api/barang/store', data)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addGudang(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8000/api/barang/gudang/store', data)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addHargaBarang(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8000/api/barang/harga/store', data)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addJenis(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8000/api/barang/satuan/store', data)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addMerek(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8000/api/barang/merek/store', data)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addSatuan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8000/api/barang/satuan/store', data)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeBarang(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`http://127.0.0.1:8000/api/barang/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeHarga(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`http://127.0.0.1:8000/api/barang/harga/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
