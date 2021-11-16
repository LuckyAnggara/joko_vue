<template>
  <!-- <b-row class="match-height"> -->
  <section>
    <b-row>
      <b-col lg="4" sm="12">
        <b-card title="Pembelian Barang">
          <b-row>
            <b-col cols="12">
              <b-form-group label="Nomor Invoice" label-cols-md="3">
                <b-form-input v-model="form.no_invoice" type="text" placeholder="Nomor Invoice" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tanggal Invoice" label-cols-md="3">
                <b-form-input v-model="form.tanggal_invoice" placeholder="Tanggal Invoice" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Nama Supplier" label-cols-md="3">
                <b-form-input v-model="form.nama_supplier" type="text" placeholder="Nama Supplier" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Keterangan" label-cols-md="3">
                <b-form-textarea v-model="form.keterangan" type="text" placeholder="Keterangan" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Lampiran" label-cols-md="3">
                <ol>
                  <li v-for="item in form.lampiran" :key="item.id">
                    <b-link :href="urlGet(item.id, 'barang')" class="font-weight-bold" target="_blank"> {{ item.nama }} </b-link>
                  </li>
                </ol>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="8" sm="12">
        <b-card title="Detail Pembelian">
          <b-table
            ref="refTable"
            small
            responsive
            :fields="tableColumns"
            :items="form.data_barang"
            show-empty
            empty-text="Tidak ada data"
            class="position-relative"
          >
            <template #cell(no)="data">
              <span>
                {{ data.index + 1 }}
              </span>
            </template>

            <template #cell(nama)="data">
              <span>
                {{ data.item.barang.nama }}
              </span>
            </template>

            <template #cell(satuan)="data">
              <span>
                {{ data.item.barang.satuan }}
              </span>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BLink, BFormTextarea, BTable, BCard, BRow, BCol, BFormInput, BFormGroup } from 'bootstrap-vue'
import { urlGet } from '@core/utils/filter'

export default {
  components: {
    BLink,
    BFormTextarea,
    BTable,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
  },
  computed: {
    form() {
      return this.$store.getters['app-barang/getDetailPembelian']
    },
  },
  methods: {
    urlGet,
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const tableColumns = [{ key: 'no', label: '#' }, { key: 'nama', label: 'NAMA BARANG' }, { key: 'satuan' }, { key: 'jumlah' }]

    return {
      tableColumns,
      userData,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
