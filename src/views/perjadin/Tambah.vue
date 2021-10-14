<template>
  <section>
    <b-card>
      <b-tabs v-model="tabIndex">
        <b-tab title="Surat Perintah" active> <surat-perintah :form="form" /> </b-tab>
        <b-tab title="Susunan Tim"> <susunan-tim :form="form"/></b-tab>
        <b-tab title="Rencana Anggaran"> </b-tab>
        <b-tab title="Objek Pemeriksaan"> </b-tab>
      </b-tabs>

      <!-- Control buttons-->
      <div>
        <b-button-group class="mt-1">
          <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" :disabled="tabIndex === 0 ? true : false" @click="tabIndex--">
            Previous {{ tabIndex }}
          </b-button>
          <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" @click="tabIndex++">
            Next
          </b-button>
        </b-button-group>
      </div>
    </b-card>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BButtonGroup, BButton, BCard, BTab, BTabs } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import SuratPerintah from './component/SuratPerintah.vue'
import SusunanTim from './component/SusunanTim.vue'

export default {
  components: {
    BButtonGroup,
    BButton,
    BCard,
    BTab,
    BTabs,
    SuratPerintah,
    SusunanTim,
  },
  directives: {
    Ripple,
  },
  data: () => ({
    tabIndex: 1,
  }),
  mounted() {
    this.loadTahun()
    this.loadPegawai()
  },
  methods: {
    loadTahun() {
      this.$store.dispatch('app-kegiatan/fetchTahun').then(res => {
        this.$store.commit('app-general/SET_TAHUN', res.data)
      })
    },
    loadPegawai() {
      this.$store.dispatch('app-kegiatan/fetchPegawai').then(res => {
        this.$store.commit('app-general/SET_PEGAWAI', res.data)
      })
    },
  },
  setup() {
    const form = ref({
      tahun: null,
      surat_perintah: {
        nomor_surat: null,
        tanggal_surat: null,
        perihal: null,
      },
      susunan_tim: [],
      rencana_anggaran: [],
      objek_pemeriksaan: [],
      lampiran: [],
    })
    return {
      form,
    }
  },
}
</script>
