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
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="6" md="2" sm="3" lg="2">
                <label>Tahun Data</label>
                <v-select v-model="tahun" label="nama" :options="tahunOption" :clearable="false" />
              </b-col>
              <b-col cols="6" lg="1" md="2" sm="3">
                <label>Tampilkan</label>
                <v-select v-model="perPage" :options="perPageOptions" :clearable="false" />
              </b-col>
              <b-col cols="6" lg="3" md="3" sm="3">
                <label class="mr-1">Filter Status</label>
                <v-select v-model="statusFilter" :options="statusOption" :clearable="false" />
              </b-col>
              <b-col cols="6" lg="3" md="3" sm="3" v-if="userData.role !== 'USER' ? true : false">
                <label class="mr-1">Bagian / Wilayah</label>
                <v-select v-model="bidangFilter" label="nama" :options="bidangOption" :clearable="false" />
              </b-col>
              <b-col cols="6" lg="3" md="5" sm="12">
                <label class="mr-1">Cari Data</label>
                <b-form-input v-model="searchQuery" placeholder="Cari data... " />
              </b-col>
            </b-row>
          </div>
          <b-table
            small
            bordered
            :busy="isBusy"
            ref="refTable"
            responsive
            primary-key="id"
            :fields="tableColumns"
            :items="dataKegiatan"
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
            <template #cell(tanggal_kegiatan)="data">
              <span>
                {{ $moment(data.item.tanggal_rencana_kegiatan).format('DD-MM-YYYY') }}
              </span>
            </template>
            <template #cell(jenis)="data">
              <span>
                {{ data.item.jenis_kegiatan.nama }}
              </span>
            </template>
            <template #cell(kode_mak)="data">
              <b-tooltip :target="`tooltip_${data.item.id}`">{{ data.item.mak.nama }}</b-tooltip>
              <span :id="`tooltip_${data.item.id}`">
                {{ data.item.mak.kode }}
              </span>
            </template>
            <template #cell(total_anggaran)="data">
              <span>
                {{ formatRupiah(data.item.total_anggaran) }}
              </span>
            </template>
            <template #cell(total_realisasi)="data">
              <span>
                {{ formatRupiah(data.item.total_realisasi) }}
              </span>
            </template>
            <template #cell(uraian)="data">
              <span>
                {{ truncate(data.item.uraian, 30) }}
              </span>
            </template>
            <template #cell(maker)="data" v-if="userData.role !== 'USER' ? true : false">
              <span>
                {{ data.item.bidang.nama }}
              </span>
            </template>
            <template #cell(status)="data">
              <div class="text-nowrap">
                <template>
                  <b-badge pill variant="light-primary" v-if="data.item.status === 'RENCANA'"> {{ data.item.status }} </b-badge>
                  <b-badge pill variant="light-warning" v-if="data.item.status === 'VERIFIKASI KEUANGAN'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="warning" v-if="data.item.status === 'VERIFIKASI REALISASI'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="light-danger" v-if="data.item.status === 'REVISI KEUANGAN'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="light-danger" v-if="data.item.status === 'REVISI PPK'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="primary" v-if="data.item.status === 'PELAKSANAAN'"> {{ data.item.status }} </b-badge>
                  <b-badge pill variant="light-warning" v-if="data.item.status === 'VERIFIKASI PPK'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="light-success" v-if="data.item.status === 'VERIFIED PPK'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="danger" v-if="data.item.status === 'TOLAK PPK'"> {{ data.item.status }}</b-badge>
                  <b-badge pill variant="success" v-if="data.item.status === 'SELESAI'"> {{ data.item.status }} </b-badge>
                </template>
              </div>
            </template>
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
import { formatRupiah, truncate } from '@core/utils/filter'
import { BTooltip, BButton, BBadge, BSpinner, BCard, BRow, BCol, BFormInput, BTable, BPagination } from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BTooltip,
    BButton,
    BBadge,
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
      this.loadKegiatan()
    },
    /* eslint-disable */
    searchQuery(query) {
      if (query === '') {
        this.dataKegiatan = this.dataTemp
      } else {
        this.dataKegiatan = this.dataTemp.filter(
          item =>
            item.mak.nama.toLowerCase().indexOf(query) > -1 ||
            item.mak.kode.toLowerCase().indexOf(query) > -1 ||
            item.nominal == query ||
            item.uraian.toLowerCase().indexOf(query) > -1,
        )
      }
    },
    bidangFilter(x) {
      if (x.nama === '' || x.id === null || x.id === 0) {
        this.dataKegiatan = this.dataTemp
      } else {
        this.dataKegiatan = this.dataTemp.filter(item => item.bidang.id === x.id)
      }
    },
    /* eslint-enable */
    statusFilter(x) {
      if (x === 'SEMUA' || x === null) {
        this.dataKegiatan = this.dataTemp
      } else {
        this.dataKegiatan = this.dataTemp.filter(item => item.status === x)
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
      return this.dataKegiatan.length
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
    truncate,
    formatRupiah,
    detail(id) {
      const data = this.dataTemp.find(x => x.id === id)
      this.$store.commit('app-kegiatan/SET_DETAIL', data)
      this.$router.push({ name: 'kegiatan-detail' })
    },
    loadKegiatan() {
      this.isBusy = !this.isBusy
      this.$store
        .dispatch('app-kegiatan/fetchRencanaKegiatan', {
          tahun_id: this.tahun.id,
          bidang_id: this.userData.role === 'USER' ? this.userData.bidang_id : 0,
        })
        .then(res => {
          this.isBusy = !this.isBusy
          if (this.userData.role === 'USER') {
            this.dataTemp = res.data
          } else if (this.userData.role === 'PPK') {
            this.dataTemp = res.data.filter(x => x.status === 'VERIFIKASI PPK')
          } else if (this.userData.role === 'ADMIN KEUANGAN') {
            this.dataTemp = res.data.filter(x => x.status !== 'RENCANA')
          } else if (this.userData.role === 'BENDAHARA') {
            this.dataTemp = res.data.filter(x => x.status === 'VERIFIED PPK')
          }
          this.dataKegiatan = this.dataTemp
        })
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
  },
  mounted() {
    this.loadTahun()
    this.loadKegiatan()
    this.loadBidang()
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const tahun = ref({
      id: 1,
      nama: 2021,
    })
    const isBusy = false
    const dataKegiatan = ref([])
    const dataTemp = ref([])
    const tableColumns = [
      { key: 'id', label: '#' },
      { key: 'nomor_kwitansi' },
      { key: 'tanggal_kegiatan' },
      { key: 'uraian', label: 'Uraian Kegiatan' },
      { key: 'jenis', label: 'Jenis Kegiatan' },
      { key: 'kode_mak' },
      { key: 'total_anggaran' },
      { key: 'total_realisasi' },
      { key: 'maker', thClass: userData.role !== 'USER' ? '' : 'd-none', tdClass: userData.role !== 'USER' ? '' : 'd-none' },
      { key: 'status' },
      { key: 'actions' },
    ]
    const searchQuery = ref('')
    const perPage = ref(10)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    const bidangFilter = ref({ nama: 'SEMUA', id: 0 })
    const statusFilter = ref('SEMUA')
    const statusOption = ref([
      'SEMUA',
      'RENCANA',
      'VERIFIKASI KEUANGAN',
      'PELAKSANAAN',
      'VERIFIKASI REALISASI',
      'VERIFIKASI PPK',
      'VERIFIED PPK',
      'DITOLAK',
      'SELESAI',
    ])
    return {
      userData,
      tahun,
      isBusy,
      tableColumns,
      dataKegiatan,
      dataTemp,
      searchQuery,
      perPage,
      currentPage,
      perPageOptions,
      sortBy,
      isSortDirDesc,
      bidangFilter,
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
