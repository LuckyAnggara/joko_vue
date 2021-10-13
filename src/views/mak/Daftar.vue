<template>
  <section>
    <b-row class="match-height">
      <b-col lg="3">
        <b-card>
          <b-form-group label="Tahun Anggaran">
            <v-select v-model="tahun" placeholder="Tahun Anggaran" label="nama" :options="tahunOption" />
          </b-form-group>
        </b-card>
      </b-col>
      <b-col lg="12" cols="12">
        <b-card>
          <div class="mb-2">
            <!-- Table Top -->
            <b-row>
              <b-col cols="6" md="2" class="mb-2">
                <b-button variant="primary" class="btn-icon" size="md" :to="{ name: 'mak-tambah' }"> <feather-icon icon="PlusIcon" /> Tambah Data </b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6" md="1">
                <label>Tampilkan</label>
                <v-select v-model="perPage" :options="perPageOptions" :clearable="false" />
              </b-col>
              <b-col cols="6" md="5">
                <label class="mr-1">Filter Bidang</label>
                <v-select v-model="bidangFilter" :options="bidangOption" label="nama" :clearable="true" />
              </b-col>
              <!-- Search -->
              <b-col cols="6" md="6">
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
            :items="dataMak"
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
            <template #cell(dipa)="data">
              <span>
                {{ formatRupiah(data.item.dipa) }}
              </span>
            </template>

            <template #cell(bidang)="data">
              <span>
                {{ data.item.bidang.nama }}
              </span>
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
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { formatRupiah } from '@core/utils/filter'
import { BFormGroup, BButton, BSpinner, BCard, BRow, BCol, BFormInput, BTable, BPagination, BDropdown, BDropdownItem } from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BFormGroup,
    BButton,
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
        this.dataMak = this.dataTemp
      } else {
        this.dataMak = this.dataTemp.filter(
          item =>
            item.kegiatan.nama.toLowerCase().indexOf(query) > -1 ||
            item.kegiatan.kode.toLowerCase().indexOf(query) > -1 ||
            item.nominal == query ||
            item.uraian.toLowerCase().indexOf(query) > -1,
        )
      }
    },
    /* eslint-enable */
    bidangFilter(x) {
      if (x === '' || x === null) {
        this.dataMak = this.dataTemp
      } else {
        this.dataMak = this.dataTemp.filter(item => item.bidang_id === x.id)
      }
    },
    tahun() {
      this.loadMak()
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
      return this.dataMak.length
    },
  },

  methods: {
    formatRupiah,
    loadMak() {
      this.isBusy = !this.isBusy
      this.$store
        .dispatch('app-mak/fetchMak', {
          tahun_id: this.tahun === null ? 1 : this.tahun.id,
          bidang_id: 0, // ADMIN AKSES
        })
        .then(res => {
          this.isBusy = !this.isBusy
          this.dataTemp = res.data
          this.dataMak = this.dataTemp
        })
    },
    delete_data(id) {
      this.$swal({
        title: 'Hapus data ?',
        text: 'Menghapus MAK akan menghapus Data Realisasi!!',

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
            .dispatch('app-mak/deleteMAK', {
              id,
            })
            .then(x => {
              if (x.status === 200) {
                this.loadMak()
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
    loadBidang() {
      this.$store.dispatch('app-mak/fetchBidang').then(res => {
        this.bidangOption = res.data
      })
    },
    loadTahun() {
      this.$store.dispatch('app-mak/fetchTahun').then(res => {
        this.tahunOption = res.data
      })
    },
  },
  mounted() {
    this.loadBidang()
    this.loadTahun()
    this.loadMak()
  },
  setup() {
    const tahun = ref(null)
    const isBusy = false
    const dataMak = ref([])
    const dataTemp = ref([])
    const tableColumns = [{ key: 'id', label: '#' }, { key: 'kode' }, { key: 'nama' }, { key: 'bidang' }, { key: 'dipa' }, { key: 'actions' }]
    const searchQuery = ref('')
    const perPage = ref(10)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    const bidangFilter = ref('')
    const bidangOption = ref([])
    const tahunOption = ref([])
    return {
      tahun,
      isBusy,
      tableColumns,
      dataMak,
      dataTemp,
      searchQuery,
      perPage,
      currentPage,
      perPageOptions,
      sortBy,
      isSortDirDesc,
      bidangFilter,
      bidangOption,
      tahunOption,
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
