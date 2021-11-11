<template>
  <section>
    <div class="mb-2">
      <!-- Table Top -->
      <b-row>
        <b-col cols="6" md="2" class="mb-2">
          <b-button variant="primary" class="btn-icon" size="md" @click="showModal"> <feather-icon icon="PlusIcon" /> Tambah Data </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6" md="2">
          <label>Tampilkan</label>
          <v-select v-model="perPage" :options="perPageOptions" :clearable="false" />
        </b-col>

        <!-- Search -->
        <b-col cols="6" md="6">
          <label class="mr-1">Cari Data</label>
          <b-form-input v-model="searchQuery" placeholder="Cari data... " />
        </b-col>
      </b-row>
    </div>
    <b-table
      ref="refTable"
      small
      responsive
      :fields="tableColumns"
      :items="dataKompetensi"
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
      <template #cell(bidang_ilmu)="data">
        <span>
          {{ data.item.bidang_ilmu.nama }}
        </span>
      </template>

      <!-- Column: Actions -->
      <template #cell(sertifikat)="data">
        <template v-if="data.item.file !== null ? true : false">
          <b-link :href="urlGet(data.id, 'peta-kompetensi')" class="font-weight-bold" target="_blank"> {{ data.item.nama_file }} </b-link>
        </template>
        <template v-else>
          -
        </template>
      </template>
      <!-- Column: Actions -->
      <template #cell(actions)="data">
        <div class="text-nowrap">
          <feather-icon icon="TrashIcon" size="16" class="mx-1" @click="destroy(data.item.id)" />
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

    <b-modal
      id="modal-input-kompetensi"
      size="lg"
      scrollable
      hide-backdrop
      ok-only
      no-close-on-backdrop
      content-class="shadow"
      title="Input Data Kompetensi "
      ok-variant="success"
      ok-title="Submit"
      @ok="submit"
      @hidden="resetModal"
      lazy
    >
      <b-row>
        <b-col cols="12">
          <b-form-group label="Tahun Pelaksanaan" label-cols-md="3">
            <v-select v-model="form.tahun_pelaksanaan" :options="tahunOption" :clearable="false" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Bidang Ilmu" label-cols-md="3">
            <v-select v-model="form.bidang_ilmu" :options="bidangIlmuOption" label="nama" :reduce="x => x.id" :clearable="false" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Nama Pelatihan" label-cols-md="3">
            <b-form-input v-model="form.nama_pelatihan" type="text" placeholder="Nama Pelatihan" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Nama Penyelenggara" label-cols-md="3">
            <b-form-input v-model="form.penyelenggara" type="text" placeholder="Nama Penyelenggara" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Level" label-cols-md="3">
            <v-select v-model="form.level" :options="levelOption" :clearable="false" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Skala" label-cols-md="3">
            <v-select v-model="form.skala" :options="skalaOption" :clearable="false" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Tanggal Pelaksanaan" label-cols-md="3">
            <b-row>
              <b-col md="6">
                <b-form-group label="Tanggal Mulai">
                  <b-form-datepicker
                    locale="id"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    v-model="form.tanggal_mulai"
                    placeholder="Tanggal Mulai"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Tanggal Akhir">
                  <b-form-datepicker
                    locale="id"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
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
          <b-form-group label="Sertifikat" label-cols-md="3">
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
import { BFormDatepicker, BBadge, BFormGroup, BLink, BButton, BSpinner, BRow, BCol, BFormInput, BTable, BPagination, BFormFile } from 'bootstrap-vue'
import { urlGet } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
    BFormDatepicker,
    BBadge,
    BFormGroup,
    BLink,
    BButton,
    BSpinner,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BPagination,
    BFormFile,
    vSelect,
  },
  data() {
    return {}
  },
  watch: {
    /* eslint-disable */
    searchQuery(query) {
      if (query === '') {
        this.dataKompetensi = this.dataTemp
      } else {
        this.dataKompetensi = this.dataTemp.filter(item => item.nama.toLowerCase().indexOf(query) > -1 || item.bidang.nama.toLowerCase().indexOf(query) > -1)
      }
    },

    /* eslint-enable */
    bidangFilter(x) {
      if (x.id === '' || x.id === null || x.id === 0) {
        this.dataKompetensi = this.dataTemp
      } else {
        this.dataKompetensi = this.dataTemp.filter(item => item.bidang.id === x.id)
      }
    },
    tahun() {
      this.loadMak()
    },
  },
  methods: {
    urlGet,
    loadBidangIlmu() {
      this.$store.dispatch('app-general/fetchBidangIlmu').then(res => {
        this.$store.commit('app-general/SET_BIDANG_ILMU', res.data)
        this.bidangIlmuOption = res.data
      })
    },
    showModal() {
      this.$bvModal.show('modal-input-kompetensi')
    },
    resetModal() {
      this.form.pegawai_id = null
      this.form.bidang_ilmu = null
      this.form.nama_pelatihan = null
      this.form.tahun_pelaksanaan = null
      this.form.level = null
      this.form.skala = null
      this.form.penyelenggara = null
      this.form.jadwal_pelatihan = null
      this.form.tanggal_mulai = null
      this.form.tanggal_akhir = null
      this.form.lampiran = []
    },
    /* eslint-disable */
    uploadLampiran(e) {
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.form.lampiran.push(selectedFiles[i])
      }
    },
    loadTahun() {
      const currentYear = new Date().getFullYear()
      for (let i = 0; i < 5; i++) {
        this.tahunOption.push(currentYear - i)
      }
    },
    /* eslint-enable */
    submit(bvModal) {
      bvModal.preventDefault()
      const b = this.form
      if (
        b.tahun_pelaksanaan === null ||
        b.bidang_ilmu === null ||
        b.nama_pelatihan === null ||
        b.bidang_ilmu === null ||
        b.level === null ||
        b.skala === null ||
        b.penyelenggara === null ||
        b.tanggal_mulai === null ||
        b.tanggal_akhir === null
      ) {
        this.$swal({
          title: 'Error!',
          text: 'Form isian belum lengkap',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      } else {
        this.show = !this.show
        this.$swal({
          title: 'Proses ?',
          text: 'Data Kompetensi baru akan di proses ?',
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
            this.form.pegawai_id = this.data.id
            this.form.user_data = this.userData
            this.$store
              .dispatch('app-pegawai/storeKompetensi', this.form)
              .then(res => {
                if (res.status === 200) {
                  const file = new FormData()
                  if (this.form.lampiran.length > 0) {
                    for (let i = 0; i < this.form.lampiran.length; i += 1) {
                      file.append('lampiran[]', this.form.lampiran[i])
                    }
                    file.append('id', res.data.id)
                    // this.titleLoading = 'Upload lampiran ...'
                    // this.processing = !this.processing
                    this.$store
                      .dispatch('app-pegawai/storeLampiranKompetensi', file)
                      .then(x => {
                        if (x.status === 200) {
                          this.$swal({
                            title: 'Sukses!',
                            text: 'Data kompetensi berhasil dibuat!',
                            icon: 'success',
                            customClass: {
                              confirmButton: 'btn btn-primary',
                            },
                            buttonsStyling: false,
                          })
                          // this.show = !this.show
                        }
                      })
                      .catch(err => {
                        // this.show = !this.show
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
                    this.$store.commit('app-pegawai/UPDATE_KOMPETENSI', res.data)
                  } else {
                    this.$swal({
                      title: 'Sukses!',
                      text: 'Data kompetensi berhasil dibuatxxxxxxxxxxx!',
                      icon: 'success',
                      customClass: {
                        confirmButton: 'btn btn-primary',
                      },
                      buttonsStyling: false,
                    })
                    // this.show = !this.show
                    this.$store.commit('app-pegawai/UPDATE_KOMPETENSI', res.data)
                  }
                  this.$bvModal.hide('modal-input-kompetensi')
                }
              })
              .catch(err => {
                this.show = !this.show
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
      }
    },
    destroy(id) {
      this.$swal({
        title: 'Delete ?',
        text: 'Data kompetensi akan di Delete ?',
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
          this.$store.dispatch('app-pegawai/deleteKompetensi', id).then(res => {
            if (res.status === 200) {
              this.$swal({
                title: 'Sukses!',
                text: 'Kompetensi berhasil di Delete!',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false,
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              this.$store.commit('app-pegawai/DELETE_KOMPETENSI', id)
            }
          })
        }
      })
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
      return this.dataKompetensi.length
    },
    data() {
      return this.$store.getters['app-pegawai/getDetail']
    },
    dataKompetensi() {
      return this.data.peta_kompetensi
    },
    bidangOption() {
      return [{ id: 0, nama: 'SEMUA' }, ...this.$store.getters['app-general/getBidang']]
    },
  },
  mounted() {
    this.loadBidangIlmu()
    this.loadTahun()
  },
  setup() {
    const tahunOption = ref([])
    const levelOption = ref(['BEGINNER', 'INTERMEDIETE', 'ADVANCE', 'EXPERT'])
    const skalaOption = ref(['LOKAL', 'NASIONAL', 'INTERNASIONAL'])
    const userData = JSON.parse(localStorage.getItem('userData'))
    const form = ref({
      pegawai_id: null,
      bidang_ilmu: null,
      nama_pelatihan: null,
      tahun_pelaksanaan: null,
      level: null,
      skala: null,
      penyelenggara: null,
      tanggal_mulai: null,
      tanggal_akhir: null,
      lampiran: [],
    })
    const bidangIlmuOption = ref([])
    const tableColumns = [
      { key: 'id', label: '#' },
      { key: 'bidang_ilmu' },
      { key: 'nama_pelatihan' },
      { key: 'tahun_pelaksanaan' },
      { key: 'penyelenggara' },
      { key: 'level' },
      { key: 'sertifikat' },
      { key: 'actions' },
    ]
    const searchQuery = ref('')
    const perPage = ref(10)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)

    return {
      userData,
      skalaOption,
      tahunOption,
      levelOption,
      form,
      bidangIlmuOption,
      tableColumns,
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

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
