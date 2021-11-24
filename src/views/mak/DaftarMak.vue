<template>
  <b-modal
    id="modal-daftar-mak"
    size="xl"
    scrollable
    ok-only
    no-close-on-backdrop
    content-class="shadow"
    :title="`Daftar Mak ${bidang.nama}`"
    ok-variant="danger"
    ok-title="Tutup"
    lazy
  >
    <b-row>
      <!-- Search -->
      <b-col cols="6" md="6">
        <label class="mr-1">Cari Data</label>
        <b-form-input v-model="searchQuery" placeholder="Cari data... " />
      </b-col>
    </b-row>
    <b-table
      small
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
      <template #cell(kode)="data">
        <span>
          {{ data.item.kode }}
        </span>
        <br />
        <span>
          {{ data.item.nama }}
        </span>
      </template>
      <template #cell(pagu)="data">
        <span>
          {{ formatRupiah(data.item.pagu) }}
        </span>
      </template>
      <template #cell(realisasi)="data">
        <span>
          {{ formatRupiah(data.item.realisasi) }}
        </span>
      </template>
      <template #cell(sisa)="data">
        <span>
          {{ formatRupiah(parseFloat(data.item.pagu) - parseFloat(data.item.realisasi)) }}
        </span>
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
  </b-modal>
</template>

<script>
import { ref } from '@vue/composition-api'
import { formatRupiah } from '@core/utils/filter'
import { BSpinner, BRow, BCol, BFormInput, BTable, BPagination } from 'bootstrap-vue'

export default {
  components: {
    BSpinner,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BPagination,
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
        this.dataMak = this.dataTemp.filter(item => item.nama.toLowerCase().indexOf(query) > -1 || item.kode.toLowerCase().indexOf(query) > -1)
      }
    },
    /* eslint-enable */
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
  props: {
    tahun: Object,
    bidang: Object,
  },
  methods: {
    formatRupiah,
    loadMak() {
      this.isBusy = !this.isBusy
      this.$store
        .dispatch('app-mak/fetchMak', {
          tahun_id: this.tahun === null ? 1 : this.tahun.id,
          bidang_id: this.bidang.id, // ADMIN AKSES
        })
        .then(res => {
          this.isBusy = !this.isBusy
          this.dataTemp = res.data
          this.dataMak = this.dataTemp
        })
    },
  },
  mounted() {
    this.loadMak()
  },
  setup() {
    const isBusy = false
    const dataMak = ref([])
    const dataTemp = ref([])
    const tableColumns = [{ key: 'id', label: '#' }, { key: 'kode' }, { key: 'pagu' }, { key: 'realisasi' }, { key: 'sisa' }]
    const searchQuery = ref('')
    const perPage = ref(10)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    return {
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
    }
  },
}
</script>
