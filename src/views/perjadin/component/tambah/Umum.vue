<template>
  <!-- <b-row class="match-height"> -->
  <b-row>
    <b-col lg="12" sm="12">
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
              <b-form-group label="Nomor Surat Perintah / Surat Tugas" label-cols-md="3">
                <b-form-input v-model="form.surat_perintah.nomor_surat" type="text" placeholder="Nomor Surat Perintah" required />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Tanggal Surat Perintah / Surat Tugas" label-cols-md="3">
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
                <v-select v-model="form.umum.provinsi" placeholder="Provinsi Tujuan Perjalanan Dinas" label="nama" :options="provinsiOption" />
                <!-- <b-form-input v-model="form.umum.tujuan" type="text" placeholder="Provinsi Tujuan" required /> -->
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Keberangkatan / Tempat Kedudukan" label-cols-md="3">
                <b-form-input v-model="form.umum.keberangkatan" type="text" placeholder="Keberangkatan Perjalanan Dinas" required />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Maksud Perjalanan Dinas" label-cols-md="3">
                <b-form-textarea v-model="form.umum.maksud" type="text" placeholder="Maksud Perjalanan Dinas" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Output Kegiatan" label-cols-md="3">
                <b-form-textarea v-model="form.umum.output" type="text" placeholder="Output Kegiatan" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Tanggal Pelaksanaan" label-cols-md="3">
                <b-row>
                  <b-col md="6">
                    <b-form-group label="Tanggal Berangkat">
                      <b-form-datepicker
                        locale="id"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        v-model="form.umum.tanggal_berangkat"
                        placeholder="Tanggal Berangkat"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Tanggal Kembali">
                      <b-form-datepicker
                        locale="id"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        v-model="form.umum.tanggal_kembali"
                        placeholder="Tanggal Kembali"
                      />
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
          </b-row>
          <hr />
          <b-row>
            <b-col cols="12">
              <b-form-group label="Pejabat Pembuat Komitmen" label-cols-md="3">
                <v-select v-model="form.umum.ppk" placeholder="Pejabat Pembuat Komitmen" label="nama" :options="pegawaiOption.filter(x => x.ppk === 1)" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Bendahara" label-cols-md="3">
                <v-select v-model="form.umum.bendahara" placeholder="Bendahara" label="nama" :options="pegawaiOption.filter(x => x.bendahara === 1)" />
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
    provinsiOption() {
      return this.$store.getters['app-general/getProvinsi']
    },
    pegawaiOption() {
      return this.$store.getters['app-general/getPegawai']
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
