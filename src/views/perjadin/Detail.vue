<template>
  <section>
    <b-tabs vertical pills>
      <b-tab title="Umum" active> <umum /></b-tab>
      <!-- <b-tab title="Susunan Tim"><susunan-tim :form="form"/></b-tab> -->
      <!-- <b-tab title="Lampiran"> <lampiran :form="form"/></b-tab> -->
    </b-tabs>
  </section>
</template>

<script>
// import { ref } from '@vue/composition-api'
import { BTab, BTabs } from 'bootstrap-vue'
import Umum from './component/detail/Umum.vue'
// import SusunanTim from './component/detail/SusunanTim.vue'
// import Lampiran from './component/detail/Lampiran.vue'

export default {
  components: {
    BTab,
    BTabs,
    Umum,
    // SusunanTim,
    // Lampiran,
  },

  // methods: {
  //   loadPerjadin(id) {
  //     this.isBusy = !this.isBusy
  //     this.$store
  //       .dispatch('app-perjadin/detailPerjadin', {
  //         id,
  //       })
  //       .then(res => {
  //         this.$store.commit('app-perjadin/SET_DETAIL', res.data)
  //       })
  //   },
  // },
  setup() {},
}
</script>
