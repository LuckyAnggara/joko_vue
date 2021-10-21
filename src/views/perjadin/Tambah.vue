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
        <b-tab title="Objek Pemeriksaan"><obrik :form="form" /> </b-tab>
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
import Obrik from './component/Obrik.vue'

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
    Obrik,
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
    this.loadKanwil()
    this.loadUrusan()
  },
  watch: {
    form: {
      deep: true,
      handler() {
        if (this.form.tahun !== null) {
          this.loadMak()
        }
      },
    },
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
    loadUrusan() {
      this.$store.dispatch('app-general/fetchUrusan').then(res => {
        this.$store.commit('app-general/SET_URUSAN', res.data)
      })
    },
    loadKanwil() {
      if (this.form.tahun !== null || this.form.tahun !== '') {
        this.$store.dispatch('app-general/fetchKanwil').then(res => {
          this.$store.commit('app-general/SET_KANWIL', res.data)
        })
      }
    },
    loadMak() {
      if (this.form.tahun !== null || this.form.tahun !== '') {
        this.$store
          .dispatch('app-general/fetchMak', {
            bidang_id: this.userData.bidang_id,
            tahun_id: this.form.tahun === null ? 0 : this.form.tahun.id,
          })
          .then(res => {
            this.$store.commit('app-general/SET_MAK', res.data)
          })
      }
    },
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const form = ref({
      tahun: null,
      umum: {
        mak: null,
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
      obrik: {
        kanwil: {},
        detail: [],
      },
      lampiran: [],
    })
    return {
      userData,
      form,
    }
  },
}
</script>
