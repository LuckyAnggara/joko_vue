<template>
  <section>
    <b-row class="match-height">
      <b-col lg="3" cols="12">
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
      <b-col lg="9" cols="12">
        <statistik :data-transaksi="dataTransaksi" />
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
                <b-button variant="primary" :to="{ name: 'transaksi-pembelian-tambah' }">
                  Tambah Data
                </b-button>
              </b-col>

              <!-- Search -->
              <b-col cols="12" md="6">
                <div class="d-flex align-items-center justify-content-end">
                  <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="Cari data... (Nomor Transaksi , Nama Supplier)" />
                  <v-select v-model="filterQuery" :options="filterOptions" class="invoice-filter-select  mr-1" placeholder="Status Pembayaran">
                    <template #selected-option="{ label }">
                      <span class="text-truncate overflow-hidden">
                        {{ label }}
                      </span>
                    </template>
                  </v-select>
                </div>
              </b-col>
            </b-row>
          </div>

          <b-table
            ref="refTable"
            responsive
            primary-key="id"
            :fields="tableColumns"
            :items="dataTransaksi"
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
            <template #cell(nomorTransaksi)="data">
              <b-link :to="{ name: 'transaksi-penjualan-invoice', params: { id: data.item.id } }" class="font-weight-bold">
                #{{ data.item.nomorTransaksi }}
              </b-link>
            </template>

            <!-- Column: Issued Date -->
            <template #cell(tanggalTransaksi)="data">
              <span class="text-nowrap">
                {{ moment(data.item.tanggalTransaksi) }}
              </span>
            </template>

            <!-- Column: Nama Supplier -->
            <template #cell(namaSupplier)="data">
              <span>
                {{ data.item.supplier.nama }}
              </span>
            </template>

            <!-- Column: Total -->
            <template #cell(total)="data">
              <span class="text-nowrap">
                {{ formatRupiah(data.item.invoice.grandTotal) }}
              </span>
            </template>

            <!-- Column: Balance -->
            <template #cell(saldo)="data">
              <div class="text-nowrap">
                <template v-if="data.item.pembayaran.sisaPembayaran === null || data.item.pembayaran.sisaPembayaran === 0">
                  <b-badge pill variant="light-success">
                    Lunas
                  </b-badge>
                </template>
                <template v-else>
                  <span :id="`transaksi-row-${data.item.id}-tooltip-saldo`">-{{ formatRupiah(data.item.pembayaran.sisaPembayaran) }}</span>
                  <b-tooltip :target="`transaksi-row-${data.item.id}-tooltip-saldo`">
                    <span v-if="data.item.pembayaran.statusPembayaran.value === 1">
                      Kredit
                      <br />
                      Jt. Tempo : {{ moment(data.item.pembayaran.tanggalJatuhTempo) }}
                      <br />
                      Total Tagihan : {{ data.item.pembayaran.sisaPembayaran }}
                    </span>
                    <span v-else-if="data.item.pembayaran.statusPembayaran.value === 2">
                      Cash On Delivery
                      <br />
                      Total Tagihan : {{ data.item.pembayaran.sisaPembayaran }}
                    </span>
                  </b-tooltip>
                </template>
              </div>
            </template>

            <!-- Column: Actions -->
            <template #cell(actions)="data">
              <div class="text-nowrap">
                <feather-icon
                  :id="`invoice-row-${data.item.id}-preview-icon`"
                  icon="EyeIcon"
                  size="16"
                  class="mx-1"
                  @click="
                    $router.push({
                      name: 'transaksi-penjualan-invoice',
                      params: { id: data.item.id },
                    })
                  "
                />
                <b-tooltip title="Preview Invoice" :target="`invoice-row-${data.item.id}-preview-icon`" />

                <b-dropdown variant="link" toggle-class="p-0" no-caret :right="$store.state.appConfig.isRTL">
                  <template #button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                  </template>
                  <b-dropdown-item>
                    <feather-icon icon="DownloadIcon" />
                    <span class="align-middle ml-50">Download</span>
                  </b-dropdown-item>
                  <b-dropdown-item :to="{ name: 'transaksi-penjualan-tambah', params: { id: data.item.id } }">
                    <feather-icon icon="EditIcon" />
                    <span class="align-middle ml-50">Edit</span>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <feather-icon icon="CornerUpLeftIcon" />
                    <span class="align-middle ml-50">Retur</span>
                  </b-dropdown-item>
                  <b-dropdown-item>
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
                  :total-rows="totalInvoices"
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

