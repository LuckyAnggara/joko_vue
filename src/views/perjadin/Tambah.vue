<template>
  <section>
    <b-card>
      <b-tabs v-model="tabIndex">
        <b-tab title="Umum" active>
          <template #title> <feather-icon icon="CheckIcon" class="text-success" /> Umum </template>
          <hr />
          <umum :form="form" @load-mak="loadMak()" />
        </b-tab>
        <b-tab title="Susunan Tim" :title-item-class="{ disabledTab: tabIndex < 1 }">
          <hr />
          <susunan-tim :form="form"
        /></b-tab>
        <b-tab title="Rencana Anggaran" :title-item-class="{ disabledTab: tabIndex < 2 }">
          <hr />
          <rencana-anggaran :form="form"
        /></b-tab>
        <b-tab title="Objek Pemeriksaan" :title-item-class="{ disabledTab: tabIndex < 3 }"
          ><hr />
          <obrik :form="form" />
        </b-tab>
        <b-tab title="Lampiran" :title-item-class="{ disabledTab: tabIndex < 4 }"
          ><hr />
          <lampiran :form="form" />
        </b-tab>
      </b-tabs>

      <!-- Control buttons-->
      <div>
        <b-button-group class="mt-1">
          <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" :disabled="tabIndex === 0 ? true : false" @click="tabIndex--">
            Previous
          </b-button>
          <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" @click="next()" v-if="tabIndex === 3 ? false : true">
            Next
          </b-button>
          <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-success" @click="submit()" v-if="tabIndex === 3 ? true : false">
            Submit
          </b-button>
        </b-button-group>
      </div>
    </b-card>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BButtonGroup, BButton, BCard, BTab, BTabs } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import Umum from './component/Umum.vue'
import SusunanTim from './component/SusunanTim.vue'
import RencanaAnggaran from './component/RencanaAnggaran.vue'
import Obrik from './component/Obrik.vue'
import Lampiran from './component/Lampiran.vue'

export default {
  components: {
    BButtonGroup,
    BButton,
    BCard,
    BTab,
    BTabs,
    Umum,
    SusunanTim,
    RencanaAnggaran,
    Obrik,
    Lampiran,
  },
  directives: {
    Ripple,
  },
  data: () => ({
    tabIndex: 1,
  }),
  mounted() {
    this.loadTahun()
    this.loadPegawai()
    this.loadPeran()
    this.loadKanwil()
    this.loadUrusan()
  },
  methods: {
    submit() {
      this.$swal({
        title: 'Proses ?',
        text: 'Apa anda yakin Data Perjadin sudah sesuai ?',
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
          this.$store.dispatch('app-perjadin/storePerjadin', this.form).then(x => {
            if (x.status === 200) {
              this.$swal({
                title: 'Sukses!',
                text: 'Perjadin berhasil dibuat',
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            }
            // this.show = !this.show
            this.$router.push({ name: 'perjadin-daftar' })
          })
        }
      })
    },
    next() {
      const a = this.form
      if (this.tabIndex === 0) {
        if (
          a.tahun === null ||
          a.surat_perintah.nomor_surat === null ||
          a.surat_perintah.tanggal_surat === null ||
          a.surat_perintah.perihal === null ||
          a.umum.tujuan === null ||
          a.umum.keberangkatan === null ||
          a.umum.tanggal_berangkat === null ||
          a.umum.tanggal_kembali === null ||
          a.umum.jumlah_hari === null
        ) {
          this.$swal({
            title: 'Opss!',
            text: ' Data belum lengkap!',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        } else {
          this.tabIndex += 1
          return
        }
      }
      if (this.tabIndex === 1) {
        if (a.susunan_tim.length === 0 || a.susunan_tim.length === null) {
          this.$swal({
            title: 'Opss!',
            text: 'Belum ada Tim',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        } else {
          for (let i = 0; i < a.susunan_tim.length; i += 1) {
            const b = a.susunan_tim[i]
            if (b.nip === '' || b.nip === null || b.peran === '' || b.peran === null) {
              this.$swal({
                title: 'Opss!',
                text: 'Lengkapi data Tim',
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              return
            }
          }
          this.tabIndex += 1
          return
        }
      }
      if (this.tabIndex === 2) {
        if (a.umum.mak === '' || a.umum.mak === null) {
          this.$swal({
            title: 'Opss!',
            text: 'Mata Anggaran Kegiatan belum di lengkapi',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        } else {
          this.tabIndex += 1
          return
        }
      }
      if (this.tabIndex === 3) {
        if (a.obrik.detail.length === 0 || a.obrik.detail.length === null) {
          this.$swal({
            title: 'Opss!',
            text: 'Belum ada Objek Pemeriksaan',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        } else {
          this.tabIndex += 1
        }
      }
    },
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
      if (this.form.tahun !== null || this.form.tahun !== '') {
        this.$store.dispatch('app-general/fetchKanwil').then(res => {
          this.$store.commit('app-general/SET_KANWIL', res.data)
        })
      }
    },
    loadMak() {
      if (this.form.tahun !== null || this.form.tahun !== '') {
        this.$store
          .dispatch('app-general/fetchMak', {
            bidang_id: this.userData.bidang_id,
            tahun_id: this.form.tahun === null ? 0 : this.form.tahun.id,
          })
          .then(res => {
            this.$store.commit('app-general/SET_MAK', res.data)
          })
      }
    },
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const form = ref({
      tahun: null,
      umum: {
        mak: null,
        tujuan: null,
        keberangkatan: 'Jakarta',
        tanggal_berangkat: null,
        tanggal_kembali: null,
        jumlah_hari: 0,
      },
      surat_perintah: {
        nomor_surat: null,
        tanggal_surat: null,
        perihal: null,
      },
      susunan_tim: [],
      rencana_anggaran: [],
      obrik: {
        kanwil: null,
        detail: [],
      },
      lampiran: [],
      user_data: JSON.parse(localStorage.getItem('userData')),
    })
    return {
      userData,
      form,
    }
  },
}
</script>

<style>
.disabledTab .nav-link {
  pointer-events: none;
  color: #666666;
}
</style>
