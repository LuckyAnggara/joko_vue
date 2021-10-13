import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import adminStoreModule from '@/views/admin/adminStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import kegiatanStoreModule from './app/kegiatanStoreModule'
import authStoreModule from './app/authStoreModule'
import makStoreModule from './app/makStoreModule'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    'app-kegiatan': kegiatanStoreModule,
    'app-auth': authStoreModule,
    'app-admin': adminStoreModule,
    'app-mak': makStoreModule,
  },
  strict: process.env.DEV,
})
