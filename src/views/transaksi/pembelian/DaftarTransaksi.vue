<template>
  <section>
    <b-tabs pills>
      <b-tab title="Pembelian" lazy>
        <transaksi-pembelian />
      </b-tab>
      <b-tab title="Retur" lazy>
        <transaksi-retur />
      </b-tab>
    </b-tabs>
  </section>
</template>

<script>
import store from '@/store'

import { BTab, BTabs } from 'bootstrap-vue'

import TransaksiPembelian from './component/TransaksiPembelian.vue'
import TransaksiRetur from './component/TransaksiRetur.vue'

export default {
  components: {
    TransaksiPembelian,
    TransaksiRetur,
    BTab,
    BTabs,
  },
  methods: {
    loadData(dateawal = null, dateakhir = null) {
      const user = JSON.parse(localStorage.getItem('userData'))
      const cabang = user.cabang.id
      store
        .dispatch('app-transaksi-pembelian/fetchListTransaksiPembelian', {
          cabang,
          dateawal,
          dateakhir,
        })
        .then(res => {
          store.commit('app-transaksi-pembelian/SET_LIST_TRANSAKSI_PEMBELIAN', res.data)
        })
    },
    loadAwal() {
      const d = new Date()
      const m = d.getMonth()
      const y = d.getFullYear()
      this.loadData(this.$moment(new Date(y, m, 1)), this.$moment(Date.now()))
    },
  },
  mounted() {
    this.loadAwal()
  },
}
</script>
