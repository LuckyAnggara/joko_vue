<template>
  <section>
    <b-row class="match-height">
      <b-col lg="12" cols="12">
        <b-card>
          <div class="mb-2">
            <!-- Table Top -->
            <b-row>
              <b-col cols="6" md="2" class="mb-2">
                <b-button variant="primary" class="btn-icon" size="md" :to="{ name: 'permintaan-persediaan-tambah' }" v-if="userData.role === 'USER'">
                  <feather-icon icon="PlusIcon" /> Permintaan Baru
                </b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6" md="2" sm="3" lg="2">
                <label>Tahun Data</label>
                <v-select v-model="tahun" label="nama" :options="tahunOption" :clearable="false" />
              </b-col>
              <b-col cols="6" lg="2" md="2" sm="3">
                <label>Tampilkan</label>
                <v-select v-model="perPage" :options="perPageOptions" :clearable="false" />
              </b-col>
              <b-col cols="6" lg="2" md="3" sm="3">
                <label class="mr-1">Filter Status</label>
                <v-select v-model="statusFilter" :options="statusOption" :clearable="false" />
              </b-col>
              <b-col cols="6" lg="3" md="3" sm="3" v-if="userData.role !== 'USER' ? true : false">
                <label class="mr-1">Bagian / Wilayah</label>
                <v-select v-model="bidangFilter" label="nama" :options="bidangOption" :clearable="false" />
              </b-col>
              <!-- Search -->
              <b-col cols="6" lg="3" md="5" sm="12">
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
            :items="dataPermintaan"
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
            <template #cell(bidang)="data">
              <span>
                {{ data.item.bidang.nama }}
              </span>
            </template>
            <template #cell(created_at)="data">
              <span>
                {{ $moment(data.item.created_at).format('DD-MMM-YYYY') }}
              </span>
            </template>
            <template #cell(status)="data">
              <div class="text-nowrap">
                <template>
                  <b-badge pill variant="light-primary" v-if="data.item.status === 'PENGAJUAN'"> {{ data.item.status }} </b-badge>
                  <b-badge pill variant="light-warning" v-if="data.item.status === 'VERIFIKASI UMUM'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="light-danger" v-if="data.item.status === 'REVISI UMUM'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="danger" v-if="data.item.status === 'DITOLAK'"> {{ data.item.status }} </b-badge>
                  <b-badge pill variant="success" v-if="data.item.status === 'SELESAI'"> {{ data.item.status }} </b-badge>
                </template>
              </div>
            </template>
            <!-- <template #cell(lampiran)="data">
              <ol>
                <li v-for="item in data.item.lampiran" :key="item.id">
                  <b-link :href="urlGet(item.id, 'barang')" class="font-weight-bold" target="_blank"> {{ item.nama }} </b-link>
                </li>
              </ol>
            </template> -->

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
import {
  // BLink,
  BBadge,
  BButton,
  BSpinner,
  BCard,
  BRow,
  BCol,
  BFormInput,
  BTable,
  BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { urlGet } from '@core/utils/filter'

export default {
  components: {
    BBadge,
    // BLink,
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
    tahun() {
      this.loadPermintaan()
    },
    /* eslint-disable */
    searchQuery(query) {
      if (query === '') {
        this.dataPermintaan = this.dataTemp
      } else {
        this.dataPermintaan = this.dataTemp.filter(item => item.keterangan.toLowerCase().indexOf(query) > -1)
      }
    },
    /* eslint-enable */
    bidangFilter(x) {
      if (x.id === '' || x.id === null || x.id === 0) {
        this.dataPermintaan = this.dataTemp
      } else {
        this.dataPermintaan = this.dataTemp.filter(item => item.bidang.id === x.id)
      }
    },
    statusFilter(x) {
      if (x === 'SEMUA') {
        this.dataPermintaan = this.dataTemp
      } else {
        this.dataPermintaan = this.dataTemp.filter(item => item.status === x)
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
      return this.dataPermintaan.length
    },
    tahunOption() {
      return this.$store.getters['app-general/getTahun']
    },
    bidangOption() {
      return [
        {
          id: 0,
          nama: 'SEMUA',
        },
        ...this.$store.getters['app-general/getBidang'],
      ]
    },
  },
  methods: {
    urlGet,
    detail(id) {
      const data = this.dataTemp.find(x => x.id === id)
      this.$store.commit('app-barang/SET_DETAIL_PERMINTAAN', data)
      this.$router.push({ name: 'permintaan-persediaan-detail' })
    },
    loadTahun() {
      this.$store.dispatch('app-general/fetchTahun').then(res => {
        this.$store.commit('app-general/SET_TAHUN', res.data)
      })
    },
    loadBidang() {
      this.$store.dispatch('app-general/fetchBidang').then(res => {
        this.$store.commit('app-general/SET_BIDANG', res.data)
      })
    },
    loadPermintaan() {
      this.isBusy = !this.isBusy
      this.$store
        .dispatch('app-barang/fetchPermintaan', {
          tahun_id: this.tahun.id,
          bidang_id: this.userData.role === 'USER' ? this.userData.bidang_id : 0,
        })
        .then(res => {
          this.isBusy = !this.isBusy
          if (this.userData.role === 'USER') {
            this.dataTemp = res.data
          } else if (this.userData.role === 'ADMIN UMUM') {
            this.dataTemp = res.data.filter(x => x.status === 'VERIFIKASI UMUM')
          }
          this.dataPermintaan = this.dataTemp
        })
    },
  },
  mounted() {
    this.loadPermintaan()
    this.loadTahun()
    this.loadBidang()
  },
  setup() {
    const d = new Date()
    const tahun = ref({
      id: 1,
      nama: d.getFullYear(),
    })
    const userData = JSON.parse(localStorage.getItem('userData'))
    const isBusy = false
    const dataPermintaan = ref([])
    const dataTemp = ref([])
    const tableColumns = [
      { key: 'id', label: '#' },
      { key: 'bidang', label: 'WILAYAH / BAGIAN', thClass: userData.role !== 'USER' ? '' : 'd-none', tdClass: userData.role !== 'USER' ? '' : 'd-none' },
      { key: 'created_at', label: 'Tanggal Permintaan' },
      { key: 'status' },
      { key: 'keterangan' },
      { key: 'actions' },
    ]
    const searchQuery = ref('')
    const perPage = ref(10)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    const statusFilter = ref('SEMUA')
    const bidangFilter = ref({ nama: 'SEMUA', id: 0 })
    const statusOption = ref(['SEMUA', 'PENGAJUAN', 'REVISI', 'VERIFIKASI UMUM', 'SELESAI'])
    return {
      tahun,
      userData,
      isBusy,
      tableColumns,
      dataPermintaan,
      dataTemp,
      searchQuery,
      perPage,
      currentPage,
      perPageOptions,
      sortBy,
      isSortDirDesc,
      statusFilter,
      bidangFilter,
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
