<template>
  <section>
    <div>
      <!-- Alert: No item found -->
      <!-- <b-alert variant="danger" :show="dataBarang === undefined">
        <h4 class="alert-heading">
          Error fetching data Barang
        </h4>
        <div class="alert-body">
          Tidak ada data barang yang di pilih. Cek
          <b-link class="alert-link" :to="{ name: 'screen-barang' }">
            Daftar Barang
          </b-link>
          untuk barang lainnya.
        </div>
      </b-alert> -->

      <template v-if="dataBarang">
        <!-- First Row -->
        <b-row>
          <b-col cols="12" lg="8">
            <barang-info-card :data-barang="dataBarang" />
          </b-col>
          <b-col cols="12" lg="4">
            <barang-harga-jual :data-barang="dataBarang" />
          </b-col>
        </b-row>

        <barang-transaksi-card :data-barang="dataBarang" />
        <!-- <kartu-persediaan /> -->
      </template>
    </div>
    <sidebar-add-harga />
    <sidebar-add-satuan />
  </section>
</template>

<script>
// import { ref } from '@vue/composition-api'

import store from '@/store'
import router from '@/router'
import {
  BRow,
  BCol,
  // BAlert,
  // BLink
} from 'bootstrap-vue'
import BarangTransaksiCard from './BarangTransaksiCard.vue'

// import KartuPersediaan from '@/views/screens/persediaan/Component/KartuPersediaan.vue'
import BarangInfoCard from './BarangInfoCard.vue'
import BarangHargaJual from './BarangHargaJual.vue'
import SidebarAddHarga from '../Component/SidebarAddHarga.vue'
import SidebarAddSatuan from '../Component/SidebarAddSatuan.vue'

export default {
  components: {
    BRow,
    BCol,
    // BAlert,
    // BLink,
    BarangTransaksiCard,
    // KartuPersediaan,
    BarangInfoCard,
    BarangHargaJual,
    SidebarAddHarga,
    SidebarAddSatuan,
  },

  computed: {
    dataBarang() {
      console.info(router.currentRoute.params.id)
      return store.getters['app-barang/getBarangById'](router.currentRoute.params.id)
    },
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      console.info(store.getters['app-barang/getListBarang'].length)
      if (store.getters['app-barang/getListBarang'].length === 0) {
        store.dispatch('app-barang/fetchListBarang').then(res => {
          store.commit('app-barang/SET_LIST_BARANG', res.data)
          console.info(this.dataBarang)
        })
      }
      if (store.getters['app-transaksi/getListTransaksiPenjualan'].length === 0) {
        store.dispatch('app-transaksi/fetchListTransaksiPenjualan').then(res => {
          store.commit('app-transaksi/SET_LIST_TRANSAKSI_PENJUALAN', res.data)
          this.rows = store.getters['app-transaksi/getListTransaksiPenjualan']
        })
      }
    },
  },
}
</script>

<style></style>
