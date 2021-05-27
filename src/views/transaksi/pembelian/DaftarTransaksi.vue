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
}
</script>
