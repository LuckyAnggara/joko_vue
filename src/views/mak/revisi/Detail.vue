<template>
  <section>
    <b-row class="match-height">
      <b-col lg="4">
        <b-card>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tahun Anggaran">
                <b-form-input v-model="fake.tahun.nama" disabled />
                <small class="text-danger" v-if="edit">Tahun Anggaran tidak bisa di ubah</small>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Keterangan">
                <b-form-textarea :value="fake.keterangan" type="text" placeholder="Keterangan" v-if="!edit" disabled />
                <b-form-textarea v-model="fake.keterangan" type="text" placeholder="Keterangan" v-if="edit" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tanggal Mulai">
                <b-form-input :value="$moment(fake.tanggal_mulai).format('DD MMMM YYYY')" disabled v-if="!edit" />
                <b-form-datepicker
                  v-if="edit"
                  locale="id"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  v-model="fake.tanggal_mulai"
                  :max="fake.tanggal_akhir"
                  placeholder="Tanggal Mulai"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Tanggal Akhir">
                <b-form-input :value="$moment(fake.tanggal_akhir).format('DD MMMM YYYY')" disabled v-if="!edit" />
                <b-form-datepicker
                  v-if="edit"
                  locale="id"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  :min="fake.tanggal_mulai"
                  v-model="fake.tanggal_akhir"
                  placeholder="Tanggal Akhir"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Status">
                <template v-if="!edit">
                  <b-badge pill variant="light-primary" v-if="fake.status === 'BUKA'"> {{ fake.status }} </b-badge>
                  <b-badge pill variant="light-warning" v-if="fake.status === 'VERIFIKASI'"> {{ fake.status }}</b-badge>
                  <b-badge pill variant="danger" v-if="fake.status === 'TUTUP'"> {{ fake.status }}</b-badge>
                  <b-badge pill variant="success" v-if="fake.status === 'SELESAI'"> {{ fake.status }} </b-badge>
                </template>

                <v-select v-if="edit" v-model="fake.status" placeholder="Status" :options="statusOption" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Lampiran">
                <template v-if="fake.file !== null ? true : false">
                  <b-link :href="urlGet(fake.id, 'revisi-anggaran')" class="font-weight-bold" target="_blank"> {{ fake.nama_file }} </b-link>
                  <feather-icon v-if="edit" icon="TrashIcon" size="16" class="mx-1 text-danger" @click="hapus_lampiran" />
                </template>
                <template v-else>
                  <template v-if="!edit">
                    <span>Tidak ada lampiran</span>
                  </template>
                  <template v-if="edit">
                    <b-form-file
                      @change="uploadLampiran"
                      placeholder="Pilih data atau Drag and Drop di sini."
                      drop-placeholder="Drop file disini..."
                      ref="file_input"
                    >
                      <template slot="file-name" slot-scope="{ names }">
                        <b-badge variant="dark">{{ names[0] }}</b-badge>
                        <b-badge v-if="names.length > 1" variant="dark" class="ml-1"> + {{ names.length - 1 }} More files </b-badge>
                      </template>
                    </b-form-file>
                  </template>
                </template>
              </b-form-group>
            </b-col>
            <template v-if="fake.status === 'SELESAI' ? false : true">
              <template v-if="!edit">
                <b-col cols="12" md="12" class="mt-2">
                  <b-button variant="danger" class="btn-icon" size="md" @click="delete_data(data.id)"> Hapus </b-button>

                  <b-button variant="warning" class="btn-icon mx-1" size="md" @click="edit = !edit"> Edit </b-button>
                  <b-button variant="success" class="btn-icon mx-1" size="md" @click="proses"> Proses </b-button>
                </b-col>
              </template>

              <template v-if="edit">
                <b-col cols="12" md="12" class="mt-2">
                  <b-button variant="danger" class="btn-icon mx-1" size="md" @click="batal"> Batal </b-button>
                  <b-button variant="primary" class="btn-icon" size="md" @click="ubah"> Simpan </b-button>
                </b-col>
              </template>
            </template>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="8" cols="12">
        <b-card title="Detail Status Revisi Anggaran Wilayah / Bagian">
          <b-table
            small
            :busy="isBusy"
            ref="refTable"
            responsive
            primary-key="id"
            :fields="tableColumns"
            :items="data.detail"
            show-empty
            empty-text="Tidak ada data"
            class="position-relative"
          >
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
            <template #cell(bidang)="data">
              <span>
                {{ data.item.bidang.nama }}
              </span>
            </template>

            <template #cell(pagu_awal)="data">
              <span>
                {{ formatRupiah(data.item.pagu_awal) }}
              </span>
            </template>

            <template #cell(pagu_akhir)="data">
              <span>
                {{ formatRupiah(data.item.pagu_akhir) }}
              </span>
            </template>

            <template #cell(pagu_realokasi)="data">
              <span>
                {{ formatRupiah(parseFloat(data.item.pagu_awal) - parseFloat(data.item.pagu_akhir)) }}
              </span>
            </template>
            <template #cell(status)="data">
              <div class="text-nowrap">
                <template v-if="fake.status !== 'SELESAI'">
                  <b-badge pill variant="light-primary" v-if="data.item.status === 'PROSES'"> {{ data.item.status }} </b-badge>
                  <b-badge pill variant="warning" v-if="data.item.status === 'VERIFIKASI'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="light-danger" v-if="data.item.status === 'REVISI'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="success" v-if="data.item.status === 'VERIFIED'"> {{ data.item.status }} </b-badge>
                </template>
                <template v-if="fake.status === 'SELESAI'">
                  <b-badge pill variant="success"> SELESAI</b-badge>
                </template>
              </div>
            </template>
            <!-- Column: Actions -->
            <template #cell(actions)="data">
              <div class="text-nowrap">
                <feather-icon v-if="data.item.status !== 'PROSES'" icon="EyeIcon" size="16" class="mx-1" @click="detail(data.item.id)" />
              </div>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BFormFile, BFormDatepicker, BButton, BLink, BFormGroup, BFormInput, BFormTextarea, BBadge, BSpinner, BCard, BRow, BCol, BTable } from 'bootstrap-vue'
