<template>
  <!-- <b-row class="match-height"> -->

  <b-row class="match-height">
    <b-col lg="8" sm="12">
      <b-card-body>
        <b-row>
          <b-col md="3" lg="3" sm="12" class="mb-2">
            <b-button variant="primary" class="btn-icon" size="md" @click="tambahPegawai()"> Tambah Pegawai </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="1">
            <label>No. </label>
          </b-col>
          <b-col lg="2">
            <label>NIP </label>
          </b-col>
          <b-col lg="5">
            <label>Nama Pegawai </label>
          </b-col>
          <b-col lg="3">
            <label>Peran </label>
          </b-col>
          <b-col lg="1">
            <label>Action </label>
          </b-col>
        </b-row>
        <hr />
        <ul style="list-style-type: none;" v-for="(tim, index) in form.susunan_tim" :key="tim.id">
          <b-row>
            <b-col lg="1">
              <b-form-input plaintext :value="index + 1" />
            </b-col>
            <b-col lg="2">
              <b-form-input value="1" />
            </b-col>
            <b-col lg="5">
              <v-select placeholder="Nama Pegawai" label="nama" :options="pegawaiOption" />
            </b-col>
            <b-col lg="3">
              <b-form-input value="1" />
            </b-col>
            <b-col lg="1">
              <b-form-input value="1" />
            </b-col>
          </b-row>
        </ul>
      </b-card-body>
    </b-col>
  </b-row>
</template>

<script>
import {
  // BOverlay,
  //  BBadge,
  BCardBody,
  // BFormDatepicker,
  //  BFormFile,
  // BForm,
  // BCard,
  BRow,
  BCol,
  BButton,
  BFormInput,
  // BFormGroup,
  // BFormTextarea,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

// import { ref } from '@vue/composition-api'
// import Ripple from 'vue-ripple-directive'
// import { formatRupiah } from '@core/utils/filter'

export default {
  components: {
    // BFormDatepicker,
    BRow,
    BCol,
    BCardBody,
    BButton,
    BFormInput,
    // BFormGroup,
    // BFormTextarea,
    vSelect,
  },
  props: {
    form: Object,
  },
  computed: {
    pegawaiOption() {
      return this.$store.getters['app-general/getPegawai']
    },
  },
  methods: {
    tambahPegawai() {
      const data = {
        nip: null,
        nama_pegawai: null,
        peran: null,
      }
      this.form.susunan_tim.push(data)
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
