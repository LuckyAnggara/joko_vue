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
          <b-button variant="primary" :to="{ name: 'master-kontak-tambah' }">
            Tambah Kontak
          </b-button>
        </b-col>

        <!-- Search -->
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="Cari data... ( Nama Kontak )" />
          </div>
        </b-col>
      </b-row>
    </div>

    <b-table
      ref="refTable"
      responsive
      primary-key="id"
      :fields="tableColumns"
      :items="kontak"
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

      <!-- Column: Actions -->
      <template #cell(action)="data">
        <div class="text-nowrap">
          <feather-icon
            :id="`kontak-row-${data.item.id}-detail`"
            icon="EyeIcon"
            size="16"
            class="mx-1"
            @click="
              $router.push({
                name: 'transaksi-penjualan-kontak',
                params: { id: data.item.id },
              })
            "
          />
          <b-tooltip title="Detail" :target="`kontak-row-${data.item.id}-detail`" />

          <b-dropdown variant="link" toggle-class="p-0" no-caret :right="$store.state.appConfig.isRTL">
            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>
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

import { BRow, BCol, BFormInput, BButton, BTable, BPagination, BDropdown, BDropdownItem, BTooltip } from 'bootstrap-vue'
import vSelect from 'vue-select'
// import store from '@/store'

export default {
  components: {
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,

    BPagination,
    BDropdown,
    BDropdownItem,
    BTooltip,
    vSelect,
  },
  data() {
    return {
      kontak: [],
      data: [],
      searchQuery: '',
      refTable: null,
    }
  },
  props: {
    dataKontak: {
      type: Array,
      required: true,
    },
  },
  watch: {
    searchQuery(query) {
      if (query === '') {
        this.kontak = this.data
      } else {
        this.kontak = this.data.filter(item => item.nama.toLowerCase().indexOf(query.toLowerCase()) > -1)
      }
      this.totalData = this.kontak.length
    },
    dataKontak() {
      this.kontak = this.dataKontak
      this.data = this.dataKontak
      this.totalData = this.dataKontak.length
    },
  },
  computed: {
    // kontak() {
    //   return this.dataKontak.filter(item => item.tipe === this.filter)
    // },
    // data() {
    //   return this.dataKontak.filter(item => item.tipe === this.filter)
    // },
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
  },
  setup() {
    const tableColumns = [
      { key: 'id', label: '#', sortable: true },
      { key: 'nama', sortable: true },
      { key: 'telepon', sortable: true },
      { key: 'alamat', sortable: true },
      { key: 'action' },
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

.kontak-filter-select {
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
