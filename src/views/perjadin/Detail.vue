<template>
  <section>
    <b-row no-gutters>
      <b-col lg="6" sm="12" class="text-left">
        <p>STATUS : {{ data.status }}</p>
      </b-col>
      <b-col sm="12" lg="6" no-gutters class="text-right">
        <!-- <b-card> -->

        <div>
          <template v-if="userData.role === 'USER' && data.status === 'RENCANA' ? true : false">
            <b-button variant="outline-danger" class="mr-1" @click="destroy()"> Delete </b-button>
            <b-button
              variant="outline-primary"
              class="ml-1"
              @click="kirimKeuangan(data.status_realisasi === 'SUDAH' ? 'VERIFIKASI REALISASI' : 'VERIFIKASI KEUANGAN')"
              v-if="!inputRealisasi"
            >
              Kirim
            </b-button>
          </template>
          <template
            v-if="userData.role === 'ADMIN KEUANGAN' && data.status === 'VERIFIKASI KEUANGAN' ? (data.status_realisasi === 'BELUM' ? true : false) : false"
          >
            <b-button variant="outline-danger" class="mr-1" @click="retur()"> Retur </b-button>
            <b-button variant="outline-primary" class="ml-1" @click="verifikasiKeuangan('PELAKSANAAN')"> Proses </b-button>
          </template>
          <template
            v-if="userData.role === 'ADMIN KEUANGAN' && data.status === 'VERIFIKASI REALISASI' ? (data.status_realisasi === 'SUDAH' ? true : false) : false"
          >
            <b-button variant="outline-danger" class="mr-1" @click="retur()"> Retur </b-button>
            <b-button variant="outline-primary" class="ml-1" @click="verifikasiKeuangan('VERIFIKASI PPK')"> Proses </b-button>
          </template>
          <template v-if="userData.role === 'USER' && data.status === 'PELAKSANAAN' ? (data.status_realisasi === 'BELUM' ? true : false) : false">
            <b-button variant="danger" class="mr-1" @click="destroy()"> Delete </b-button>
            <b-button variant="outline-primary" class="ml-1" @click="realisasi()" v-if="!inputRealisasi"> Realisasi </b-button>
            <!-- <b-button variant="outline-primary" class="mr-1" @click="kirimKeuangan('VERIFIKASI REALISASI')" v-if="realisasiDone"> Kirim </b-button> -->
          </template>
          <template v-if="userData.role === 'USER' && data.status === 'PELAKSANAAN' ? (data.status_realisasi === 'SUDAH' ? true : false) : false">
            <b-button variant="danger" class="mr-1" @click="destroy()"> Delete </b-button>
            <b-button variant="outline-primary" class="mr-1" @click="kirimKeuangan('VERIFIKASI REALISASI')"> Kirim </b-button>
          </template>
          <template v-if="userData.role === 'USER' && data.status === 'REVISI KEUANGAN' ? true : false">
            <b-button variant="outline-primary" class="mr-1" @click="kirimKeuangan('VERIFIKASI KEUANGAN')" v-if="!inputRealisasi"> Kirim </b-button>
            <b-button variant="outline-danger" class="ml-1" @click="destroy()"> Delete </b-button>
          </template>
          <template v-if="userData.role === 'PPK' && data.status === 'VERIFIKASI PPK' ? true : false">
            <b-button variant="danger" class="mr-1" @click="tolak()"> Tolak </b-button>
            <b-button variant="outline-danger" class="mr-1" @click="retur()"> Retur </b-button>
            <b-button variant="primary" class="ml-1" @click="verifikasiPPK('VERIFIED PPK')"> Setuju </b-button>
          </template>
          <template v-if="userData.role === 'BENDAHARA' && data.status === 'VERIFIED PPK' ? true : false">
            <b-button variant="outline-danger" class="mr-1" @click="retur()"> Retur </b-button>
            <b-button variant="success" class="ml-1" @click="bayar('SELESAI')"> Bayar </b-button>
          </template>
        </div>
      </b-col>
      <b-tabs v-model="index" class="mt-1" pills>
        <b-tab title="Umum" active> <umum /></b-tab>
        <b-tab title="Mak"> <mak /></b-tab>
        <!-- <b-tab title="Susunan Tim"><susunan-tim /></b-tab> -->
        <b-tab title="Susunan Tim dan Anggaran"><anggaran /></b-tab>
        <b-tab title="Realisasi" v-if="data.status_realisasi === 'SUDAH' ? true : false"><realisasi-view /></b-tab>
        <b-tab title="Realisasi" v-if="data.status_realisasi === 'BELUM' && statusInputRealisasi === true ? true : false" active><realisasi-input /></b-tab>
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
// import SusunanTim from './component/detail/SusunanTim.vue'
import Anggaran from './component/detail/Anggaran.vue'
import RealisasiInput from './component/detail/RealisasiInput.vue'
import RealisasiView from './component/detail/RealisasiView.vue'
import Lampiran from './component/detail/Lampiran.vue'
import Timeline from './component/detail/Timeline.vue'

