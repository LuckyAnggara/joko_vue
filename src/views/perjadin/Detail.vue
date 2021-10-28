<template>
  <section>
    <b-row>
      <template v-if="userData.role === 'VERIFIKATOR KEUANGAN' ? true : false">
        <b-col sm="12" md="2" offset-md="10" lg="2" offset-lg="10">
          <b-button variant="danger" class="mr-1" @click="retur1()"> Retur </b-button>
          <b-button variant="success" class="ml-1" @click="verifikasiKeuangan()"> Proses </b-button>
        </b-col>
      </template>
      <template v-if="userData.role === 'USER' && data.status === 'PELAKSANAAN' ? true : false">
        <b-col sm="12" md="2" offset-md="10" lg="2" offset-lg="10">
          <b-button variant="primary" class="mr-1" @click="realisasi()" v-if="!inputRealisasi"> Realisasi </b-button>
          <b-button variant="success" class="mr-1" @click="submitRealisasi()" v-if="inputRealisasi"> Submit </b-button>
        </b-col>
      </template>
      <template v-if="userData.role === 'PPK' ? true : false">
        <b-col sm="12" md="2" offset-md="10" lg="2" offset-lg="10">
          <b-button variant="danger" class="mr-1" @click="retur2()"> Retur </b-button>
          <b-button variant="success" class="ml-1" @click="verifikasiPPK()"> Proses </b-button>
        </b-col>
      </template>
      <template v-else-if="userData.role === 'USER' && data.status === 'PENGAJUAN' ? true : false">
        <b-col sm="12" md="2" offset-md="10" lg="2" offset-lg="10">
          <b-button variant="primary" class="mr-1"> Edit </b-button>
          <b-button variant="danger" class="ml-1" @click="destroy()"> Delete </b-button>
        </b-col>
      </template>
    </b-row>
    <b-tabs v-model="index" class="mt-1" vertical pills>
      <b-tab title="Umum" active> <umum /></b-tab>
      <b-tab title="Susunan Tim"><susunan-tim /></b-tab>
      <b-tab title="Mak"> <mak /></b-tab>
      <b-tab title="Anggaran"><anggaran /></b-tab>
      <b-tab title="Realisasi" v-if="inputRealisasi" active><realisasi /></b-tab>
      <b-tab title="Lampiran"> <lampiran /></b-tab>
    </b-tabs>
  </section>
</template>

<script>
import { BCol, BRow, BButton, BTab, BTabs } from 'bootstrap-vue'
import Umum from './component/detail/Umum.vue'
import Mak from './component/detail/Mak.vue'
import SusunanTim from './component/detail/SusunanTim.vue'
import Anggaran from './component/detail/Anggaran.vue'
import Realisasi from './component/detail/Realisasi.vue'
import Lampiran from './component/detail/Lampiran.vue'

export default {
  components: {
    BCol,
    BRow,
    BButton,
    BTab,
    BTabs,
    Umum,
    Mak,
    SusunanTim,
    Lampiran,
    Anggaran,
    Realisasi,
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
        if (result.value) {
          this.$store.dispatch('app-perjadin/deletePerjadin', this.data.id).then(res => {
            if (res.status === 200) {
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
        showCancelButton: true,
        confirmButtonText: 'Retur!',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch('app-perjadin/statusPerjadin', {
              id: this.data.id,
              status: 'REVISI KEUANGAN',
              status_log: 'RETUR DARI KEUANGAN',
              message_log: 'perjadin di retur oleh keuangan untuk di revisi ',
              user_data: this.userData,
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
    retur2() {
      this.$swal({
        title: 'Retur ?',
        text: 'Perjadin akan dikembalikan untuk di revisi',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Retur!',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-outline-primary ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch('app-perjadin/statusPerjadin', {
              id: this.data.id,
              status: 'REVISI PPK',
              status_log: 'RETUR DARI PPK',
              message_log: 'perjadin di retur oleh ppk untuk di revisi ',
              user_data: this.userData,
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
    verifikasiKeuangan() {
      this.$swal({
        title: 'Verifikasi Keuangan Selesai ?',
        text: 'Perjadin akan masuk tahap pelaksanaan',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Proses!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch('app-perjadin/statusPerjadin', {
              id: this.data.id,
              status: 'PELAKSANAAN',
              status_log: 'VERIFIED KEUANGAN',
              message_log: 'perjadin telah di verifikasi oleh ',
              user_data: this.userData,
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
