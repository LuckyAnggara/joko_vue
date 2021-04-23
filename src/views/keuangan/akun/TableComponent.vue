<template>
  <section>
    <b-card-body :title="header.nama">
      <div class="d-flex mb-2">
        <span> Saldo : {{ formatRupiah(header.saldo) }} </span>
      </div>
      <b-table
        ref="refTable"
        responsive
        primary-key="id"
        :fields="tableColumns"
        :items="dataTable"
        show-empty
        empty-text="Tidak ada data"
        class="position-relative"
      >
        <!-- Column: Tanggal -->
        <template #cell(no)="data">
          <span>
            {{ data.index + 1 }}
          </span>
        </template>

        <!-- Column: Kode Akun -->
        <template #cell(kode_akun)="data">
          <b-link :to="{ name: 'akuntansi-ledger-detail', params: { id: data.item.id } }" class="font-weight-bold">
            {{ data.item.kode_akun }}
          </b-link>
        </template>

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
      </b-table>
    </b-card-body>
  </section>
</template>

<script>
import { BCardBody, BTable, BLink } from 'bootstrap-vue'

export default {
  components: {
    BCardBody,
    BTable,
    BLink,
  },

  props: {
    dataTable: {
      type: Array,
      required: true,
    },
    header: {
      type: Object,
      required: true,
    },
  },

  methods: {
    formatRupiah(value) {
      return `Rp. ${value.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
  },

  setup() {
    const tableColumns = [
      { key: 'no', sortable: true },
      { key: 'kode_akun', sortable: true },
      { label: 'nama akun', key: 'nama', sortable: true },
      { label: 'sifat', key: 'saldo_normal', sortable: true },
      { label: 'saldo', key: 'saldo', sortable: true },
    ]

    return {
      tableColumns,
    }
  },
}
</script>
