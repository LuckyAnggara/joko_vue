<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Susunan Tim" footer-tag="footer">
        <b-card-body>
          <b-row>
            <b-col>
              <ul v-for="(tim, index) in form.susunan_tim" :key="tim.id">
                <li class="mb-1">
                  <span
                    ><b>{{ tim.pegawai.nama }}</b></span
                  >
                  - <span>{{ tim.peran.nama }}</span> -
                  <span>
                    <feather-icon :id="`spd-${index}`" icon="PrinterIcon" size="24" class="mx-1" @click="print_spd(data.item.id)" />
                    <b-tooltip :target="`spd-${index}`" noninteractive>Print SPD</b-tooltip>
                  </span>
                </li>
              </ul></b-col
            >
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
import {
  BTooltip,
  BCard,
  BCardBody,
  BRow,
  BCol,
  // BTable,
  // BButton,
  // BFormInput,
  // BFormGroup,
} from 'bootstrap-vue'
// import vSelect from 'vue-select'
// import Ripple from 'vue-ripple-directive'
import { formatRupiah } from '@core/utils/filter'

export default {
  components: {
    BTooltip,

    BCard,
    BRow,
    BCol,
    BCardBody,
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
