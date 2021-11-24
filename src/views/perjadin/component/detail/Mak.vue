<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Mata Anggaran Kegiatan" footer-tag="footer">
        <b-card-body>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Kode Anggaran Kegiatan" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="form.mak.kode" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Mata Anggaran Kegiatan" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="form.mak.nama" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Pagu" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(form.mak.pagu)" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Saldo Realisasi" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(form.mak.saldo.realisasi)" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Saldo Belum Realisasi" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(form.mak.saldo.unrealisasi)" placeholder="-" readonly />
                <!-- <b-button
                  variant="outline-primary"
                  class="mt-1"
                  @click="showModalLampiran()"
                  v-if="form.status !== 'PENGAJUAN' && (userData.role === 'ADMIN KEUANGAN' || userData.role === 'VERIFIKATOR PPK')"
                >
                  Cek Daftar
                </b-button> -->
              </b-form-group>

              <hr />
            </b-col>

            <b-col cols="12">
              <b-form-group label="Sisa Saldo Tersedia" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(form.mak.saldo.saldo)" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Untuk Kegiatan Ini" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(form.total_anggaran)" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Sisa Saldo Setelah Kegiatan" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="formatRupiah(parseFloat(form.mak.saldo.saldo) - parseFloat(form.total_anggaran))" placeholder="-" readonly />
              </b-form-group>
              <hr />
            </b-col>
            <b-col cols="12">
              <b-form-group label="Lampiran" label-cols-md="3">
                <template v-if="lampiran_rab.length > 0 ? true : false">
                  <ul>
                    <li v-for="item in lampiran_rab" :key="item.id">
                      <b-link :href="urlGet(item.id, 'perjadin')" class="font-weight-bold" target="_blank"> {{ item.nama }} </b-link>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <span>Tidak ada lampiran</span>
                </template>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="mt-2" v-if="form.status !== 'PENGAJUAN' && (userData.role === 'ADMIN KEUANGAN' || userData.role === 'VERIFIKATOR PPK')">
            <b-col cols="12">
              <b-button variant="outline-primary" @click="showModalMak()"> Cek MAK </b-button>
            </b-col>

            <b-col cols="12">
              <small>Cek Daftar MAK pada {{ form.bidang.nama }}</small>
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
    <daftar-mak :tahun="form.tahun" :bidang="form.bidang" />
  </b-row>
</template>

<script>
// import { ref } from '@vue/composition-api'
import {
  BButton,
  BLink,
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
    BLink,
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
    form() {
      return this.$store.getters['app-perjadin/getDetail']
    },
    lampiran_rab() {
      return this.form.lampiran.filter(x => x.jenis === 'RAB')
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
