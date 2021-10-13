<template>
  <!-- <b-row class="match-height"> -->
  <b-row class="match-height">
    <b-col lg="8" sm="12">
      <b-overlay :show="show" rounded="sm" variant="transparent" blur="5px" opacity="0.95">
        <b-form autocomplete="off" @submit.prevent @submit="store">
          <b-card title="Data Mata Anggaran Kegiatan">
            <b-row>
              <b-col cols="12">
                <b-form-group label="Tahun Anggaran" label-cols-md="3">
                  <v-select
                    v-model="form.tahun_id"
                    placeholder="Tahun Anggaran"
                    label="nama"
                    :reduce="tahun => tahun.id"
                    :options="tahunOption"
                    @input="changeTahun()"
                  />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Bidang" label-cols-md="3">
                  <v-select v-model="form.bidang_id" placeholder="Mata Anggaran Kegiatan" label="nama" :reduce="bidang => bidang.id" :options="bidangOption" />
                </b-form-group>
                <hr />
              </b-col>
              <b-col cols="12">
                <b-form-group label="Kode" label-cols-md="3">
                  <b-overlay :show="busyCekMak" rounded="lg" opacity="0.6">
                    <template #overlay>
                      <div class="d-flex align-items-center">
                        <b-spinner small type="grow" variant="secondary"></b-spinner>
                        <b-spinner small type="grow" variant="dark"></b-spinner>
                        <b-spinner small type="grow" variant="secondary"></b-spinner>
                        <!-- We add an SR only text for screen readers -->
                        <span class="sr-only">Please wait...</span>
                      </div>
                    </template>
                    <b-form-input v-model="form.kode" type="text" placeholder="Kode Mata Anggaran Kegiatan" @blur="cekKodeMak" required />
                    <small class="text-danger" v-if="kode">KODE MATA ANGGARAN KEGIATAN SUDAH ADA!, CEK KEMBALI DI DAFTAR MATA ANGGARAN KEGIATAN</small>
                  </b-overlay>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Nama" label-cols-md="3">
                  <b-form-textarea v-model="form.nama" placeholder="Nama Mata Anggaran Kegiatan" required rows="3" />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="DIPA" label-cols-md="3">
                  <b-form-input v-model="form.dipa" type="number" placeholder="DIPA Anggara" required />
                </b-form-group>
                <hr />
              </b-col>

              <b-col cols="2" class="mt-2" md="6" sm="12" offset-lg="3">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  class="mb-75"
                  block
                  type="submit"
                  :disabled="kode === false ? false : true"
                >
                  Proses
                </b-button>
              </b-col>
            </b-row>
          </b-card>
        </b-form>
        <template #overlay>
          <div class="text-center">
            <feather-icon icon="Edit3Icon" size="2x" />
            <p>{{ title }}</p>
          </div>
        </template>
      </b-overlay>
    </b-col>
  </b-row>
</template>

<script>
import { BOverlay, BSpinner, BForm, BCard, BRow, BCol, BButton, BFormInput, BFormGroup, BFormTextarea } from 'bootstrap-vue'

import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import { formatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue'

export default {
  components: {
    BOverlay,
    BSpinner,
    BCard,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    vSelect,
    FeatherIcon,
  },
  directives: {
    Ripple,
  },

  mounted() {
    this.loadTahun()
    this.loadBidang()
  },
  methods: {
    formatRupiah,
    cekKodeMak() {
      this.busyCekMak = !this.busyCekMak
      this.$store.dispatch('app-mak/cekKodeMak', { kode: this.form.kode }).then(res => {
        this.busyCekMak = !this.busyCekMak
        console.info(res)

        if (res.data > 0) {
          this.kode = true
        } else {
          this.kode = false
        }
      })
    },
    loadBidang() {
      this.$store.dispatch('app-mak/fetchBidang').then(res => {
        this.bidangOption = res.data
      })
    },
    loadTahun() {
      this.$store.dispatch('app-mak/fetchTahun').then(res => {
        this.tahunOption = res.data
      })
    },
    success() {
      this.$swal({
        title: 'Success!',
        text: 'Data berhasil di buat!!',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    },
    error(x) {
      this.$swal({
        title: 'Error!',
        text: x,
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    },
    store() {
      this.$swal({
        title: 'Proses ?',
        text: 'Data MAK baru akan di proses',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ok!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.show = !this.show
          this.$store.dispatch('app-mak/storeMAK', this.form).then(res => {
            if (res.status === 200) {
              this.success()
              this.$router.push({ name: 'mak-daftar' })
            } else {
              this.error(res.status)
            }
          })
        }
      })
    },
  },
  setup() {
    const busyCekMak = ref(false)
    const kode = ref(false)
    const title = ref('Membuat Mata Anggaran Kegiatan .... ')
    const show = ref(false)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const form = ref({
      tahun_id: null,
      bidang_id: null,
      kode: null,
      nama: null,
      nominal: 0,
      user: JSON.parse(localStorage.getItem('userData')),
    })
    const tahunOption = ref([])
    const bidangOption = ref([])
    const tahun = ref({})

    return {
      busyCekMak,
      kode,
      title,
      show,
      userData,
      tahunOption,
      bidangOption,
      form,
      tahun,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
