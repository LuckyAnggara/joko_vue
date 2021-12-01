<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card :title="`Data Rencana Kegiatan Nomor : ${data.nomor_kwitansi}`" v-if="fake === null ? false : true" footer-tag="footer">
        <b-card-body>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tahun Anggaran" label-cols-md="3">
                <b-form-input v-if="!edit" :value="fake.tahun.nama" readonly />
                <v-select v-if="edit" v-model="fake.tahun" placeholder="Tahun Anggaran" label="nama" :options="tahunOption" />
                <small v-if="edit">Untuk merubah Tahun, Wajib untuk merubah MAK yang di gunakan disesuaikan Tahun Anggaran yang di Pilih</small>
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
                <b-form-textarea :value="`${fake.mak.kode} - ${fake.mak.nama}`" readonly />
                <small v-if="edit">Bisa di ubah di Tab MAK</small>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tanggal Rencana Kegiatan" label-cols-md="3">
                <b-form-input v-if="!edit" :value="$moment(fake.tanggal_rencana_kegiatan).format('DD MMMM YYYY')" readonly />
                <b-form-datepicker
                  v-if="edit"
                  locale="id"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  v-model="fake.tanggal_rencana_kegiatan"
                  placeholder="Tanggal Rencana Kegiatan"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Lokasi Kegiatan" label-cols-md="3">
                <b-form-input v-if="!edit" :value="fake.lokasi" readonly />
                <b-form-input v-if="edit" v-model="fake.lokasi" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Jenis Kegiatan" label-cols-md="3">
                <b-form-input v-if="!edit" :value="fake.jenis_kegiatan.nama" readonly />
                <v-select v-if="edit" v-model="fake.jenis_kegiatan" placeholder="Jenis Kegiatan" label="nama" :options="jenisKegiatanOption" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Uraian Kegiatan" label-cols-md="3">
                <b-form-textarea v-if="!edit" :value="fake.uraian" readonly />
                <b-form-textarea v-if="edit" v-model="fake.uraian" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Output Kegiatan" label-cols-md="3">
                <b-form-textarea v-if="!edit" :value="fake.output" readonly />
                <b-form-textarea v-if="edit" v-model="fake.output" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Total Anggaran" label-cols-md="3">
                <b-form-input v-if="!edit" :value="formatRupiah(fake.total_anggaran)" readonly />
                <b-form-input v-if="edit" v-model="fake.total_anggaran" />
              </b-form-group>
              <hr />
            </b-col>

            <!-- <template v-if="data.status === 'VERIFIKASI'">
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
            </template> -->
          </b-row>
          <b-row>
            <section v-if="data.status === 'RENCANA'">
              <b-button variant="outline-warning" class="ml-1" @click="edit = !edit" v-if="!edit"> Edit </b-button>
              <b-button variant="outline-danger" class="ml-1" @click="batal()" v-if="edit"> Batal </b-button>
              <b-button variant="outline-primary" class="ml-1" v-if="edit" @click="ubah()"> Simpan </b-button>
            </section>
          </b-row>
        </b-card-body>
        <template #footer>
          <small
            ><em
              >Created By {{ data.user.pegawai.nama }} - {{ data.bidang.nama }} at <strong>{{ $moment(data.created_at).format('DD MMMM YYYY') }}</strong></em
            ></small
          >
          <br />
          <small
            ><em
              >Updated at <strong>{{ $moment(data.updated_at).format('DD MMMM YYYY') }}</strong></em
            ></small
          >
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { ref } from '@vue/composition-api'

import { BCard, BCardBody, BRow, BCol, BButton, BFormInput, BFormGroup, BFormTextarea, BFormDatepicker } from 'bootstrap-vue'

import Ripple from 'vue-ripple-directive'
import { formatRupiah } from '@core/utils/filter'
import _ from 'lodash'
import vSelect from 'vue-select'

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
    BFormDatepicker,
    vSelect,
  },
  directives: {
    Ripple,
  },

  computed: {
    data() {
      return this.$store.getters['app-kegiatan/getDetail']
    },
    jenisKegiatanOption() {
      return this.$store.getters['app-general/getJenisKegiatan']
    },
  },
  mounted() {
    this.fake = _.cloneDeep(this.data)
    this.loadTahun()
    this.loadPegawai()
    this.loadMak()
    this.loadJenisKegiatan()
  },
  methods: {
    formatRupiah,
    batal() {
      this.edit = !this.edit
      this.fake = _.cloneDeep(this.data)
    },
    loadTahun() {
      this.$store.dispatch('app-general/fetchTahun').then(res => {
        this.$store.commit('app-general/SET_TAHUN', res.data)
        this.tahunOption = res.data
      })
    },
    loadPegawai() {
      this.$store.dispatch('app-general/fetchPegawai').then(res => {
        this.$store.commit('app-general/SET_PEGAWAI', res.data)
        this.pegawaiOption = res.data
      })
    },
    loadMak() {
      if (this.data.tahun !== null || this.data.tahun !== '') {
        this.$store
          .dispatch('app-general/fetchMak', {
            bidang_id: this.data.bidang.id,
            tahun_id: this.data.tahun === null ? 0 : this.data.tahun.id,
          })
          .then(res => {
            this.$store.commit('app-general/SET_MAK', res.data)
          })
      }
    },
    loadJenisKegiatan() {
      this.$store.dispatch('app-general/fetchJenisKegiatan').then(res => {
        this.$store.commit('app-general/SET_JENIS_KEGIATAN', res.data)
      })
    },
    ubah() {
      this.$swal({
        title: 'Ubah Data ?',
        text: 'Data Umum akan di ubah ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ok!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.isConfirmed) {
          this.$store.dispatch('app-kegiatan/editUmum', this.fake).then(res => {
            if (res.status === 200) {
              this.$store.commit('app-kegiatan/SET_DETAIL', this.fake)
              this.$swal({
                title: 'Sukses!',
                text: 'Mak berhasil di ubah',
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              this.edit = !this.edit
            }
          })
        }
      })
    },
  },
  setup() {
    const tahunOption = ref([])
    const pegawaiOption = ref([])
    const userData = JSON.parse(localStorage.getItem('userData'))
    const edit = ref(false)
    const fake = ref(null)

    return {
      tahunOption,
      pegawaiOption,
      fake,
      edit,
      userData,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
