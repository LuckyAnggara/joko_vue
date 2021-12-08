<template>
  <!-- <b-card> -->
  <b-tabs>
    <b-tab title="Realisasi" active> <rincian :title="`${detail.kode} - ${detail.nama}`" :data-rincian="dataRealisasi" :type="`REALISASI`"/></b-tab>
    <b-tab title="Rencana"><rincian :title="`${detail.kode} - ${detail.nama}`" :data-rincian="dataRencana" :type="`RENCANA`" /> </b-tab>
  </b-tabs>
  <!-- </b-card> -->
</template>

<script>
import { ref } from '@vue/composition-api'
import {
  // BCard,
  BTab,
  BTabs,
} from 'bootstrap-vue'

import Rincian from './component/Rincian.vue'

export default {
  components: {
    // BCard,
    BTab,
    BTabs,
    Rincian,
  },
  computed: {
    dataRealisasi() {
      return this.detail.rincian.filter(x => x.status === 'SELESAI')
    },
    dataRencana() {
      return this.detail.rincian.filter(x => x.status !== 'SELESAI')
    },
    detail() {
      return this.$store.getters['app-mak/getDetail']
    },
  },
  setup() {
    const tabIndex = ref(0)

    return {
      tabIndex,
    }
  },
}
</script>
