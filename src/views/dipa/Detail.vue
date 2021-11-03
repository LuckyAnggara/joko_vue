<template>
  <!-- <b-card> -->
  <b-tabs>
    <b-tab title="Realisasi" active> <rincian :data-rincian="dataRealisasi"/></b-tab>
    <b-tab title="Rencana"><rincian :data-rincian="dataRencana" /> </b-tab>
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
      const b = this.$store.getters['app-mak/getDetail']
      return b.filter(x => x.status === 'SELESAI')
    },
    dataRencana() {
      const b = this.$store.getters['app-mak/getDetail']
      return b.filter(x => x.status !== 'SELESAI')
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
