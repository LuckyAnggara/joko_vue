<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Rincian Anggaran" footer-tag="footer">
        <b-card-body>
          <b-row v-for="tim in form.susunan_tim" :key="tim.id">
            <b-col cols="3" lg="3" md="3" sm="12">
              <h5 class="mt-2">{{ tim.pegawai.nama }}</h5>
              <!-- <b-form-input :value="tim.pegawai.nama" plaintext /> -->
            </b-col>
            <b-col cols="6" lg="6" md="6" sm="12">
              <p class="mt-2">
                {{ $moment(tim.anggaran.tanggal_berangkat).format('DD MMMM YYYY') }} - {{ $moment(tim.anggaran.tanggal_kembali).format('DD MMMM YYYY') }}
              </p>
            </b-col>

            <b-col cols="12" lg="12" md="12" sm="12">
              <b-table small :fields="tableCol" :items="[...tim.anggaran]" responsive bordered>
                <template #cell(hari)="data">
                  <span>{{ data.item.jumlah_hari }}</span>
                </template>
                <template #cell(uang_harian)="data">
                  <span>{{ formatRupiah(data.item.uang_harian) }}</span>
                </template>
                <template #cell(malam)="data">
                  <span>{{ data.item.jumlah_malam }}</span>
                </template>
                <template #cell(uang_hotel)="data">
                  <span>{{ formatRupiah(data.item.uang_hotel) }}</span>
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
            </b-col>
          </b-row>
          <hr />
          <b-row class="mt-2">
            <b-col cols="3">
              <h4>Total Anggaran</h4>
            </b-col>
            <b-col cols="3">
              <h4>{{ formatRupiah(form.total_anggaran) }}</h4>
            </b-col>
          </b-row>
          <b-row class="mt-2" v-if="form.status !== 'PENGAJUAN' && (userData.role === 'ADMIN KEUANGAN' || userData.role === 'VERIFIKATOR PPK')">
            <b-col cols="12">
              <b-button variant="outline-primary" @click="printRab"> Print RAB </b-button>
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
import { BButton, BCard, BCardBody, BRow, BCol, BTable } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { formatRupiah } from '@core/utils/filter'

export default {
  components: {
    BButton,
    BCard,
    BRow,
    BCol,
    BCardBody,
    BTable,
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
    printRab() {
      this.$swal({
        title: 'Opss!',
        text: 'Fitur ini belum tersedia',
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    },
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const tableCol = [
      { key: 'hari' },
      { key: 'uang_harian' },
      { key: 'malam' },
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
      userData,
      tableCol,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
