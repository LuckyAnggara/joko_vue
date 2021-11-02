<template>
  <section>
    <b-overlay :show="show" rounded="lg" variant="transparent" blur="15px" opacity="0.70">
      <b-row>
        <b-col lg="12" sm="12">
          <b-card title="Realisasi Kegiatan" footer-tag="footer">
            <b-card-body>
              <b-row>
                <b-col cols="12">
                  <b-form-group label="Tanggal Kegiatan" label-cols-md="3">
                    <b-form-datepicker
                      locale="id"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                      v-model="realisasi.tanggal_realisasi_kegiatan"
                      placeholder="Tanggal Kegiatan"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group label="Total anggaran yang di gunakan" label-cols-md="3">
                    <b-form-input v-model="realisasi.total_realisasi" type="number" placeholder="Rp. 0" />
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group label="Diperiksa Oleh" label-cols-md="3">
                    <v-select v-model="realisasi.checker" placeholder="Nama Atasan Langsung" :options="pegawaiOption" label="nama" />
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group label="Pejabat Pembuat Komitmen" label-cols-md="3">
                    <v-select v-model="realisasi.ppk" placeholder="Nama PPK" :options="pegawaiOption" label="nama" />
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group label="Bendahara" label-cols-md="3">
                    <v-select v-model="realisasi.bendahara" placeholder="Nama Bendahara" :options="pegawaiOption" label="nama" />
                  </b-form-group>
                </b-col>

                <b-col cols="12">
                  <b-form-group label="Lampiran / Bukti" label-cols-md="3">
                    <b-form-file
                      @change="uploadLampiran"
                      placeholder="Pilih data atau Drag and Drop di sini.. bisa Upload Sekaligus"
                      drop-placeholder="Drop file disini..."
                      multiple
                      ref="file_input"
                    >
                      <template slot="file-name" slot-scope="{ names }">
                        <b-badge variant="dark">{{ names[0] }}</b-badge>
                        <b-badge v-if="names.length > 1" variant="dark" class="ml-1"> + {{ names.length - 1 }} More files </b-badge>
                      </template>
                    </b-form-file>
                  </b-form-group>
                </b-col>
              </b-row>
              <hr />
              <b-row class="mt-2" v-if="!proses">
                <b-button variant="outline-success" class="ml-1" @click="prosesRealisasi()"> Proses </b-button>
              </b-row>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>

      <template #overlay>
        <div v-if="!processing" class="text-center">
          <feather-icon icon="Edit3Icon" size="4x" />
          <h4>{{ titleLoading }}</h4>
        </div>
        <div v-if="processing" class="text-center rounded">
          <feather-icon icon="UploadIcon" size="4x" />
          <h4>{{ titleLoading }}</h4>
        </div>
      </template>
    </b-overlay>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BOverlay, BFormDatepicker, BButton, BBadge, BCard, BCardBody, BRow, BCol, BFormGroup, BFormInput, BFormFile } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { formatRupiah, truncate } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
    BOverlay,
    BFormDatepicker,
    BButton,
    BBadge,
    BCard,
    BRow,
    BCol,
    BCardBody,
    BFormGroup,
    BFormInput,
    BFormFile,
    vSelect,
  },
  directives: {
    Ripple,
  },
  computed: {
    data() {
      return this.$store.getters['app-kegiatan/getDetail']
    },
    pegawaiOption() {
      return this.$store.getters['app-general/getPegawai']
    },
    realisasiDone() {
      return this.$store.getters['app-perjadin/getRealisasi']
    },
  },
  methods: {
    truncate,
    formatRupiah,
    /* eslint-disable */
    uploadLampiran(e) {
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.realisasi.lampiran.push(selectedFiles[i])
      }
    },
    /* eslint-enable */
    prosesRealisasi() {
      if (
        this.realisasi.tanggal_realisasi_kegiatan === null ||
        this.realisasi.total_realisasi === null ||
        this.realisasi.checker === null ||
        this.realisasi.ppk === null ||
        this.realisasi.bendahara === null
      ) {
        console.info(this.realisasi)
        this.$swal({
          title: 'Opss!',
          text: 'Data belum lengkap!',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        return
      }
      this.$swal({
        title: 'Proses ?',
        text: 'Apa anda yakin data Realisasi sudah sesuai ?',
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
          this.realisasi.id = this.data.id
          this.realisasi.user_data = this.userData
          this.show = !this.show
          this.$store
            .dispatch('app-kegiatan/storeRealisasi', this.realisasi)
            .then(res => {
              if (res.status === 200) {
                if (this.realisasi.lampiran.length > 0) {
                  this.titleLoading = 'Upload lampiran ...'
                  this.processing = !this.processing
                  const file = new FormData()
                  for (let i = 0; i < this.realisasi.lampiran.length; i += 1) {
                    file.append('lampiran[]', this.realisasi.lampiran[i])
                  }
                  file.append('id', this.realisasi.id)
                  file.append('user_id', this.userData.id)
                  this.$store.dispatch('app-kegiatan/storeLampiranKegiatan', file).then(x => {
                    this.$swal({
                      title: 'Sukses!',
                      icon: 'success',
                      customClass: {
                        confirmButton: 'btn btn-primary',
                      },
                      buttonsStyling: false,
                    })
                    this.$store.commit('app-kegiatan/UPDATE_LAMPIRAN', x.data)
                  })
                } else {
                  this.$swal({
                    title: 'Sukses!',
                    icon: 'success',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
                this.$store.commit('app-kegiatan/UPDATE_STATUS_REALISASI', 'SUDAH')
                this.$store.commit('app-kegiatan/UPDATE_DETAIL_DATA', this.realisasi)

                this.show = !this.show
                this.proses = !this.proses
              }
            })
            .catch(err => {
              this.show = !this.show
              this.file = new FormData()
              this.$swal({
                title: 'Error!',
                text: err.message,
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            })
        }
      })
    },
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))

    const titleLoading = 'Proses realisasi ....'
    const processing = ref(false)
    const show = ref(false)
    const proses = ref(false)
    const realisasi = ref({
      id: null,
      user_data: null,
      tanggal_realisasi_kegiatan: null,
      total_realisasi: null,
      checker: null,
      ppk: null,
      bendahara: null,
      lampiran: [],
    })
    return {
      userData,
      realisasi,
      titleLoading,
      processing,
      show,
      proses,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
