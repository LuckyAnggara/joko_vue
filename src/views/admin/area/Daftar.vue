<template>
  <section>
    <b-row class="match-height">
      <b-col lg="12" cols="12">
        <b-card>
          <div class="mb-2">
            <!-- Table Top -->
            <b-row>
              <!-- Per Page -->
              <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                <label>Tahun Data</label>
                <v-select v-model="tahun" :options="tahunOptions" :clearable="false" class="per-page-selector d-inline-block ml-50 mr-3" />
              </b-col>
              <b-col cols="12" md="6">
                <b-button variant="primary" @click="showModal()">
                  Tambah Data
                </b-button>
              </b-col>
            </b-row>
          </div>
          <b-table ref="refTable" responsive primary-key="id" bordered striped :fields="tableColumns" :items="dataArea" empty-text="Tidak ada data">
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
          </b-table>
        </b-card>
      </b-col>
    </b-row>
    <div>
      <b-modal
        ref="tambah-modal"
        title="Tambah Data"
        @ok="submitStoreArea"
        @show="resetModal"
        centered
        no-close-on-backdrop
        no-close-on-esc
        ok-title="Submit"
        size="md"
      >
        <b-form-group label="Tahun" label-for="tahun" label-cols-md="4">
          <v-select v-model="form.tahun" placeholder="Tahun" :clearable="true" :options="tahunOptions" required />
        </b-form-group>
        <b-form-group label="Prefix Area" label-for="prefix-area" label-cols-md="4">
          <b-form-input placeholder="Prefix Area (Contoh : I, II, II)" v-model="form.prefix" type="text" />
        </b-form-group>
        <b-form-group label="Nama Area" label-for="nama-area" label-cols-md="4">
          <b-form-input placeholder="Nama Area" v-model="form.nama" type="text" />
        </b-form-group>
        <b-form-group label="Deskripsi" label-for="deskripsi" label-cols-md="4">
          <b-form-textarea placeholder="Deskripsi" v-model="form.deskripsi" type="text" />
        </b-form-group>
      </b-modal>
    </div>
  </section>
</template>

<script>
import store from '@/store'
import { ref } from '@vue/composition-api'

import { BCard, BRow, BCol, BFormGroup, BFormTextarea, BFormInput, BTable, VBModal, BButton, BModal } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'

export default {
  components: {
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
      form: {
        tahun: '',
        prefix: '',
        nama: '',
        deskripsi: '',
      },
    }
  },
  mounted() {
    this.loadArea()
    this.initTahun()
  },
  watch: {
    tahun() {
      this.updateData()
    },
  },
  methods: {
    updateData() {
      store.commit('app-admin/FILTER_LIST_AREA', this.tahun)
      this.dataArea = store.getters['app-admin/getListArea']
    },
    resetModal() {
      this.form.tahun = this.tahun
      this.form.nama = ''
      this.form.prefix = ''
      this.form.deskripsi = ''
    },
    submitStoreArea(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.form.tahun !== '' || this.form.prefix !== '' || this.form.nama !== '' || this.form.deskripsi !== '') {
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
    loadArea() {
      store.dispatch('app-admin/fetchListArea').then(res => {
        store.commit('app-admin/SET_LIST_AREA', res.data)
        this.updateData()
      })
    },
    initTahun() {
      const d = new Date()
      const y = d.getFullYear()
      this.tahun = y
    },
    showModal() {
      this.$refs['tambah-modal'].show()
    },
    store() {
      console.info('ok')
      store.dispatch('app-admin/storeArea', this.form).then(res => {
        store.commit('app-admin/UPDATE_AREA', res.data)
        if (res.status === 200) {
          this.$swal({
            icon: 'success',
            title: 'Sukses !',
            text: 'Area telah di tambahkan',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.updateData()
          this.$refs['tambah-modal'].hide()
        }
      })
    },
  },
  setup() {
    const tahunOptions = [2021, 2022, 2023, 2024]
    const dataArea = ref([])
    const tableColumns = [
      { key: 'tahun_id', label: 'Tahun' },
      { key: 'prefix_area', label: 'area' },
      { key: 'nama', label: 'nama area' },
      { key: 'deskripsi' },
      { key: 'actions' },
    ]
    return {
      tahunOptions,
      tableColumns,
      dataArea,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 200px;
}
.nameOfTheClass {
  max-width: 50px;
}

.rkt-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
