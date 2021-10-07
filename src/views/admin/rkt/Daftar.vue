<template>
  <section>
    <b-row class="match-height">
      <b-col lg="12" cols="12">
        <b-card>
          <div class="mb-2">
            <!-- Table Top -->
            <b-row>
              <!-- Per Page -->
              <b-col cols="12" md="12" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                <label>Tahun Data</label>
                <v-select v-model="tahun" :options="tahunOptions" :clearable="false" class="tahun-page-selector d-inline-block ml-50 mr-3" />
                <label>Area</label>
                <v-select
                  v-model="area"
                  :options="areaSelect"
                  label="nama"
                  :reduce="x => x.prefix_area"
                  :clearable="true"
                  class="rkt-page-selector d-inline-block ml-50 mr-3"
                />
                <b-button variant="primary" @click="showModalTambah()">
                  Tambah Data
                </b-button>
              </b-col>
            </b-row>
          </div>
          <b-table
            ref="refTable"
            responsive
            primary-key="id"
            bordered
            striped
            :fields="tableColumns"
            :items="dataArea"
            :clearable="true"
            empty-text="Tidak ada data"
          >
            <!-- Column: Id -->
            <template #cell(id)="data">
              <span>
                {{ data.index + 1 }}
              </span>
            </template>

            <!-- Column: Id -->
            <template #cell(deskripsi)="data">
              <span style="white-space: pre-wrap;">
                {{ data.item.deskripsi }}
              </span>
            </template>

            <!-- Column: Actions -->
            <template #cell(actions)="data">
              <div class="text-nowrap">
                <b-dropdown variant="link" toggle-class="p-0" no-caret>
                  <template #button-content>
                    <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                  </template>
                  <b-dropdown-item @click="showModalEdit(data.item)">
                    <feather-icon icon="EditIcon" />
                    <span class="align-middle ml-50">Edit</span>
                  </b-dropdown-item>
                  <b-dropdown-item @click="destroy(data.item.id)">
                    <feather-icon icon="TrashIcon" />
                    <span class="align-middle ml-50">Delete</span>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
    <div>
      <b-modal
        ref="tambah-modal"
        title="Tambah Data"
        @ok="submitStoreRKT"
        @show="resetModalTambah"
        centered
        no-close-on-backdrop
        no-close-on-esc
        ok-title="Submit"
        size="lg"
      >
        <b-form-group label="Tahun" label-for="tahun" label-cols-md="4">
          <b-form-input placeholder="Nama RKT" v-model="form.tahun" type="text" readonly />
        </b-form-group>
        <b-form-group label="Prefix Area" label-for="prefix-area" label-cols-md="4">
          <v-select v-model="form.area_id" label="nama" placeholder="Area" :clearable="true" :options="areaSelect" :reduce="x => x.id" required />
        </b-form-group>
        <b-form-group label="Nama RKT" label-for="nama-rkt" label-cols-md="4">
          <b-form-textarea placeholder="Nama RKT" v-model="form.nama" type="text" />
        </b-form-group>
        <b-form-group label="Target" label-for="target" label-cols-md="4">
          <v-select v-model="form.target" placeholder="Target" :clearable="true" :options="targetOptions" required />
        </b-form-group>
        <b-form-group label="Deskripsi" label-for="deskripsi" label-cols-md="4">
          <b-form-textarea placeholder="Deskripsi" v-model="form.deskripsi" type="text" />
        </b-form-group>
      </b-modal>
    </div>
    <div>
      <b-modal
        ref="edit-modal"
        title="Edit Data"
        @ok="SubmitEdit"
        @show="resetModalEdit"
        centered
        no-close-on-backdrop
        no-close-on-esc
        ok-title="Submit"
        size="lg"
      >
        <b-form-group label="Tahun" label-for="tahun" label-cols-md="4">
          <b-form-input placeholder="Nama RKT" v-model="edit.tahun" type="text" readonly />
        </b-form-group>
        <b-form-group label="Prefix Area" label-for="prefix-area" label-cols-md="4">
          <v-select v-model="edit.area_id" label="nama" placeholder="Area" :clearable="true" :options="areaSelect" :reduce="x => x.id" required />
        </b-form-group>
        <b-form-group label="Nama RKT" label-for="nama-rkt" label-cols-md="4">
          <b-form-textarea placeholder="Nama RKT" v-model="edit.nama" type="text" />
        </b-form-group>
        <b-form-group label="Target" label-for="target" label-cols-md="4">
          <v-select v-model="edit.target" placeholder="Target" :clearable="true" :options="targetOptions" required />
        </b-form-group>
        <b-form-group label="Deskripsi" label-for="deskripsi" label-cols-md="4">
          <b-form-textarea placeholder="Deskripsi" v-model="edit.deskripsi" type="text" />
        </b-form-group>
      </b-modal>
    </div>
  </section>
