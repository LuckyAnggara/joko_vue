<template>
  <section>
    <b-row class="match-height">
      <b-col lg="6" cols="12">
        <b-card>
          <b-row>
            <b-col lg="6" cols="12">
              <b-form-group label="Kode Akun" label-cols-md="4">
                <b-form-input readonly v-model="dataAkun.kode_akun" />
              </b-form-group>
              <b-form-group label="Klasifikasi" label-cols-md="4">
                <b-form-input readonly v-model="dataAkun.nama_jenis" />
              </b-form-group>
            </b-col>
            <b-col lg="6" cols="12">
              <b-form-group label="Saldo Akun" label-cols-md="4">
                <b-form-input readonly v-model="saldo" />
              </b-form-group>
              <b-form-group label="Sifat Akun" label-cols-md="4">
                <b-form-input readonly v-model="dataAkun.saldo_normal" />
              </b-form-group>
            </b-col>
            <b-col lg="12" cols="12">
              <b-form-group label="Nama Akun" label-cols-md="2">
                <b-form-input readonly v-model="dataAkun.nama" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="6" cols="12">
        <b-card>
          <b-form-group>
            <h5>Filter</h5>
            <hr />
            <h6 class="mb-1">Tanggal Transaksi</h6>
            <b-input-group>
              <flat-pickr v-model="date.value" class="form-control" :config="date.config" placeholder="Filter By Tanggal" @on-close="dateFilter" />
              <b-input-group-append>
                <b-button variant="outline-primary" @click="clear">
                  Clear
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-card>
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
              </b-col>
              <!-- Search -->
              <b-col cols="12" md="6">
                <div class="d-flex align-items-center justify-content-end">
                  <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="Cari data... (Kode Akun, Nama Akun, Nomor Ledger)" />
                </div>
              </b-col>
            </b-row>
          </div>

          <b-table
            ref="refTable"
            responsive
            primary-key="id"
            :fields="tableColumns"
            :items="dataLedger"
            :current-page="currentPage"
            :per-page="perPage"
            :sort-by.sync="sortBy"
            :sort-desc.sync="isSortDirDesc"
            show-empty
            empty-text="Tidak ada data"
            class="position-relative"
          >
            <!-- Column: Tanggal -->
            <template #cell(tanggal)="data">
              <span>
                {{ moment(data.item.created_at) }}
              </span>
            </template>

            <!-- Column: DEBIT KREDIT SALDO-->
            <template #cell(debit)="data">
              <span>
                {{ data.item.jenis === 'DEBIT' ? formatRupiah(data.item.nominal) : '-' }}
              </span>
            </template>

            <template #cell(kredit)="data">
              <span>
                {{ data.item.jenis === 'KREDIT' ? formatRupiah(data.item.nominal) : '-' }}
              </span>
            </template>

            <template #cell(saldo)="data">
              <span>
                {{ formatRupiah(data.item.saldo) }}
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
                  :total-rows="totalLedger"
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
import router from '@/router'
import store from '@/store'
import { ref } from '@vue/composition-api'

import { BCard, BFormGroup, BRow, BCol, BFormInput, BTable, BPagination, BButton, BInputGroupAppend, BInputGroup } from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    vSelect,
    BButton,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BPagination,
    flatPickr,
    BInputGroupAppend,
    BInputGroup,
    BFormGroup,
  },
  data() {
    return {
      date: {
        value: Date.now(),
        config: {
          wrap: true, // set wrap to true only when using 'input-group'
          altFormat: 'd F Y',
          altInput: true,
          dateFormat: 'Y-m-d',
          mode: 'range',
        },
      },
      filterQuery: '',
      searchQuery: '',
      refTable: null,
      dataLedger: [],
      dataTemp: [],
      dataAkun: {
        kode_akun: '',
        nama_jenis: '',
        nama: '',
        saldo: 0,
      },
    }
  },
  computed: {
    dataMeta() {
      const localItemsCount = this.$refs.refTable ? this.$refs.refTable.computedItems.length : 0
      return {
        from: this.perPage * (this.currentPage - 1) + (localItemsCount ? 1 : 0),
        to: this.perPage * (this.currentPage - 1) + localItemsCount,
        of: this.totalLedger,
      }
    },
    saldo() {
      return this.formatRupiah(parseFloat(this.dataAkun.saldo))
    },
  },
  watch: {
    /* eslint-disable */
    searchQuery(query) {
      if (query === '') {
        this.dataLedger = this.dataTemp
      } else {
        this.dataLedger = this.dataTemp.filter(
          item =>
            item.nomor_jurnal.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
            item.keterangan.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
            item.kode_akun.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
            item.nama_akun.toLowerCase().indexOf(query.toLowerCase()) > -1,
        )
      }
      this.totalLedger = this.dataLedger.length
    },
    /* eslint-disable */
  },
  mounted() {
    this.loadLedger(this.moment(Date.now()), this.moment(Date.now()))
  },
  methods: {
    clear() {
      this.date.value = null
      this.dateFilter(null)
    },
    dateFilter(x) {
      console.info(x)
      this.loadLedger(this.moment(x[0]), this.moment(x[1]))
      this.totalInvoices = this.totalLedger.length
    },
    moment(value) {
      return this.$moment(value).format('DD MMMM YYYY')
    },
    loadLedger(dateawal = null, dateakhir = null) {
      const { id } = router.currentRoute.params
      store
        .dispatch('app-keuangan/fetchLedgerByAkun', {
          id,
          dateawal,
          dateakhir,
        })
        .then(res => {
          store.commit('app-keuangan/SET_DATA_LEDGER', res.data.ledger)
          this.dataAkun = res.data.master
          this.dataTemp = store.getters['app-keuangan/getDataLedger']
          this.dataLedger = this.dataTemp
          this.totalLedger = this.dataLedger.length
        })
    },
    formatRupiah(value) {
      return `Rp. ${value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
  },

  setup() {
    const tableColumns = [
      { key: 'tanggal', sortable: true },
      { key: 'nomor_jurnal', sortable: true },
      { label: 'debit', key: 'debit', sortable: true },
      { label: 'kredit', key: 'kredit', sortable: true },
      {
        label: 'saldo',
        key: 'saldo',
      },
      { label: 'keterangan', key: 'keterangan', sortable: true },
    ]

    // const searchQuery = ref('')
    const perPage = ref(10)
    const totalLedger = ref(0)
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
      totalLedger,
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

.keuangan-filter-select {
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
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
