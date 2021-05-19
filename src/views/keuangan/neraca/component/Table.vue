<template>
  <section>
    <b-card :title="title">
      <b-table
        ref="refTable"
        responsive
        :fixed="true"
        :borderless="true"
        :fields="columns"
        :items="dataItem"
        show-empty
        empty-text="Tidak ada data"
        class="position-relative"
        foot-clone
      >
        <!-- Column: Nama Akun -->
        <template #cell(nama)="data">
          <b-link :to="{ name: 'akuntansi-ledger-detail', params: { id: data.item.id } }" class="font-weight-bold">
            {{ data.item.nama }}
          </b-link>
        </template>

        <!-- Column: DEBIT KREDIT SALDO-->
        <template #cell(saldo)="data">
          <span>
            {{ formatRupiah(data.item.saldo) }}
          </span>
        </template>
        <template #foot(nama)>
          <span>Total</span>
        </template>
        <template #foot(saldo)>
          <span class="text-success">{{ formatRupiah(totalSaldo) }}</span>
        </template>
      </b-table>
    </b-card>
  </section>
</template>

<script>
import { BTable, BCard, BLink } from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BCard,
    BLink,
  },
  data() {
    return {
      tahun: '2021',
      option: ['2021', '2022', '2023'],
    }
  },
  props: {
    dataItem: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    totalSaldo() {
      let saldo = 0
      this.dataItem.forEach(x => {
        saldo += parseFloat(x.saldo)
      })
      return saldo
    },
  },
  methods: {
    formatRupiah(value) {
      return `Rp. ${value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
  },
  setup() {
    const columns = [
      { key: 'nama', sortable: false },
      { key: 'saldo', sortable: false },
    ]

    return {
      columns,
    }
  },
}
</script>
