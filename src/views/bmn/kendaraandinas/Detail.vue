<template>
  <!-- <b-row class="match-height"> -->
  <section>
    <b-row class="match-height">
      <b-col lg="6" sm="12">
        <b-overlay :show="show" rounded="sm" variant="transparent" blur="5px" opacity="0.95">
          <b-form autocomplete="off" @submit.prevent @submit="store">
            <b-card title="Detail Barang">
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
                    Edit
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
    <b-row>
      <b-col lg="6" sm="12">
        <b-card title="Kartu Persediaan">
          <b-table
            ref="refTable"
            small
            :busy="isBusy"
            responsive
            :fields="tableColumns"
            :items="form.kartu_persediaan"
            :current-page="currentPage"
            :per-page="perPage"
            show-empty
            empty-text="Tidak ada data"
            class="position-relative"
          >
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #cell(id)="data">
              <span>
                {{ data.index + 1 }}
              </span>
            </template>
            <template #cell(tanggal)="data">
              <span>
                {{ $moment(data.item.created_at).format('DD MMMM YYYY') }}
              </span>
            </template>
          </b-table>
          <div class="mx-2 mb-2">
            <b-row>
              <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
                <span class="text-muted"> {{ dataMeta.from }} - {{ dataMeta.to }} dari {{ dataMeta.of }} data</span>
              </b-col>
              <!-- Pagination -->
              <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalData"
                  :per-page="perPage"
                  first-number
                  last-number
                  class="mb-0 mt-1 mt-sm-0"
                  prev-class="prev-item"
                  next-class="next-item"
                >
                  <template #prev-text>
                    <feather-icon icon="ChevronLeftIcon" size="18" />
                  </template>
                  <template #next-text>
                    <feather-icon icon="ChevronRightIcon" size="18" />
                  </template>
                </b-pagination>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BSpinner, BOverlay, BForm, BCard, BRow, BCol, BButton, BFormInput, BFormGroup, BTable, BPagination } from 'bootstrap-vue'

import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BSpinner,
    BOverlay,
    BCard,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BFormGroup,
    BTable,
    BPagination,
  },
  directives: {
    Ripple,
  },
  computed: {
    form() {
      return this.$store.getters['app-barang/getDetailBarang']
    },
    dataMeta() {
      const localItemsCount = this.$refs.refTable ? this.$refs.refTable.computedItems.length : 0
      return {
        from: this.perPage * (this.currentPage - 1) + (localItemsCount ? 1 : 0),
        to: this.perPage * (this.currentPage - 1) + localItemsCount,
        of: this.totalData,
      }
    },
    totalData() {
      return this.form.kartu_persediaan.length
    },
  },

  methods: {
    success() {
      this.$swal({
        title: 'Success!',
        text: 'Data berhasil di ubah!!',
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
        title: 'Edit ?',
        text: 'Data barang baru akan di perbarui !',
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
          this.form.user_data = this.userData
          this.show = !this.show
          this.$store.dispatch('app-barang/editBarang', this.form).then(res => {
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
    const title = ref('Mengubah Data .... ')
    const show = ref(false)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const tableColumns = [{ key: 'id', label: '#' }, { key: 'tanggal' }, { key: 'debit' }, { key: 'kredit' }, { key: 'saldo' }, { key: 'keterangan' }]
    const isBusy = false
    const perPage = ref(10)
    const currentPage = ref(1)
    const perPageOptions = [10, 25, 50, 100]

    return {
      title,
      show,
      userData,
      tableColumns,
      isBusy,
      perPage,
      currentPage,
      perPageOptions,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
