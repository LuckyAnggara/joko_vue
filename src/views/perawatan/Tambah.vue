<template>
  <!-- <b-row class="match-height"> -->
  <b-row class="match-height">
    <b-col lg="8" sm="12">
      <b-overlay :show="show" rounded="sm" variant="transparent" blur="5px" opacity="0.95">
        <b-form autocomplete="off" @submit.prevent @submit="store">
          <b-card title="Tambah">
            <b-row>
              <b-col cols="12">
                <b-form-group label="Nomor Polisi" label-cols-md="3">
                  <b-input-group>
                    <b-form-input v-model="form.nopol" type="text" placeholder="Masukan Nomor Polisi Kendaraan Dinas" />

                    <b-input-group-append>
                      <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary" class="btn-icon" @click="cari">
                        <feather-icon icon="SearchIcon" /> Search
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                  <small v-if="error" class="text-danger">Nomor Polisi tidak ditemukan</small>
                </b-form-group>
              </b-col>
              <template v-if="data">
                <b-col cols="12">
                  <b-form-group label="Nama" label-cols-md="3">
                    <b-form-input :value="data.nama" type="text" placeholder="Nama" disabled />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group label="Jenis" label-cols-md="3">
                    <b-form-input :value="data.jenis" type="text" placeholder="Jenis" disabled />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group label="Pemegang" label-cols-md="3">
                    <b-form-input :value="data.pemilik" type="text" placeholder="Pemegang" disabled />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group label="Status" label-cols-md="3">
                    <b-form-input :value="data.status" type="text" placeholder="Status" disabled />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group label="Keterangan" label-cols-md="3">
                    <b-form-textarea :value="data.keterangan" type="text" placeholder="Keterangan" />
                  </b-form-group>
                </b-col>
              </template>
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
import { BFormTextarea, BInputGroup, BInputGroupAppend, BOverlay, BForm, BCard, BRow, BCol, BButton, BFormInput, BFormGroup } from 'bootstrap-vue'

import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BFormTextarea,
    BInputGroup,
    BInputGroupAppend,
    BOverlay,
    BCard,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BFormGroup,
  },
  directives: {
    Ripple,
  },
  computed: {},

  methods: {
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

    store() {
      this.$swal({
        title: 'Proses ?',
        text: 'Data barang baru akan di proses !',
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
          this.$store.dispatch('app-barang/storeBarang', this.form).then(res => {
            if (res.status === 200) {
              this.success()
              this.$router.push({ name: 'barang-daftar' })
            } else {
              this.error(res.status)
            }
          })
        }
      })
    },
    cari() {
      this.$store.dispatch('app-bmn/getDetailKendaraanDinas', this.form.nopol).then(res => {
        if (res.data !== 'no') {
          this.$store.commit('app-bmn/SET_DETAIL_KENDARAAN_DINAS', res.data)
          this.data = res.data
          this.error = false
        } else {
          this.data = null
          this.error = true
        }
      })
    },
  },
  setup() {
    const error = ref(false)
    const title = ref('Store data Barang .... ')
    const show = ref(false)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const data = ref(null)
    const form = ref({
      nopol: null,
      nama: null,
      jenis: null,
      keterangan: null,
      pemilik: null,
      status: null,

      user_data: JSON.parse(localStorage.getItem('userData')),
    })

    return {
      error,
      title,
      show,
      data,
      userData,
      form,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