</template>

<script>
import store from '@/store'
import { ref } from '@vue/composition-api'

import { BDropdown, BDropdownItem, BCard, BRow, BCol, BFormGroup, BFormTextarea, BFormInput, BTable, VBModal, BButton, BModal } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'

export default {
  components: {
    BDropdown,
    BDropdownItem,
    BCard,
    BRow,
    BCol,
    BModal,
    BTable,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BButton,
    vSelect,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      tahun: '',
      area: '',
      areaSelect: [],
      form: {
        tahun: '',
        area_id: '',
        nama: '',
        deskripsi: '',
        target: '',
      },
      edit: {
        id: '',
        tahun: '',
        area_id: '',
        nama: '',
        deskripsi: '',
        target: '',
      },
    }
  },
  mounted() {
    this.initTahun()
  },
  watch: {
    tahun(x) {
      this.filterDataTahun()
      this.form.tahun = x
    },
    area(x) {
      console.info(x)
      this.filterDataArea()
    },
  },
  methods: {
    filterDataTahun() {
      this.loadRKT()
    },
    filterDataArea() {
      store.commit('app-admin/FILTER_LIST_RKT', this.area)
      this.dataArea = store.getters['app-admin/getListRKT']
    },
    resetModalTambah() {
      this.form.tahun = this.tahun
      this.form.nama = ''
      this.form.area_id = ''
      this.form.target = ''
      this.form.deskripsi = ''
    },
    resetModalEdit() {
      this.edit.tahun = this.tahun
      this.edit.nama = ''
      this.edit.area_id = ''
      this.edit.target = ''
      this.edit.deskripsi = ''
    },
    submitStoreRKT(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.form.tahun !== '' || this.form.area_id !== '' || this.form.target !== '' || this.form.nama !== '' || this.form.deskripsi !== '') {
        this.store()
      } else {
        this.$swal({
          icon: 'error',
          title: 'Oopss!',
          text: 'Form isian belum lengkap !',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })
      }
    },
    SubmitEdit(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.edit.tahun !== '' || this.edit.area_id !== '' || this.edit.target !== '' || this.edit.nama !== '' || this.edit.deskripsi !== '') {
        this.store()
      } else {
        this.$swal({
          icon: 'error',
          title: 'Oopss!',
          text: 'Form isian belum lengkap !',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        })
      }
    },
    loadRKT() {
      store.dispatch('app-admin/fetchListRkt', this.tahun).then(res => {
        store.commit('app-admin/SET_LIST_RKT', res.data)
        this.dataArea = store.getters['app-admin/getListRKT']
        this.areaSelect = store.getters['app-admin/getListAreaSelect']
      })
    },
    initTahun() {
      const d = new Date()
      const y = d.getFullYear()
      this.tahun = y
    },
    showModalTambah() {
      this.$refs['tambah-modal'].show()
    },
    showModalEdit() {
      // console.info(data)
      // this.edit.id = data.id
      // this.edit.area_id = data.area_id
      // this.edit.tahun = data.tahun_id
      // this.edit.nama = data.nama
      // this.edit.target = data.target
      // this.edit.deskripsi = data.deskripsi
      // console.info(this.edit)
      this.$refs['edit-modal'].show()
    },
    store() {
      store.dispatch('app-admin/storeRKT', this.form).then(res => {
        store.commit('app-admin/UPDATE_RKT', res.data)
        if (res.status === 200) {
          this.$swal({
            icon: 'success',
            title: 'Sukses !',
            text: 'Rencana Kerja telah di tambahkan',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.area = null
          this.$refs['tambah-modal'].hide()
        }
      })
    },
    destroy(id) {
      store.dispatch('app-admin/deleteRKT', id).then(res => {
        store.commit('app-admin/DELETE_RKT', res.data)
        if (res.status === 200) {
          this.$swal({
            icon: 'success',
            title: 'Sukses !',
            text: 'Rencana Kerja telah di di delete',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        }
      })
    },
  },
  setup() {
    const tahunOptions = [2021, 2022, 2023, 2024]
    const targetOptions = ['B03', 'B06', 'B09', 'B12']
    const dataArea = ref([])
    const tableColumns = [
      { key: 'tahun_id', label: 'Tahun' },
      { key: 'prefix_area', label: 'area', sortable: true },
      { key: 'nama_area', label: 'nama area', sortable: true },
      { key: 'nama', label: 'Rencana Kerja Tahunan' },
      { key: 'target' },
      { key: 'deskripsi' },
      { key: 'actions' },
    ]
    return {
      targetOptions,
      tahunOptions,
      tableColumns,
      dataArea,
    }
  },
}
</script>

<style lang="scss" scoped>
.tahun-page-selector {
  width: 200px;
}
.rkt-page-selector {
  width: 400px;
}
.nameOfTheClass {
  max-width: 50px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
