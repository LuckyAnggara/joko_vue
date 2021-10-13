<template>
  <!-- <b-row class="match-height"> -->
  <b-overlay :show="show" rounded="md" variant="transparent" blur="5px" opacity="0.2">
    <b-row>
      <b-col lg="3" sm="12">
        <b-card :bg-variant="status" text-variant="white" class="text-center">
          <b>{{ dataRealisasi.status }}</b></b-card
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="8" sm="12">
        <!-- <b-form autocomplete="off" @submit.prevent @submit="store"> -->
        <b-card title="Data Realisasi" v-if="dataRealisasi === null ? false : true">
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tahun Anggaran" label-cols-md="3">
                <b-form-input :value="dataRealisasi.tahun.nama" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" v-if="userData.role !== 'USER'">
              <b-form-group label="Bidang" label-cols-md="3">
                <b-form-input :value="`${dataRealisasi.bidang.nama}`" readonly />
              </b-form-group>
              <hr />
            </b-col>
            <b-col cols="12">
              <b-form-group label="Mata Anggaran Kegiatan" label-cols-md="3">
                <b-form-textarea :value="`${dataRealisasi.kegiatan.kode} - ${dataRealisasi.kegiatan.nama}`" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tanggal SPB" label-cols-md="3">
                <b-form-input :value="$moment(dataRealisasi.tanggal_spb).format('DD MMMM YYYY')" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Uraian Kegiatan" label-cols-md="3">
                <b-form-textarea :value="dataRealisasi.uraian" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Nominal Bayar" label-cols-md="3">
                <b-form-input :value="formatRupiah(dataRealisasi.nominal)" readonly />
              </b-form-group>
              <hr />
            </b-col>

            <b-col cols="12">
              <b-form-group label="Pembuat SPB" label-cols-md="3">
                <b-form-input :value="dataRealisasi.maker.nama" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Checker SPB" label-cols-md="3">
                <b-form-input :value="dataRealisasi.checker.nama" readonly />
              </b-form-group>
              <hr />
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tanggal Verifikasi" label-cols-md="3">
                <b-form-input
                  :value="dataRealisasi.verified_at === null ? 'Belum di Verifikasi' : $moment(dataRealisasi.verified_at).format('DD MMMM YYYY')"
                  readonly
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tanggal di Bayarkan" label-cols-md="3">
                <b-form-input :value="dataRealisasi.paid_at === null ? 'Belum di Bayarkan' : $moment(dataRealisasi.paid_at).format('DD MMMM YYYY')" readonly />
              </b-form-group>
            </b-col>
            <template v-if="dataRealisasi.status === 'VERIFIKASI'">
              <b-col cols="2" class="mt-2" md="2" sm="12" offset-md="3" v-if="userData.role === 'PPK'">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mb-75" block type="button" @click="approve">
                  Approve
                </b-button>
              </b-col>
              <b-col cols="2" class="mt-2" md="2" sm="12" v-if="userData.role === 'PPK'">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-danger" class="mb-75" block type="button" @click="reject">
                  Reject
                </b-button>
              </b-col>
            </template>
            <template v-if="dataRealisasi.status === 'PEMBAYARAN'">
              <b-col cols="2" class="mt-2" md="3" sm="12" offset-md="3" v-if="userData.role === 'BENDAHARA'">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mb-75" block type="button" @click="bayar">
                  Bayar
                </b-button>
              </b-col>
            </template>
          </b-row>
        </b-card>
        <!-- </b-form> -->
        <template #overlay>
          <div v-if="show" class="text-center">
            <feather-icon icon="RssIcon" size="3x" />
            <p>Fetching Data ...</p>
          </div>
        </template>
      </b-col>
      <!-- Right Col: Card -->
      <b-col lg="4" cols="12" md="6" xl="4" sm="12">
        <!-- Action Buttons -->
        <b-card title="Data Lampiran">
          <b-table :busy="busy" small :fields="tableColumns" :items="dataRealisasi.lampiran === null ? null : dataRealisasi.lampiran">
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(no)="data">
              <span>
                {{ data.index + 1 }}
              </span>
            </template>
            <template #cell(nama_file)="data">
              <span>
                <b-link :href="urlGet(data.item.id)" class="font-weight-bold" target="_blank"> {{ data.item.nama }} </b-link>
              </span>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
