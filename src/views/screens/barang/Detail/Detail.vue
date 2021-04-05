<template>
  <section>
    <div>
      <!-- Alert: No item found -->
      <b-alert
        variant="danger"
        :show="dataBarang === undefined"
      >
        <h4 class="alert-heading">
          Error fetching data Barang
        </h4>
        <div class="alert-body">
          Tidak ada data barang yang di pilih. Cek
          <b-link
            class="alert-link"
            :to="{ name: 'screen-barang' }"
          >
            Daftar Barang
          </b-link>
          untuk barang lainnya.
        </div>
      </b-alert>

      <template v-if="dataBarang">
        <!-- First Row -->
        <b-row>
          <b-col
            cols="12"
            lg="8"
          >
            <barang-info-card :data-barang="dataBarang" />
          </b-col>
          <b-col
            cols="12"
            lg="4"
          >
            <barang-harga-jual :data-barang="dataBarang" />
          </b-col>
        </b-row>

        <invoice-list />
        <kartu-persediaan />
      </template>
    </div>
    <sidebar-add-harga />
    <sidebar-add-satuan />
  </section>
</template>

<script>
import store from '@/store'
import router from '@/router'
import {
  BRow, BCol, BAlert, BLink,
} from 'bootstrap-vue'
import InvoiceList from '@/views/apps/invoice/invoice-list/InvoiceList.vue'

import KartuPersediaan from '@/views/screens/persediaan/Component/KartuPersediaan.vue'
import BarangInfoCard from './BarangInfoCard.vue'
import BarangHargaJual from './BarangHargaJual.vue'
import SidebarAddHarga from '../Component/SidebarAddHarga.vue'
import SidebarAddSatuan from '../Component/SidebarAddSatuan.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,
    KartuPersediaan,
    BarangInfoCard,
    BarangHargaJual,
    SidebarAddHarga,
    SidebarAddSatuan,

    InvoiceList,
  },
  data() {
    return {
      dataBarang: '',
    }
  },
  beforeMount() {
    this.load()
  },
  methods: {
    load() {
      this.dataBarang = store.getters['app-barang/getBarangById'](
        router.currentRoute.params.id,
      )
    },
  },
}
</script>

<style></style>