export default {
  components: {
    BCol,
    BRow,
    BButton,
    BTab,
    BTabs,
    Umum,
    Mak,
    Lampiran,
    Anggaran,
    RealisasiInput,
    RealisasiView,
    Timeline,
  },
  computed: {
    statusInputRealisasi() {
      return this.$store.getters['app-perjadin/getStatusInputRealisasi']
    },
    data() {
      return this.$store.getters['app-perjadin/getDetail']
    },
    realisasiDone() {
      return this.$store.getters['app-perjadin/getRealisasi']
    },
    returOption() {
      if (this.data.status === 'VERIFIKASI KEUANGAN') {
        return {
          maker: `${this.data.bidang.nama}`,
        }
      }
      if (this.data.status === 'VERIFIKASI REALISASI') {
        return {
          maker: `${this.data.bidang.nama}`,
        }
      }
      if (this.data.status === 'VERIFIKASI PPK') {
        return {
          maker: `${this.data.bidang.nama}`,
          keuangan: 'KEUANGAN',
          ppk: 'PPK',
        }
      }
      if (this.data.status === 'VERIFIED PPK') {
        return {
          maker: `${this.data.bidang.nama}`,
          keuangan: 'KEUANGAN',
          ppk: 'PPK',
        }
      }
      return {
        maker: `${this.data.bidang.nama}`,
        keuangan: 'KEUANGAN',
      }
    },
  },
  methods: {
    realisasi() {
      this.inputRealisasi = !this.inputRealisasi
      this.$store.commit('app-perjadin/UPDATE_STATUS_INPUT_REALISASI', this.inputRealisasi)
      // eslint-disable-next-line
      setTimeout(() => (this.index = 3), 200)
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
    retur() {
      this.$swal({
        title: 'Berkas perjadin akan di kembalikan ?',
        input: 'select',
        inputOptions: this.returOption,
        inputPlaceholder: 'Retur ke...',
        showCancelButton: true,
        confirmButtonText: 'Ok!',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
      }).then(result => {
        if (result.isConfirmed) {
          this.$swal({
            title: `Retur ke ${result.value} ?`,
            text: 'perjadin akan dikembalikan untuk di revisi',
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
          }).then(y => {
            if (y.isConfirmed) {
              let status = 'RENCANA'
              switch (result.value) {
                case 'KEUANGAN':
                  status = 'VERIFIKASI KEUANGAN'
                  break
                case 'PPK':
                  status = 'VERIFIKASI PPK'
                  break
                case 'BENDAHARA':
                  status = 'BENDAHARA'
                  break
                default:
                  status = 'RENCANA'
              }
              this.$store
                .dispatch('app-perjadin/statusPerjadin', {
                  id: this.data.id,
                  status,
                  status_log: `RETUR DARI ${this.userData.role}`,
                  message_log: `perjadin di retur oleh ${this.userData.role} untuk di revisi `,
                  user_data: this.userData,
                  catatan: y.value,
                })
                .then(x => {
                  if (x.status === 200) {
                    this.$swal({
                      title: 'Sukses!',
                      text: `perjadin berhasil di Retur ke ${result.value} !`,
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
        }
      })
    },
    tolak() {
      this.$swal({
        title: 'Tolak ?',
        text: 'Pengajuan perjadin akan di hentikan dengan status Tolak!',
        icon: 'warning',
        input: 'textarea',
        inputLabel: 'Catatan ?',
        inputPlaceholder: 'Ketik catatan mu disini...',
        inputAttributes: {
          'aria-label': 'Ketik catatan mu disini',
        },
        showCancelButton: true,
        confirmButtonText: 'Tolak!',
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
              status: 'TOLAK PPK',
              status_log: 'TOLAK PERJADIN PPK',
              message_log: 'Perjadin di Tolak PPK ',
              user_data: this.userData,
              catatan: result.value,
            })
            .then(x => {
              if (x.status === 200) {
                this.$swal({
                  title: 'Sukses!',
                  text: 'Perjadin berhasil di Tolak !',
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
              message_log: 'perjadin telah di verifikasi ',
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
    // BEDA LAGI
    loadTahun() {
      this.$store.dispatch('app-general/fetchTahun').then(res => {
        this.$store.commit('app-general/SET_TAHUN', res.data)
      })
    },
    loadPegawai() {
      this.$store.dispatch('app-general/fetchPegawai').then(res => {
        this.$store.commit('app-general/SET_PEGAWAI', res.data)
      })
    },
    loadMak() {
      if (this.data.tahun !== null || this.data.tahun !== '') {
        this.$store
          .dispatch('app-general/fetchMak', {
            bidang_id: this.data.bidang.id,
            tahun_id: this.data.tahun === null ? 0 : this.data.tahun.id,
          })
          .then(res => {
            this.$store.commit('app-general/SET_MAK', res.data)
          })
      }
    },
    loadPeran() {
      this.$store.dispatch('app-general/fetchPeran').then(res => {
        this.$store.commit('app-general/SET_PERAN', res.data)
      })
    },
    loadUrusan() {
      this.$store.dispatch('app-general/fetchUrusan').then(res => {
        this.$store.commit('app-general/SET_URUSAN', res.data)
      })
    },
    loadKanwil() {
      if (this.data.tahun !== null || this.data.tahun !== '') {
        this.$store.dispatch('app-general/fetchKanwil').then(res => {
          this.$store.commit('app-general/SET_KANWIL', res.data)
        })
      }
    },
  },
  mounted() {
    this.loadTahun()
    this.loadPegawai()
    this.loadMak()
    this.loadPegawai()
    this.loadUrusan()
    this.loadKanwil()
    this.loadPeran()
    console.info(this.data)
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
