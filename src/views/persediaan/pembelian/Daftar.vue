<template>
  <section>
    <b-row class="match-height">
      <b-col lg="12" cols="12">
        <b-card>
          <div class="mb-2">
            <!-- Table Top -->
            <b-row>
              <b-col cols="6" md="2" class="mb-2" v-if="userData.role === 'ADMIN UMUM'">
                <b-button variant="primary" class="btn-icon" size="md" :to="{ name: 'barang-tambah' }">
                  <feather-icon icon="PlusIcon" /> Tambah Barang
                </b-button>
              </b-col>
              <b-col cols="6" md="2" class="mb-2" v-if="userData.role === 'ADMIN UMUM'">
                <b-button variant="primary" class="btn-icon" size="md" :to="{ name: 'pembelian-daftar' }">
                  Pembelian
                </b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6" md="1">
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
            :busy="isBusy"
            responsive
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
            <template #cell(saldo)="data">
              <span>
                {{ data.item.saldo_akhir }}
              </span>
            </template>

            <!-- Column: Actions -->
            <template #cell(actions)="data">
              <div class="text-nowrap">
                <feather-icon icon="EyeIcon" size="16" class="mx-1" @click="detail(data.item.id)" />
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
import { BButton, BSpinner, BCard, BRow, BCol, BFormInput, BTable, BPagination } from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BButton,
    BSpinner,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BPagination,
    vSelect,
  },
  data() {
    return {}
  },
  watch: {
    /* eslint-disable */
    searchQuery(query) {
      if (query === '') {
        this.dataBarang = this.dataTemp
      } else {
        this.dataBarang = this.dataTemp.filter(item => item.nama.toLowerCase().indexOf(query) > -1 || item.bidang.nama.toLowerCase().indexOf(query) > -1)
      }
    },
    /* eslint-enable */
    bidangFilter(x) {
      if (x.id === '' || x.id === null || x.id === 0) {
        this.dataBarang = this.dataTemp
      } else {
        this.dataBarang = this.dataTemp.filter(item => item.bidang.id === x.id)
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
      return this.dataBarang.length
    },
  },
  methods: {
    detail(id) {
      const data = this.dataTemp.find(x => x.id === id)
      this.$store.commit('app-barang/SET_DETAIL_BARANG', data)
      this.$router.push({ name: 'barang-detail' })
    },
    loadBarang() {
      this.$store.dispatch('app-barang/fetchBarang').then(res => {
        this.$store.commit('app-barang/SET_BARANG', res.data)
        this.dataTemp = res.data
        this.dataBarang = this.dataTemp
      })
    },
  },
  mounted() {
    this.loadBarang()
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const isBusy = false
    const dataBarang = ref([])
    const dataTemp = ref([])
    const tableColumns = [{ key: 'id', label: '#' }, { key: 'nama', label: 'NAMA BARANG' }, { key: 'satuan' }, { key: 'saldo' }, { key: 'actions' }]
    const searchQuery = ref('')
    const perPage = ref(10)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)

    return {
      userData,
      isBusy,
      tableColumns,
      dataBarang,
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

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
