import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import kegiatanStoreModule from './app/kegiatanStoreModule'
import authStoreModule from './app/authStoreModule'
import makStoreModule from './app/makStoreModule'
import generalStoreModul from './app/generalStoreModul'
import perjadinStoreModule from './app/perjadinStoreModule'
import pegawaiStoreModule from './app/pegawaiStoreModule'
import barangStoreModule from './app/barangStoreModule'
import bmnStoreModule from './app/bmnStoreModile'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    'app-kegiatan': kegiatanStoreModule,
    'app-auth': authStoreModule,
    'app-mak': makStoreModule,
    'app-general': generalStoreModul,
    'app-perjadin': perjadinStoreModule,
    'app-pegawai': pegawaiStoreModule,
    'app-barang': barangStoreModule,
    'app-bmn': bmnStoreModule,
  },
  strict: process.env.DEV,
})
