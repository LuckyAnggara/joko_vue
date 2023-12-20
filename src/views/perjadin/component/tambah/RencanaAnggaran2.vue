<template>
  <!-- <b-row class="match-height"> -->

  <b-row class="match-height">
    <b-col lg="12" sm="12">
      <b-card-body>
        <b-row>
          <b-col cols="9">
            <b-form-group label="Mata Anggaran Kegiatan" label-cols-md="4">
              <template v-if="form.tahun === null ? false : true">
                <v-select v-model="form.umum.mak" placeholder="Mata Anggaran Kegiatan" label="kode" :options="makOption">
                  <template v-slot:option="option"> {{ option.kode }} - {{ option.nama }} </template>
                </v-select>
              </template>
              <template v-else>
                <span class="text-danger">Tahun Anggaran belum di Pilih</span>
              </template>
            </b-form-group>
          </b-col>
        </b-row>

        <hr />
        <b-row>
          <b-table small :fields="tableRAB" :items="form.rencana_anggaran" responsive bordered :sticky-header="stickyHeader" :no-border-collapse="noCollapse">
            <template #thead-top>
              <b-tr>
                <b-th class="text-center" sticky-column style="width:10%"></b-th>
                <b-th class="text-center" colspan="2" style="width:15%">Uang Harian</b-th>
                <b-th class="text-center" colspan="2" style="width:15%">Hotel</b-th>
                <b-th class="text-center" colspan="5" style="width:40%">Biaya</b-th>
                <b-th class="text-center" style="width:10%"></b-th>
                <b-th class="text-center" style="width:10%"></b-th>
              </b-tr>
            </template>
            <template #table-colgroup="scope">
              <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.size === 'sm' ? '5%' : '' }" />
            </template>
            <template #cell(nama_pegawai)="data">
              <b-form-input v-model="form.susunan_tim[data.index].pegawai.nama" size="sm" plaintext />
            </template>
            <template #cell(hari)="data">
              <b-form-input v-model="data.item.jumlah_hari" size="sm" type="number" />
            </template>
            <template #cell(uang_harian)="data">
              <b-form-input v-model="data.item.uang_harian" size="sm" type="number" />
            </template>
            <template #cell(malam)="data">
              <b-form-input v-model="data.item.jumlah_malam" size="sm" type="number" />
            </template>

            <template #cell(uang_hotel)="data">
              <b-form-input v-model="data.item.uang_hotel" size="sm" type="number" />
            </template>

            <template #cell(udara)="data">
              <b-form-input v-model="data.item.udara" size="sm" type="number" />
            </template>

            <template #cell(laut)="data">
              <b-form-input v-model="data.item.laut" size="sm" type="number" />
            </template>

            <template #cell(darat)="data">
              <b-form-input v-model="data.item.darat" size="sm" type="number" />
            </template>

            <template #cell(taksi_jakarta)="data">
              <b-form-input v-model="data.item.taksi_jakarta" size="sm" type="number" />
            </template>
            <template #cell(taksi_provinsi)="data">
              <b-form-input v-model="data.item.taksi_provinsi" size="sm" type="number" />
            </template>
            <template #cell(representatif)="data">
              <b-form-input v-model="data.item.representatif" size="sm" type="number" />
            </template>
            <template #cell(total)="data">
              {{ formatRupiah(total(data.item, data.index)) }}
            </template>
          </b-table>
        </b-row>
        <hr />

        <b-row v-if="form.umum.mak != null ? true : false">
          <b-col cols="9">
            <b-form-group label="Nama Mata Anggaran" label-cols-md="2">
              <b-form-input plaintext :value="form.umum.mak === null ? '' : `${form.umum.mak.kode} - ${form.umum.mak.nama}`" placeholder="Nama MAK" />
            </b-form-group>
            <b-form-group label="DIPA" label-cols-md="2">
              <b-form-input plaintext :value="form.umum.mak === null ? 'Rp. 0' : formatRupiah(form.umum.mak.dipa)" placeholder="Rp.0" />
            </b-form-group>
            <b-form-group label="Saldo Tersedia" label-cols-md="2">
              <b-form-input
                plaintext
                :value="form.umum.mak === null ? 'Rp. 0' : formatRupiah(parseFloat(form.umum.mak.dipa) - parseFloat(form.umum.mak.realisasi))"
                placeholder="Rp.0"
              />
            </b-form-group>
            <b-form-group label="Pemakaian Kegiatan ini" label-cols-md="2">
              <b-form-input plaintext :value="formatRupiah(grandTotal)" placeholder="Rp.0" class="text-primary font-weight-bolder" />
              <hr />
            </b-form-group>
            <b-form-group label="Sisa Saldo Terkini" label-cols-md="2">
              <b-form-input
                plaintext
                :value="formatRupiah(sisa)"
                :class="sisa < 0 ? 'text-danger font-weight-bolder' : 'text-success font-weight-bolder'"
                placeholder="Rp.0"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-card-body>
    </b-col>
  </b-row>
</template>

<script>
import {
  BCardBody,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BTable,
  // BTableSimple,
  // BThead,
  // BTbody,
  BTr,
  BTh,
  // BTd,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { formatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BCardBody,
    BFormGroup,
    BFormInput,
    BTable,
    BTr,
    BTh,
    vSelect,
  },
  computed: {
    makOption() {
      return this.$store.getters['app-general/getMak']
    },
    grandTotal() {
      let total = 0
      this.form.rencana_anggaran.forEach(x => {
        total += parseFloat(x.total)
      })
      return total
    },
    // grandTotal() {
    //   let total = 0
    //   this.form.rencana_anggaran.forEach(x => {
    //     total += x.total
    //   })
    //   this.form.umum.total_anggaran = total
    //   return total
    // },
    sisa() {
      const a = parseFloat(this.form.umum.mak.dipa) - parseFloat(this.form.umum.mak.realisasi)
      return a - this.grandTotal
    },
  },
  directives: {
    Ripple,
  },
  methods: {
    formatRupiah,
    total(a, i) {
      // return 0
      const uangHarian = a.jumlah_hari * a.uang_harian
      const hotel = a.jumlah_malam * a.uang_hotel
      const biaya = parseFloat(a.laut) + parseFloat(a.darat) + parseFloat(a.udara)
      const taksi = parseFloat(a.taksi_jakarta) + parseFloat(a.taksi_provinsi)
      const total = uangHarian + hotel + biaya + taksi + parseFloat(a.representatif)

      this.form.rencana_anggaran[i].total = total
      return total
    },
  },
  setup() {
    const stickyHeader = true
    const noCollapse = false
    const tableRAB = [
      { key: 'nama_pegawai', label: null, stickyColumn: true, isRowHeader: true, variant: 'primary' },
      { key: 'hari', size: 'sm' },
      { key: 'uang_harian', label: 'Rp.' },
      { key: 'malam', size: 'sm' },
      { key: 'uang_hotel', label: 'Rp.' },
      { key: 'udara' },
      { key: 'laut' },
      { key: 'darat' },
      { key: 'taksi_jakarta' },
      { key: 'taksi_provinsi' },
      { key: 'representatif' },
      { key: 'total', variant: 'success' },
    ]
    return {
      stickyHeader,
      noCollapse,
      tableRAB,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
