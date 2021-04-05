<template>
  <b-row>
    <b-col cols="12">
      <b-card>
        <b-card-header class="pb-50">
          <h4>
            Data Persediaan Barang
          </h4>
        </b-card-header>
        <b-card-body>
          <div>
            <!-- search input -->
            <div class="custom-search d-flex justify-content-end">
              <b-form-group>
                <div class="d-flex align-items-center">
                  <label class="mr-1">Search</label>
                  <b-form-input
                    v-model="searchTerm"
                    placeholder="Search"
                    type="text"
                    class="d-inline-block"
                  />
                </div>
              </b-form-group>
            </div>

            <vue-good-table
              :columns="columns"
              :rows="rows"
              :line-numbers="true"
              :search-options="{
                enabled: true,
                externalQuery: searchTerm,
              }"
              :pagination-options="{
                enabled: true,
                perPage: pageLength,
              }"
            >
              <template
                slot="table-row"
                slot-scope="props"
              >
                <!-- Column: Action -->
                <span v-if="props.column.field === 'action'">
                  <div>
                    <b-button
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="primary"
                      class="btn-icon"
                      @click="view(props.row.id)"
                    >
                      <feather-icon icon="EyeIcon" />
                    </b-button>
                  </div>
                </span>

                <!-- Column: Common -->
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
              <!-- pagination -->
              <template
                slot="pagination-bottom"
                slot-scope="props"
              >
                <div class="d-flex justify-content-between flex-wrap">
                  <div class="d-flex align-items-center mb-0 mt-1">
                    <span class="text-nowrap ">
                      Showing 1 to
                    </span>
                    <b-form-select
                      v-model="pageLength"
                      :options="['3', '5', '10']"
                      class="mx-1"
                      @input="
                        value => props.perPageChanged({ currentPerPage: value })
                      "
                    />
                    <span class="text-nowrap">
                      of {{ props.total }} entries
                    </span>
                  </div>
                  <div>
                    <b-pagination
                      :value="1"
                      :total-rows="props.total"
                      :per-page="pageLength"
                      first-number
                      last-number
                      align="right"
                      prev-class="prev-item"
                      next-class="next-item"
                      class="mt-1 mb-0"
                      @input="
                        value => props.pageChanged({ currentPage: value })
                      "
                    >
                      <template #prev-text>
                        <feather-icon
                          icon="ChevronLeftIcon"
                          size="18"
                        />
                      </template>
                      <template #next-text>
                        <feather-icon
                          icon="ChevronRightIcon"
                          size="18"
                        />
                      </template>
                    </b-pagination>
                  </div>
                </div>
              </template>
            </vue-good-table>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import router from '@/router'
import {
  BRow,
  BCol,
  BPagination,
  BFormGroup,
  BFormInput,
  BButton,
  BCard,
  BCardHeader,
  BFormSelect,
  BCardBody,
  // BDropdown,
  // BDropdownItem,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import Ripple from 'vue-ripple-directive'
import store from '@/store'

// import axios from 'axios'

export default {
  components: {
    BRow,
    BCol,
    VueGoodTable,
    BPagination,
    BFormGroup,
    BFormInput,
    BButton,
    BFormSelect,
    // BDropdown,
    // BDropdownItem,
    BCard,
    BCardHeader,
    BCardBody,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      pageLength: 5,
      dir: false,
      columns: [
        {
          label: 'Kode Barang',
          field: 'kode_barang',
        },
        {
          label: 'Nama Barang',
          field: 'nama',
        },
        {
          label: 'Saldo Masuk',
          field: 'persediaan.saldo_masuk',
          formatFn: this.formatFn,
        },
        {
          label: 'Saldo Keluar',
          field: 'persediaan.saldo_keluar',
          formatFn: this.formatFn,
        },
        {
          label: 'Saldo Akhir',
          field: 'persediaan.saldo_akhir',
          formatFn: this.formatFn,
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [],
      searchTerm: '',
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    view(id) {
      // store
      //   .dispatch('app-persediaan/fetchDetailPersediaan', {
      //     id,
      //   })
      //   .then(res => {
      //     store.commit('app-persediaan/SET_LIST_DETAIL_PERSEDIAAN', res.data)
      //   })
      router.push({ name: 'screen-persediaan-detail', params: { id } })
    },
    formatFn(value) {
      if (value === null || value === 0) {
        return '-'
      }
      return value
    },
    loadData() {
      store.dispatch('app-persediaan/fetchListPersediaan').then(res => {
        store.commit('app-persediaan/SET_LIST_PERSEDIAAN', res.data)
        this.rows = store.getters['app-persediaan/getListPersediaan']
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