import { urlGet, formatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'

import _ from 'lodash'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  components: {
    BFormFile,
    BFormDatepicker,
    BButton,
    BLink,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BBadge,
    BSpinner,
    BCard,
    BRow,
    BCol,
    BTable,
    vSelect,
    FeatherIcon,
  },
  computed: {
    data() {
      return this.$store.getters['app-mak/getDetailRevisiAnggaran']
    },
    detailRevisi() {
      return this.data.detail
    },
  },
  mounted() {
    this.fake = _.cloneDeep(this.data)
  },

  methods: {
    urlGet,
    formatRupiah,
    /* eslint-disable */
    uploadLampiran(e) {
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.lampiran.push(selectedFiles[i])
      }
    },
    /* eslint-enable */
    batal() {
      this.edit = !this.edit
      this.fake = _.cloneDeep(this.data)
    },
    detail(id) {
      const detail = this.data.detail.find(x => x.id === id)
      detail.tahun = this.data.tahun
      detail.keterangan = this.data.keterangan
      detail.tanggal_mulai = this.data.tanggal_mulai
      detail.tanggal_akhir = this.data.tanggal_akhir
      detail.status_master = this.data.status
      detail.file = this.data.file
      detail.nama_file = this.data.nama_file
      console.info(detail)
      if (detail.detail.length > 0) {
        this.$store.commit('app-mak/SET_DETAIL_REVISI_ANGGARAN_USER', detail)
        this.$router.push({ name: 'revisi-anggaran-detail-revisi' })
      } else {
        this.$swal({
          title: 'Oopps!',
          text: `${detail.bidang.nama} belum mengirimkan Revisi Anggaran !`,
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }
    },
    hapus_lampiran() {
      this.fake.nama_file = null
      this.fake.file = null
    },
    ubah() {
      this.$swal({
        title: 'Ubah Data ?',
        text: 'Data Revisi Anggaran akan di ubah !',
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
          this.$store.dispatch('app-mak/editRevisiAnggaran', this.fake).then(res => {
            if (res.status === 200) {
              if (this.lampiran.length > 0) {
                const file = new FormData()
                for (let i = 0; i < this.lampiran.length; i += 1) {
                  file.append('lampiran[]', this.lampiran[i])
                }
                file.append('id', this.fake.id)
                this.$store.dispatch('app-mak/editLampiranRevisiAnggaran', file).then(x => {
                  if (x.status === 200) {
                    this.fake.file = x.data.file
                    this.fake.nama_file = x.data.nama_file
                  }
                })
              }
              this.lampiran = []

              this.$store.commit('app-kegiatan/SET_DETAIL_REVISI_ANGGARAN', this.fake)
              this.$swal({
                title: 'Sukses!',
                text: 'Revisi Anggaran berhasil di ubah',
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              this.edit = !this.edit
            }
          })
        }
      })
    },
    proses() {
      this.$swal({
        title: 'Proses ?',
        text: 'Revisi Anggaran akan di Proses !',
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
          this.$store
            .dispatch('app-mak/prosesRevisiAnggaran', {
              id: this.fake.id,
            })
            .then(res => {
              if (res.status === 200) {
                this.data.status = 'SELESAI'
                this.fake.status = 'SELESAI'
              }
            })
        }
      })
    },
    delete_data(id) {
      this.$swal({
        title: 'Hapus ?',
        text: 'Menghapus Revisi Anggaran akan menghapus Detail Data Revisi Anggaran, tetapi tidak akan mengubah Pagu yang sudah di Proses!',
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
          this.isBusy = !this.isBusy
          this.$store
            .dispatch('app-mak/deleteRevisiAnggaran', {
              id,
            })
            .then(x => {
              if (x.status === 200) {
                this.$swal({
                  icon: 'success',
                  title: 'Data berhasil di hapus!',
                  customClass: {
                    confirmButton: 'btn btn-success',
                  },
                })
              } else {
                this.$swal({
                  icon: 'error',
                  title: 'Oopps!! Kesalahan',
                  customClass: {
                    confirmButton: 'btn btn-success',
                  },
                })
              }
              this.isBusy = !this.isBusy
            })
        }
      })
    },
  },

  setup() {
    const lampiran = ref([])
    const statusOption = ['BUKA', 'TUTUP']
    const fake = ref({})
    const edit = ref(false)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const isBusy = false
    const dataTemp = ref([])
    const tableColumns = [
      { key: 'id', label: '#' },
      { key: 'bidang', label: 'Wilayah / Bagian' },
      { key: 'pagu_awal' },
      { key: 'pagu_akhir' },
      { key: 'pagu_realokasi' },
      { key: 'status' },
      { key: 'actions' },
    ]
    const bidangFilter = ref({
      id: 0,
      nama: 'SEMUA',
    })
    return {
      lampiran,
      statusOption,
      fake,
      edit,
      userData,
      isBusy,
      tableColumns,
      dataTemp,
      bidangFilter,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.barang-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>
