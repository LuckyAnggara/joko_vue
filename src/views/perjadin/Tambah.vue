<template>
  <section>
    <b-card>
      <b-tabs v-model="tabIndex">
        <b-tab title="Umum" active>
          <hr />
          <umum :form="form" />
        </b-tab>
        <b-tab title="Susunan Tim">
          <hr />
          <susunan-tim :form="form"
        /></b-tab>
        <b-tab title="Rencana Anggaran">
          <hr />
          <rencana-anggaran :form="form"
        /></b-tab>
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
import Umum from './component/Umum.vue'
import SusunanTim from './component/SusunanTim.vue'
import RencanaAnggaran from './component/RencanaAnggaran.vue'

export default {
  components: {
    BButtonGroup,
    BButton,
    BCard,
    BTab,
    BTabs,
    Umum,
    SusunanTim,
    RencanaAnggaran,
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
    this.loadPeran()
  },
  methods: {
    loadTahun() {
      this.$store.dispatch('app-general/fetchTahun').then(res => {
        this.$store.commit('app-general/SET_TAHUN', res.data)
      })
    },
    loadPegawai() {
      this.$store.dispatch('app-general/fetchPegawai').then(res => {
        this.$store.commit('app-general/SET_PEGAWAI', res.data)
      })
    },
    loadPeran() {
      this.$store.dispatch('app-general/fetchPeran').then(res => {
        this.$store.commit('app-general/SET_PERAN', res.data)
      })
    },
  },
  setup() {
    const form = ref({
      tahun: null,
      umum: {
        tujuan: null,
        keberangkatan: 'Jakarta',
        tanggal_berangkat: null,
        tanggal_kembali: null,
        jumlah_hari: 0,
      },
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
