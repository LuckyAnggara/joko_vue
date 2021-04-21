<template>
  <section>
    <div>
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
        <b-card>
          <b-card-body>
            <b-tabs pills>
              <b-tab title="Transaksi" active>
                <barang-transaksi-card :title="'Data Transaksi'" :data-barang="dataBarang" />
              </b-tab>
              <b-tab title="Kartu Persediaan">
                <kartu-persediaan :data-barang="dataBarang" />
              </b-tab>
            </b-tabs>
          </b-card-body>
        </b-card>
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
  BTab,
  BTabs,
  BCard,
  BCardBody,
  // BAlert,
  // BLink
} from 'bootstrap-vue'
import BarangTransaksiCard from './BarangTransaksiCard.vue'
import KartuPersediaan from './KartuPersediaan.vue'

// import KartuPersediaan from '@/views/screens/persediaan/Component/KartuPersediaan.vue'
import BarangInfoCard from './BarangInfoCard.vue'
import BarangHargaJual from './BarangHargaJual.vue'
import SidebarAddHarga from '../Component/SidebarAddHarga.vue'
import SidebarAddSatuan from '../Component/SidebarAddSatuan.vue'

export default {
  components: {
    BRow,
    BCol,
    BCardBody,
    BCard,
    // BAlert,
    // BLink,
    BTab,
    BTabs,
    KartuPersediaan,
    BarangTransaksiCard,
    // KartuPersediaan,
    BarangInfoCard,
    BarangHargaJual,
    SidebarAddHarga,
    SidebarAddSatuan,
  },
  data() {
    return {
      dataPersediaan: [],
      dataBarang: {},
    }
  },
  mounted() {
    this.loadMetaData()
    this.loadData()
  },
  methods: {
    loadMetaData() {
      if (store.getters['app-barang/getListBarang'].length === 0) {
        store.dispatch('app-barang/fetchListBarang').then(res => {
          store.commit('app-barang/SET_LIST_BARANG', res.data)
        })
      }
      if (store.getters['app-transaksi/getListTransaksiPenjualan'].length === 0) {
        store.dispatch('app-transaksi/fetchListTransaksiPenjualan').then(res => {
          store.commit('app-transaksi/SET_LIST_TRANSAKSI_PENJUALAN', res.data)
          this.loadData()
        })
      } else {
        this.loadData()
      }
    },
    loadData() {
      const { id } = router.currentRoute.params

      this.dataBarang = store.getters['app-barang/getBarangById'](parseInt(id, 10))
    },
  },
}
</script>

<style></style>
