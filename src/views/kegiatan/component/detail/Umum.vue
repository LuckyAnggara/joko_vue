<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card :title="`Data Rencana Kegiatan Nomor : ${data.nomor_kwitansi}`" v-if="data === null ? false : true" footer-tag="footer">
        <b-card-body>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tahun Anggaran" label-cols-md="3">
                <b-form-input :value="data.tahun.nama" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12" v-if="userData.role !== 'USER'">
              <b-form-group label="Bidang" label-cols-md="3">
                <b-form-input :value="`${data.bidang.nama}`" readonly />
              </b-form-group>
              <hr />
            </b-col>
            <b-col cols="12">
              <b-form-group label="Mata Anggaran Kegiatan" label-cols-md="3">
                <b-form-textarea :value="`${data.mak.kode} - ${data.mak.nama}`" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tanggal Rencana Kegiatan" label-cols-md="3">
                <b-form-input :value="$moment(data.tanggal_rencana_kegiatan).format('DD MMMM YYYY')" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Lokasi Kegiatan" label-cols-md="3">
                <b-form-input :value="data.lokasi" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Jenis Kegiatan" label-cols-md="3">
                <b-form-input :value="data.jenis_kegiatan.nama" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Uraian Kegiatan" label-cols-md="3">
                <b-form-textarea :value="data.uraian" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Output Kegiatan" label-cols-md="3">
                <b-form-textarea :value="data.output" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Total Anggaran" label-cols-md="3">
                <b-form-input :value="formatRupiah(data.total_anggaran)" readonly />
              </b-form-group>
              <hr />
            </b-col>

            <template v-if="data.status === 'VERIFIKASI'">
              <b-col cols="2" class="mt-2" md="2" sm="12" offset-md="3" v-if="userData.role === 'PPK'">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mb-75" block type="button" @click="approve">
                  Approve
                </b-button>
              </b-col>
              <b-col cols="2" class="mt-2" md="2" sm="12" v-if="userData.role === 'PPK'">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="outline-danger" class="mb-75" block type="button" @click="reject">
                  Reject
                </b-button>
              </b-col>
            </template>
            <template v-if="data.status === 'PEMBAYARAN'">
              <b-col cols="2" class="mt-2" md="3" sm="12" offset-md="3" v-if="userData.role === 'BENDAHARA'">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mb-75" block type="button" @click="bayar">
                  Bayar
                </b-button>
              </b-col>
            </template>
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
  </b-row>
</template>

<script>
import { BCard, BCardBody, BRow, BCol, BButton, BFormInput, BFormGroup, BFormTextarea } from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'
import { formatRupiah } from '@core/utils/filter'

export default {
  components: {
    BCard,
    BCardBody,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BFormGroup,
    BFormTextarea,
  },
  directives: {
    Ripple,
  },

  computed: {
    data() {
      return this.$store.getters['app-kegiatan/getDetail']
    },
  },

  methods: {
    formatRupiah,
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))

    return {
      userData,
    }
  },
}
</script>
