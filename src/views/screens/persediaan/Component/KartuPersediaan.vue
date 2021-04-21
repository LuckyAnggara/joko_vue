<template>
  <b-row>
    <b-col cols="12">
      <b-card>
        <b-card-header class="pb-50">
          <h4>
            Kartu Persediaan
          </h4>
        </b-card-header>
        <b-card-body>
          <div>
            <!-- search input -->
            <div class="custom-search d-flex justify-content-end">
              <b-form-group>
                <div class="d-flex align-items-center">
                  <label class="mr-1">Search</label>
                  <b-form-input v-model="searchTerm" placeholder="Search" type="text" class="d-inline-block" />
                </div>
              </b-form-group>
            </div>

            <vue-good-table
              :columns="columns"
              :rows="dataPersediaan"
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
              <template slot="table-row" slot-scope="props">
                <!-- Column: Action -->
                <span v-if="props.column.field === 'action'">
                  <div>
                    <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="primary" class="btn-icon" @click="view(props.row.id)">
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
              <template slot="pagination-bottom" slot-scope="props">
                <div class="d-flex justify-content-between flex-wrap">
                  <div class="d-flex align-items-center mb-0 mt-1">
                    <span class="text-nowrap ">
                      Showing 1 to
                    </span>
                    <b-form-select
                      v-model="pageLength"
                      :options="['3', '5', '10']"
                      class="mx-1"
                      @input="value => props.perPageChanged({ currentPerPage: value })"
                    />
                    <span class="text-nowrap"> of {{ props.total }} entries </span>
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
                      @input="value => props.pageChanged({ currentPage: value })"
                    >
                      <template #prev-text>
                        <feather-icon icon="ChevronLeftIcon" size="18" />
                      </template>
                      <template #next-text>
                        <feather-icon icon="ChevronRightIcon" size="18" />
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
import { BRow, BCol, BPagination, BFormGroup, BFormInput, BButton, BCard, BCardHeader, BFormSelect, BCardBody } from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import Ripple from 'vue-ripple-directive'
// import store from '@/store'

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
    BCard,
    BCardHeader,
    BCardBody,
  },
  directives: {
    Ripple,
  },
  props: {
    dataPersediaan: Array,
  },
  data() {
    return {
      pageLength: 5,
      dir: false,
      columns: [
        {
          label: 'Tanggal Transaksi',
          field: 'tanggal_transaksi',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd HH:mm:ss', // expects 2018-03-16
          dateOutputFormat: 'd MMM yyyy | HH:mm', // outputs Mar 16th 2018
        },
        {
          label: 'Nomor Transaksi',
          field: 'nomor_transaksi',
        },
        {
          label: 'Debit',
          field: 'debit',
          formatFn: this.formatFn,
        },
        {
          label: 'Kredit',
          field: 'kredit',
          formatFn: this.formatFn,
        },
        {
          label: 'Saldo',
          field: 'saldo',
          formatFn: this.formatFn,
        },
        {
          label: 'Keterangan',
          field: 'keterangan',
        },
      ],
      // rows: [],
      searchTerm: '',
    }
  },

  methods: {
    formatFn(value) {
      if (value === null || value === 0) {
        return '-'
      }
      return value
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
