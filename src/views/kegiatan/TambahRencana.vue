<template>
  <!-- <b-row class="match-height"> -->
  <b-row class="match-height">
    <b-col lg="8" sm="12">
      <b-form autocomplete="off" @submit.prevent @submit="store">
        <b-card title="Data Rencana Kegiatan">
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tahun Anggaran" label-cols-md="3">
                <v-select
                  v-model="kegiatanStore.form.tahun"
                  placeholder="Tahun Anggaran"
                  label="nama"
                  :options="mainStore.tahunOptions"
                  @input="changeTahun()"
                ></v-select>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Mata Anggaran Kegiatan" label-cols-md="3">
                <v-select v-model="kegiatanStore.form.mak" placeholder="Mata Anggaran Kegiatan" label="kode" :options="makStore.items">
                  <template v-slot:option="option"> {{ option.kode }} - {{ option.nama }} </template>
                </v-select>
              </b-form-group>
              <hr />
            </b-col>
            <template v-if="cekPagu">
              <b-col cols="12">
                <b-form-group label="Tanggal Rencana Kegiatan" label-cols-md="3">
                  <b-form-datepicker locale="id" v-model="kegiatanStore.form.tanggal_rencana_kegiatan" placeholder="Tanggal Rencana Kegiatan" />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Lokasi Kegiatan" label-cols-md="3">
                  <b-form-input v-model="kegiatanStore.form.lokasi" placeholder="Lokasi Kegiatan" required />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Uraian Kegiatan" label-cols-md="3">
                  <b-form-textarea v-model="kegiatanStore.form.uraian" placeholder="Uraian Kegiatan" required rows="3" />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Output Kegiatan" label-cols-md="3">
                  <b-form-textarea v-model="kegiatanStore.form.output" placeholder="Uraian Kegiatan" required rows="3" />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Jenis Kegiatan" label-cols-md="3">
                  <v-select v-model="kegiatanStore.form.jenis_kegiatan" placeholder="Jenis Kegiatan" label="nama" :options="jenisKegiatanOption" />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Anggaran Kegiatan" label-cols-md="3">
                  <b-form-input v-model="kegiatanStore.form.total_anggaran" type="number" placeholder="Rp. 0" required />
                </b-form-group>
                <hr />
              </b-col>
              <b-col cols="12">
                <b-form-group label="Upload Lampiran" label-cols-md="3">
                  <b-form-file
                    @change="kegiatanStore.uploadFiles"
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
            </template>
            <template v-else>
              <b-card-text>
                <p>Mata Anggaran Kegiatan sudah tidak bisa di gunakan . Saldo 0</p>
              </b-card-text>
            </template>
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
    </b-col>
    <!-- Right Col: Card -->
    <b-col lg="4" cols="12" md="6" xl="4" sm="12" class="invoice-actions mt-md-0 mt-2">
      <!-- Action Buttons -->
      <b-card title="Data MAK">
        <b-row>
          <b-col cols="12">
            <b-form-group label="Nama Mata Anggaran">
              <b-form-textarea
                max-rows="4"
                rows="4"
                readonly
                :value="kegiatanStore.form.mak === null ? '' : kegiatanStore.form.mak.nama"
                placeholder="Nama MAK"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="PAGU">
              <b-form-input readonly :value="kegiatanStore.form.mak === null ? 'Rp. 0' : formatRupiah(kegiatanStore.form.mak?.pagu)" placeholder="Rp.0" />
            </b-form-group>
          </b-col>

          <b-col cols="8">
            <b-form-group label="Realisasi">
              <b-form-input readonly :value="kegiatanStore.form.mak === null ? 'Rp. 0' : formatRupiah(kegiatanStore.form.mak?.realisasi)" placeholder="Rp.0" />
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Pesentase">
              <b-form-input readonly :value="kegiatanStore.form.mak === null ? '0%' : `${kegiatanStore.persenRealisasi.toFixed(2)}%`" placeholder="%" />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Belum di Realisasi / di Anggarkan">
              <b-form-input readonly :value="kegiatanStore.form.mak === null ? 'Rp. 0' : formatRupiah(kegiatanStore.form.mak.unrealisasi)" placeholder="Rp.0" />
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group label="Saldo Tersedia">
              <b-form-input
                readonly
                :value="kegiatanStore.form.mak === null ? formatRupiah(0) : formatRupiah(kegiatanStore.saldoTersedia)"
                placeholder="Rp.0"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BOverlay,
  BBadge,
  BFormDatepicker,
  BFormFile,
  BForm,
  BCard,
  BCardText,
  BRow,
  BCol,
  BButton,
  BFormInput,
  BFormGroup,
  BFormTextarea,
} from 'bootstrap-vue'

import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { formatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'
import { useMainStore } from '@/store/pinia/main'
import { useMakStore } from '@/store/pinia/makStore'
import { useKegiatanStore } from '@/store/pinia/kegiatanStore.js'

export default {
  components: {
    BOverlay,
    BBadge,
    BFormDatepicker,
    BFormFile,
    BCard,
    BCardText,
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
  computed: {
    cekPagu() {
      if (this.kegiatanStore.form.mak === null) return true
      if (parseFloat(this.kegiatanStore.form.mak.pagu) - parseFloat(this.kegiatanStore.form.mak.realisasi) > 0) {
        return true
      }
      return false
    },
  },
  mounted() {
    this.loadTahun()
    this.loadJenisKegiatan()
  },
  methods: {
    formatRupiah,
    changeTahun() {
      this.reset()
      this.loadMak()
    },
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    },
    loadTahun() {
      this.$store.dispatch('app-general/fetchTahun').then(res => {
        this.tahunOption = res.data
      })
    },
    loadMak() {
      this.makStore.$patch(state => {
        state.filter.currentLimit = 10000
      })
      this.makStore.getData(this.kegiatanStore.form.tahun)
    },
    loadPegawai() {
      this.$store.dispatch('app-general/fetchPegawai').then(res => {
        this.pegawaiOption = res.data
      })
    },
    loadJenisKegiatan() {
      this.$store.dispatch('app-general/fetchJenisKegiatan').then(res => {
        this.jenisKegiatanOption = res.data
      })
    },
    store() {
      this.$swal
        .fire({
          title: 'Proses ?',
          text: 'Rencana kegiatan akan dibuat!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          showCancelButton: true,
          confirmButtonText: 'Look up',
          showLoaderOnConfirm: true,
          preConfirm: this.kegiatanStore.store,
          allowOutsideClick: () => !this.kegiatanStore.isStoreLoading,
        })
        .then(result => {
          console.info(result)
          if (result.isConfirmed) {
            this.$router.push({ name: 'kegiatan-daftar' })
          }
        })
    },
    reset() {
      this.kegiatanStore.form.mak = null
      this.makStore.$patch(state => {
        state.filter.currentLimit = 10
      })
      this.makOption = []
    },
  },
  setup() {
    const mainStore = useMainStore()
    const makStore = useMakStore()
    const kegiatanStore = useKegiatanStore()
    const title = ref('Membuat rencana kegiatan .... ')
    const processing = ref(false)

    const attachments = ref([])
    const userData = JSON.parse(localStorage.getItem('userData'))
    const lampiran = ref(null)

    const makOption = ref([])
    const tahunOption = ref([])
    const jenisKegiatanOption = ref([])
    const pegawaiOption = ref([])
    const tahun = ref({})

    return {
      mainStore,
      makStore,
      kegiatanStore,
      jenisKegiatanOption,
      processing,
      title,
      attachments,
      lampiran,
      userData,
      makOption,
      tahunOption,
      pegawaiOption,
      tahun,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
