<template>
  <section>
    <b-card-header class="pb-50">
      <h4>
        Harga Jual
      </h4>
    </b-card-header>
    <!-- Items Section -->
    <b-card-body class="invoice-padding form-item-section">
      <div
        ref="form"
        class="repeater-form"
        :style="{ height: 200 }"
      >
        <b-row
          v-for="(item, index) in harga"
          :key="index"
          ref="row"
          class="pt-2"
        >
          <!-- Item Form -->
          <!-- ? This will be in loop => So consider below markup for single item -->
          <b-col cols="12">
            <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
            <div class="d-none d-lg-flex">
              <b-row class="flex-grow-1 px-1">
                <!-- Single Item Form Headers -->
                <b-col
                  cols="12"
                  lg="3"
                >
                  Satuan
                </b-col>
                <b-col
                  cols="12"
                  lg="3"
                >
                  Harga Jual
                </b-col>
                <b-col
                  cols="12"
                  lg="6"
                >
                  Catatan
                </b-col>
              </b-row>
              <div class="form-item-action-col" />
            </div>

            <!-- Form Input Fields OR content inside bordered area  -->
            <!-- ? Flex to keep separate width for XIcon and SettingsIcon -->
            <div class="d-flex border rounded">
              <b-row class="flex-grow-1 p-2">
                <!-- Single Item Form Headers -->
                <b-col
                  cols="12"
                  lg="3"
                >
                  <label class="d-inline d-lg-none">Item</label>
                  <v-select
                    v-model="item.satuan"
                    placeholder="Satuan Barang"
                    :reduce="nama => nama.id"
                    label="nama"
                    :options="satuanBarang"
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
                </b-col>
                <b-col
                  cols="12"
                  lg="3"
                >
                  <label class="d-inline d-lg-none" />
                  <b-form-input
                    v-model="item.harga"
                    type="number"
                  />
                </b-col>
                <b-col
                  cols="12"
                  lg="6"
                >
                  <label class="d-inline d-lg-none" />
                  <b-form-input
                    v-model="item.catatan"
                    type="text"
                  />
                </b-col>
              </b-row>
              <div
                class="d-flex flex-column bg-gradient-danger justify-content-between border-left py-50 px-25"
              >
                <feather-icon
                  size="16"
                  icon="XIcon"
                  class="cursor-pointer"
                  @click="removeItem(index)"
                />
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        class="mt-2"
        size="sm"
        variant="primary"
        @click="addNewItemInItemForm"
      >
        Tambah Harga
      </b-button>
    </b-card-body>
    <sidebar-satuan @load="load" />
  </section>
</template>

<script>
import {
  BRow,
  BCol,
  VBToggle,
  BFormInput,
  BButton,
  BCardHeader,
  BCardBody,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import store from '@/store'
import { heightTransition } from '@core/mixins/ui/transition'
import SidebarSatuan from '../Component/SidebarAddSatuan.vue'

export default {
  components: {
    vSelect,
    BCardHeader,
    BCardBody,
    BRow,
    BCol,
    SidebarSatuan,
    BFormInput,
    BButton,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  mixins: [heightTransition],
  data() {
    return {
      harga: [],
      selected: '',
      satuanBarang: [],
    }
  },
  beforeMount() {
    this.initTrHeight()
    this.load()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
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
        name: 'screen-barang',
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
    load() {
      this.satuanBarang = store.getters['app-barang/getListSatuan']
    },
    addNewItemInItemForm() {
      this.harga.push({ satuan: '', harga: '0', catatan: '' })
    },
    removeItem(index) {
      this.harga.splice(index, 1)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/pages/app-invoice.scss';
@import '~@core/scss/base/components/variables-dark';
@import '@core/scss/vue/libs/vue-select.scss';
.add-new-data-header {
  padding: $options-padding-y $options-padding-x;
  color: $success;

  &:hover {
    background-color: rgba($success, 0.12);
  }
}

.form-item-section {
  background-color: $product-details-bg;
}

.form-item-action-col {
  width: 27px;
}

.repeater-form {
  // overflow: hidden;
  transition: 0.35s height;
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
