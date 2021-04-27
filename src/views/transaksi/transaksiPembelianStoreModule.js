import axios from '@axios'

export default {
  namespaced: true,
  state: {
    // PEMBELIAN
    draftPembelian: [],
    activePembelian: '',
    activeDataInvoice: '',
    activeOrder: '',
    listPembelian: [],
  },
  getters: {
    // PEMBELIAN
    getJumlahPembelian: state => state.draftPembelian.length,
    getActiveOrder: state => state.activeOrder,
    getActivePembelian: state => state.activePembelian,
    getDataInvoice: state => state.activeDataInvoice,

    // DRAFT TRANSAKSI PEMBELIAN
    getListDraftPembelian: state => state.draftPembelian,
    getDraftByID: state => nomor => state.draftPembelian.find(x => x.nomor === nomor),
    // TRANSAKSI PEMBELIAN
    getListTransaksiPembelian: state => state.listPembelian,
    getTransaksiByBarang: state => kodeBarang => state.listPembelian.filter(x => x.orders.kode_barang_id === kodeBarang),
  },
  mutations: {
    // PEMBELIAN TRANSAKSI
    SET_ACTIVE_ORDER(state, data) {
      state.activeOrder = data
    },
    SET_ACTIVE_PEMBELIAN(state, data) {
      state.activePembelian = data
    },
    SET_DATA_INVOICE(state, data) {
      state.activeDataInvoice = data
    },
    SET_INVOICE(state, data) {
      state.activePembelian.invoice = data
    },
    ADD_ORDER_TO_ACTIVE_PEMBELIAN(state, data) {
      state.activePembelian.orders = data
    },

    // ADD_ORDER(state, id) {
    //   // state.pembelian[id].orders.push(data)
    // },

    // DATA DRAFT TRANSAKSI PEMBELIAN
    ADD_DRAFT_PEMBELIAN(state, data) {
      const exist = state.draftPembelian.find(x => x.nomor === data.nomor)
      if (exist === undefined) {
        state.draftPembelian.push(data)
      }
    },
    REMOVE_DRAFT_PEMBELIAN(state, data) {
      state.draftPembelian.splice(data, 1)
    },

    // DATA LIST TRANSAKSI PEMBELIAN
    SET_LIST_TRANSAKSI_PEMBELIAN(state, data) {
      state.listPembelian = data
    },
    SET_DATA_INVOICE_FROM_DAFTAR(state, data) {
      state.activeDataInvoice = state.listPembelian.find(x => x.id === data)
    },
  },
  actions: {
    addTransaksi(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${axios.defaults.baseURL}pembelian/store`, data)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    fetchListTransaksiPembelian(ctx, params) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}pembelian/${params.dateawal}/${params.dateakhir}`)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchDataBank(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${axios.defaults.baseURL}bank/`, {
            params: queryParams,
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
  },
}
