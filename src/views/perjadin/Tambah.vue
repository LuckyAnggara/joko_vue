<template>
  <section>
    <b-card>
      <b-overlay :show="show" rounded="sm" variant="transparent" blur="5px" opacity="0.95">
        <b-tabs v-model="tabIndex">
          <b-tab title="Umum" active>
            <template #title> Umum </template>
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
          <b-tab title="Lampiran"
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
            <feather-icon icon="Edit3Icon" size="2x" />
            <p>{{ title }}</p>
          </div>
          <div v-if="processing" class="text-center rounded">
            <feather-icon icon="UploadIcon" size="2x" />
            <p>{{ title }}</p>
          </div>
        </template>
      </b-overlay>
    </b-card>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BOverlay, BButtonGroup, BButton, BCard, BTab, BTabs } from 'bootstrap-vue'
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
    this.loadTahun()
    this.loadPegawai()
    this.loadPeran()
    this.loadKanwil()
    this.loadUrusan()
  },
  methods: {
    submit() {
      this.show = !this.show
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
          this.$store.dispatch('app-perjadin/storePerjadin', this.form).then(res => {
            if (res.status === 200) {
              for (let i = 0; i < this.form.lampiran.surat_perintah.length; i += 1) {
                this.file.append('lampiran_sp[]', this.form.lampiran.surat_perintah[i])
              }
              for (let i = 0; i < this.form.lampiran.rab.length; i += 1) {
                this.file.append('lampiran_rab[]', this.form.lampiran.rab[i])
              }
              for (let i = 0; i < this.form.lampiran.lainnya.length; i += 1) {
                this.file.append('lampiran_lainnya[]', this.form.lampiran.lainnya[i])
              }
              this.file.append('id', res.data.id)
              this.titleLoading = 'Upload lampiran ...'
              this.processing = !this.processing
              this.$store.dispatch('app-perjadin/storeLampiranPerjadin', this.file).then(x => {
                if (x.status === 200) {
                  this.$swal({
                    title: 'Sukses!',
                    text: 'Berhasil!',
                    icon: 'success',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                } else {
                  this.$swal({
                    title: 'Opss!',
                    text: ' Data belum lengkap!',
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
                this.show = !this.show
                this.file = new FormData()
                // this.$router.push({ name: 'kegiatan-daftar' })
              })
            }
            // this.show = !this.show
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
    const titleLoading = 'Pembuatan Data Perjalanan Dinas'
    const processing = ref(false)
    const file = new FormData()
    const show = ref(false)
    const form = ref({
      tahun: null,
      umum: {
        mak: null,
        tujuan: null,
        keberangkatan: 'Jakarta',
        tanggal_berangkat: null,
        tanggal_kembali: null,
        jumlah_hari: 0,
        keterangan: null,
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
      lampiran: {
        surat_perintah: ref([]),
        rab: ref([]),
        lainnya: ref([]),
      },
      user_data: JSON.parse(localStorage.getItem('userData')),
    })
    return {
      file,
      processing,
      show,
      titleLoading,
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
