import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listPersediaan: [],
    kartuPersediaan: [],
    listDataPenyesuaian: [],
  },
  getters: {
    getListPersediaan: state => state.listPersediaan,
    getKartuPersediaan: state => state.kartuPersediaan,
    getListDataPenyesuaian: state => state.listDataPenyesuaian,
  },
  mutations: {
    SET_LIST_PERSEDIAAN(state, data) {
      state.listPersediaan = data
    },
    SET_KARTU_PERSEDIAAN(state, data) {
      state.kartuPersediaan = data
    },
    SET_LIST_DATA_PENYESUAIAN(state, data) {
      state.listDataPenyesuaian = data
    },
  },
  actions: {
    fetchListPersediaan(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}persediaan`, { params: queryParams })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchKartuPersediaan(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}persediaan/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetcListDataPenyesuaian(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}persediaan/penyesuaian/cabang/${params.cabang}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    storePenyesuaianPersediaan(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}persediaan/store`, data)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}
