<template>
  <section>
    <b-card>
      <b-overlay :show="show" rounded="lg" variant="transparent" blur="15px" opacity="0.70">
        <b-tabs v-model="tabIndex">
          <b-tab title="Umum" active>
            <template #title> Umum </template>
            <hr />
            <umum @load-mak="loadMak()" />
          </b-tab>
          <b-tab title="Susunan Tim" :title-item-class="{ disabledTab: tabIndex < 1 }">
            <hr />
            <susunan-tim
          /></b-tab>
          <b-tab title="Rencana Anggaran" :title-item-class="{ disabledTab: tabIndex < 2 }">
            <hr />
            <rencana-anggaran
          /></b-tab>
          <b-tab title="Objek Pemeriksaan" :title-item-class="{ disabledTab: tabIndex < 3 }"
            ><hr />
            <obrik />
          </b-tab>
          <b-tab title="Lampiran"
            ><hr />
            <lampiran />
          </b-tab>
        </b-tabs>

        <!-- Control buttons-->
        <div>
          <b-button-group class="mt-1">
            <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" :disabled="tabIndex === 0 ? true : false" @click="tabIndex--">
              Previous
            </b-button>
            <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" @click="next()" v-if="tabIndex === 4 ? false : true">
              Next
            </b-button>
            <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-success" @click="submit()" v-if="tabIndex === 4 ? true : false">
              Submit
            </b-button>
          </b-button-group>
        </div>
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
    </b-card>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BOverlay, BButtonGroup, BButton, BCard, BTab, BTabs } from 'bootstrap-vue'
import useProvinsiStore from '@/store/pinia/provinsiStore'
import usePegawaiStore from '@/store/pinia/pegawaiStore'
import usePerjadinStore from '@/store/pinia/perjadinStore'

import Ripple from 'vue-ripple-directive'
import Umum from './component/tambah/Umum.vue'
import SusunanTim from './component/tambah/SusunanTim.vue'
import RencanaAnggaran from './component/tambah/RencanaAnggaran.vue'
import Obrik from './component/tambah/Obrik.vue'
import Lampiran from './component/tambah/Lampiran.vue'

export default {
  components: {
    BOverlay,
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
    this.pegawaiStore.currentLimit = 5
    this.provinsiStore.getData()
    this.pegawaiStore.getData()
    this.loadTahun()
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
        if (result.isConfirmed) {
          this.show = !this.show
          this.$store
            .dispatch('app-perjadin/storePerjadin', this.perjadinStore.form)
            .then(res => {
              if (res.status === 200) {
                for (let i = 0; i < this.perjadinStore.form.lampiran.surat_perintah.length; i += 1) {
                  this.file.append('lampiran_sp[]', this.perjadinStore.form.lampiran.surat_perintah[i])
                }
                for (let i = 0; i < this.perjadinStore.form.lampiran.rab.length; i += 1) {
                  this.file.append('lampiran_rab[]', this.perjadinStore.form.lampiran.rab[i])
                }
                for (let i = 0; i < this.perjadinStore.form.lampiran.lainnya.length; i += 1) {
                  this.file.append('lampiran_lainnya[]', this.perjadinStore.form.lampiran.lainnya[i])
                }
                this.file.append('id', res.data.id)
                this.file.append('user_id', this.userData.id)
                this.titleLoading = 'Upload lampiran ...'
                this.processing = !this.processing
                this.$store
                  .dispatch('app-perjadin/storeLampiranPerjadin', this.file)
                  .then(x => {
                    if (x.status === 200) {
                      this.$swal({
                        title: 'Sukses!',
                        text: 'Data perjalanan dinas berhasil dibuat!',
                        icon: 'success',
                        customClass: {
                          confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false,
                      })
                      this.show = !this.show
                      this.file = new FormData()
                      this.$router.push({ name: 'perjadin-daftar' })
                    }
                  })
                  .catch(err => {
                    this.show = !this.show
                    this.file = new FormData()
                    this.$swal({
                      title: 'Error!',
                      text: err,
                      icon: 'error',
                      customClass: {
                        confirmButton: 'btn btn-primary',
                      },
                      buttonsStyling: false,
                    })
                  })
              }
            })
            .catch(err => {
              this.show = !this.show
              this.file = new FormData()
              this.$swal({
                title: 'Error!',
                text: err,
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
    next() {
      const a = this.perjadinStore.form
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
          a.umum.jumlah_hari === null ||
          a.umum.maksud === null ||
          a.umum.output === null ||
          a.umum.ppk === null ||
          a.umum.bendahara === null
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
            if (b.pegawai.nip === '' || b.pegawai.nip === null || b.peran === '' || b.peran === null) {
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
      if (this.perjadinStore.form.tahun !== null || this.perjadinStore.form.tahun !== '') {
        this.$store.dispatch('app-general/fetchKanwil').then(res => {
          this.$store.commit('app-general/SET_KANWIL', res.data)
        })
      }
    },
    loadMak() {
      if (this.perjadinStore.form.tahun !== null || this.perjadinStore.form.tahun !== '') {
        this.$store
          .dispatch('app-general/fetchMak', {
            bidang_id: this.userData.bidang_id,
            tahun_id: this.perjadinStore.form.tahun === null ? 0 : this.perjadinStore.form.tahun.id,
          })
          .then(res => {
            this.$store.commit('app-general/SET_MAK', res.data)
          })
      }
    },
  },
  setup() {
    const pegawaiStore = usePegawaiStore()
    const perjadinStore = usePerjadinStore()
    const provinsiStore = useProvinsiStore()
    const userData = JSON.parse(localStorage.getItem('userData'))
    const titleLoading = 'Pembuatan Data Perjalanan Dinas ...'
    const processing = ref(false)
    const file = new FormData()
    const show = ref(false)

    return {
      pegawaiStore,
      provinsiStore,
      perjadinStore,
      file,
      processing,
      show,
      titleLoading,
      userData,
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
