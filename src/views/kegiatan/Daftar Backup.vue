<template>
  <section>
    <b-row class="match-height">
      <b-col lg="12" cols="12">
        <b-card>
          <div class="mb-2">
            <!-- Table Top -->
            <b-row>
              <b-col cols="2" md="6" class="mb-2 no-wrap">
                <b-button variant="primary" class="btn-icon mr-1" size="md" :to="{ name: 'kegiatan-rencana' }">
                  <feather-icon icon="PlusIcon" /> Tambah
                </b-button>
                <!-- <b-button variant="success" class="btn-icon" size="md" :to="{ name: 'kegiatan-rencana' }">
                  <feather-icon icon="PlusIcon" /> Realisasi
                </b-button> -->
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6" md="1">
                <label>Tampilkan</label>
                <v-select v-model="perPage" :options="perPageOptions" :clearable="false" />
              </b-col>
              <b-col cols="6" md="2">
                <label class="mr-1">Filter Status</label>
                <v-select v-model="statusFilter" :options="statusOption" :clearable="true" />
              </b-col>
              <!-- Search -->
              <b-col cols="6" md="4">
                <label class="mr-1">Cari Data</label>
                <b-form-input v-model="searchQuery" placeholder="Cari data... " />
              </b-col>
            </b-row>
          </div>
          <b-table
            :busy="isBusy"
            ref="refTable"
            responsive
            primary-key="id"
            :fields="tableColumns"
            :items="dataRealisasi"
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
            <template #cell(tanggal)="data">
              <span>
                {{ $moment(data.item.tanggal_spb).format('DD-MMMM-YYYY') }}
              </span>
            </template>
            <template #cell(kode_mak)="data">
              <span>
                {{ data.item.mak.kode }}
              </span>
            </template>
            <template #cell(nominal)="data">
              <span>
                {{ formatRupiah(data.item.nominal) }}
              </span>
            </template>
            <template #cell(status)="data">
              <div class="text-nowrap">
                <template>
                  <b-badge pill variant="light-warning" v-if="data.item.status === 'VERIFIKASI'"> VERIFIKASI PPK </b-badge>
                  <b-badge pill variant="light-primary" v-if="data.item.status === 'PEMBAYARAN'"> {{ data.item.status }} BENDAHARA</b-badge>
                  <b-badge pill variant="light-danger" v-if="data.item.status === 'DITOLAK'"> {{ data.item.status }} </b-badge>
                  <b-badge pill variant="light-success" v-if="data.item.status === 'SELESAI'"> {{ data.item.status }} </b-badge>
                </template>
              </div>
            </template>
            <!-- Column: Actions -->
            <template #cell(actions)="data">
              <div class="text-nowrap">
                <feather-icon
                  icon="EyeIcon"
                  size="16"
                  class="mx-1"
                  @click="
                    $router.push({
                      name: 'kegiatan-detail',
                      params: { id: data.item.id },
                    })
                  "
                />
                <b-dropdown variant="link" toggle-class="p-0" no-caret>
                  <template #button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                  </template>
                  <b-dropdown-item
                    @click="
                      $router.push({
                        name: 'print-kwitansi',
                      })
                    "
                  >
                    <feather-icon icon="" />
                    <span class="align-middle ml-50">Print</span>
                  </b-dropdown-item>
                  <b-dropdown-item @click="delete_data(data.item.id)" v-if="data.item.status === 'VERIFIKASI'">
                    <feather-icon icon="" />
                    <span class="align-middle ml-50">Delete</span>
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
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { formatRupiah } from '@core/utils/filter'
import { BButton, BBadge, BSpinner, BCard, BRow, BCol, BFormInput, BTable, BPagination, BDropdown, BDropdownItem } from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BButton,
    BBadge,
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
        this.dataRealisasi = this.dataTemp
      } else {
        this.dataRealisasi = this.dataTemp.filter(
          item =>
            item.mak.nama.toLowerCase().indexOf(query) > -1 ||
            item.mak.kode.toLowerCase().indexOf(query) > -1 ||
            item.nominal == query ||
            item.uraian.toLowerCase().indexOf(query) > -1,
        )
      }
    },
    /* eslint-enable */
    statusFilter(x) {
      if (x === '' || x === null) {
        this.dataRealisasi = this.dataTemp
      } else {
        this.dataRealisasi = this.dataTemp.filter(item => item.status === x)
      }
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
      return this.dataRealisasi.length
    },
  },
  methods: {
    formatRupiah,
    loadKegiatan() {
      this.isBusy = !this.isBusy
      this.$store
        .dispatch('app-kegiatan/fetchListRealisasiKegiatan', {
          tahun_id: this.tahun.id,
          bidang_id: this.userData.role === 'USER' ? this.userData.bidang_id : 0,
        })
        .then(res => {
          this.isBusy = !this.isBusy
          this.dataTemp = res.data
          this.dataRealisasi = this.dataTemp
          if (this.userData.role === 'BENDAHARA') this.dataRealisasi = this.dataTemp.filter(x => x.status === 'PEMBAYARAN')
          if (this.userData.role === 'PPK') this.dataRealisasi = this.dataTemp.filter(x => x.status === 'VERIFIKASI')
        })
    },
    delete_data(id) {
      this.$swal({
        title: 'Hapus data ?',
        text: 'Data kegiatan akan di Hapus!',
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
            .dispatch('app-kegiatan/deleteRealisasiKegiatan', {
              id,
            })
            .then(x => {
              if (x.status === 200) {
                this.loadKegiatan()
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
  mounted() {
    this.loadKegiatan()
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const tahun = {
      id: 1,
      nama: 2021,
    }
    const isBusy = false
    const dataRealisasi = ref([])
    const dataTemp = ref([])
    const tableColumns = [
      { key: 'id', label: '#' },
      { key: 'tanggal' },
      { key: 'nomor_kwitansi' },
      { key: 'uraian', label: 'Uraian Kegiatan' },
      { key: 'kode_mak' },
      { key: 'nominal' },
      { key: 'status' },
      { key: 'actions' },
    ]
    const searchQuery = ref('')
    const perPage = ref(10)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    // eslint-disable-next-line
    const statusFilter = ref(userData.role === 'BENDAHARA' ? 'PEMBAYARAN' : userData.role === 'PPK' ? 'VERIFIKASI' : '')
    const statusOption = ref(['VERIFIKASI', 'PEMBAYARAN', 'DITOLAK', 'SELESAI'])
    return {
      userData,
      tahun,
      isBusy,
      tableColumns,
      dataRealisasi,
      dataTemp,
      searchQuery,
      perPage,
      currentPage,
      perPageOptions,
      sortBy,
      isSortDirDesc,
      statusFilter,
      statusOption,
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
