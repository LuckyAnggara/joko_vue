<template>
  <!-- Table Container Card -->
  <b-card no-body>
    <div class="m-2">
      <!-- Table Top -->
      <b-row>
        <!-- Per Page -->
        <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
          <label>Data</label>
          <v-select v-model="perPage" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
          <b-button variant="primary" :to="{ name: 'apps-invoice-add' }">
            Tambah Transaksi
          </b-button>
        </b-col>

        <!-- Search -->
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="Search..." />
          </div>
        </b-col>
      </b-row>
    </div>

    <b-table
      ref="refInvoiceListTable"
      :items="dataTransaksi"
      responsive
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
      class="position-relative"
    >
      <template #head(invoiceStatus)>
        <feather-icon icon="TrendingUpIcon" class="mx-auto" />
      </template>

      <!-- Column: Id -->
      <!-- <template #cell(id)="data">
        <b-link :to="{ name: 'apps-invoice-preview', params: { id: data.item.id } }" class="font-weight-bold"> #{{ data.item.nomor_transaksi }} </b-link>
      </template> -->

      <!-- Column: Invoice Status -->
      <!-- <template #cell(invoiceStatus)="data">
        <b-avatar :id="`invoice-row-${data.item.id}`" size="32" :variant="`light-${resolveInvoiceStatusVariantAndIcon(data.item.invoiceStatus).variant}`">
          <feather-icon :icon="resolveInvoiceStatusVariantAndIcon(data.item.invoiceStatus).icon" />
        </b-avatar>
        <b-tooltip :target="`invoice-row-${data.item.id}`" placement="top">
          <p class="mb-0">
            {{ data.item.invoiceStatus }}
          </p>
          <p class="mb-0">Balance: {{ data.item.balance }}</p>
          <p class="mb-0">Due Date: {{ data.item.dueDate }}</p>
        </b-tooltip>
      </template> -->

      <!-- Column: Client -->
      <!-- <template #cell(client)="data">
        <b-media vertical-align="center">
          <template #aside>
            <b-avatar
              size="32"
              :src="data.item.avatar"
              :text="avatarText(data.item.pelanggan.nama)"
              :variant="`light-${resolveClientAvatarVariant(data.item.invoiceStatus)}`"
            />
          </template>
          <span class="font-weight-bold d-block text-nowrap">
            {{ data.item.client.name }}
          </span>
          <small class="text-muted">{{ data.item.client.companyEmail }}</small>
        </b-media>
      </template> -->

      <!-- Column: Issued Date -->
      <template #cell(tanggal_transaksi)="data">
        <span class="text-nowrap">
          {{ this.$moment(data.item.created_at).format('DD MMMM YYYY') }}
        </span>
      </template>

      <!-- Column: Balance -->
      <template #cell(balance)="data">
        <template v-if="data.item.sisa_pembayaran === null || data.item.sisa_pembayaran === 0">
          <b-badge pill variant="light-success">
            Paid
          </b-badge>
        </template>
        <template v-else>
          {{ data.item.sisa_pembayaran }}
        </template>
      </template>

      <!-- Column: Actions -->
      <template #cell(actions)="data">
        <div class="text-nowrap">
          <feather-icon :id="`invoice-row-${data.item.id}-send-icon`" icon="SendIcon" class="cursor-pointer" size="16" />
          <b-tooltip title="Send Invoice" class="cursor-pointer" :target="`invoice-row-${data.item.id}-send-icon`" />

          <feather-icon
            :id="`invoice-row-${data.item.id}-preview-icon`"
            icon="EyeIcon"
            size="16"
            class="mx-1"
            @click="
              $router.push({
                name: 'apps-invoice-preview',
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
            <b-dropdown-item :to="{ name: 'apps-invoice-edit', params: { id: data.item.id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>
            <b-dropdown-item>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
            <b-dropdown-item>
              <feather-icon icon="CopyIcon" />
              <span class="align-middle ml-50">Duplicate</span>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import { ref } from '@vue/composition-api'

import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  // BMedia,
  // BAvatar,
  // BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  // BPagination,
  // BTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    // BMedia,
    // BAvatar,
    // BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    // BPagination,
    // BTooltip,

    vSelect,
  },
  data() {
    return {
      searchQuery: '',
      dataTransaksi: '',
    }
  },
  props: {
    dataBarang: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.loadTransaksi()
  },
  methods: {
    loadTransaksi() {
      store.dispatch('app-barang/fetchListTransaksiByBarang', this.dataBarang.kode_barang).then(res => {
        this.dataTransaksi = res.data
        console.info(this.dataTransaksi)
      })
    },
    formatRupiah(value) {
      return `Rp. ${value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
  },
  setup() {
    const statusOptions = ['Downloaded', 'Draft', 'Paid', 'Partial Payment', 'Past Due']
    const tableColumns = [
      { key: 'id', label: '#', sortable: true },
      { key: 'nomor_transaksi', sortable: true },
      { key: 'nama_pelanggan', sortable: true },
      { key: 'total', sortable: true, formatter: val => `Rp. ${val}` },
      { key: 'tanggal_transaksi', sortable: true },
      { key: 'balance', sortable: true },
      { key: 'actions' },
    ]
    const perPage = ref(10)
    const totalInvoices = ref(0)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)
    const statusFilter = ref(null)

    return { tableColumns, statusOptions, perPage, isSortDirDesc, currentPage, totalInvoices, perPageOptions, sortBy, statusFilter }
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
