<template>
  <section>
    <b-row>
      <b-col lg="3">
        <b-card>
          <b-img-lazy
            thumbnail
            fluid
            src="https://banner2.cleanpng.com/20180603/jx/kisspng-user-interface-design-computer-icons-default-stephen-salazar-photography-5b1462e1b19d70.1261504615280626897275.jpg"
          />
        </b-card>
      </b-col>
      <b-col lg="9">
        <b-card>
          <b-tabs content-class="mt-3">
            <b-tab title="Data" active>
              <umum />
            </b-tab>
            <b-tab title="Peta Kompetensi"> <peta-kompetensi /></b-tab>
            <b-tab title="Perjalanan Dinas" disabled><p>Perjalanan Dinas</p></b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BRow, BCol, BCard, BImgLazy, BTabs, BTab } from 'bootstrap-vue'
import Umum from './component/detail/Umum.vue'
import PetaKompetensi from './component/detail/PetaKompetensi.vue'
// import { ref } from '@vue/composition-api'
// import { formatRupiah } from '@core/utils/filter'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BImgLazy,
    BTabs,
    BTab,
    Umum,
    PetaKompetensi,
  },
  // computed: {
  //   data() {
  //     return this.$store.getters['app-pegawai/getDetail']
  //   },
  // },

  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))

    return {
      userData,
    }
  },
}
</script>
