import axios from '@axios'

export default {
  namespaced: true,
  state: {
    listJurnal: [],
    listAkun: [],
    dataLedger: [],
    dataAssets: [],
    dataLiabilities: [],
    dataEquity: [],
    dataPendapatan: [],
    dataBeban: [],

    // BEBAN
    dataOperasional: '',
    listOperasional: [],
  },
  getters: {
    getListAkun: state => state.listAkun,
    getListJurnal: state => state.listJurnal,
    getDataLedger: state => state.dataLedger,
    getNeracaAssets: state => state.dataAssets,
    getNeracaLiabilities: state => state.dataLiabilities,
    getNeracaEquity: state => state.dataEquity,
    getTotalAssets: state => state.totalAssets,
    getPendapatan: state => state.dataPendapatan,
    getBeban: state => state.dataBeban,

    // BEBAN
    getDataOpersional: state => state.dataBeban,
    getListOperasional: state => state.dataBeban.komponen,
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
    // NERACA
    SET_NERACA(state, data) {
      state.dataAssets = data.assets.filter(x => x.saldo !== 0)
      state.dataLiabilities = data.liabilities.filter(x => x.saldo !== 0)
      state.dataEquity = data.equity.filter(x => x.saldo !== 0)
    },
    // LABA RUGI
    SET_LABA(state, data) {
      state.dataPendapatan = data.pendapatan.filter(x => x.saldo !== 0)
      state.dataBeban = data.beban.filter(x => x.saldo !== 0)
    },
    // BEBAN
    SET_OPERASIONAL(state, data) {
      state.dataBeban = data
    },
  },
  actions: {
    // AKUN
    storeAkun(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8080/api/akun/store', data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    // NERACA
    fetchNeraca(ctx, tahun) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:8080/api/neraca/tahun/${tahun}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchLabaRugi(ctx, tahun) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:8080/api/labarugi/tahun/${tahun}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
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

    // BEBAN
    fetchOperasional(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`http://127.0.0.1:8080/api/beban/operasional/cabang/${params.cabang}/tahun/${params.tahun}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    storeBebanOpersional(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8080/api/beban/store', data)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
