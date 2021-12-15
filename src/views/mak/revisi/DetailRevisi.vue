<template>
  <section>
    <b-row>
      <b-col lg="3">
        <b-card>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tahun Anggaran">
                <b-form-input v-model="data.tahun.nama" disabled />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Keterangan">
                <b-form-textarea v-model="data.keterangan" type="text" placeholder="Keterangan" disabled />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tanggal Mulai">
                <b-form-input :value="$moment(data.tanggal_mulai).format('DD MMMM YYYY')" disabled />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Tanggal Akhir">
                <b-form-input :value="$moment(data.tanggal_akhir).format('DD MMMM YYYY')" disabled />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Status Revisi Anggaran">
                <b-badge pill variant="light-primary" v-if="data.status_master === 'BUKA'"> {{ data.status_master }} </b-badge>
                <b-badge pill variant="light-warning" v-if="data.status_master === 'VERIFIKASI'"> {{ data.status_master }}</b-badge>
                <b-badge pill variant="danger" v-if="data.status_master === 'TUTUP'"> {{ data.status_master }}</b-badge>
                <b-badge pill variant="success" v-if="data.status_master === 'SELESAI'"> {{ data.status_master }} </b-badge>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Lampiran">
                <template v-if="data.file !== null ? true : false">
                  <b-link :href="urlGet(data.id, 'revisi-anggaran')" class="font-weight-bold" target="_blank"> {{ data.nama_file }} </b-link>
                </template>
                <template v-else>
                  <span>Tidak ada lampiran</span>
                </template>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Bagian / Wilayah">
                <b-form-input v-model="data.bidang.nama" disabled />
              </b-form-group>
              <b-form-group label="Pagu Awal">
                <b-form-input :value="formatRupiah(data.pagu_awal)" disabled />
              </b-form-group>

              <b-form-group label="Pagu Akhir">
                <b-form-input :value="formatRupiah(paguAkhir)" disabled />
              </b-form-group>

              <b-form-group label="Pagu Realokasi">
                <b-form-input :value="formatRupiah(paguRealokasi)" disabled />
              </b-form-group>

              <b-form-group label="Status Revisi Bagian / Wilayah">
                <b-badge pill variant="light-primary" v-if="data.status === 'PROSES'"> {{ data.status }} </b-badge>
                <b-badge pill variant="warning" v-if="data.status === 'VERIFIKASI'"> {{ data.status }}</b-badge>
                <b-badge pill variant="light-danger" v-if="data.status === 'REVISI'"> {{ data.status }}</b-badge>
                <b-badge pill variant="success" v-if="data.status === 'VERIFIED'"> {{ data.status }} </b-badge>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="9" cols="12">
        <b-card :title="`Revisi Anggaran ${userData.bidang.nama}`">
          <b-form-group label="Pool Pagu" label-cols-lg="3">
            <b-form-input :value="formatRupiah(maxPool)" readonly :class="maxPool < 0 ? 'text-danger' : ''" />
            <small>Ini adalah Total Pagu yang bisa di distribusikan ke Mata Anggaran lainnya</small>
          </b-form-group>
          <b-form-group label="Total Pagu" label-cols-lg="3">
            <b-form-input :value="formatRupiah(maxPool2)" readonly />
          </b-form-group>

          <b-table small responsive :fields="tableColumns" :items="dataMak" show-empty empty-text="Tidak ada data" class="position-relative">
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(id)="data">
              <span>
                {{ data.index + 1 }}
              </span>
            </template>
            <template #cell(mak)="data">
              <span>
                {{ data.status === 'PROSES' ? data.item.kode : data.item.mak.kode }}
              </span>
              <br />
              <span>
                {{ data.status === 'PROSES' ? data.item.nama : data.item.mak.nama }}
              </span>
            </template>
            <template #cell(revisi_pagu)="data">
              <b-row>
                <b-col cols="6">
                  <b-form-group label="Sebelum" class="text-primary">
                    <!-- <b-form-input :value="formatRupiah(data.item.passive_pagu)" /> -->
                    <cleave
                      disabled
                      v-model="data.item.pagu_awal"
                      :options="{
                        numeral: true,
                        numeralThousandsGroupStyle: 'thousand',
                      }"
                      class="form-control"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group label="Sesudah" :class="data.item.pagu_awal === data.item.pagu ? 'text-primary' : 'text-success'">
                    <cleave
                      v-model="data.item.pagu"
                      :options="{
                        numeral: true,
                        numeralThousandsGroupStyle: 'thousand',
                      }"
                      class="form-control"
                      :disabled="kirim"
                      @blur="cek(data.item.pagu, data.item.realisasi, max(data.item.pagu), data.index)"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </template>
          </b-table>

          <b-row>
            <b-col cols="6" md="6" class="mt-2">
              <b-button variant="warning" class="btn-icon mx-1" size="md" v-if="!kirim" @click="confirm"> Kirim </b-button>
              <b-button variant="danger" class="btn-icon mx-1" size="md" v-if="data.status === 'VERIFIKASI'" @click="confirm"> Retur </b-button>
              <b-button variant="success" class="btn-icon mx-1" size="md" v-if="data.status === 'VERIFIKASI'" @click="verified"> Proses </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BLink, BBadge, BButton, BFormGroup, BFormTextarea, BFormInput, BSpinner, BCard, BRow, BCol, BTable } from 'bootstrap-vue'
