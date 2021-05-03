<template>
  <section>
    <b-card-header class="pb-50">
      <h4>
        Detail Data
      </h4>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col cols="12">
          <b-form-group
            label="Nama Barang"
            label-for="nama_barang"
            label-cols-md="4"
          >
            <b-form-input
              id="nama_barang"
              v-model="form.nama"
              placeholder="Nama Barang"
              required
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label="Jenis Barang"
            label-for="jenis_barang"
            label-cols-md="4"
          >
            <v-select
              v-model="form.jenis_id"
              placeholder="Jenis Barang"
              :reduce="nama => nama.id"
              label="nama"
              :options="jenisBarang"
            >
              <template #list-header>
                <li
                  v-b-toggle.sidebar-add-jenis
                  class="add-new-data-header d-flex align-items-center my-50"
                >
                  <feather-icon
                    icon="PlusIcon"
                    size="16"
                  />
                  <span class="align-middle ml-25">Tambah Jenis</span>
                </li>
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
            label="Merk Barang"
            label-for="merk_barang"
            label-cols-md="4"
          >
            <v-select
              v-model="form.merek_id"
              placeholder="Merek Barang"
              :reduce="nama => nama.id"
              label="nama"
              :options="merekBarang"
            >
              <template #list-header>
                <li
                  v-b-toggle.sidebar-add-merek
                  class="add-new-data-header d-flex align-items-center my-50"
                >
                  <feather-icon
                    icon="PlusIcon"
                    size="16"
                  />
                  <span class="align-middle ml-25">Tambah Merek</span>
                </li>
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
            label="Gudang Penyimpanan"
            label-for="gudang"
            label-cols-md="4"
          >
            <v-select
              v-model="form.gudang_id"
              placeholder="Gudang"
              :reduce="nama => nama.id"
              label="nama"
              :options="gudang"
            >
              <template #list-header>
                <li
                  v-b-toggle.sidebar-add-gudang
                  class="add-new-data-header d-flex align-items-center my-50"
                >
                  <feather-icon
                    icon="PlusIcon"
                    size="16"
                  />
                  <span class="align-middle ml-25">Tambah Gudang</span>
                </li>
              </template>
            </v-select>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
            label="Rak Penyimpanan"
            label-for="rak"
            label-cols-md="4"
          >
            <b-form-input
              id="rak"
              v-model="form.rak"
              placeholder="Rak Penyimpanan"
              type="text"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group
            label="Catatan"
            label-for="catatan"
            label-cols-md="4"
          >
            <b-form-textarea
              id="catatan"
              v-model="form.catatan"
              placeholder="Catatan"
              rows="3"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-card-body>
    <sidebar-gudang />
    <sidebar-jenis />
    <sidebar-merek />
  </section>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BCardHeader,
  BCardBody,
  BFormTextarea,
  VBToggle,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import SidebarGudang from '../Component/SidebarAddGudang.vue'
import SidebarJenis from '../Component/SidebarAddJenis.vue'
import SidebarMerek from '../Component/SidebarAddMerek.vue'

export default {
  components: {
    vSelect,
    BCardHeader,
    BFormTextarea,
    BCardBody,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    SidebarJenis,
    SidebarMerek,
    SidebarGudang,
  },
  directives: {
    'b-toggle': VBToggle,
  },

  data() {
    return {
      form: {
        nama: '',
        jenis_id: '',
        merek_id: '',
        gudang_id: '',
        harga: [],
        catatan: '',
      },
      selected: '',
      gudang: [],
      jenisBarang: [],
      merekBarang: [],
      satuanBarang: [],
    }
  },
  beforeMount() {
    this.load()
  },
  methods: {
    load() {
      this.gudang = store.getters['app-barang/getListGudang']
      this.jenisBarang = store.getters['app-barang/getListJenis']
      this.merekBarang = store.getters['app-barang/getListMerek']
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
</style>
