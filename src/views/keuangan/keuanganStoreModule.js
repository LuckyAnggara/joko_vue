import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listJurnal: [],
    dataLedger: [],
  },
  getters: {
    getListJurnal: state => state.listJurnal,
    getDataLedger: state => state.dataLedger,
  },
  mutations: {
    SET_LIST_JURNAL(state, data) {
      state.listJurnal = data
    },
    SET_DATA_LEDGER(state, data) {
      state.dataLedger = data
    },
  },
  actions: {
    fetchListJurnal(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:8080/api/jurnal/', { params: queryParams })
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
