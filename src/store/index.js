import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import keuanganStoreModule from '@/views/keuangan/keuanganStoreModule'
import barangStoreModule from '@/views/screens/barang/barangStoreModule'
import kontakStoreModule from '@/views/screens/kontak/kontakStoreModule'
import persediaanStoreModule from '@/views/screens/persediaan/persediaanStoreModule'
import transaksiPenjualanStoreModule from '@/views/transaksi/transaksiPenjualanStoreModule'
import transaksiPembelianStoreModule from '@/views/transaksi/transaksiPembelianStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    'app-keuangan': keuanganStoreModule,
    'app-ecommerce': ecommerceStoreModule,
    'app-barang': barangStoreModule,
    'app-kontak': kontakStoreModule,
    'app-persediaan': persediaanStoreModule,
    'app-transaksi-penjualan': transaksiPenjualanStoreModule,
    'app-transaksi-pembelian': transaksiPembelianStoreModule,
  },
  strict: process.env.DEV,
})
