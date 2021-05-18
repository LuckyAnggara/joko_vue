import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import userStoreModule from '@/views/auth/userStoreModule'
import keuanganStoreModule from '@/views/keuangan/keuanganStoreModule'
import barangStoreModule from '@/views/master/barang/barangStoreModule'
import kontakStoreModule from '@/views/master/kontak/kontakStoreModule'
import persediaanStoreModule from '@/views/master/persediaan/persediaanStoreModule'
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
    'app-user': userStoreModule,
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
