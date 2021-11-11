<template>
  <!-- <b-row class="match-height"> -->
  <b-row class="match-height">
    <b-col lg="8" sm="12">
      <b-overlay :show="show" rounded="sm" variant="transparent" blur="5px" opacity="0.95">
        <b-form autocomplete="off" @submit.prevent @submit="store">
          <b-card title="Tambah Barang">
            <b-row>
              <b-col cols="12">
                <b-form-group label="Nama" label-cols-md="3">
                  <b-form-input v-model="form.nama" type="text" placeholder="Nama Barang" required />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Satuan" label-cols-md="3">
                  <b-form-input v-model="form.satuan" type="text" placeholder="Satuan" required />
                </b-form-group>
              </b-col>

              <b-col cols="2" class="mt-2" md="6" sm="12" offset-lg="3">
                <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mb-75" block type="submit">
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
import { BOverlay, BForm, BCard, BRow, BCol, BButton, BFormInput, BFormGroup } from 'bootstrap-vue'

import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
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
  },
  setup() {
    const title = ref('Store data Barang .... ')
    const show = ref(false)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const form = ref({
      nama: null,
      satuan: null,

      user_data: JSON.parse(localStorage.getItem('userData')),
    })

    return {
      title,
      show,
      userData,
      form,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
