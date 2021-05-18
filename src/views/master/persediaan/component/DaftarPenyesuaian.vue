<template>
  <section>
    <div class="mb-2">
      <!-- Table Top -->
      <b-row>
        <!-- Per Page -->
        <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
          <label>Data</label>
          <v-select v-model="perPage" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
          <label>Tipe</label>
          <v-select v-model="perPage" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
          <label>Kategori</label>
          <v-select v-model="perPage" :options="perPageOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-1" />
        </b-col>

        <!-- Search -->
        <b-col cols="12" md="6">
          <div class="d-flex align-items-center justify-content-end">
            <b-form-input v-model="searchQuery" class="d-inline-block mr-1" placeholder="Cari data... (Kode Barang, Nama Barang)" />
          </div>
        </b-col>
      </b-row>
    </div>

    <b-table
      ref="refTable"
      responsive
      primary-key="id"
      show-empty
      empty-text="Tidak ada data"
      class="position-relative"
      :items="dataPenyesuaian"
      :fields="tableColumns"
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="isSortDirDesc"
    >
      <template #cell(no)="data">
        <span>
          {{ data.index + 1 }}
        </span>
      </template>

      <!-- Column: tanggal -->
      <template #cell(tanggal)="data">
        <span>
          {{ moment(data.item.created_at) }}
        </span>
      </template>

      <!-- Column: Tipe -->
      <template #cell(tipe)="data">
        <span>
          {{ data.tipe === 0 ? 'Perhitungan Stok' : 'Stok Masuk / Keluar' }}
        </span>
      </template>

      <!-- Column: Kategori -->
      <template #cell(kategori)="data">
        <span>
          {{ kategori(data.item.ketegori) }}
        </span>
      </template>

      <!-- Column: Actions -->
      <template #cell(action)="data">
        <div class="text-nowrap">
          <feather-icon
            icon="EyeIcon"
            size="16"
            class="mx-1"
            @click="
              $router.push({
                name: 'master-persediaan-penyesuaian-detail',
                params: { id: data.item.id },
              })
            "
          />
          <b-dropdown variant="link" toggle-class="p-0" no-caret>
            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>
            <b-dropdown-item>
              <feather-icon icon="PrinterIcon" />
              <span class="align-middle ml-50">Print</span>
            </b-dropdown-item>

            <b-dropdown-item @click="del(data.item.id)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
            <b-dropdown-item>
              <feather-icon icon="ChevronsLeftIcon" />
              <span class="align-middle ml-50">Revert</span>
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
import { BCol, BRow, BTable, BDropdown, BDropdownItem, BPagination, BFormInput } from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'

export default {
  components: {
    BCol,
    BRow,
    BFormInput,
    BDropdown,
    BPagination,
    BDropdownItem,
    BTable,
    vSelect,
  },
  directives: {
    Ripple,
  },
  props: {
    dataPenyesuaian: Array,
  },
  data() {
    return {
      refTable: null,
    }
  },
  watch: {
    searchQuery(query) {
      this.$emit('searchdata', query)
    },
  },
  methods: {
    moment(value) {
      return this.$moment(value).format('DD MMMM YYYY')
    },
    kategori(val) {
      if (val === 0) {
        return 'UMUM'
      }
      if (val === 1) {
        return 'BARANG RUSAK'
      }
      if (val === 2) {
        return 'PRODUKSI'
      }
      return 'KUANTITAS AWAL'
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
      return this.dataPenyesuaian.length
    },
  },
  setup() {
    const tableColumns = [
      { key: 'no', sortable: false },
      { key: 'nomor_opname', sortable: false },
      { key: 'tanggal', sortable: false },
      { key: 'tipe', sortable: false },
      { key: 'kategori', sortable: false },
      { key: 'catatan', sortable: false },
      { key: 'action', sortable: false },
    ]
    const searchQuery = ref('')
    const perPage = ref(10)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]
    const sortBy = ref('id')
    const isSortDirDesc = ref(true)

    return {
      searchQuery,
      tableColumns,
      perPage,
      isSortDirDesc,
      currentPage,
      perPageOptions,
      sortBy,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.per-page-selector {
  width: 90px;
}
</style>