import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BInputGroupAppend,
  BFormGroup,
  BInputGroup,
  BButton,
  BTable,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import Statistik from './Statistik.vue'

export default {
  components: {
    BFormGroup,
    BInputGroupAppend,
    BInputGroup,
    flatPickr,
    Statistik,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,

    vSelect,
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
      dataTransaksi: [],
      dataTemp: [],
    }
  },
  watch: {
    searchQuery(query) {
      if (query === '') {
        this.dataTransaksi = this.dataTemp
      } else {
        this.dataTransaksi = this.dataTemp.filter(
          item => item.nomorTransaksi.toLowerCase().indexOf(query.toLowerCase()) > -1 || item.supplier.nama.toLowerCase().indexOf(query.toLowerCase()) > -1,
        )
      }
      this.totalInvoices = this.dataTransaksi.length
    },
    filterQuery(query) {
      if (query === 'Lunas') {
        this.dataTransaksi = this.dataTemp.filter(trx => trx.pembayaran.sisaPembayaran === null || trx.pembayaran.sisaPembayaran === 0)
      } else if (query === 'Kredit') {
        this.dataTransaksi = this.dataTemp.filter(trx => parseFloat(trx.pembayaran.sisaPembayaran) >= 0 && trx.pembayaran.statusPembayaran.value === 1)
      } else if (query === null || query === '') {
        this.dataTransaksi = this.dataTemp
      }
      this.totalInvoices = this.dataTransaksi.length
    },
  },
  computed: {
    dataMeta() {
      const localItemsCount = this.$refs.refTable ? this.$refs.refTable.computedItems.length : 0
      return {
        from: this.perPage * (this.currentPage - 1) + (localItemsCount ? 1 : 0),
        to: this.perPage * (this.currentPage - 1) + localItemsCount,
        of: this.totalInvoices,
      }
    },
  },
  methods: {
    clear() {
      this.date.value = null
      this.dateFilter(null)
    },
    dateFilter(x) {
      this.loadTransaksi(this.moment(x[0]), this.moment(x[1]))
      this.totalInvoices = this.dataTransaksi.length
    },
    moment(value) {
      return this.$moment(value).format('DD MMMM YYYY')
    },
    formatRupiah(value) {
      return `Rp. ${value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
    loadTransaksi(dateawal = null, dateakhir = null) {
      store
        .dispatch('app-transaksi-pembelian/fetchListTransaksiPembelian', {
          dateawal,
          dateakhir,
        })
        .then(res => {
          store.commit('app-transaksi-pembelian/SET_LIST_TRANSAKSI_PEMBELIAN', res.data)
          this.dataTransaksi = res.data
          this.dataTemp = res.data
          this.totalInvoices = this.dataTransaksi.length
        })
    },
  },
  mounted() {
    this.loadTransaksi(this.moment(Date.now()), this.moment(Date.now()))
  },
  setup() {
    const filterOptions = ['Lunas', 'Kredit']
    const tableColumns = [
      { key: 'id', label: '#', sortable: true },
      { key: 'nomorTransaksi', sortable: true },
      { key: 'tanggalTransaksi', sortable: true },
      { key: 'namaSupplier', sortable: true },
      { key: 'total', sortable: true },
      { key: 'saldo', sortable: true },
      { key: 'actions' },
    ]

    // const searchQuery = ref('')
    const perPage = ref(10)
    const totalInvoices = ref(0)
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
      totalInvoices,
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
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
