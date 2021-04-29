<template>
  <section>
    <b-row class="match-height">
      <b-col lg="3" cols="12">
        <b-card>
          <b-form-group>
            <h5>Filter</h5>
            <hr />
            <h6 class="mb-1">Tanggal Transaksi</h6>
            <b-input-group>
              <flat-pickr v-model="date.value" class="form-control" :config="date.config" placeholder="Filter By Tanggal" @on-close="dateFilter" />
              <b-input-group-append>
                <b-button variant="outline-primary" @click="clear">
                  Clear
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-card>
      </b-col>
      <b-col lg="9" cols="12">
        <statistik :data-transaksi="dataTransaksi" />
      </b-col>
      <b-col lg="12" cols="12">
        <b-card>
          <table-transaksi-pembelian @searchdata="searchQuery" @filterdata="filterQuery" :dataTransaksi="dataTransaksi" :dataTemp="dataTemp" />
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import store from '@/store'

import { BCard, BRow, BCol, BInputGroupAppend, BFormGroup, BInputGroup, BButton } from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import Statistik from './Statistik.vue'
import TableTransaksiPembelian from './component/TableTransaksiPembelian.vue'

export default {
  components: {
    TableTransaksiPembelian,
    BFormGroup,
    BInputGroupAppend,
    BInputGroup,
    flatPickr,
    Statistik,
    BCard,
    BRow,
    BCol,
    BButton,
  },
  data() {
    return {
      date: {
        value: Date.now(),
        config: {
          wrap: true, // set wrap to true only when using 'input-group'
          altFormat: 'd F Y',
          altInput: true,
          dateFormat: 'Y-m-d',
          mode: 'range',
        },
      },
      refTable: null,
      dataTransaksi: [],
      dataTemp: [],
    }
  },

  methods: {
    searchQuery(query) {
      if (query === '') {
        this.dataTransaksi = this.dataTemp
      } else {
        this.dataTransaksi = this.dataTemp.filter(
          item => item.nomorTransaksi.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.supplier.nama.toLowerCase().indexOf(query.toLowerCase()) > -1,
        )
      }
    },
    filterQuery(query) {
      if (query === 'Lunas') {
        this.dataTransaksi = this.dataTemp.filter(trx => trx.pembayaran.sisaPembayaran === null || trx.pembayaran.sisaPembayaran === 0)
      } else if (query === 'Kredit') {
        this.dataTransaksi = this.dataTemp.filter(trx => parseFloat(trx.pembayaran.sisaPembayaran) >= 0 && trx.pembayaran.statusPembayaran.value === 1)
      } else if (query === null || query === '') {
        this.dataTransaksi = this.dataTemp
      }
    },
    clear() {
      this.date.value = null
    },
    dateFilter(x) {
      this.loadTransaksi(this.moment(x[0]), this.moment(x[1]))
      this.totalInvoices = this.dataTransaksi.length
    },
    moment(value) {
      return this.$moment(value).format('DD MMMM YYYY')
    },
    formatRupiah(value) {
      return `Rp. ${value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
    loadTransaksi(dateawal = null, dateakhir = null) {
      store
        .dispatch('app-transaksi-pembelian/fetchListTransaksiPembelian', {
          dateawal,
          dateakhir,
        })
        .then(res => {
          store.commit('app-transaksi-pembelian/SET_LIST_TRANSAKSI_PEMBELIAN', res.data)
          this.dataTransaksi = res.data
          this.dataTemp = res.data
          this.totalInvoices = this.dataTransaksi.length
        })
    },
  },
  mounted() {
    this.loadTransaksi(this.moment(Date.now()), this.moment(Date.now()))
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
