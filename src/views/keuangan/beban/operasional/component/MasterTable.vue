<template>
  <section>
    <b-table
      ref="refTable"
      responsive
      :fields="tableColumns"
      :items="dataList"
      :current-page="currentPage"
      show-empty
      empty-text="Tidak ada data"
      class="position-relative"
    >
      <!-- Column: Nama Akun -->
      <template #cell(nama_akun)="data">
        <b-link :to="{ name: 'akuntansi-ledger-detail', params: { id: data.item.id } }" class="font-weight-bold">
          {{ data.item.kode_akun + ' || ' + data.item.nama }}
        </b-link>
      </template>

      <!-- Column: Nama Akun -->
      <template #cell(saldo)="data">
        <span>{{ formatRupiah(data.item.saldo) }}</span>
      </template>
    </b-table>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BLink, BTable } from 'bootstrap-vue'

export default {
  components: {
    BLink,
    BTable,
  },
  props: {
    dataList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    formatRupiah(value) {
      return `Rp. ${value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
  },
  setup() {
    const tableColumns = [
      { key: 'nama_akun', sortable: false },
      {
        key: 'saldo',
      },
    ]

    // const searchQuery = ref('')
    const currentPage = ref(1)
    const isSortDirDesc = ref(false)

    return {
      tableColumns,
      isSortDirDesc,
      currentPage,
    }
  },
}
</script>
<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-select.scss';
.per-page-selector {
  width: 90px;
}
</style>
