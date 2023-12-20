<template>
  <!-- <b-row class="match-height"> -->

  <b-row class="match-height">
    <b-col lg="12" sm="12">
      <b-card-body>
        <b-row>
          <b-col cols="12">
            <b-form-group label="Tahun Anggaran" label-cols-md="3">
              <b-form-input :value="perjadinStore.form.tahun" readonly />
            </b-form-group>
            <b-form-group label="Mata Anggaran Kegiatan" label-cols-md="3">
              <template v-if="perjadinStore.form.tahun === null ? false : true">
                <v-select v-model="perjadinStore.form.umum.mak" placeholder="Mata Anggaran Kegiatan" label="kode" :options="makOption">
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
        <b-row v-for="(tim, index) in perjadinStore.form.susunan_tim" :key="tim.id" class="mb-2">
          <b-col cols="3" lg="3" md="3" sm="12">
            <h5 class="mt-2">{{ tim.pegawai.nama }}</h5>
            <!-- <b-form-input :value="tim.pegawai.nama" plaintext /> -->
          </b-col>
          <b-col cols="3" lg="3" md="3" sm="12">
            <b-form-group label="Tanggal Berangkat">
              <b-form-datepicker
                boundary="window"
                locale="id"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                v-model="perjadinStore.form.rencana_anggaran[index].tanggal_berangkat"
                :max="perjadinStore.form.rencana_anggaran[index].tanggal_kembali"
                size="sm"
                placeholder="-"
              />
            </b-form-group>
          </b-col>
          <b-col cols="3" lg="3" md="3" sm="12">
            <b-form-group label="Tanggal Berangkat">
              <b-form-datepicker
                boundary="window"
                locale="id"
                :min="perjadinStore.form.rencana_anggaran[index].tanggal_berangkat"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                v-model="perjadinStore.form.rencana_anggaran[index].tanggal_kembali"
                size="sm"
                placeholder="-"
              />
            </b-form-group>
          </b-col>
          <b-col cols="12" lg="12" md="12" sm="12">
            <b-table small :fields="tableRAB" :items="[...perjadinStore.form.rencana_anggaran[index]]" bordered responsive>
              <template #thead-top>
                <b-tr>
                  <!-- <b-th class="text-center" colspan="2" style="width:15%">Tanggal</b-th> -->
                  <b-th class="text-center" colspan="2" style="width:12%">Uang Harian</b-th>
                  <b-th class="text-center" colspan="2" style="width:12%">Hotel</b-th>
                  <b-th class="text-center" colspan="5" style="width:36%">Biaya</b-th>
                  <b-th class="text-center" style="width:10%"></b-th>
                  <b-th class="text-center" style="width:10%"></b-th>
                </b-tr>
              </template>
              <template #table-colgroup="scope">
                <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.size === 'sm' ? '4%' : '' }" />
              </template>

              <template #cell(hari)>
                <b-form-input v-model="perjadinStore.form.rencana_anggaran[index].jumlah_hari" size="sm" type="number" />
              </template>
              <template #cell(uang_harian)>
                <b-form-input v-model="perjadinStore.form.rencana_anggaran[index].uang_harian" size="sm" type="number" />
              </template>
              <template #cell(malam)>
                <b-form-input v-model="perjadinStore.form.rencana_anggaran[index].jumlah_malam" size="sm" type="number" />
              </template>

              <template #cell(uang_hotel)>
                <b-form-input v-model="perjadinStore.form.rencana_anggaran[index].uang_hotel" size="sm" type="number" />
              </template>

              <template #cell(udara)>
                <b-form-input v-model="perjadinStore.form.rencana_anggaran[index].udara" size="sm" type="number" />
              </template>

              <template #cell(laut)>
                <b-form-input v-model="perjadinStore.form.rencana_anggaran[index].laut" size="sm" type="number" />
              </template>

              <template #cell(darat)>
                <b-form-input v-model="perjadinStore.form.rencana_anggaran[index].darat" size="sm" type="number" />
              </template>

              <template #cell(taksi_jakarta)>
                <b-form-input v-model="perjadinStore.form.rencana_anggaran[index].taksi_jakarta" size="sm" type="number" />
              </template>
              <template #cell(taksi_provinsi)>
                <b-form-input v-model="perjadinStore.form.rencana_anggaran[index].taksi_provinsi" size="sm" type="number" />
              </template>
              <template #cell(representatif)>
                <b-form-input v-model="perjadinStore.form.rencana_anggaran[index].representatif" size="sm" type="number" />
              </template>
              <template #cell(total)>
                {{ formatRupiah(total(perjadinStore.form.rencana_anggaran[index], index)) }}
              </template>
            </b-table>
          </b-col>
        </b-row>
        <hr />

        <b-row v-if="perjadinStore.form.umum.mak != null ? true : false">
          <b-col cols="12">
            <b-form-group label="Nama Mata Anggaran" label-cols-md="3">
              <b-form-input
                readonly
                :value="perjadinStore.form.umum.mak === null ? '' : `${perjadinStore.form.umum.mak.kode} - ${perjadinStore.form.umum.mak.nama}`"
                placeholder="Nama MAK"
              />
            </b-form-group>
            <b-form-group label="DIPA" label-cols-md="3">
              <b-form-input
                readonly
                :value="perjadinStore.form.umum.mak === null ? 'Rp. 0' : formatRupiah(perjadinStore.form.umum.mak.pagu)"
                placeholder="Rp.0"
              />
            </b-form-group>
            <b-form-group label="Saldo Tersedia" label-cols-md="3">
              <b-form-input
                readonly
                :value="
                  perjadinStore.form.umum.mak === null
                    ? 'Rp. 0'
                    : formatRupiah(parseFloat(perjadinStore.form.umum.mak.pagu) - parseFloat(perjadinStore.form.umum.mak.realisasi))
                "
                placeholder="Rp.0"
              />
            </b-form-group>
            <b-form-group label="Pemakaian Kegiatan ini" label-cols-md="3">
              <b-form-input readonly :value="formatRupiah(grandTotal)" placeholder="Rp.0" class="text-primary font-weight-bolder" />
              <hr />
            </b-form-group>
            <b-form-group label="Sisa Saldo Setelah Kegiatan" label-cols-md="3">
              <b-form-input
                readonly
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
import { BFormDatepicker, BCardBody, BRow, BCol, BFormGroup, BFormInput, BTable, BTr, BTh } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import usePerjadinStore from '@/store/pinia/perjadinStore'

import { formatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
    BFormDatepicker,
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
      this.perjadinStore.form.rencana_anggaran.forEach(x => {
        total += parseFloat(x.total)
      })
      return total
    },
    sisa() {
      const a = parseFloat(this.perjadinStore.form.umum.mak.pagu) - parseFloat(this.perjadinStore.form.umum.mak.realisasi)
      return a - this.grandTotal
    },
  },
  props: {
    form: Object,
  },
  directives: {
    Ripple,
  },
  methods: {
    formatRupiah,
    total(a, i) {
      const uangHarian = a.jumlah_hari * a.uang_harian
      const hotel = a.jumlah_malam * a.uang_hotel
      const biaya = parseFloat(a.laut) + parseFloat(a.darat) + parseFloat(a.udara)
      const taksi = parseFloat(a.taksi_jakarta) + parseFloat(a.taksi_provinsi)
      const total = uangHarian + hotel + biaya + taksi + parseFloat(a.representatif)
      this.perjadinStore.form.rencana_anggaran[i].total = total
      return total
    },
  },
  setup() {
    const perjadinStore = usePerjadinStore()
    const stickyHeader = true
    const noCollapse = false
    const tableRAB = [
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
      { key: 'total' },
    ]
    return {
      perjadinStore,
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
