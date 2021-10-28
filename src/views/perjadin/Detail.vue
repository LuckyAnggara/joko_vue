<template>
  <section>
    <b-row>
      <template v-if="userData.role === 'VERIFIKATOR KEUANGAN' ? true : false">
        <b-col sm="12" md="2" offset-md="10" lg="2" offset-lg="10">
          <b-button variant="danger" class="mr-1"> Retur </b-button>
          <b-button variant="success" class="ml-1" @click="verifikasiKeuangan()"> Proses </b-button>
        </b-col>
      </template>
      <template v-else-if="userData.role === 'USER' ? true : false">
        <b-col sm="12" md="2" offset-md="10" lg="2" offset-lg="10">
          <b-button variant="primary" class="mr-1"> Edit </b-button>
          <b-button variant="danger" class="ml-1" @click="destroy()"> Delete </b-button>
        </b-col>
      </template>
    </b-row>
    <b-tabs class="mt-1" vertical pills>
      <b-tab title="Umum" active> <umum /></b-tab>
      <b-tab title="Susunan Tim"><susunan-tim /></b-tab>
      <b-tab title="Mak"> <mak /></b-tab>
      <b-tab title="Anggaran"><anggaran /></b-tab>
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
  },
  methods: {
    destroy() {
      const data = this.$store.getters['app-perjadin/getDetail']
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
          this.$store.dispatch('app-perjadin/deletePerjadin', data.id).then(res => {
            if (res.status === 200) {
              this.$router.push({ name: 'perjadin-daftar' })
            }
          })
        }
      })
    },
    verifikasiKeuangan() {
      const data = this.$store.getters['app-perjadin/getDetail']
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
              id: data.id,
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
    const userData = JSON.parse(localStorage.getItem('userData'))
    return {
      userData,
    }
  },
}
</script>
