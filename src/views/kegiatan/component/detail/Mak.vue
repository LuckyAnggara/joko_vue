<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Mata Anggaran Kegiatan" footer-tag="footer">
        <b-card-body>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Kode Anggaran Kegiatan" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="data.mak.kode" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Mata Anggaran Kegiatan" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="data.mak.nama" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Pagu" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(data.mak.pagu)" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Realisasi" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(data.mak.saldo.realisasi)" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <!-- <b-col cols="12">
              <b-form-group label="Sisa Saldo" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(sisa_saldo)" placeholder="-" readonly />
                <b-button
                  variant="outline-primary"
                  class="mt-1"
                  @click="showModalLampiran()"
                  v-if="data.status !== 'RENCANA' && (userData.role === 'ADMIN KEUANGAN' || userData.role === 'PPK')"
                >
                  Cek Daftar
                </b-button>
              </b-form-group>

              <hr />
            </b-col> -->
          </b-row>
          <hr />

          <b-row>
            <b-col cols="12">
              <b-form-group label="Untuk Kegiatan Ini" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(data.total_anggaran)" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Sisa Saldo Perkiraan" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(sisa_saldo_perkiraan)" placeholder="-" readonly />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-2" v-if="data.status !== 'PENGAJUAN' && (userData.role === 'ADMIN KEUANGAN' || userData.role === 'VERIFIKATOR PPK')">
            <b-col cols="12">
              <b-button variant="outline-primary" @click="showModalMak()"> Cek MAK </b-button>
            </b-col>

            <b-col cols="12">
              <small>Cek Daftar MAK pada {{ data.bidang.nama }}</small>
            </b-col>
          </b-row>
        </b-card-body>
        <template #footer>
          <small
            ><em
              >Created By {{ data.user.pegawai.nama }} - {{ data.bidang.nama }} at <strong>{{ $moment(data.created_at).format('DD MMMM YYYY') }}</strong></em
            ></small
          >
        </template>
      </b-card>
    </b-col>
    <daftar-mak :tahun="data.tahun" :bidang="data.bidang" />
  </b-row>
</template>

<script>
// import { ref } from '@vue/composition-api'
import {
  BButton,
  BCard,
  BCardBody,
  BRow,
  BCol,
  BFormInput,
  BFormGroup,
  // BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { urlGet, formatRupiah } from '@core/utils/filter'
import DaftarMak from '@/views/mak/DaftarMak.vue'

export default {
  components: {
    BButton,
    BCard,
    BCardBody,
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    DaftarMak,
    // BFormTextarea,
  },
  directives: {
    Ripple,
  },
  computed: {
    data() {
      return this.$store.getters['app-kegiatan/getDetail']
    },
    sisa_saldo() {
      return parseFloat(this.data.mak.pagu) - parseFloat(this.data.mak.saldo.realisasi)
    },
    sisa_saldo_perkiraan() {
      return parseFloat(this.data.mak.pagu) - parseFloat(this.data.mak.saldo.realisasi) - parseFloat(this.data.mak.saldo.unrealisasi)
    },
  },

  methods: {
    urlGet,
    formatRupiah,
    showModalMak() {
      this.$bvModal.show('modal-daftar-mak')
    },
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))

    return {
      userData,
    }
  },
}
</script>
