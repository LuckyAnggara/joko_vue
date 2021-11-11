<template>
  <b-row>
    <b-col cols="12">
      <b-form-group label="Nama" label-cols-md="3">
        <b-form-input v-model="data.nama" type="text" placeholder="Nama Pegawai" required :readonly="!edit" />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group label="Nomor Induk Penduduk" label-cols-md="3">
        <b-form-input v-model="data.nip" type="text" placeholder="Nomor Induk Penduduk" required :readonly="!edit" />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group label="Tanggal Lahir" label-cols-md="3">
        <b-form-datepicker locale="id" v-model="data.tanggal_lahir" placeholder="Tanggal Lahir" required :disabled="!edit" />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group label="Golongan / Pangkat" label-cols-md="3">
        <v-select v-model="data.golongan" placeholder="Golongan / Pangkat" label="nama" :reduce="x => x.id" :options="golonganOption" :disabled="!edit">
          <template v-slot:option="option"> {{ option.golongan }} - {{ option.nama }} </template>
        </v-select>
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group label="Jabatan" label-cols-md="3">
        <v-select v-model="data.jabatan" placeholder="Jabatan" label="nama" :reduce="x => x.id" :options="jabatanOption" :disabled="!edit" />
      </b-form-group>
    </b-col>
    <b-col cols="12" v-if="userData.role === 'ADMIN KEPEGAWAIAN'">
      <b-form-group label="Bagian / Wilayah" label-cols-md="3">
        <v-select v-model="data.bidang" placeholder="Bagian / Wilayah" label="nama" :reduce="x => x.id" :options="bidangOption" :disabled="!edit" />
      </b-form-group>
    </b-col>
    <b-col offset-md="3">
      <b-button type="submit" variant="primary" class="mr-1" v-if="!edit" @click="edit = !edit">
        Edit
      </b-button>
      <b-button type="submit" variant="primary" class="mr-1" v-if="edit">
        Submit
      </b-button>
      <b-button type="reset" variant="outline-secondary" v-if="edit" @click="reset">
        Reset
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import { BButton, BFormGroup, BFormDatepicker, BFormInput, BRow, BCol } from 'bootstrap-vue'

import { ref } from '@vue/composition-api'
// import { dataatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
    BButton,
    BFormGroup,
    BFormDatepicker,
    BFormInput,
    BRow,
    BCol,
    vSelect,
  },
  computed: {
    data() {
      return this.$store.getters['app-pegawai/getDetail']
    },
    bidangOption() {
      return this.$store.getters['app-general/getBidang']
    },
    golonganOption() {
      return this.$store.getters['app-general/getGolongan']
    },
    jabatanOption() {
      return this.$store.getters['app-general/getJabatan']
    },
  },
  methods: {
    reset() {
      this.edit = !this.edit
    },
  },
  setup() {
    const edit = ref(false)
    const userData = JSON.parse(localStorage.getItem('userData'))

    return {
      edit,
      userData,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
