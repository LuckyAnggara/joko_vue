<template>
  <b-row>
    <b-col cols="12">
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
          :items="dataPersediaan"
          :fields="tableColumns"
          :current-page="currentPage"
          :per-page="perPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="isSortDirDesc"
        >
          <!-- Column: Nomor -->
          <template #cell(no)="data">
            <span>
              {{ data.index + 1 }}
            </span>
          </template>

          <!-- Column: DEBIT KREDIT SALDO-->
          <template #cell(debit)="data">
            <span>
              {{ data.item.persediaan.saldo_masuk ? data.item.persediaan.saldo_masuk : '-' }}
            </span>
          </template>

          <template #cell(kredit)="data">
            <span>
              {{ data.item.persediaan.saldo_keluar ? data.item.persediaan.saldo_keluar : '-' }}
            </span>
          </template>

          <template #cell(saldo)="data">
            <span>
              {{ data.item.persediaan.saldo ? data.item.persediaan.saldo : '-' }}
            </span>
          </template>
          <!-- Column: Actions -->
          <template #cell(actions)="data">
            <div class="text-nowrap">
              <feather-icon
                icon="EyeIcon"
                size="16"
                class="mx-1"
                @click="
                  $router.push({
                    name: 'master-persediaan-detail',
                    params: { id: data.item.id },
                  })
                "
              />
              <b-dropdown variant="link" toggle-class="p-0" no-caret :right="$store.state.appConfig.isRTL">
                <template #button-content>
                  <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                </template>
                <b-dropdown-item>
                  <feather-icon icon="TrashIcon" @click="remove(data.index)" />
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
</template>

<script>
import { ref } from '@vue/composition-api'
import {
  BRow,
  BCol,
  BTable,
  BPagination,
  BFormInput,
  BDropdown,
  BDropdownItem,
  // BButton,
  BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import vSelect from 'vue-select'

// import axios from 'axios'

export default {
  components: {
    BRow,
    BCol,
    BTable,
    BDropdown,
    BDropdownItem,
    BPagination,
    BFormInput,
    // BButton,
    BCard,
    vSelect,
  },
  directives: {
    Ripple,
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
      dataPersediaan: [],
      totalData: 0,
    }
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
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      store.dispatch('app-persediaan/fetchListPersediaan').then(res => {
        store.commit('app-persediaan/SET_LIST_PERSEDIAAN', res.data)

        this.dataPersediaan = store.getters['app-persediaan/getListPersediaan'].filter(x => x.persediaan.saldo !== 0)
      })
    },
  },
  setup() {
    const tableColumns = [
      { key: 'no', sortable: true },
      { key: 'kode_barang', sortable: true },
      { label: 'Nama Barang', key: 'nama', sortable: true },
      { label: 'debit', key: 'debit', sortable: true },
      { label: 'kredit', key: 'kredit', sortable: true },
      { label: 'saldo', key: 'saldo', sortable: true },
      { label: 'actions', key: 'actions', sortable: true },
    ]
    const perPage = ref(10)

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
      perPageOptions,
      sortBy,
      statusFilter,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
