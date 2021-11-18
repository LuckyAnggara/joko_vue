<template>
  <b-card title="Penyerapan Anggaran">
    <b-row class="avg-sessions pt-50">
      <b-col cols="12">
        <b-table responsive :fields="tableColumns" :items="dataPenyarapanSemua" foot-clone show-empty empty-text="Tidak ada data" class="position-relative">
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
          <template #cell(bidang)="data">
            <span>
              {{ data.item.nama }}
            </span>
          </template>
          <template #cell(pagu)="data">
            <span>
              {{ formatRupiah(data.item.pagu) }}
            </span>
          </template>
          <template #cell(realisasi)="data">
            <span>
              {{ formatRupiah(data.item.realisasi) }}
            </span>
          </template>
          <template #cell(persentase)="data">
            <span>
              {{
                ((parseFloat(data.item.realisasi) / parseFloat(data.item.pagu)) * 100).toFixed(2) === 'NaN'
                  ? '0.00'
                  : ((parseFloat(data.item.realisasi) / parseFloat(data.item.pagu)) * 100).toFixed(2)
              }}%
            </span>
          </template>
          <template #foot(bidang)>
            <span>Total</span>
          </template>
          <template #foot(pagu)>
            <span>{{ formatRupiah(totalPagu) }}</span>
          </template>
          <template #foot(realisasi)>
            <span>{{ formatRupiah(totalRealisasi) }}</span>
          </template>
          <template #foot(persentase)>
            <span>
              {{
                ((parseFloat(totalRealisasi) / parseFloat(totalPagu)) * 100).toFixed(2) === 'NaN'
                  ? '0.00'
                  : ((parseFloat(totalRealisasi) / parseFloat(totalPagu)) * 100).toFixed(2)
              }}%
            </span>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { BTable, BRow, BCol, BCard } from 'bootstrap-vue'
import { formatRupiah } from '@core/utils/filter'

export default {
  components: {
    BTable,
    BRow,
    BCol,
    BCard,
  },
  computed: {
    dataPenyarapanSemua() {
      return this.$store.getters['app-mak/getPenyerapanSemua']
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
    const tableColumns = [
      { key: 'no', label: 'NO' },
      { key: 'bidang', label: 'Wilayah / Bagian' },
      { key: 'pagu' },
      { key: 'realisasi' },
      { key: 'persentase' },
    ]
    return {
      tableColumns,
    }
  },
}
</script>
