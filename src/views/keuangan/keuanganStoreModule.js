import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listJurnal: [],
    listAkun: [],
    dataLedger: [],
  },
  getters: {
    getListAkun: state => state.listAkun,
    getListJurnal: state => state.listJurnal,
    getDataLedger: state => state.dataLedger,
  },
  mutations: {
    SET_LIST_AKUN(state, data) {
      state.listAkun = data
    },
    SET_LIST_JURNAL(state, data) {
      state.listJurnal = data
    },
    SET_DATA_LEDGER(state, data) {
      state.dataLedger = data
    },
  },
  actions: {
    fetchListAkun(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:8080/api/akun/', { params })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchListJurnal(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:8080/api/jurnal/${params.dateawal}/${params.dateakhir}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchLedgerByAkun(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          // .get(`http://127.0.0.1:8080/api/ledger/${id}`)
          .get(`http://127.0.0.1:8080/api/ledger/${params.id}/${params.dateawal}/${params.dateakhir}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
