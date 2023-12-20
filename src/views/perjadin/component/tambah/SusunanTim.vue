<template>
  <!-- <b-row class="match-height"> -->

  <b-row class="match-height">
    <b-col lg="12" md="12" sm="12">
      <b-card-body>
        <b-row>
          <b-col md="3" lg="3" sm="12" class="mb-2">
            <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="primary" size="sm" @click="tambahPegawai()">
              Tambah Data
            </b-button>
          </b-col>
        </b-row>
        <ul style="list-style-type: none;">
          <b-row>
            <b-col lg="1">
              <label>NO </label>
            </b-col>
            <b-col lg="2">
              <label>NIP </label>
            </b-col>
            <b-col lg="3">
              <label>NAMA PEGAWAI </label>
            </b-col>
            <b-col lg="3">
              <label>JABATAN </label>
            </b-col>
            <b-col lg="2">
              <label>PERAN </label>
            </b-col>
            <b-col lg="1">
              <label>ACTION </label>
            </b-col>
          </b-row>
        </ul>
        <hr />
        <ul style="list-style-type: none;" v-for="(tim, index) in perjadinStore.form.susunan_tim" :key="tim.id">
          <b-row>
            <b-col lg="1">
              <b-form-input plaintext :value="index + 1" />
            </b-col>
            <b-col lg="2">
              <b-form-input plaintext :value="perjadinStore.form.susunan_tim[index].pegawai.nip" />
            </b-col>
            <b-col lg="3">
              <v-select
                @search="searchPegawai"
                v-model="perjadinStore.form.susunan_tim[index].pegawai"
                placeholder="Nama Pegawai"
                label="name"
                :options="pegawaiStore.items"
                :loading="pegawaiStore.isLoading"
              />
            </b-col>
            <b-col lg="3">
              <b-form-input plaintext :value="perjadinStore.form.susunan_tim[index].pegawai?.jabatan?.name" />
            </b-col>
            <b-col lg="2">
              <v-select v-model="perjadinStore.form.susunan_tim[index].peran" placeholder="Peran" label="nama" :options="peranOption" />
            </b-col>
            <b-col lg="1">
              <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-danger" class="btn-icon rounded-circle" @click="deletePegawai(index)">
                <feather-icon icon="TrashIcon" />
              </b-button>
            </b-col>
          </b-row>
        </ul>
        <small>Pastikan setiap anggota tim memiliki peran!</small>
      </b-card-body>
    </b-col>
  </b-row>
</template>

<script>
import { BCardBody, BRow, BCol, BButton, BFormInput } from 'bootstrap-vue'
import usePerjadinStore from '@/store/pinia/perjadinStore'
import usePegawaiStore from '@/store/pinia/pegawaiStore'

import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    BCardBody,
    BButton,
    BFormInput,
    vSelect,
  },
  directives: {
    Ripple,
  },
  computed: {
    pegawaiOption() {
      return this.$store.getters['app-general/getPegawai']
    },
    peranOption() {
      return this.$store.getters['app-general/getPeran']
    },
  },
  methods: {
    tambahPegawai() {
      const dataPegawai = {
        pegawai: {
          nip: null,
          nama: null,
          jabatan: {
            nama: null,
          },
        },
        peran: null,
      }
      const dataRab = {
        tanggal_berangkat: this.perjadinStore.form.umum.tanggal_berangkat,
        tanggal_kembali: this.perjadinStore.form.umum.tanggal_kembali,
        jumlah_hari: this.perjadinStore.form.umum.jumlah_hari,
        uang_harian: 0,
        jumlah_malam: 0,
        uang_hotel: 0,
        udara: 0,
        laut: 0,
        darat: 0,
        taksi_jakarta: 0,
        taksi_provinsi: 0,
        representatif: 0,
        total: 0,
      }
      this.perjadinStore.form.susunan_tim.push(dataPegawai)
      this.perjadinStore.form.rencana_anggaran.push(dataRab)
    },
    deletePegawai(i) {
      this.perjadinStore.form.susunan_tim.splice(i, 1)
      this.perjadinStore.form.rencana_anggaran.splice(i, 1)
    },
    searchPegawai(search) {
      this.pegawaiStore.searchName = search
      this.pegawaiStore.getData()
    },
  },
  setup() {
    const perjadinStore = usePerjadinStore()
    const pegawaiStore = usePegawaiStore()

    return {
      pegawaiStore,
      perjadinStore,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
