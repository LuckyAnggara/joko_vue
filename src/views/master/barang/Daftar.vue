<template>
  <section>
    <b-row class="match-height">
      <b-col lg="9" cols="12">
        <!-- <card-statistics-group :data-barang="dataBarang" /> -->
      </b-col>
      <b-col lg="12" cols="12">
        <b-card>
          <div class="mb-2">
            <!-- Table Top -->
            <b-row>
              <!-- Per Page -->
              <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                <label>Entries</label>
                <v-select v-model="perPage" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
                <b-button variant="primary" :to="{ name: 'master-barang-tambah' }">
                  Tambah Data
                </b-button>
              </b-col>

              <!-- Search -->
              <b-col cols="12" md="6">
                <div class="d-flex align-items-center justify-content-end">
                  <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="Cari data... (Kode Barang, Nama Barang)" />
                  <!-- <v-select v-model="filterQuery" :options="filterOptions" class="barang-filter-select  mr-1" placeholder="Merek Barang">
                    <template #selected-option="{ label }">
                      <span class="text-truncate overflow-hidden">
                        {{ label }}
                      </span>
                    </template>
                  </v-select> -->
                </div>
              </b-col>
            </b-row>
          </div>

          <b-table
            ref="refTable"
            responsive
            primary-key="id"
            :fields="tableColumns"
            :items="dataBarang"
            :current-page="currentPage"
            :per-page="perPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="isSortDirDesc"
            show-empty
            empty-text="Tidak ada data"
            class="position-relative"
          >
            <template #head(barangStatus)>
              <feather-icon icon="TrendingUpIcon" class="mx-auto" />
            </template>

            <!-- Column: Id -->
            <template #cell(id)="data">
              <span>
                {{ data.index + 1 }}
              </span>
            </template>

            <!-- Column: Actions -->
            <template #cell(actions)="data">
              <div class="text-nowrap">
                <feather-icon
                  :id="`barang-row-${data.item.id}-preview-icon`"
                  icon="EyeIcon"
                  size="16"
                  class="mx-1"
                  @click="
                    $router.push({
                      name: 'master-barang-detail',
                      params: { id: data.item.id },
                    })
                  "
                />
                <b-tooltip title="Detail Barang" :target="`barang-row-${data.item.id}-preview-icon`" />

                <b-dropdown variant="link" toggle-class="p-0" no-caret>
                  <template #button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                  </template>

                  <b-dropdown-item @click="del(data.item.id)">
                    <feather-icon icon="TrashIcon" />
                    <span class="align-middle ml-50">Delete</span>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </template>
          </b-table>
          <div class="mx-2 mb-2">
            <b-row>
              <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
                <span class="text-muted">Showing {{ dataMeta.from }} to {{ dataMeta.to }} of {{ dataMeta.of }} entries</span>
              </b-col>
              <!-- Pagination -->
              <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalBarang"
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
import store from '@/store'
import { ref } from '@vue/composition-api'

import { BCard, BRow, BCol, BFormInput, BButton, BTable, BDropdown, BDropdownItem, BPagination, BTooltip } from 'bootstrap-vue'
import vSelect from 'vue-select'
// import CardStatisticsGroup from './CardStatisticsGroup.vue'

export default {
  components: {
    // CardStatisticsGroup,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    // BMedia,
    // BAvatar,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,

    vSelect,
  },
  data() {
    return {
      filterQuery: '',
      searchQuery: '',
      refTable: null,
      dataBarang: [],
      dataTemp: [],
    }
  },
  watch: {
    searchQuery(query) {
      if (query === '') {
        this.dataBarang = this.dataTemp
      } else {
        this.dataBarang = this.dataTemp.filter(
          item => item.kode_barang.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.nama.toLowerCase().indexOf(query.toLowerCase()) > -1,
        )
      }
      this.totalBarang = this.dataBarang.length
    },
    filterQuery(query) {
      if (query === 'Lunas') {
        this.dataBarang = this.dataTemp.filter(trx => trx.pembayaran.sisaPembayaran === null || trx.pembayaran.sisaPembayaran === 0)
      } else if (query === 'COD') {
        this.dataBarang = this.dataTemp.filter(trx => parseFloat(trx.pembayaran.sisaPembayaran) >= 0 && trx.pembayaran.statusPembayaran.value === 2)
      } else if (query === 'Kredit') {
        this.dataBarang = this.dataTemp.filter(trx => parseFloat(trx.pembayaran.sisaPembayaran) >= 0 && trx.pembayaran.statusPembayaran.value === 1)
      } else if (query === null || query === '') {
        this.dataBarang = this.dataTemp
      }
      this.totalBarang = this.dataBarang.length
    },
  },
  computed: {
    dataMeta() {
      const localItemsCount = this.$refs.refTable ? this.$refs.refTable.computedItems.length : 0
      return {
        from: this.perPage * (this.currentPage - 1) + (localItemsCount ? 1 : 0),
        to: this.perPage * (this.currentPage - 1) + localItemsCount,
        of: this.totalBarang,
      }
    },
  },
  methods: {
    loadbarang() {
      store.dispatch('app-barang/fetchListBarang').then(res => {
        store.commit('app-barang/SET_LIST_BARANG', res.data)
        this.dataBarang = store.getters['app-barang/getListBarang']
        this.dataTemp = store.getters['app-barang/getListBarang']
        this.totalBarang = this.dataBarang.length
      })
      store.dispatch('app-barang/fetchListGudang').then(res => {
        store.commit('app-barang/SET_LIST_GUDANG', res.data)
      })
      store.dispatch('app-barang/fetchListJenis').then(res => {
        store.commit('app-barang/SET_LIST_JENIS', res.data)
      })
      store.dispatch('app-barang/fetchListSatuan').then(res => {
        store.commit('app-barang/SET_LIST_SATUAN', res.data)
      })
      store.dispatch('app-barang/fetchListMerek').then(res => {
        store.commit('app-barang/SET_LIST_MEREK', res.data)
      })
    },
    del(id) {
      this.$swal({
        title: 'Delete data ?',
        text: 'Data barang akan di hapus',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          store
            .dispatch('app-barang/removeBarang', {
              id,
            })
            .then(res => {
              if (res.status === 200) {
                store.commit('app-barang/REMOVE_LIST_BARANG', id)
                this.dataBarang = store.getters['app-barang/getListBarang']
                this.totalBarang = this.dataBarang.length
                this.$swal({
                  icon: 'success',
                  title: 'Deleted!',
                  customClass: {
                    confirmButton: 'btn btn-success',
                  },
                })
              }
            })
        }
      })
    },
  },
  mounted() {
    this.loadbarang()
  },
  setup() {
    const filterOptions = ['Lunas', 'COD', 'Kredit']
    const tableColumns = [
      { key: 'id', label: '#', sortable: true },
      { key: 'kode_barang', sortable: true },
      { key: 'nama', sortable: true },
      { label: 'jenis', key: 'nama_jenis', sortable: true },
      { label: 'merek', key: 'nama_merek', sortable: true },
      { label: 'gudang', key: 'rak', sortable: true },
      { key: 'actions' },
    ]

    // const searchQuery = ref('')
    const perPage = ref(10)
    const totalBarang = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    const statusFilter = ref(null)

    return {
      filterOptions,
      tableColumns,
      // searchQuery,
      perPage,
      isSortDirDesc,
      currentPage,
      totalBarang,
      perPageOptions,
      sortBy,
      statusFilter,
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
