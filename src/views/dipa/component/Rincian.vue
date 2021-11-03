<template>
  <section>
    <b-card>
      <b-table bordered responsive :fields="tableColumns" :items="dataRincian" show-empty empty-text="Tidak ada data" class="position-relative">
        <template #cell(id)="data">
          <span> {{ data.index + 1 }} </span>
        </template>
        <template #cell(nama_kegiatan)="data">
          <span> {{ data.item.jenis === 'perjadin' ? data.item.maksud : data.item.uraian }} </span>
        </template>
        <template #cell(tanggal_kegiatan)="data">
          <span> {{ $moment(data.item.jenis === 'perjadin' ? data.item.tanggal_realisasi_kegiatan : data.item.created_at).format('DD MMMM YYYY') }} </span>
        </template>
        <template #cell(total)="data">
          <span> {{ formatRupiah(data.item.status === 'SELESAI' ? data.item.total_realisasi : data.item.total_anggaran) }} </span>
        </template>
      </b-table>
    </b-card>
  </section>
</template>

<script>
import { formatRupiah } from '@core/utils/filter'

import { BCard, BTable } from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BTable,
  },

  props: {
    dataRincian: Array,
  },

  methods: {
    formatRupiah,
  },
  setup() {
    const tableColumns = [{ key: 'id', label: '#' }, { key: 'nama_kegiatan' }, { key: 'tanggal_kegiatan' }, { key: 'total' }]

    return {
      tableColumns,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