import {
  BLink,
  BSpinner,
  BTable,
  BOverlay,
  // BForm,
  BCard,
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

export default {
  components: {
    BLink,
    BSpinner,
    BTable,
    BOverlay,
    BCard,
    // BForm,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BFormGroup,
    BFormTextarea,
  },
  directives: {
    Ripple,
  },
  beforeMount() {
    this.loadData()
    console.info(this.$router.currentRoute.params)
  },
  computed: {
    status() {
      if (this.dataRealisasi.status === 'VERIFIKASI') return 'warning'
      if (this.dataRealisasi.status === 'PEMBAYARAN') return 'primary'
      if (this.dataRealisasi.status === 'DITOLAK') return 'danger'
      return 'success'
    },
  },
  methods: {
    formatRupiah,
    loadData() {
      this.show = !this.show
      this.busy = !this.busy
      const { id } = this.$router.currentRoute.params
      this.$store.dispatch('app-kegiatan/fetchDetailRealisasiKegiatan', id).then(res => {
        if (res.status === 200) {
          this.busy = !this.busy
          this.show = !this.show
          this.dataRealisasi = res.data
        }
      })
    },
    urlGet(id) {
      return `${this.url}?id=${id}`
    },
    approve() {
      this.$swal({
        title: 'Setuju ?',
        text: 'Data realisasi kegiatan akan di Setujui dan dikirim ke Bendahara!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Setuju!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.show = !this.show
          this.$store
            .dispatch('app-kegiatan/updateStatusRealisasiKegiatan', {
              id: this.dataRealisasi.id,
              status: 'PEMBAYARAN',
            })
            .then(res => {
              if (res.status === 200) {
                this.show = !this.show
                this.$swal({
                  title: 'Success!',
                  text: 'Realisai kegiatan berhasil di Setujui!!',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.$router.push({
                  name: 'kegiatan-daftar',
                })
              } else {
                this.$swal({
                  title: 'Error!',
                  text: res.status,
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              }
            })
        }
      })
    },
    reject() {
      this.$swal({
        title: 'Tolak ?',
        text: 'Data realisasi kegiatan akan di Tolak!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Tolak!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.show = !this.show
          this.$store
            .dispatch('app-kegiatan/updateStatusRealisasiKegiatan', {
              id: this.dataRealisasi.id,
              status: 'DITOLAK',
            })
            .then(res => {
              if (res.status === 200) {
                this.show = !this.show
                this.$swal({
                  title: 'Success!',
                  text: 'Realisai kegiatan di Tolak!!',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.$router.push({
                  name: 'kegiatan-daftar',
                })
              } else {
                this.$swal({
                  title: 'Error!',
                  text: res.status,
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              }
            })
        }
      })
    },
    bayar() {
      this.$swal({
        title: 'Bayar ?',
        text: 'Data realisasi kegiatan telah Selesai!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Bayar!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.show = !this.show
          this.$store
            .dispatch('app-kegiatan/updateStatusRealisasiKegiatan', {
              id: this.dataRealisasi.id,
              status: 'SELESAI',
            })
            .then(res => {
              if (res.status === 200) {
                this.show = !this.show
                this.$swal({
                  title: 'Success!',
                  text: 'Realisai kegiatan di Tolak!!',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.$router.push({
                  name: 'kegiatan-daftar',
                })
              } else {
                this.$swal({
                  title: 'Error!',
                  text: res.status,
                  icon: 'error',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
              }
            })
        }
      })
    },
  },
  setup() {
    const url = 'http://127.0.0.1:8000/api/realisasi/download-lampiran'

    const busy = ref(false)
    const show = ref(false)
    const userData = JSON.parse(localStorage.getItem('userData'))

    const tableColumns = [{ key: 'no', label: '#' }, { key: 'nama_file' }]
    const dataRealisasi = ref(null)

    return {
      url,
      tableColumns,
      busy,
      show,
      userData,
      dataRealisasi,
    }
  },
}
</script>
