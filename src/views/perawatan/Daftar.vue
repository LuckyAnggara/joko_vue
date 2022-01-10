<template>
  <section>
    <b-overlay :show="show" rounded="sm" variant="transparent" blur="5px" opacity="0.95">
      <b-row class="match-height">
        <b-col lg="12" cols="12">
          <b-card>
            <div class="mb-2" v-if="userData.role === 'ADMIN UMUM'">
              <b-row>
                <b-col cols="6" md="1">
                  <label>Tampilkan</label>
                  <v-select v-model="perPage" :options="perPageOptions" :clearable="false" />
                </b-col>
                <b-col cols="6" md="2">
                  <label>Tahun</label>
                  <v-select v-model="tahun" label="nama" :options="tahunOption" :clearable="false" />
                </b-col>
                <!-- Search -->
                <b-col cols="6" md="6">
                  <label class="mr-1">Cari Data</label>
                  <b-form-input v-model="searchQuery" placeholder="Cari data... " />
                </b-col>
              </b-row>
            </div>
            <b-table
              small
              :busy="isBusy"
              ref="refTable"
              responsive
              primary-key="id"
              :fields="tableColumns"
              :items="dataPerawatan"
              :current-page="currentPage"
              :per-page="perPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="isSortDirDesc"
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
              <template #cell(tanggal_mulai)="data">
                <span>
                  {{ $moment(data.item.tanggal_mulai).format('DD MMMM YYYY') }}
                </span>
              </template>

              <template #cell(tanggal_akhir)="data">
                <span>
                  {{ $moment(data.item.tanggal_akhir).format('DD MMMM YYYY') }}
                </span>
              </template>
              <template #cell(status)="data">
                <div class="text-nowrap">
                  <template>
                    <b-badge pill variant="light-primary" v-if="data.item.status === 'BUKA'"> {{ data.item.status }} </b-badge>
                    <b-badge pill variant="light-warning" v-if="data.item.status === 'VERIFIKASI'"> {{ data.item.status }}</b-badge>
                    <b-badge pill variant="danger" v-if="data.item.status === 'TUTUP'"> {{ data.item.status }}</b-badge>
                    <b-badge pill variant="success" v-if="data.item.status === 'SELESAI'"> {{ data.item.status }} </b-badge>
                  </template>
                </div>
              </template>
              <!-- Column: Actions -->
              <template #cell(actions)="data">
                <div class="text-nowrap">
                  <feather-icon icon="EyeIcon" size="16" class="mx-1" v-if="userData.role === 'ADMIN KEUANGAN'" @click="detail(data.item.id)" />
                  <feather-icon icon="EyeIcon" size="16" class="mx-1" v-if="userData.role === 'USER'" @click="detailUser(data.item.id)" />
                  <b-dropdown variant="link" toggle-class="p-0" no-caret boundary="window" v-if="userData.role === 'ADMIN KEUANGAN'">
                    <template #button-content>
                      <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                    </template>
                    <b-dropdown-item @click="delete_data(data.item.id)">
                      <feather-icon icon="" />
                      <span class="align-middle ml-50">Hapus</span>
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </template>
            </b-table>
            <div class="mx-2 mb-2">
              <b-row>
                <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
                  <span class="text-muted"> {{ dataMeta.from }} - {{ dataMeta.to }} dari {{ dataMeta.of }} data</span>
                </b-col>
                <!-- Pagination -->
                <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="totalData"
                    :per-page="perPage"
                    first-number
                    last-number
                    class="mb-0 mt-1 mt-sm-0"
                    prev-class="prev-item"
                    next-class="next-item"
                  >
                    <template #prev-text>
                      <feather-icon icon="ChevronLeftIcon" size="18" />
                    </template>
                    <template #next-text>
                      <feather-icon icon="ChevronRightIcon" size="18" />
                    </template>
                  </b-pagination>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
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
    <b-modal
      id="modal-revisi-keuangan-tambah"
      size="lg"
      ok-only
      no-close-on-backdrop
      content-class="shadow"
      title="Tambah Revisi Anggaran "
      ok-variant="success"
      ok-title="Submit"
      @ok="submit"
      @reset="resetModal"
    >
      <b-row>
        <b-col cols="12">
          <b-form-group label="Tahun Anggaran" label-cols-md="3">
            <v-select v-model="form.tahun" label="nama" :options="tahunOption" :clearable="false" placeholder="Tahun Anggaran" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Keterangan" label-cols-md="3">
            <b-form-textarea v-model="form.keterangan" type="text" placeholder="Keterangan" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Tanggal" label-cols-md="3">
            <b-row>
              <b-col md="6">
                <b-form-group label="Tanggal Mulai">
                  <b-form-datepicker
                    locale="id"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    v-model="form.tanggal_mulai"
                    :max="form.tanggal_akhir"
                    placeholder="Tanggal Mulai"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Tanggal Akhir">
                  <b-form-datepicker
                    locale="id"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    :min="form.tanggal_mulai"
                    v-model="form.tanggal_akhir"
                    placeholder="Tanggal Akhir"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>
      </b-row>

      <hr />
      <b-row>
        <b-col cols="12">
          <b-form-group label="Lampiran" label-cols-md="3">
            <b-form-file @change="uploadLampiran" placeholder="Pilih data atau Drag and Drop di sini." drop-placeholder="Drop file disini..." ref="file_input">
              <template slot="file-name" slot-scope="{ names }">
                <b-badge variant="dark">{{ names[0] }}</b-badge>
                <b-badge v-if="names.length > 1" variant="dark" class="ml-1"> + {{ names.length - 1 }} More files </b-badge>
              </template>
            </b-form-file>
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>
  </section>
