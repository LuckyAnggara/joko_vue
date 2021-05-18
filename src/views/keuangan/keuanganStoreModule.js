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
    UPDATE_LIST_JURNAL(state, data) {
      state.listJurnal.push(data)
    },
    SET_DATA_LEDGER(state, data) {
      state.dataLedger = data
    },
  },
  actions: {
    fetchListAkun(ctx, tahun) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:8080/api/akun/tahun/${tahun}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchListJurnal(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:8080/api/jurnal/${params.cabang}/${params.dateawal}/${params.dateakhir}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchListNomorJurnal(ctx, nomorjurnal) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:8080/api/jurnal/${nomorjurnal}`)
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
          .get(`http://127.0.0.1:8080/api/ledger/${params.cabang}/${params.id}/${params.dateawal}/${params.dateakhir}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeJurnal(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8080/api/jurnal/store', data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    // KENAPA PAKE NOMOR JURNAL, KARENA JURNAL PAKETAN TIDAK SATUAN KAYA ID..
    removeJurnal(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`http://127.0.0.1:8080/api/jurnal/delete/${data.data.jurnal}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    returJurnal(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8080/api/jurnal/retur', data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
