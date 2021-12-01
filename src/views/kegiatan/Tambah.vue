<template>
  <!-- <b-row class="match-height"> -->
  <b-row class="match-height">
    <b-col lg="8" sm="12">
      <b-overlay :show="show" rounded="sm" variant="transparent" blur="5px" opacity="0.95">
        <b-form autocomplete="off" @submit.prevent @submit="store">
          <b-card title="Data Realisasi">
            <b-row>
              <b-col cols="12">
                <b-form-group label="Tahun Anggaran" label-cols-md="3">
                  <v-select v-model="form.tahun" placeholder="Tahun Anggaran" label="nama" :options="tahunOption" @input="changeTahun()" />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Mata Anggaran Kegiatan" label-cols-md="3">
                  <v-select v-model="form.mak" placeholder="Mata Anggaran Kegiatan" label="kode" :options="makOption" />
                </b-form-group>
                <hr />
              </b-col>
              <b-col cols="12">
                <b-form-group label="Tanggal SPB" label-cols-md="3">
                  <b-form-datepicker v-model="form.tanggal_spb" placeholder="Tanggal SPB" />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Uraian Kegiatan" label-cols-md="3">
                  <b-form-textarea v-model="form.uraian" placeholder="Uraian Kegiatan" required rows="3" />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Nominal Bayar" label-cols-md="3">
                  <b-form-input v-model="form.nominal" type="number" placeholder="Nominal Bayar" required />
                </b-form-group>
                <hr />
              </b-col>

              <b-col cols="12">
                <b-form-group label="Pembuat SPB" label-cols-md="3">
                  <v-select v-model="form.maker" placeholder="Pembuat SPB" label="nama" :options="pegawaiOption" />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Checker SPB" label-cols-md="3">
                  <v-select v-model="form.checker" placeholder="Maker SPB" label="nama" :options="pegawaiOption" />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Upload Lampiran" label-cols-md="3">
                  <b-form-file
                    @change="uploadFiles"
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
              <b-col cols="2" class="mt-2" md="6" sm="12" offset-lg="3">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mb-75" block type="submit">
                  Proses
                </b-button>
              </b-col>
            </b-row>
          </b-card>
        </b-form>
        <template #overlay>
          <div v-if="!processing" class="text-center">
            <feather-icon icon="Edit3Icon" size="2x" />
            <p>{{ title }}</p>
          </div>
          <div v-if="processing" class="text-center rounded">
            <feather-icon icon="UploadIcon" size="2x" />
            <p>{{ title }}</p>
          </div>
        </template>
      </b-overlay>
    </b-col>
    <!-- Right Col: Card -->
    <b-col lg="4" cols="12" md="6" xl="4" sm="12" class="invoice-actions mt-md-0 mt-2">
      <!-- Action Buttons -->
      <b-card title="Data MAK">
        <b-row>
          <b-col cols="12">
            <b-form-group label="Nama Mata Anggaran">
              <b-form-textarea readonly :value="form.mak === null ? '' : form.mak.nama" placeholder="Nama MAK" />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="PAGU">
              <b-form-input readonly :value="form.mak === null ? 'Rp. 0' : formatRupiah(form.mak.pagu)" placeholder="Rp.0" />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Saldo Tersedia">
              <b-form-input
                readonly
                :value="form.mak === null ? 'Rp. 0' : formatRupiah(parseFloat(form.mak.pagu) - parseFloat(form.mak.realisasi))"
                placeholder="Rp.0"
              />
            </b-form-group>
          </b-col>
          <b-col cols="8">
            <b-form-group label="Realisasi">
              <b-form-input readonly :value="form.mak === null ? 'Rp. 0' : formatRupiah(form.mak.realisasi)" placeholder="Rp.0" />
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Pesentase">
              <b-form-input
                readonly
                :value="form.mak === null ? '0%' : `${((parseFloat(form.mak.realisasi) / parseFloat(form.mak.pagu)) * 100).toFixed(2)}%`"
                placeholder="%"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Belum di Realisasi">
              <b-form-input readonly :value="form.mak === null ? 'Rp. 0' : formatRupiah(form.mak.unrealisasi)" placeholder="Rp.0" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { BOverlay, BBadge, BFormDatepicker, BFormFile, BForm, BCard, BRow, BCol, BButton, BFormInput, BFormGroup, BFormTextarea } from 'bootstrap-vue'

import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { formatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  components: {
    BOverlay,
    BBadge,
    BFormDatepicker,
    BFormFile,
    BCard,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    vSelect,
    FeatherIcon,
  },
  directives: {
    Ripple,
  },

  mounted() {
    this.loadTahun()
    this.loadPegawai()
  },
  methods: {
    /* eslint-disable */
    fileImage(event) {
      this.lampiran = event.target.files
    },
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
    formatRupiah,
    changeTahun() {
      this.reset()
      this.loadMak()
    },
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
      this.file = new FormData()
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
        text: 'Data realisasi mak akan di Proses!',
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
          this.form.lampiran = this.file
          this.$store
            .dispatch('app-kegiatan/storeRealisasiKegiatan', this.form)
            .then(res => {
              if (res.status === 200) {
                for (let i = 0; i < this.attachments.length; i += 1) {
                  this.file.append('lampiran[]', this.attachments[i])
                }
                this.file.append('id', res.data.id)
                this.title = 'Upload lampiran ...'
                this.processing = !this.processing
                this.clearInterval()
                this.$store.dispatch('app-kegiatan/storeLampiranRealisasiKegiatan', this.file).then(x => {
                  if (x.status === 200) {
                    this.success()
                    this.processing = !this.processing
                  } else {
                    this.error(x.status)
                  }
                  this.show = !this.show
                  this.$router.push({ name: 'mak-daftar' })
                })
              } else {
                this.error(res.status)
              }
            })
            .catch(e => {
              this.error(e)
              this.show = !this.show
            })
        }
      })
    },
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    },
    loadTahun() {
      this.$store.dispatch('app-kegiatan/fetchTahun').then(res => {
        this.tahunOption = res.data
      })
    },
    loadMak() {
      if (this.form.tahun !== null || this.form.tahun !== '') {
        this.$store
          .dispatch('app-kegiatan/fetchMak', {
            bidang_id: this.userData.bidang_id,
            tahun_id: this.form.tahun === null ? 0 : this.form.tahun.id,
          })
          .then(res => {
            this.makOption = res.data
          })
      }
    },
    loadPegawai() {
      this.$store.dispatch('app-kegiatan/fetchPegawai').then(res => {
        this.pegawaiOption = res.data
      })
    },
    reset() {
      this.form.mak = null
      this.makOption = []
    },
  },
  setup() {
    const title = ref('Membuat relisasi mak .... ')
    const processing = ref(false)

    const show = ref(false)
    const file = new FormData()
    const attachments = ref([])
    const userData = JSON.parse(localStorage.getItem('userData'))
    const lampiran = ref(null)
    const form = ref({
      tahun: null,
      mak: null,
      uraian: null,
      nominal: 0,
      maker: null,
      checker: null,
      tanggal_spb: null,
      lampiran: null,
      userData,
    })
    const makOption = ref([])
    const tahunOption = ref([])
    const pegawaiOption = ref([])
    const tahun = ref({})

    return {
      processing,
      title,
      show,
      file,
      attachments,
      lampiran,
      userData,
      makOption,
      tahunOption,
      pegawaiOption,
      form,
      tahun,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
