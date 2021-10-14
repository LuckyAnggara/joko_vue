<template>
  <!-- <b-row class="match-height"> -->
  <b-row>
    <b-col lg="8" sm="12">
      <b-card-body>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Tahun Anggaran" label-cols-md="3">
              <v-select v-model="form.tahun" placeholder="Tahun Anggaran" label="nama" :options="tahunOption" />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Nomor Surat Perintah" label-cols-md="3">
              <b-form-input v-model="form.surat_perintah.nomor_surat" type="text" placeholder="Nomor Surat Perintah" required />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Tanggal Surat Perintah" label-cols-md="3">
              <b-form-datepicker v-model="form.surat_perintah.tanggal_surat" placeholder="Tanggal Surat Perintah" />
            </b-form-group>
          </b-col>

          <b-col cols="12">
            <b-form-group label="Perihal" label-cols-md="3">
              <b-form-textarea v-model="form.surat_perintah.perihal" placeholder="Perihal" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card-body>
    </b-col>
  </b-row>
</template>

<script>
// import { ref } from '@vue/composition-api'
import { BFormDatepicker, BCardBody, BRow, BCol, BFormInput, BFormGroup, BFormTextarea } from 'bootstrap-vue'

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
  computed: {
    tahunOption() {
      return this.$store.getters['app-general/getTahun']
    },
  },
  props: {
    form: Object,
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
