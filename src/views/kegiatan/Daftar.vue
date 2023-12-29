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
                <v-select v-model="kegiatanStore.filter.tahun" label="nama" :options="mainStore.tahunOptions" :clearable="false" @input="filter()" />
              </b-col>
              <b-col cols="6" lg="1" md="2" sm="3">
                <label>Tampilkan</label>
                <v-select v-model="kegiatanStore.filter.currentLimit" :options="mainStore.limitDataOptions" :clearable="false" @input="filter()" />
              </b-col>
              <b-col cols="6" lg="3" md="3" sm="3">
                <label class="mr-1">Filter Status</label>
                <v-select v-model="kegiatanStore.filter.status" :options="statusOption" :clearable="false" @input="filter()" />
              </b-col>
              <b-col cols="6" lg="3" md="3" sm="3" v-if="userData.role !== 'USER' ? true : false">
                <label class="mr-1">Bagian / Wilayah</label>
                <v-select v-model="bidangFilter" label="nama" :options="bidangOption" :clearable="false" />
              </b-col>
              <b-col cols="6" lg="3" md="5" sm="12">
                <label class="mr-1">Cari Data</label>
                <b-form-input v-model="kegiatanStore.filter.searchQuery" placeholder="Cari data... " @keyup="search" />
              </b-col>
            </b-row>
          </div>
          <b-table
            small
            bordered
            :busy="kegiatanStore.isLoading"
            ref="refTable"
            responsive
            primary-key="id"
            :fields="tableColumns"
            :items="kegiatanStore.items"
            :current-page="kegiatanStore.currentPage"
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
                {{ kegiatanStore.from + data.index }}
              </span>
            </template>
            <template #cell(tanggal_kegiatan)="data">
              <span>
                {{ $moment(data.item.tanggal_rencana_kegiatan).format('DD-MM-YYYY') }}
              </span>
            </template>
            <template #cell(jenis)="data">
              <span>
                {{ data.item.kegiatan.nama }}
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
                <span class="text-muted"> {{ kegiatanStore.from }} - {{ kegiatanStore.to }} dari {{ kegiatanStore.total }} data</span>
              </b-col>
              <!-- Pagination -->
              <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
                <b-pagination
                  v-model="kegiatanStore.page"
                  :total-rows="kegiatanStore.total"
                  :per-page="kegiatanStore.currentLimit"
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
import { useKegiatanStore } from '@/store/pinia/kegiatanStore.js'
import { useMainStore } from '@/store/pinia/main'
import { useDebounceFn } from '@vueuse/core'

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
  computed: {
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
    filter() {
      this.kegiatanStore.getData()
    },
    detail(id) {
      // const data = this.dataTemp.find(x => x.id === id)
      // this.$store.commit('app-kegiatan/SET_DETAIL', data)
      this.$router.push({ name: 'kegiatan-detail', params: { id: id } })
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
    this.kegiatanStore.getData()
    this.loadTahun()
    this.loadBidang()
  },
  setup() {
    const kegiatanStore = useKegiatanStore()
    const mainStore = useMainStore()
    const userData = JSON.parse(localStorage.getItem('userData'))

    const search = useDebounceFn(() => {
      kegiatanStore.getData()
    }, 500)

    const tableColumns = [
      { key: 'id', label: '#' },
      { key: 'nomor_kwitansi' },
      { key: 'tanggal_kegiatan' },
      { key: 'uraian', label: 'Uraian Kegiatan' },
      { key: 'jenis', label: 'Jenis Kegiatan' },
      { key: 'kode_mak' },
      { key: 'total_anggaran', label: 'Anggaran' },
      { key: 'total_realisasi', label: 'Realisasi' },
      { key: 'maker', thClass: userData.role !== 'USER' ? '' : 'd-none', tdClass: userData.role !== 'USER' ? '' : 'd-none' },
      { key: 'status' },
      { key: 'actions' },
    ]

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
      kegiatanStore,
      search,
      mainStore,

      tableColumns,

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
