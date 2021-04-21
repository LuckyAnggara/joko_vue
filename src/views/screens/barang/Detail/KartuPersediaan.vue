<template>
  <!-- Table Container Card -->

  <section>
    <div class="mb-2">
      <!-- Table Top -->
      <b-row>
        <!-- Per Page -->
        <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
          <label>Data</label>
          <v-select v-model="perPage" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
          <b-button variant="primary" :to="{ name: 'transaksi-penjualan-tambah' }">
            Tambah Transaksi
          </b-button>
        </b-col>

        <!-- Search -->
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="Cari data... ( Nomor Transaksi , Nama Pelanggan )" />
          </div>
        </b-col>
      </b-row>
    </div>

    <b-table
      ref="refTable"
      responsive
      primary-key="id"
      :fields="tableColumns"
      :items="persediaan"
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="isSortDirDesc"
      show-empty
      empty-text="Tidak ada data"
      class="position-relative"
    >
      <!-- Column: Id -->
      <template #cell(id)="data">
        <span>
          {{ data.index + 1 }}
        </span>
      </template>

      <!-- Column: Nomor Transaksi -->
      <template #cell(nomor_transaksi)="data">
        <b-link :to="{ name: 'transaksi-penjualan-invoice', params: { id: data.item.master_penjualan.id } }" class="font-weight-bold">
          #{{ data.item.master_penjualan.nomor_transaksi }}
        </b-link>
      </template>

      <!-- Column: Issued Date -->
      <template #cell(tanggal_transaksi)="data">
        <span class="text-nowrap">
          {{ moment(data.item.tanggal_transaksi) }}
        </span>
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
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'

import { BRow, BCol, BFormInput, BButton, BTable, BLink, BPagination } from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'

export default {
  components: {
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BLink,

    BPagination,

    vSelect,
  },
  data() {
    return {
      persediaan: [],
      data: '',
      searchQuery: '',
      refTable: null,
    }
  },
  props: {
    dataBarang: {
      type: Object,
      required: true,
    },
  },
  watch: {
    searchQuery(query) {
      if (query === '') {
        this.persediaan = this.data
      } else {
        this.persediaan = this.data.filter(
          item => item.nomor_transaksi.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.nama_pelanggan.toLowerCase().indexOf(query.toLowerCase()) > -1,
        )
      }
      this.totalData = this.persediaan.length
    },
    dataBarang() {
      this.loadPersediaan()
    },
  },
  // mounted() {
  //   this.loadPersediaan()
  // },
  computed: {
    dataMeta() {
      const localItemsCount = this.$refs.refTable ? this.$refs.refTable.computedItems.length : 0
      return {
        from: this.perPage * (this.currentPage - 1) + (localItemsCount ? 1 : 0),
        to: this.perPage * (this.currentPage - 1) + localItemsCount,
        of: this.totalData,
      }
    },
  },
  methods: {
    moment(value) {
      return this.$moment(value).format('DD MMMM YYYY')
    },
    loadPersediaan() {
      const { id } = this.dataBarang

      store.dispatch('app-barang/fetchDetailPersediaan', { id }).then(res => {
        store.commit('app-barang/SET_LIST_DETAIL_PERSEDIAAN', res.data)
        this.persediaan = res.data
      })
    },
  },
  setup() {
    const tableColumns = [
      { key: 'id', label: '#', sortable: true },
      { key: 'tanggal_transaksi', sortable: true },
      { key: 'nomor_transaksi', sortable: true },
      { key: 'debit', sortable: true },
      { key: 'kredit', sortable: true },
      { key: 'saldo', sortable: true },
    ]
    // const searchQuery = ref('')
    const perPage = ref(10)
    const totalData = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    const statusFilter = ref(null)

    return {
      tableColumns,
      // searchQuery,
      perPage,
      isSortDirDesc,
      currentPage,
      totalData,
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

.invoice-filter-select {
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
