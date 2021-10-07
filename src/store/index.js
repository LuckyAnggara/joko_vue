import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import adminStoreModule from '@/views/admin/adminStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import kegiatanStoreModule from './app/kegiatanStoreModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    'app-kegiatan': kegiatanStoreModule,
    'app-admin': adminStoreModule,
  },
  strict: process.env.DEV,
})
