<template>
  <section>
    <b-row class="match-height">
      <b-col lg="12" cols="12">
        <b-card>
          <div class="mb-2">
            <!-- Table Top -->
            <b-row>
              <b-col cols="6" md="2" class="mb-2" v-if="userData.role === 'ADMIN KEPEGAWAIAN'">
                <b-button variant="primary" class="btn-icon" size="md" :to="{ name: 'pegawai-tambah' }">
                  <feather-icon icon="PlusIcon" /> Tambah Data
                </b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6" md="1">
                <label>Tampilkan</label>
                <v-select v-model="perPage" :options="perPageOptions" :clearable="false" />
              </b-col>
              <b-col cols="6" md="5" v-if="userData.role === 'ADMIN KEPEGAWAIAN'">
                <label class="mr-1">Filter Bidang</label>
                <v-select v-model="bidangFilter" :options="bidangOption" label="nama" :clearable="false" />
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
            :striped="true"
            :busy="isBusy"
            responsive
            :fields="tableColumns"
            :items="dataPegawai"
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
            <template #cell(pangkat)="data">
              <span>
                {{ data.item.golongan.golongan }}
              </span>
            </template>

            <template #cell(jabatan)="data">
              <span>
                {{ data.item.jabatan.nama }}
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
        this.dataPegawai = this.dataTemp
      } else {
        this.dataPegawai = this.dataTemp.filter(item => item.nama.toLowerCase().indexOf(query) > -1 || item.bidang.nama.toLowerCase().indexOf(query) > -1)
      }
    },
    /* eslint-enable */
    bidangFilter(x) {
      if (x.id === '' || x.id === null || x.id === 0) {
        this.dataPegawai = this.dataTemp
      } else {
        this.dataPegawai = this.dataTemp.filter(item => item.bidang.id === x.id)
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
      return this.dataPegawai.length
    },
    bidangOption() {
      return [{ id: 0, nama: 'SEMUA' }, ...this.$store.getters['app-general/getBidang']]
    },
  },
  methods: {
    loadPegawai() {
      this.$store.dispatch('app-general/fetchPegawai').then(res => {
        this.$store.commit('app-general/SET_PEGAWAI', res.data)
        this.dataTemp = res.data
        this.dataPegawai = this.dataTemp
      })
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
    loadJabatan() {
      this.$store.dispatch('app-general/fetchJabatan').then(res => {
        this.$store.commit('app-general/SET_JABATAN', res.data)
      })
    },
    loadGolongan() {
      this.$store.dispatch('app-general/fetchGolongan').then(res => {
        this.$store.commit('app-general/SET_GOLONGAN', res.data)
      })
    },
    detail(id) {
      const data = this.dataTemp.find(x => x.id === id)
      this.$store.commit('app-pegawai/SET_DETAIL', data)
      this.$router.push({ name: 'pegawai-detail' })
    },
  },
  mounted() {
    this.loadPegawai()
    this.loadBidang()
    this.loadTahun()
    this.loadGolongan()
    this.loadJabatan()
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const isBusy = false
    const dataPegawai = ref([])
    const dataTemp = ref([])
    const tableColumns = [
      { key: 'id', label: '#' },
      { key: 'nama' },
      { key: 'pangkat' },
      { key: 'jabatan' },
      {
        key: 'bidang',
        label: 'BAGIAN / WILAYAH',
        thClass: userData.role === 'ADMIN KEPEGAWAIAN' ? '' : 'd-none',
        tdClass: userData.role === 'ADMIN KEPEGAWAIAN' ? '' : 'd-none',
      },
      { key: 'actions' },
    ]
    const searchQuery = ref('')
    const perPage = ref(10)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    const bidangFilter = ref({
      id: 0,
      nama: 'SEMUA',
    })
    return {
      userData,
      isBusy,
      tableColumns,
      dataPegawai,
      dataTemp,
      searchQuery,
      perPage,
      currentPage,
      perPageOptions,
      sortBy,
      isSortDirDesc,
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

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
