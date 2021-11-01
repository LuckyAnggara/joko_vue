<template>
  <section>
    <b-row no-gutters>
      <b-col sm="12" lg="12" no-gutters class="text-right">
        <!-- <b-card> -->
        <template v-if="userData.role === 'USER' && data.status === 'PENGAJUAN' ? true : false">
          <b-button variant="outline-danger" class="mr-1" @click="destroy()"> Delete </b-button>
          <b-button variant="outline-secondary" class="mr-1" @click="destroy()"> Edit </b-button>
          <b-button variant="outline-primary" class="ml-1" @click="kirimKeuangan('VERIFIKASI KEUANGAN')" v-if="!inputRealisasi"> Kirim </b-button>
        </template>
        <template v-if="userData.role === 'VERIFIKATOR KEUANGAN' ? (data.status_realisasi === 'BELUM' ? true : false) : false">
          <b-button variant="outline-danger" class="mr-1" @click="retur1()"> Retur </b-button>
          <b-button variant="outline-primary" class="ml-1" @click="verifikasiKeuangan('PELAKSANAAN')"> Proses </b-button>
        </template>
        <template v-if="userData.role === 'VERIFIKATOR KEUANGAN' ? (data.status_realisasi === 'SUDAH' ? true : false) : false">
          <b-button variant="outline-danger" class="mr-1" @click="retur1()"> Retur </b-button>
          <b-button variant="outline-primary" class="ml-1" @click="verifikasiKeuangan('VERIFIKASI PPK')"> Proses </b-button>
        </template>
        <template v-if="userData.role === 'USER' && data.status === 'PELAKSANAAN' ? (data.status_realisasi === 'BELUM' ? true : false) : false">
          <b-button variant="danger" class="mr-1" @click="destroy()"> Delete </b-button>
          <b-button variant="outline-primary" class="ml-1" @click="realisasi()" v-if="!inputRealisasi"> Realisasi </b-button>
        </template>
        <template v-if="userData.role === 'USER' && data.status === 'PELAKSANAAN' ? (data.status_realisasi === 'SUDAH' ? true : false) : false">
          <b-button variant="outline-primary" class="mr-1" @click="kirimKeuangan('VERIFIKASI REALISASI')" v-if="!inputRealisasi"> Kirim </b-button>
          <!-- <b-button variant="outline-success" class="mr-1" @click="submitRealisasi()" v-if="inputRealisasi"> Submit </b-button> -->
        </template>
        <template v-if="userData.role === 'USER' && data.status === 'REVISI KEUANGAN' ? true : false">
          <b-button variant="outline-primary" class="mr-1" @click="kirimKeuangan('VERIFIKASI KEUANGAN')" v-if="!inputRealisasi"> Kirim </b-button>
          <b-button variant="outline-danger" class="ml-1" @click="destroy()"> Delete </b-button>
        </template>

        <template v-if="userData.role === 'PPK' && data.status === 'VERIFIKASI PPK' ? true : false">
          <b-button variant="danger" class="mr-1" @click="retur2()"> Tolak </b-button>
          <b-button variant="outline-danger" class="mr-1" @click="retur2()"> Retur </b-button>
          <b-button variant="primary" class="ml-1" @click="verifikasiPPK('VERIFIED PPK')"> Setuju </b-button>
        </template>
        <template v-if="userData.role === 'BENDAHARA' && data.status === 'VERIFIED PPK' ? true : false">
          <b-button variant="outline-danger" class="mr-1" @click="retur1()"> Retur </b-button>
          <b-button variant="success" class="ml-1" @click="bayar('SELESAI')"> Bayar </b-button>
        </template>
        <!-- </b-card> -->
      </b-col>
      <b-tabs v-model="index" class="mt-1" pills>
        <b-tab title="Umum" active> <umum /></b-tab>
        <b-tab title="Susunan Tim"><susunan-tim /></b-tab>
        <b-tab title="Mak"> <mak /></b-tab>
        <b-tab title="Anggaran"><anggaran /></b-tab>
        <b-tab title="Realisasi" v-if="data.status_realisasi === 'SUDAH' ? true : false"><realisasi-view /></b-tab>
        <b-tab title="Realisasi" v-if="inputRealisasi" active><realisasi-input /></b-tab>
        <b-tab title="Lampiran"> <lampiran /></b-tab>
        <b-tab title="Log Timeline"> <timeline /></b-tab>
      </b-tabs>
    </b-row>
  </section>