import { formatRupiah, urlGet } from '@core/utils/filter'
import Cleave from 'vue-cleave-component'

export default {
  components: {
    BLink,
    BBadge,
    BButton,
    BFormGroup,
    BFormTextarea,
    BFormInput,
    BSpinner,
    BCard,
    BRow,
    BCol,
    BTable,
    Cleave,
  },
  computed: {
    data() {
      return this.$store.getters['app-mak/getDetailRevisiAnggaranUser']
    },
    paguAkhir() {
      let max = 0
      this.dataMak.forEach(x => {
        max += parseFloat(x.pagu)
      })
      return max
    },
    paguRealokasi() {
      return parseFloat(this.data.pagu_awal) - parseFloat(this.paguAkhir)
    },
    maxPool() {
      let max = 0
      this.dataMak.forEach(x => {
        max += parseFloat(x.pagu)
      })
      return this.maxPool2 - max
    },
    maxPool2() {
      let max = 0
      this.dataMak.forEach(x => {
        max += parseFloat(x.pagu_awal)
      })
      return max
    },
  },
  mounted() {
    if (this.data.status_master === 'TUTUP') {
      this.kirim = true
    }
    if (this.data.status === 'PROSES') {
      this.loadMak()
    } else {
      this.kirim = true
      this.loadMakRevisi()
    }
  },
  methods: {
    urlGet,
    formatRupiah,
    cek(x, y, z, i) {
      if (x === '' || x === null) {
        this.dataMak[i].pagu = 0
      }
      if (y > x) {
        this.dataMak[i].pagu = y
      } else if (x > z) {
        this.dataMak[i].pagu = z
      }
    },
    max(x) {
      return parseFloat(x) + parseFloat(this.maxPool)
    },
    loadMak() {
      this.isBusy = !this.isBusy
      this.$store
        .dispatch('app-mak/fetchMak', {
          tahun_id: this.data.tahun.id,
          bidang_id: this.data.bidang_id,
        })
        .then(res => {
          this.isBusy = !this.isBusy
          this.dataTemp = res.data
          /* eslint-disable */
          for (let i = 0; i < this.dataTemp.length; i++) {
            this.dataTemp[i].pagu_awal = this.dataTemp[i].pagu
          }
          /* eslint-enable */
          this.dataMak = this.dataTemp
        })
    },
    loadMakRevisi() {
      this.dataTemp = this.data.detail
      /* eslint-disable */
      for (let i = 0; i < this.dataTemp.length; i++) {
        this.dataTemp[i].pagu = this.dataTemp[i].pagu_akhir
      }
      /* eslint-enable */
      this.dataMak = this.dataTemp
    },
    confirm() {
      if (this.paguRealokasi > 0) {
        this.$swal({
          title: 'Konfirmasi',
          text: `Pagu Realokasi masih tersisa ${this.formatRupiah(this.paguRealokasi)}, apa tetap akan di proses? `,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.isConfirmed) {
            this.proses()
          }
        })
      } else {
        this.proses()
      }
    },
    proses() {
      this.$swal({
        title: 'Proses ?',
        text: 'Apa anda yakin Data Revisi sudah sesuai ? Revisi akan dikirim ke Bagian Keuangan!',
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
          this.data.detail = this.dataMak
          this.data.pagu_akhir = this.paguAkhir
          this.data.pagu_realokasi = this.paguRealokasi
          this.$store.dispatch('app-mak/storeRevisiAnggaranUser', this.data).then(res => {
            if (res.status === 200) {
              this.$swal({
                title: 'Success!',
                text: 'Data revisi berhasil di Kirim!!',
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              this.data.status = 'VERIFIKASI'
              this.kirim = !this.kirim
            } else {
              this.$swal({
                title: 'Oopps!',
                text: res.data,
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
    verified() {
      this.$swal({
        title: 'Verifikasi Selesai ?',
        text: 'Apa anda yakin Data Revisi sudah sesuai ? Status akan menjadi VERIFIED',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.isConfirmed) {
          this.$store
            .dispatch('app-mak/statusRevisiAnggaranDetail', {
              id: this.data.id,
              status: 'VERIFIED',
            })
            .then(res => {
              if (res.status === 200) {
                this.$swal({
                  title: 'Success!',
                  text: 'Data revisi berhasil di Verifikasi!!',
                  icon: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                })
                this.data.status = 'VERIFIED'
                this.verifikasi = !this.verifikasi
              } else {
                this.$swal({
                  title: 'Oopps!',
                  text: res.data,
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
    const kirim = ref(false)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const isBusy = false
    const dataTemp = ref([])
    const dataMak = ref([])
    const tableColumns = [{ key: 'id', label: '#' }, { key: 'mak' }, { key: 'revisi_pagu' }]
    return {
      kirim,
      userData,
      isBusy,
      tableColumns,
      dataTemp,
      dataMak,
    }
  },
}
</script>
