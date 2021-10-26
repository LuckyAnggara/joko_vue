<template>
  <!-- <b-row class="match-height"> -->
  <b-row>
    <b-col lg="8" sm="12">
      <form autocomplete="off">
        <b-card-body>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tahun Anggaran" label-cols-md="3">
                <v-select v-model="form.tahun" placeholder="Tahun Anggaran" label="nama" :options="tahunOption" @input="loadMak()" />
              </b-form-group>
              <hr />
            </b-col>

            <b-col cols="12">
              <b-form-group label="Nomor Surat Perintah" label-cols-md="3">
                <b-form-input v-model="form.surat_perintah.nomor_surat" type="text" placeholder="Nomor Surat Perintah" required />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Tanggal Surat Perintah" label-cols-md="3">
                <b-form-datepicker v-model="form.surat_perintah.tanggal_surat" locale="id" placeholder="Tanggal Surat Perintah" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Perihal" label-cols-md="3">
                <b-form-textarea v-model="form.surat_perintah.perihal" placeholder="Perihal" />
              </b-form-group>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tujuan" label-cols-md="3">
                <b-form-input v-model="form.umum.tujuan" type="text" placeholder="Tujuan Perjalanan Dinas" required />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Keberangkatan" label-cols-md="3">
                <b-form-input v-model="form.umum.keberangkatan" type="text" placeholder="Keberangkatan Perjalanan Dinas" required />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Tanggal Pelaksanaan" label-cols-md="3">
                <b-row>
                  <b-col md="6">
                    <b-form-group label="Tanggal Berangkat">
                      <b-form-datepicker locale="id" v-model="form.umum.tanggal_berangkat" placeholder="Tanggal Berangkat" />
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Tanggal Kembali">
                      <b-form-datepicker locale="id" v-model="form.umum.tanggal_kembali" placeholder="Tanggal Kembali" />
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Jumlah Hari" label-cols-md="3">
                <b-form-input v-model="form.umum.jumlah_hari" type="text" placeholder="Jumlah Hari Pelaksanaan Perjalanan Dinas" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Keterangan" label-cols-md="3">
                <b-form-textarea v-model="form.umum.keterangan" type="text" placeholder="Keterangan lainnya (Seperti urusan)" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-card-body>
      </form>
    </b-col>
  </b-row>
</template>

<script>
// import { ref } from '@vue/composition-api'
import { BFormDatepicker, BCardBody, BRow, BCol, BFormInput, BFormGroup, BFormTextarea } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

import vSelect from 'vue-select'

export default {
  components: {
    BFormDatepicker,
    BCardBody,
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    vSelect,
  },
  directives: {
    Ripple,
  },
  props: {
    form: Object,
  },
  computed: {
    tahunOption() {
      return this.$store.getters['app-general/getTahun']
    },
  },
  methods: {
    loadMak() {
      if (this.form.tahun !== '' || this.form.tahun === null) {
        this.$emit('load-mak')
      }
    },
  },

  setup() {
    // const tahunOption = ref()
    return {
      // tahunOption,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
