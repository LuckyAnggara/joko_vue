<template>
  <b-sidebar
    id="sidebar-add-merek"
    sidebar-class="sidebar-lg"
    bg-variant="white"
    shadow
    backdrop
    no-header
    right
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div
        class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
      >
        <h5 class="mb-0">
          Tambah Merek
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />
      </div>

      <!-- Body -->
      <b-form
        class="p-2"
        @submit.prevent
      >
        <!-- Customer Name -->
        <b-form-group
          label="Nama Merek"
          label-for="nama-merek"
        >
          <b-form-input
            id="nama-merek"
            v-model="nama_merek"
            trim
            placeholder="Nama Merek"
          />
        </b-form-group>
        <!-- Form Actions -->
        <div class="d-flex mt-2">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-2"
            type="submit"
            @click="create"
          >
            Add
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            @click="hide"
          >
            Cancel
          </b-button>
        </div>
      </b-form>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import store from '@/store'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      nama_merek: '',
    }
  },
  methods: {
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
    suksesToast(nama) {
      this.$bvToast.toast(`Merek Barang ${nama} ditambahkan`, {
        title: 'Sukses',
        variant: 'success',
        toaster: 'b-toaster-bottom-center',
      })
    },
    create() {
      if (this.nama_merek !== '') {
        store
          .dispatch('app-barang/addMerek', { nama: this.nama_merek })
          .then(res => {
            if (res.status === 200) {
              store.commit('app-barang/UPDATE_LIST_MEREK', res.data)
              this.$root.$emit('bv::toggle::collapse', 'sidebar-add-merek')
              this.suksesToast(res.data.nama)
              this.nama_merek = ''
            } else {
              this.error()
            }
          })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
