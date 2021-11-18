<template>
  <b-card title="Rencana Kegiatan">
    <b-row class="avg-sessions pt-50">
      <b-col cols="12">
        <b-table
          ref="table"
          :current-page="currentPage"
          :per-page="perPage"
          small
          responsive
          :fields="tableColumns"
          :items="dataMak"
          foot-clone
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
          <template #cell(no)="data">
            <span>
              {{ data.index + 1 }}
            </span>
          </template>
          <template #cell(nama_kegiatan)="data">
            <span>
              {{ data.item.uraian === undefined ? data.item.maksud : data.item.uraian }}
            </span>
          </template>
          <template #cell(anggaran)="data">
            <span>
              {{ formatRupiah(data.item.total_anggaran) }}
            </span>
          </template>
          <template #cell(tanggal_pelaksanaan)="data">
            <span>
              {{
                data.item.tanggal_rencana_kegiatan === undefined
                  ? $moment(data.item.tanggal_berangkat).format('DD-MMMM-YYYY')
                  : $moment(data.item.tanggal_rencana_kegiatan).format('DD-MM-YYYY')
              }}
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
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BTable, BRow, BCol, BCard, BPagination } from 'bootstrap-vue'
import { formatRupiah } from '@core/utils/filter'

export default {
  components: {
    BTable,
    BRow,
    BCol,
    BCard,
    BPagination,
  },
  computed: {
    dataMak() {
      const rincian = []
      const b = this.$store.getters['app-mak/getMak']
      b.forEach(x => {
        rincian.push(...x.rincian.filter(y => y.status !== 'SELESAI'))
      })
      return rincian
    },
    dataMeta() {
      const localItemsCount = this.$refs.table ? this.$refs.table.computedItems.length : 0
      return {
        from: this.perPage * (this.currentPage - 1) + (localItemsCount ? 1 : 0),
        to: this.perPage * (this.currentPage - 1) + localItemsCount,
        of: this.totalData,
      }
    },
    totalData() {
      return this.dataMak.length
    },

    totalPagu() {
      let total = 0
      this.dataPenyarapanSemua.forEach(x => {
        total += x.pagu
      })
      return total
    },
    totalRealisasi() {
      let total = 0
      this.dataPenyarapanSemua.forEach(x => {
        total += x.realisasi
      })
      return total
    },
  },
  methods: {
    formatRupiah,
  },
  setup() {
    const perPage = ref(10)
    const currentPage = ref(1)
    const tableColumns = [{ key: 'no', label: 'NO' }, { key: 'nama_kegiatan' }, { key: 'tanggal_pelaksanaan' }, { key: 'anggaran' }, { key: 'status' }]
    return {
      perPage,
      currentPage,
      tableColumns,
    }
  },
}
</script>
