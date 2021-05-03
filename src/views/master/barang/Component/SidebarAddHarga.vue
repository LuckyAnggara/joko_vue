<template>
  <b-sidebar
    id="sidebar-add-harga"
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
          Tambah Harga
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
        autocomplete="off"
        @submit.prevent
        @submit="create"
      >
        <b-form-group
          label="Satuan"
          label-for="nama-satuan"
        >
          <v-select
            v-model="form.satuan"
            placeholder="Satuan Barang"
            :reduce="nama => nama.id"
            label="nama"
            :options="satuanBarang"
            required
          >
            <template #list-header>
              <li
                v-b-toggle.sidebar-add-satuan
                class="add-new-data-header d-flex align-items-center my-50"
              >
                <feather-icon
                  icon="PlusIcon"
                  size="16"
                />
                <span class="align-middle ml-25">Tambah Satuan</span>
              </li>
            </template>
          </v-select>
        </b-form-group>
        <b-form-group
          label="Harga Jual"
          label-for="harga-jual"
        >
          <b-form-input
            id="harga-jual"
            v-model="form.harga"
            type="number"
            trim
            placeholder="Harga Jual"
            required
          />
        </b-form-group>
        <b-form-group
          label="Catatan"
          label-for="catatan"
        >
          <b-form-input
            id="catatan"
            v-model="form.catatan"
            trim
            placeholder="Catatan"
          />
        </b-form-group>
        <!-- Form Actions -->
        <div class="d-flex mt-2">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mr-2"
            type="submit"
            @submit="create"
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
  BSidebar,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  VBToggle,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store'

export default {
  components: {
    BSidebar,
    vSelect,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  data() {
    return {
      form: {
        satuan: '',
        harga: '',
        catatan: '',
        kode_barang: '',
      },
      satuanBarang: [],
    }
  },
  mounted() {
    this.load()
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
    clearForm() {
      this.form.satuan = ''
      this.form.harga = ''
      this.form.catatan = ''
      this.form.kode_barang = ''
    },
    suksesToast() {
      this.$bvToast.toast('Harga Barang ditambahkan', {
        title: 'Sukses',
        variant: 'success',
        toaster: 'b-toaster-bottom-center',
      })
    },
    create() {
      if (this.form.satuan !== '') {
        this.form.kode_barang = this.$parent.dataBarang.kode_barang
        // console.log(this.$parent.dataHarga.push())
        store.dispatch('app-barang/addHargaBarang', this.form).then(res => {
          if (res.status === 200) {
            this.$parent.dataBarang.harga.push(res.data)
            this.$root.$emit('bv::toggle::collapse', 'sidebar-add-harga')
            this.suksesToast()
            this.clearForm()
          } else {
            this.error()
          }
        })
      }
    },
    load() {
      this.satuanBarang = store.getters['app-barang/getListSatuan']
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.add-new-data-header {
  padding: $options-padding-y $options-padding-x;
  color: $success;

  &:hover {
    background-color: rgba($success, 0.12);
  }
}
.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}

.dark-layout {
  .form-item-section {
    background-color: $theme-dark-body-bg;

    .row .border {
      background-color: $theme-dark-card-bg;
    }
  }
}
</style>
