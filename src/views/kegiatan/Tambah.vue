<template>
  <!-- <b-row class="match-height"> -->
  <b-row class="match-height">
    <b-col lg="8" sm="12">
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
                <v-select v-model="form.kegiatan" placeholder="Mata Anggaran Kegiatan" label="kode" :options="makOption" />
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
    </b-col>
    <!-- Right Col: Card -->
    <b-col lg="4" cols="12" md="6" xl="4" sm="12" class="invoice-actions mt-md-0 mt-2">
      <!-- Action Buttons -->
      <b-card title="Data MAK">
        <b-row>
          <b-col cols="12">
            <b-form-group label="Nama Mata Anggaran">
              <b-form-textarea readonly :value="form.kegiatan === null ? '' : form.kegiatan.nama" placeholder="Nama MAK" />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="DIPA">
              <b-form-input readonly :value="form.kegiatan === null ? 'Rp. 0' : formatRupiah(form.kegiatan.dipa)" placeholder="Rp.0" />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Saldo Tersedia">
              <b-form-input
                readonly
                :value="form.kegiatan === null ? 'Rp. 0' : formatRupiah(parseFloat(form.kegiatan.dipa) - parseFloat(form.kegiatan.realisasi))"
                placeholder="Rp.0"
              />
            </b-form-group>
          </b-col>
          <b-col cols="8">
            <b-form-group label="Realisasi">
              <b-form-input readonly :value="form.kegiatan === null ? 'Rp. 0' : formatRupiah(form.kegiatan.realisasi)" placeholder="Rp.0" />
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Pesentase">
              <b-form-input
                readonly
                :value="form.kegiatan === null ? '0%' : `${parseFloat(form.kegiatan.realisasi) / parseFloat(form.kegiatan.dipa)}%`"
                placeholder="%"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Belum di Realisasi">
              <b-form-input readonly :value="form.kegiatan === null ? 'Rp. 0' : formatRupiah(form.kegiatan.unrealisasi)" placeholder="Rp.0" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { BBadge, BFormDatepicker, BFormFile, BForm, BCard, BRow, BCol, BButton, BFormInput, BFormGroup, BFormTextarea } from 'bootstrap-vue'

import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { formatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
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
      console.info(this.lampiran)
    },
    uploadFiles(e) {
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.attachments.push(selectedFiles[i])
      }
      console.log(this.attachments)
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
        text: 'Data has been created!!',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
      this.file = new FormData()
      // this.$router.push({
      //   name: 'master-barang',
      // })
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
      this.form.lampiran = this.file
      this.$store.dispatch('app-kegiatan/storeRealisasiKegiatan', this.form).then(res => {
        if (res.status === 200) {
          for (let i = 0; i < this.attachments.length; i += 1) {
            this.file.append('lampiran[]', this.attachments[i])
          }
          this.file.append('id', res.data.id)
          this.$store.dispatch('app-kegiatan/storeLampiranRealisasiKegiatan', this.file).then(x => {
            if (x.status === 200) {
              this.success()
            } else {
              this.error(x.status)
            }
          })
        } else {
          this.error(res.status)
        }
      })
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
            bidang_id: 1,
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
      this.form.kegiatan = null
      this.makOption = []
    },
  },
  setup() {
    const file = new FormData()
    const attachments = ref([])
    const userData = ref({
      id: 1,
    })
    const lampiran = ref(null)
    const form = ref({
      tahun: null,
      kegiatan: null,
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