</template>
<script>
import { ref } from '@vue/composition-api'
import {
  BOverlay,
  BFormTextarea,
  BFormDatepicker,
  BFormFile,
  BBadge,
  BModal,
  BFormGroup,
  // BButton,
  BSpinner,
  BCard,
  BRow,
  BCol,
  BFormInput,
  BTable,
  BPagination,
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'

import vSelect from 'vue-select'

export default {
  components: {
    BOverlay,
    BFormTextarea,
    BFormDatepicker,
    BFormFile,
    BBadge,
    BModal,
    BFormGroup,
    // BButton,
    BSpinner,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BPagination,
    BDropdown,
    BDropdownItem,
    vSelect,
  },
  data() {
    return {}
  },
  watch: {
    /* eslint-disable */
    searchQuery(query) {
      if (query === '') {
        this.dataPerawatan = this.dataTemp
      } else {
        this.dataPerawatan = this.dataTemp.filter(
          item =>
            item.keterangan.toLowerCase().indexOf(query) > -1 ||
            item.tanggal_mulai.toLowerCase().indexOf(query) > -1 ||
            item.tanggal_akhir.toLowerCase().indexOf(query) > -1,
        )
      }
    },
    /* eslint-enable */

    tahun() {
      this.loadRevisiAnggaran()
    },
  },
  computed: {
    dataMeta() {
      const localItemsCount = this.$refs.refTable ? this.$refs.refTable.computedItems.length : 0
      return {
        from: this.perPage * (this.currentPage - 1) + (localItemsCount ? 1 : 0),
        to: this.perPage * (this.currentPage - 1) + localItemsCount,
        of: this.totalData,
      }
    },
    totalData() {
      return this.dataPerawatan.length
    },
    tahunOption() {
      return this.$store.getters['app-general/getTahun']
    },
    bidangOption() {
      return [{ id: 0, nama: 'SEMUA' }, ...this.$store.getters['app-general/getBidang']]
    },
  },

  methods: {
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
    loadRevisiAnggaran(tahun = this.tahun) {
      this.isBusy = !this.isBusy
      this.$store
        .dispatch('app-mak/fetchRevisiAnggaran', {
          tahun_id: tahun === null ? 1 : this.tahun.id,
        })
        .then(res => {
          this.isBusy = !this.isBusy
          this.dataTemp = res.data
          // if (this.userData.role === 'USER') {
          //   this.dataTemp = res.data.filter(x => x.status === 'BUKA')
          // }
          this.dataPerawatan = this.dataTemp

          this.$store.commit('app-mak/SET_REVISI_ANGGARAN', res.data)
        })
    },
    delete_data(id) {
      this.$swal({
        title: 'Hapus data ?',
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
    detail(id) {
      const data = this.dataPerawatan.find(x => x.id === id)
      this.$store.commit('app-mak/SET_DETAIL_REVISI_ANGGARAN', data)
      this.$router.push({ name: 'revisi-anggaran-detail' })
    },
    detailUser(id) {
      const detail = this.dataPerawatan.find(x => x.id === id)
      const data = detail.detail.find(x => x.bidang_id === this.userData.bidang_id)
      data.tahun = detail.tahun
      data.keterangan = detail.keterangan
      data.tanggal_mulai = detail.tanggal_mulai
      data.tanggal_akhir = detail.tanggal_akhir
      data.status_master = detail.status
      data.file = detail.file
      data.nama_file = detail.nama_file
      this.$store.commit('app-mak/SET_DETAIL_REVISI_ANGGARAN_USER', data)
      this.$router.push({ name: 'revisi-anggaran-detail-revisi' })
    },
    loadBidang() {
      this.$store.dispatch('app-general/fetchBidang').then(res => {
        this.$store.commit('app-general/SET_BIDANG', res.data)
      })
    },
    loadTahun() {
      this.$store.dispatch('app-general/fetchTahun').then(res => {
        this.$store.commit('app-general/SET_TAHUN', res.data)
      })
    },
    showModal() {
      this.$bvModal.show('modal-revisi-keuangan-tambah')
    },
    resetModal() {
      this.form.tahun = null
      this.form.tanggal_mulai = null
      this.form.tanggal_akhir = null
      this.form.keterangan = null
    },
    submit(bvModal) {
      bvModal.preventDefault()
      if (this.form.tahun === null || this.form.keterangan === null || this.form.tanggal_akhir === null || this.form.tanggal_mulai === null) {
        this.$swal({
          icon: 'error',
          title: 'Oopps!!',
          text: 'Data belum lengkap',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })
      } else {
        this.show = !this.show
        this.$store
          .dispatch('app-mak/storeRevisiAnggaran', this.form)
          .then(res => {
            if (res.status === 200) {
              const file = new FormData()
              for (let i = 0; i < this.lampiran.length; i += 1) {
                file.append('lampiran[]', this.lampiran[i])
              }
              file.append('id', res.data.master.id)
              this.title = 'Upload lampiran ...'
              this.processing = !this.processing
              this.$store.dispatch('app-mak/editLampiranRevisiAnggaran', file).then(x => {
                this.processing = !this.processing
                this.$swal({
                  icon: 'success',
                  title: `status :  ${x.status} - Data berhasil di buat!`,
                  customClass: {
                    confirmButton: 'btn btn-success',
                  },
                })
              })
              this.$bvModal.hide('modal-revisi-keuangan-tambah')

              this.loadRevisiAnggaran(this.tahun)
              this.show = !this.show
              this.resetModal()
            } else {
              this.$swal({
                icon: 'error',
                title: 'Oopps!!',
                text: res.data,
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
            }
          })
          .catch(err => {
            this.$swal({
              icon: 'error',
              title: 'Oopps!!',
              text: err,
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          })
      }
    },
  },
  mounted() {
    this.loadBidang()
    this.loadTahun()
    this.loadRevisiAnggaran()
  },
  setup() {
    const title = ref('Membuat relisasi mak .... ')
    const processing = ref(false)

    const show = ref(false)
    const lampiran = ref([])
    const userData = JSON.parse(localStorage.getItem('userData'))
    const tahun = ref({
      id: 1,
      nama: '2021',
    })
    const form = ref({
      tahun: null,
      keterangan: null,
      tanggal_akhir: null,
      tanggal_mulai: null,
      user_data: JSON.parse(localStorage.getItem('userData')),
    })
    const isBusy = false
    const dataPerawatan = ref([])
    const dataTemp = ref([])
    const tableColumns = [
      { key: 'id', label: '#' },
      { key: 'tanggal_diajukan' },
      { key: 'nama_bmn' },
      { key: 'nopol' },
      { key: 'pemilik' },
      { key: 'status' },
      { key: 'actions' },
    ]
    const searchQuery = ref('')
    const perPage = ref(10)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)

    return {
      title,
      processing,
      show,
      lampiran,
      userData,
      tahun,
      form,
      isBusy,
      tableColumns,
      dataPerawatan,
      dataTemp,
      searchQuery,
      perPage,
      currentPage,
      perPageOptions,
      sortBy,
      isSortDirDesc,
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
