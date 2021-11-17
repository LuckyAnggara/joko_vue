<template>
  <!-- <b-row class="match-height"> -->
  <section>
    <b-row class="mb-2">
      <b-col lg="6" sm="12" class="text-left">
        <p>STATUS : {{ form.status }}</p>
      </b-col>
      <b-col sm="12" lg="6" no-gutters class="text-right">
        <!-- <b-card> -->
        <div>
          <template v-if="userData.role === 'USER' && (form.status === 'PENGAJUAN' || form.status === 'REVISI UMUM') ? true : false">
            <b-button variant="outline-danger" class="mr-1" @click="destroy()"> Delete </b-button>
            <b-button variant="outline-secondary" class="mr-1" @click="destroy()"> Edit </b-button>
            <b-button variant="outline-primary" class="ml-1" @click="kirimUmum('VERIFIKASI UMUM')"> Kirim </b-button>
          </template>

          <template v-if="userData.role === 'ADMIN UMUM' && form.status === 'VERIFIKASI UMUM' ? true : false">
            <b-button variant="outline-danger" class="mr-1" @click="retur()"> Retur </b-button>
            <b-button variant="danger" class="mr-1" @click="tolak()"> Tolak </b-button>
            <b-button variant="success" class="ml-1" @click="proses('SELESAI')"> Proses </b-button>
          </template>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col lg="5" sm="12">
        <b-card title="Permintaan Barang">
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tahun Anggaran" label-cols-md="3">
                <b-form-input v-model="form.tahun.nama" placeholder="Tahun Anggaran" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Wilayah / Bagian" label-cols-md="3">
                <b-form-input v-model="form.bidang.nama" placeholder="Wilayah / Bagian" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Keterangan" label-cols-md="3">
                <b-form-textarea v-model="form.keterangan" type="text" placeholder="Keterangan" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Lampiran" label-cols-md="3">
                <ol>
                  <li v-for="item in form.lampiran" :key="item.id">
                    <b-link :href="urlGet(item.id, 'barang')" class="font-weight-bold" target="_blank"> {{ item.nama }} </b-link>
                  </li>
                </ol>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
        <b-card title="Log Permintaan Barang">
          <log />
        </b-card>
      </b-col>
      <b-col lg="7" sm="12">
        <b-card title="Detail Barang">
          <b-table
            ref="refTable"
            small
            responsive
            :fields="tableColumns"
            :items="form.data_barang"
            show-empty
            empty-text="Tidak ada data"
            class="position-relative"
          >
            <template #cell(no)="data">
              <span>
                {{ data.index + 1 }}
              </span>
            </template>

            <template #cell(nama)="data">
              <span>
                {{ data.item.barang.nama }}
              </span>
            </template>

            <template #cell(satuan)="data">
              <span>
                {{ data.item.barang.satuan }}
              </span>
            </template>

            <template #cell(jumlah_permintaan)="data">
              <span :class="data.item.jumlah_permintaan > data.item.saldo_akhir ? 'text-danger' : 'text-success'">
                {{ data.item.jumlah_permintaan }}
              </span>
            </template>

            <template #cell(disetujui)="data">
              <b-form-input v-model="data.item.jumlah_disetujui" type="number" />
            </template>

            <template #cell(sisa_saldo)="data">
              <span>
                {{ data.item.saldo_akhir }}
              </span>
            </template>
            <!-- Column: Actions -->
            <template #cell(actions)="data">
              <div class="text-nowrap">
                <feather-icon icon="TrashIcon" size="16" class="mx-1" @click="del(data.index)" />
              </div>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {
  BLink,
  BFormTextarea,
  BTable,
  BCard,
  BRow,
  BCol,
  BButton,
  BFormInput,
  BFormGroup,
  // BFormDatepicker,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
// import vSelect from 'vue-select'
import { urlGet } from '@core/utils/filter'
import Log from './LogTimeline.vue'

export default {
  components: {
    BLink,
    BFormTextarea,
    BTable,
    BCard,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BFormGroup,
    Log,
    // BFormDatepicker,
    // vSelect,
  },
  directives: {
    Ripple,
  },
  computed: {
    form() {
      return this.$store.getters['app-barang/getDetailPermintaan']
    },
  },
  methods: {
    urlGet,
    success() {
      this.$swal({
        title: 'Success!',
        text: 'Pembelian berhasil di proses!!',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    },
    kirimUmum(status) {
      this.$swal({
        title: 'Kirim ke Umum ?',
        text: 'Pengajuan permintaan persediaaan akan di kirim ke umum !',
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
            .dispatch('app-barang/statusPermintaan', {
              id: this.form.id,
              status,
              status_log: `KIRIM UMUM - ${status}`,
              message_log: 'permintaan persediaan telah dikirim ke umum ',
              user_data: this.userData,
              catatan: result.value,
            })
            .then(x => {
              if (x.status === 200) {
                this.$swal({
                  title: 'Sukses!',
                  text: 'permintaan berhasil dikirim',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.$router.push({ name: 'permintaan-persediaan-daftar' })
              }
            })
        }
      })
    },
    retur() {
      this.$swal({
        title: 'Retur ?',
        text: 'Pengajuan permintaan akan di kembalikan !',
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
            .dispatch('app-barang/statusPermintaan', {
              id: this.form.id,
              status: 'REVISI UMUM',
              status_log: 'RETUR DARI UMUM',
              message_log: 'permintaan persediaan telah dikembalikan ',
              user_data: this.userData,
              catatan: result.value,
            })
            .then(x => {
              if (x.status === 200) {
                this.$swal({
                  title: 'Sukses!',
                  text: 'permintaan berhasil dikirim',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.$router.push({ name: 'permintaan-persediaan-daftar' })
              }
            })
        }
      })
    },
    proses(status) {
      this.$swal({
        title: 'Proses ?',
        text: 'Permintaan persediaan akan di proses',
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
          this.form.user_data = this.userData
          this.$store.dispatch('app-barang/prosesPermintaan', this.form).then(x => {
            if (x.status === 200) {
              this.$store
                .dispatch('app-barang/statusPermintaan', {
                  id: this.form.id,
                  status,
                  status_log: 'SELESAI',
                  message_log: 'Permintaan persediaan telah di proses oleh ',
                  user_data: this.userData,
                  catatan: result.value,
                })
                .then(y => {
                  if (y.status === 200) {
                    this.$swal({
                      title: 'Sukses!',
                      text: 'Permintaan persediaan berhasil di proses',
                      icon: 'success',
                      customClass: {
                        confirmButton: 'btn btn-primary',
                      },
                      buttonsStyling: false,
                    })
                    this.$router.push({ name: 'permintaan-persediaan-daftar' })
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
        text: 'Permintaan persediaan akan di tolak!',
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
        console.info(result)
        if (result.isConfirmed) {
          this.$store
            .dispatch('app-barang/statusPermintaan', {
              id: this.data.id,
              status: 'TOLAK',
              status_log: 'TOLAK PERMINTAAN',
              message_log: 'Permintaan persediaan di tolak Umum ',
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
                this.$router.push({ name: 'persediaan-permintaan-daftar' })
              }
            })
        }
      })
    },
    destroy() {
      this.$swal({
        title: 'Delete ?',
        text: 'Permintaan persediaan akan di Delete ?',
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
          this.$store.dispatch('app-barang/deletePermintaan', this.form.id).then(res => {
            if (res.status === 200) {
              this.$swal({
                title: 'Sukses!',
                text: 'Permintaan persediaan berhasil di Delete!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              this.$router.push({ name: 'permintaan-persediaan-daftar' })
            }
          })
        }
      })
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
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const tableColumns = [
      { key: 'no', label: '#' },
      { key: 'nama', label: 'NAMA BARANG' },
      { key: 'satuan' },
      { key: 'sisa_saldo' },
      { key: 'jumlah_permintaan' },
      {
        key: 'disetujui',
        thClass: userData.role !== 'USER' ? '' : this.form.status === 'selesai' ? '' : 'd-none',
        tdClass: userData.role !== 'USER' ? '' : this.form.status === 'selesai' ? '' : 'd-none',
      },
      // { key: 'actions' },
    ]

    return {
      tableColumns,
      userData,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
