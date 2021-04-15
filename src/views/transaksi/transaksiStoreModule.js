import axios from '@axios'

export default {
  namespaced: true,
  state: {
    draftPenjualan: [],
    activePenjualan: '',
    activeDataInvoice: '',
    activeOrder: '',
    listPenjualan: [],
  },
  getters: {
    getJumlahPenjualan: state => state.draftPenjualan.length,
    getActiveOrder: state => state.activeOrder,
    getActivePenjualan: state => state.activePenjualan,
    getDataInvoice: state => state.activeDataInvoice,

    // DRAFT TRANSAKSI PENJUALAN
    getListDraftPenjualan: state => state.draftPenjualan,
    getDraftByID: state => nomor => state.draftPenjualan.find(x => x.nomor === nomor),
    // TRANSAKSI PENJUALAN
    getListTransaksiPenjualan: state => state.listPenjualan,
    getTransaksiByBarang: state => kodeBarang => state.listPenjualan.filter(x => x.orders.kode_barang_id === kodeBarang),
  },
  mutations: {
    // PENJUALAN TRANSAKSI
    SET_ACTIVE_ORDER(state, data) {
      state.activeOrder = data
    },
    SET_ACTIVE_PENJUALAN(state, data) {
      state.activePenjualan = data
    },
    SET_DATA_INVOICE(state, data) {
      state.activeDataInvoice = data
    },
    SET_INVOICE(state, data) {
      state.activePenjualan.invoice = data
    },
    ADD_ORDER_TO_ACTIVE_PENJUALAN(state, data) {
      state.activePenjualan.orders = data
    },

    ADD_ORDER(state, id) {
      console.info(id)
      // state.penjualan[id].orders.push(data)
    },

    // DATA DRAFT TRANSAKSI PENJUALAN
    ADD_DRAFT_PENJUALAN(state, data) {
      const exist = state.draftPenjualan.find(x => x.nomor === data.nomor)
      console.info(exist)
      if (exist === undefined) {
        console.info()
        state.draftPenjualan.push(data)
      }
    },
    REMOVE_DRAFT_PENJUALAN(state, data) {
      state.draftPenjualan.splice(data, 1)
    },

    // DATA LIST TRANSAKSI PENJUALAN
    SET_LIST_TRANSAKSI_PENJUALAN(state, data) {
      state.listPenjualan = data
    },
    SET_DATA_INVOICE_FROM_DAFTAR(state, data) {
      state.activeDataInvoice = state.listPenjualan.find(x => x.id === data)
      console.info(state.listPenjualan.find(x => x.id === data))
    },
  },
  actions: {
    addTransaksi(ctx, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:8000/api/penjualan/store', data)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchListTransaksiPenjualan(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://127.0.0.1:8000/api/penjualan/', {
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
