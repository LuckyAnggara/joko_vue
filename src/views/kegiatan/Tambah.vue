<template>
  <!-- <b-row class="match-height"> -->
  <b-form autocomplete="off" @submit.prevent @submit="store">
    <b-row class="match-height">
      <b-col lg="8" sm="12">
        <b-card title="Data Realisasi">
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tahun Anggaran" label-cols-md="3">
                <v-select v-model="form.tahun" placeholder="Tahun Anggaran" label="nama" :options="tahunOption" @input="changeTahun()" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Mata Anggaran Kegiatan" label-cols-md="3">
                <v-select v-model="form.kegiatan" placeholder="Mata Anggaran Kegiatan" label="kode" :options="makOption" />
              </b-form-group>
            </b-col>

            <hr />

            <b-col cols="12">
              <b-form-group label="Uraian Kegiatan" label-cols-md="3">
                <b-form-textarea v-model="form.uraian" placeholder="Uraian Kegiatan" required rows="3" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Nominal Bayar" label-cols-md="3">
                <b-form-input v-model="form.nominal" placeholder="Nominal Bayar" required />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Pembuat SPB" label-cols-md="3">
                <v-select v-model="form.maker" placeholder="Pembuat SPB" label="nama" :options="pegawaiOption" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Checker SPB" label-cols-md="3">
                <v-select v-model="form.checker" placeholder="Maker SPB" label="nama" :options="pegawaiOption" />
              </b-form-group>
            </b-col>
            <b-col cols="2" class="mt-2" offset="3">
              <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mb-75" block type="submit">
                Proses
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <!-- Right Col: Card -->
      <b-col lg="4" cols="12" md="6" xl="4" sm="12" class="invoice-actions mt-md-0 mt-2">
        <!-- Action Buttons -->
        <b-card title="Data MAK">
          <b-row>
            <b-col cols="12">
              <b-form-group label="Nama Mata Anggaran">
                <b-form-textarea readonly :value="form.kegiatan === null ? '' : form.kegiatan.nama" placeholder="Nama MAK" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="DIPA">
                <b-form-input readonly :value="form.kegiatan === null ? 'Rp. 0' : formatRupiah(form.kegiatan.dipa)" placeholder="Rp.0" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Saldo Tersedia">
                <b-form-input
                  readonly
                  :value="form.kegiatan === null ? 'Rp. 0' : formatRupiah(parseFloat(form.kegiatan.dipa) - parseFloat(form.kegiatan.realisasi))"
                  placeholder="Rp.0"
                />
              </b-form-group>
            </b-col>
            <b-col cols="9">
              <b-form-group label="Realisasi">
                <b-form-input readonly :value="form.kegiatan === null ? 'Rp. 0' : formatRupiah(form.kegiatan.realisasi)" placeholder="Rp.0" />
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group label="Pesentase">
                <b-form-input
                  readonly
                  :value="form.kegiatan === null ? '0%' : parseFloat(form.kegiatan.realisasi) / parseFloat(form.kegiatan.dipa)"
                  placeholder="Rp.0"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Belum di Realisasi">
                <b-form-input readonly :value="form.kegiatan === null ? 'Rp. 0' : formatRupiah(form.kegiatan.unrealisasi)" placeholder="Rp.0" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
import { BForm, BCard, BRow, BCol, BButton, BFormInput, BFormGroup, BFormTextarea } from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { formatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
    BCard,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    vSelect,
  },
  directives: {
    Ripple,
  },

  mounted() {
    this.loadTahun()
    this.loadPegawai()
  },
  methods: {
    formatRupiah,
    changeTahun() {
      this.reset()
      this.loadMak()
    },
    success() {
      this.$swal({
        title: 'Success!',
        text: 'Data has been created!!',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
      this.$router.push({
        name: 'master-barang',
      })
    },
    error() {
      this.$swal({
        title: 'Error!',
        text: "Oopss there' a problem!",
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    },
    store() {
      this.form = this.$refs.info.form
      this.form.harga = this.$refs.harga.harga
      this.$store.dispatch('app-realisasi/store', this.form).then(res => {
        if (res.status === 200) {
          this.success()
        } else {
          this.error()
        }
      })
    },
    loadTahun() {
      this.$store.dispatch('app-kegiatan/fetchTahun').then(res => {
        this.tahunOption = res.data
      })
    },
    loadMak() {
      if (this.form.tahun !== null || this.form.tahun !== '') {
        this.$store
          .dispatch('app-kegiatan/fetchMak', {
            bidang_id: 1,
            tahun_id: this.form.tahun === null ? 0 : this.form.tahun.id,
          })
          .then(res => {
            this.makOption = res.data
          })
      }
    },
    loadPegawai() {
      this.$store.dispatch('app-kegiatan/fetchPegawai').then(res => {
        this.pegawaiOption = res.data
      })
    },
    reset() {
      this.form.kegiatan = null
      this.makOption = []
    },
  },
  setup() {
    const form = ref({
      tahun: null,
      kegiatan: null,
      uraian: null,
      nominal: 0,
      maker: null,
      checker: null,
      tanggal: null,
    })
    const makOption = ref([])
    const tahunOption = ref([])
    const pegawaiOption = ref([])
    const tahun = ref({})

    return {
      makOption,
      tahunOption,
      pegawaiOption,
      form,
      tahun,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