</template>

<script>
import {
  BCol,
  BRow,
  // BCard,
  BButton,
  BTab,
  BTabs,
} from 'bootstrap-vue'
import Umum from './component/detail/Umum.vue'
import Mak from './component/detail/Mak.vue'
import SusunanTim from './component/detail/SusunanTim.vue'
import Anggaran from './component/detail/Anggaran.vue'
import RealisasiInput from './component/detail/RealisasiInput.vue'
import RealisasiView from './component/detail/RealisasiView.vue'
import Lampiran from './component/detail/Lampiran.vue'
import Timeline from './component/detail/Timeline.vue'

export default {
  components: {
    BCol,
    BRow,
    // BCard,
    BButton,
    BTab,
    BTabs,
    Umum,
    Mak,
    SusunanTim,
    Lampiran,
    Anggaran,
    RealisasiInput,
    RealisasiView,
    Timeline,
  },
  computed: {
    data() {
      return this.$store.getters['app-perjadin/getDetail']
    },
  },
  methods: {
    realisasi() {
      this.inputRealisasi = !this.inputRealisasi
      // eslint-disable-next-line
      setTimeout(() => (this.index = 4), 200)
      // eslint-enable-next-line
    },
    destroy() {
      this.$swal({
        title: 'Delete ?',
        text: 'Data perjadin akan di Delete ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete!',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.isConfirmed) {
          this.$store.dispatch('app-perjadin/deletePerjadin', this.data.id).then(res => {
            if (res.status === 200) {
              this.$swal({
                title: 'Sukses!',
                text: 'Perjadin berhasil di Delete!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              this.$router.push({ name: 'perjadin-daftar' })
            }
          })
        }
      })
    },
    retur1() {
      this.$swal({
        title: 'Retur ?',
        text: 'Perjadin akan dikembalikan untuk di revisi',
        icon: 'warning',
        input: 'textarea',
        inputLabel: 'Catatan ?',
        inputPlaceholder: 'Ketik catatan mu disini...',
        inputAttributes: {
          'aria-label': 'Ketik catatan mu disini',
        },
        showCancelButton: true,
        confirmButtonText: 'Retur!',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        console.info(result)
        if (result.isConfirmed) {
          this.$store
            .dispatch('app-perjadin/statusPerjadin', {
              id: this.data.id,
              status: 'REVISI KEUANGAN',
              status_log: 'RETUR DARI KEUANGAN',
              message_log: 'perjadin di retur oleh keuangan untuk di revisi ',
              user_data: this.userData,
              catatan: result.value,
            })
            .then(x => {
              if (x.status === 200) {
                this.$swal({
                  title: 'Sukses!',
                  text: 'Perjadin berhasil di Retur !',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.$router.push({ name: 'perjadin-daftar' })
              }
            })
        }
      })
    },
    retur2() {
      this.$swal({
        title: 'Retur ?',
        text: 'Perjadin akan dikembalikan untuk di revisi',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Retur!',
        input: 'textarea',
        inputLabel: 'Catatan ?',
        inputPlaceholder: 'Ketik catatan mu disini...',
        inputAttributes: {
          'aria-label': 'Ketik catatan mu disini',
        },
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.isConfirmed) {
          this.$store
            .dispatch('app-perjadin/statusPerjadin', {
              id: this.data.id,
              status: 'REVISI PPK',
              status_log: 'RETUR DARI PPK',
              message_log: 'perjadin di retur oleh ppk untuk di revisi ',
              user_data: this.userData,
              catatan: result.value,
            })
            .then(x => {
              if (x.status === 200) {
                this.$swal({
                  title: 'Sukses!',
                  text: 'Perjadin berhasil di Verifikasi',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.$router.push({ name: 'perjadin-daftar' })
              }
            })
        }
      })
    },
    verifikasiKeuangan(status) {
      this.$swal({
        title: 'Verifikasi Keuangan Selesai ?',
        text: `Perjadin akan masuk tahap ${status.toLowerCase()}`,
        icon: 'warning',
        input: 'textarea',
        inputLabel: 'Catatan ?',
        inputPlaceholder: 'Ketik catatan mu disini...',
        inputAttributes: {
          'aria-label': 'Ketik catatan mu disini',
        },
        showCancelButton: true,
        confirmButtonText: 'Proses!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.isConfirmed) {
          this.$store
            .dispatch('app-perjadin/statusPerjadin', {
              id: this.data.id,
              status,
              status_log: 'VERIFIED KEUANGAN',
              message_log: 'perjadin telah di verifikasi oleh ',
              user_data: this.userData,
              catatan: result.value,
            })
            .then(x => {
              if (x.status === 200) {
                this.$swal({
                  title: 'Sukses!',
                  text: 'Perjadin berhasil di Verifikasi',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.$router.push({ name: 'perjadin-daftar' })
              }
            })
        }
      })
    },
    kirimKeuangan(status) {
      this.$swal({
        title: 'Kirim Keuangan ?',
        text: 'Berkas perjadin akan di kirim ke keuangan !',
        icon: 'warning',
        input: 'textarea',
        inputLabel: 'Catatan ?',
        inputPlaceholder: 'Ketik catatan mu disini...',
        inputAttributes: {
          'aria-label': 'Ketik catatan mu disini',
        },
        showCancelButton: true,
        confirmButtonText: 'Proses!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.isConfirmed) {
          this.$store
            .dispatch('app-perjadin/statusPerjadin', {
              id: this.data.id,
              status,
              status_log: `KIRIM KEUANGAN - ${status}`,
              message_log: 'perjadin telah di kirim ke keuangan ',
              user_data: this.userData,
              catatan: result.value,
            })
            .then(x => {
              if (x.status === 200) {
                this.$swal({
                  title: 'Sukses!',
                  text: 'Perjadin berhasil dikirim',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.$router.push({ name: 'perjadin-daftar' })
              }
            })
        }
      })
    },
    verifikasiPPK(status) {
      this.$swal({
        title: 'Verifikasi PPK Selesai ?',
        text: 'Perjadin akan masuk ke Bendahara untuk dibayarkan',
        icon: 'warning',
        input: 'textarea',
        inputLabel: 'Catatan ?',
        inputPlaceholder: 'Ketik catatan mu disini...',
        inputAttributes: {
          'aria-label': 'Ketik catatan mu disini',
        },
        showCancelButton: true,
        confirmButtonText: 'Proses!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.isConfirmed) {
          this.$store
            .dispatch('app-perjadin/statusPerjadin', {
              id: this.data.id,
              status,
              status_log: 'VERIFIED PPK',
              message_log: 'perjadin telah di verifikasi oleh ',
              user_data: this.userData,
              catatan: result.value,
            })
            .then(x => {
              if (x.status === 200) {
                this.$swal({
                  title: 'Sukses!',
                  text: 'Perjadin berhasil di Verifikasi',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.$router.push({ name: 'perjadin-daftar' })
              }
            })
        }
      })
    },
    bayar(status) {
      this.$swal({
        title: 'Bayarkan ?',
        text: 'Perjadin sudah sesuai, dan akan dibayarkan',
        icon: 'warning',
        input: 'textarea',
        inputLabel: 'Catatan ?',
        inputPlaceholder: 'Ketik catatan mu disini...',
        inputAttributes: {
          'aria-label': 'Ketik catatan mu disini',
        },
        showCancelButton: true,
        confirmButtonText: 'Proses!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.isConfirmed) {
          this.$store
            .dispatch('app-perjadin/statusPerjadin', {
              id: this.data.id,
              status,
              status_log: 'SELESAI',
              message_log: 'Uang perjadin telah dibayarkan oleh ',
              user_data: this.userData,
              catatan: result.value,
            })
            .then(x => {
              if (x.status === 200) {
                this.$swal({
                  title: 'Sukses!',
                  text: 'Perjadin berhasil di Bayarkan',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.$router.push({ name: 'perjadin-daftar' })
              }
            })
        }
      })
    },
  },

  setup() {
    const index = 0
    const inputRealisasi = false
    const userData = JSON.parse(localStorage.getItem('userData'))
    return {
      index,
      inputRealisasi,
      userData,
    }
  },
}
</script>
