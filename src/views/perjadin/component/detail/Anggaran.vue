<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Rincian Anggaran" footer-tag="footer">
        <b-card-body>
          <b-row>
            <b-col>
              <ul v-for="tim in form.susunan_tim" :key="tim.id">
                <li>
                  <span
                    ><b>{{ tim.pegawai.nama }}</b></span
                  >
                  <br />
                  <b-table small :fields="tableCol" :items="[...tim.anggaran]" responsive bordered>
                    <template #cell(uang_harian)="data">
                      <span>{{ formatRupiah(parseFloat(data.item.uang_harian) * parseFloat(data.item.jumlah_hari)) }}</span>
                    </template>
                    <template #cell(uang_hotel)="data">
                      <span>{{ formatRupiah(parseFloat(data.item.uang_hotel) * parseFloat(data.item.jumlah_malam)) }}</span>
                    </template>
                    <template #cell(udara)="data">
                      <span>{{ formatRupiah(data.item.udara) }}</span>
                    </template>
                    <template #cell(laut)="data">
                      <span>{{ formatRupiah(data.item.laut) }}</span>
                    </template>
                    <template #cell(darat)="data">
                      <span>{{ formatRupiah(data.item.darat) }}</span>
                    </template>
                    <template #cell(taksi_jakarta)="data">
                      <span>{{ formatRupiah(data.item.taksi_jakarta) }}</span>
                    </template>
                    <template #cell(taksi_provinsi)="data">
                      <span>{{ formatRupiah(data.item.taksi_provinsi) }}</span>
                    </template>
                    <template #cell(representatif)="data">
                      <span>{{ formatRupiah(data.item.representatif) }}</span>
                    </template>
                    <template #cell(total)="data">
                      <span>{{ formatRupiah(data.item.total) }}</span>
                    </template>
                    <template #cell(actions)="data">
                      <div class="text-nowrap">
                        <feather-icon icon="PrinterIcon" size="24" class="mx-1" @click="detail(data.item.id)" />
                      </div>
                    </template>
                  </b-table>
                </li></ul
            ></b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Total Anggaran" label-cols-md="3">
                <span>{{ formatRupiah(form.total_anggaran) }}</span>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card-body>
        <template #footer>
          <small
            ><em
              >Created By {{ form.user.pegawai.nama }} - {{ form.bidang.nama }} at <strong>{{ $moment(form.created_at).format('DD MMMM YYYY') }}</strong></em
            ></small
          >
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { BCard, BCardBody, BRow, BCol, BTable, BFormGroup } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { formatRupiah } from '@core/utils/filter'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BCardBody,
    BTable,
    BFormGroup,
  },
  directives: {
    Ripple,
  },

  computed: {
    form() {
      return this.$store.getters['app-perjadin/getDetail']
    },
    lampiran_sp() {
      return this.form.lampiran.filter(x => x.jenis === 'SP')
    },
  },
  methods: {
    formatRupiah,
    tambahPegawai() {
      const dataPegawai = {
        nip: null,
        nama: null,
        peran: null,
      }
      const dataRab = {
        jumlah_hari: this.form.umum.jumlah_hari,
        uang_harian: 0,
        jumlah_malam: 0,
        uang_hotel: 0,
        udara: 0,
        laut: 0,
        darat: 0,
        taksi_jakarta: 0,
        taksi_provinsi: 0,
        representatif: 0,
        total: 0,
      }
      this.form.susunan_tim.push(dataPegawai)
      this.form.rencana_anggaran.push(dataRab)
    },
    deletePegawai(i) {
      this.form.susunan_tim.splice(i, 1)
      this.form.rencana_anggaran.splice(i, 1)
    },
  },
  setup() {
    const tableCol = [
      { key: 'uang_harian' },
      { key: 'uang_hotel' },
      { key: 'udara' },
      { key: 'laut' },
      { key: 'darat' },
      { key: 'taksi_jakarta' },
      { key: 'taksi_provinsi' },
      { key: 'representatif' },
      { key: 'total' },
      { key: 'actions' },
    ]
    return {
      tableCol,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
