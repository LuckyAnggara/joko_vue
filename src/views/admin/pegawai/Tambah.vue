<template>
  <!-- <b-row class="match-height"> -->
  <b-row class="match-height">
    <b-col lg="8" sm="12">
      <b-overlay :show="show" rounded="sm" variant="transparent" blur="5px" opacity="0.95">
        <b-form autocomplete="off" @submit.prevent @submit="store">
          <b-card title="Tambah Pegawai">
            <b-row>
              <b-col cols="12">
                <b-form-group label="Nama" label-cols-md="3">
                  <b-form-input v-model="form.nama" type="text" placeholder="Nama Pegawai" required />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Nomor Induk Penduduk" label-cols-md="3">
                  <b-form-input v-model="form.nip" type="text" placeholder="Nomor Induk Penduduk" required />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Tanggal Lahir" label-cols-md="3">
                  <b-form-datepicker locale="id" v-model="form.tanggal_lahir" placeholder="Tanggal Lahir" required />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Golongan / Pangkat" label-cols-md="3">
                  <v-select v-model="form.golongan" placeholder="Golongan / Pangkat" label="nama" :reduce="x => x.id" :options="golonganOption">
                    <template v-slot:option="option"> {{ option.golongan }} - {{ option.nama }} </template>
                  </v-select>
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Jabatan" label-cols-md="3">
                  <v-select v-model="form.jabatan" placeholder="Jabatan" label="nama" :reduce="x => x.id" :options="jabatanOption" />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Bagian / Wilayah" label-cols-md="3">
                  <v-select v-model="form.bidang" placeholder="Bagian / Wilayah" label="nama" :reduce="x => x.id" :options="bidangOption" />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Foto Pegawai" label-cols-md="3">
                  <b-form-file @change="uploadFiles" placeholder="Pilih data" drop-placeholder="Drop file disini..." ref="file_input">
                    <template slot="file-name" slot-scope="{ names }">
                      <b-badge variant="dark">{{ names[0] }}</b-badge>
                      <b-badge v-if="names.length > 1" variant="dark" class="ml-1"> + {{ names.length - 1 }} More files </b-badge>
                    </template>
                  </b-form-file>
                </b-form-group>
              </b-col>

              <b-col cols="2" class="mt-2" md="6" sm="12" offset-lg="3">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mb-75" block type="submit">
                  Proses
                </b-button>
              </b-col>
            </b-row>
          </b-card>
        </b-form>
        <template #overlay>
          <div class="text-center">
            <feather-icon icon="Edit3Icon" size="2x" />
            <p>{{ title }}</p>
          </div>
        </template>
      </b-overlay>
    </b-col>
  </b-row>
</template>

<script>
import { BOverlay, BForm, BCard, BRow, BCol, BButton, BFormInput, BFormGroup, BFormDatepicker, BFormFile } from 'bootstrap-vue'

import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { formatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
    BOverlay,
    BCard,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BFormGroup,
    vSelect,
    BFormDatepicker,
    BFormFile,
  },
  directives: {
    Ripple,
  },
  computed: {
    tahunOption() {
      return this.$store.getters['app-general/getTahun']
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
    formatRupiah,
    cekKodeMak() {
      this.busyCekMak = !this.busyCekMak
      this.$store.dispatch('app-mak/cekKodeMak', { kode: this.form.kode }).then(res => {
        this.busyCekMak = !this.busyCekMak
        console.info(res)

        if (res.data > 0) {
          this.kode = true
        } else {
          this.kode = false
        }
      })
    },
    /* eslint-disable */
    uploadFiles(e) {
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.attachments.push(selectedFiles[i])
      }
    },
    /* eslint-enable */

    success() {
      this.$swal({
        title: 'Success!',
        text: 'Data berhasil di buat!!',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    },
    error(x) {
      this.$swal({
        title: 'Error!',
        text: x,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    },
    store() {
      this.$swal({
        title: 'Proses ?',
        text: 'Data Pegawai baru akan di proses !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ok!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.show = !this.show
          this.$store.dispatch('app-pegawai/store', this.form).then(res => {
            if (res.status === 200) {
              this.success()
              this.$router.push({ name: 'pegawai-daftar' })
            } else {
              this.error(res.status)
            }
          })
        }
      })
    },
  },
  setup() {
    const title = ref('Store data Pegawai baru .... ')
    const show = ref(false)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const form = ref({
      nama: null,
      nip: null,
      tanggal_lahir: null,
      golongan: null,
      jabatan: 0,
      bidang: 0,
      foto: 0,
      user_data: JSON.parse(localStorage.getItem('userData')),
    })

    return {
      title,
      show,
      userData,
      form,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
