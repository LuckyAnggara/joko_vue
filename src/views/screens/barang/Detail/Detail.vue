<template>
  <section>
    <div ref="container">
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
              <b-tab title="Transaksi Penjualan" active>
                <table-transaksi-penjualan :data-transaksi="transaksiPenjualan" :data-temp="transaksiPenjualan" />
              </b-tab>
              <b-tab title="Transaksi Pembelian">
                <table-transaksi-pembelian :data-transaksi="transaksiPembelian" :data-temp="transaksiPembelian" />
              </b-tab>
              <b-tab title="Kartu Persediaan">
                <kartu-persediaan :data-persediaan="dataPersediaan" />
              </b-tab>
            </b-tabs>
          </b-card-body>
        </b-card>
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
import KartuPersediaan from '@/views/screens/persediaan/Component/KartuPersediaan.vue'
import TableTransaksiPenjualan from '@/views/transaksi/penjualan/component/TableTransaksiPenjualan.vue'
import TableTransaksiPembelian from '@/views/transaksi/pembelian/component/TableTransaksiPembelian.vue'

import BarangInfoCard from './BarangInfoCard.vue'
import BarangHargaJual from './BarangHargaJual.vue'
import SidebarAddHarga from '../Component/SidebarAddHarga.vue'
import SidebarAddSatuan from '../Component/SidebarAddSatuan.vue'

export default {
  components: {
    TableTransaksiPenjualan,
    TableTransaksiPembelian,
    BRow,
    BCol,
    BCardBody,
    BCard,
    // BAlert,
    // BLink,
    BTab,
    BTabs,
    KartuPersediaan,
    // KartuPersediaan,
    BarangInfoCard,
    BarangHargaJual,
    SidebarAddHarga,
    SidebarAddSatuan,
  },
  data() {
    return {
      dataPersediaan: [],
      dataBarang: {
        kode_barang: '',
      },
      transaksiPenjualan: [],
      transaksiPembelian: [],
    }
  },
  mounted() {
    this.loadMetaData()
    this.loadData()
  },
  methods: {
    loadMetaData() {
      const { id } = router.currentRoute.params

      const loader = this.$loading.show({
        container: this.$refs.container,
      })
      if (store.getters['app-barang/getListBarang'].length === 0) {
        store.dispatch('app-barang/fetchListBarang').then(res => {
          store.commit('app-barang/SET_LIST_BARANG', res.data)
          this.dataBarang = store.getters['app-barang/getBarangById'](parseInt(id, 10))
          this.loadData()
          loader.hide()
        })
      } else {
        this.dataBarang = store.getters['app-barang/getBarangById'](parseInt(id, 10))
        this.loadData()
        loader.hide()
      }
    },
    loadData() {
      const { id } = router.currentRoute.params
      store.dispatch('app-persediaan/fetchKartuPersediaan', { id }).then(res => {
        store.commit('app-persediaan/SET_KARTU_PERSEDIAAN', res.data)
        this.dataPersediaan = store.getters['app-persediaan/getKartuPersediaan']
      })
      store.dispatch('app-transaksi-penjualan/fetchListTransaksiByBarang', this.dataBarang.kode_barang).then(res => {
        this.transaksiPenjualan = res.data
      })
      store.dispatch('app-transaksi-pembelian/fetchListTransaksiByBarang', this.dataBarang.kode_barang).then(res => {
        this.transaksiPembelian = res.data
      })
    },
  },
}
</script>

<style></style>
