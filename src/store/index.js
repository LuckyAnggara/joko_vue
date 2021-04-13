import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import barangStoreModule from '@/views/screens/barang/barangStoreModule'
import kontakStoreModule from '@/views/screens/kontak/kontakStoreModule'
import persediaanStoreModule from '@/views/screens/persediaan/persediaanStoreModule'
import transaksiStoreModule from '@/views/transaksi/transaksiStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    'app-ecommerce': ecommerceStoreModule,
    'app-barang': barangStoreModule,
    'app-kontak': kontakStoreModule,
    'app-persediaan': persediaanStoreModule,
    'app-transaksi': transaksiStoreModule,
  },
  strict: process.env.DEV,
})
