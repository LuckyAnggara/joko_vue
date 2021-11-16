<template>
  <!-- <b-row class="match-height"> -->
  <section>
    <b-row>
      <b-col lg="4" sm="12">
        <b-card title="Pembelian Barang">
          <b-row>
            <b-col cols="12">
              <b-form-group label="Nomor Invoice" label-cols-md="3">
                <b-form-input v-model="form.no_invoice" type="text" placeholder="Nomor Invoice" required />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tanggal Invoice" label-cols-md="3">
                <b-form-datepicker v-model="form.tanggal_invoice" locale="id" placeholder="Tanggal Invoice" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Nama Supplier" label-cols-md="3">
                <b-form-input v-model="form.nama_supplier" type="text" placeholder="Nama Supplier" required />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Keterangan" label-cols-md="3">
                <b-form-textarea v-model="form.keterangan" type="text" placeholder="Keterangan" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Lampiran" label-cols-md="3">
                <b-form-file @change="uploadFiles" placeholder="Pilih data" drop-placeholder="Drop file disini..." ref="file_input">
                  <template slot="file-name" slot-scope="{ names }">
                    <b-badge variant="dark">{{ names[0] }}</b-badge>
                    <b-badge v-if="names.length > 1" variant="dark" class="ml-1"> + {{ names.length - 1 }} More files </b-badge>
                  </template>
                </b-form-file>
              </b-form-group>
            </b-col>

            <b-col cols="2" class="mt-2" md="6" sm="12" offset-lg="3">
              <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="mb-75" block type="submit" @click="store">
                Proses
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="8" sm="12">
        <b-card title="Detail Pembelian">
          <b-form-group label="Nama Barang" label-cols-md="3">
            <v-select v-model="barang" :reduce="x => x.id" placeholder="Nama Barang" label="nama" :options="barangOption" @input="showModal" />
          </b-form-group>
          <b-table
            ref="refTable"
            small
            responsive
            :fields="tableColumns"
            :items="form.data_barang"
            show-empty
            empty-text="Tidak ada data"
            class="position-relative"
          >
            <template #cell(no)="data">
              <span>
                {{ data.index + 1 }}
              </span>
            </template>

            <!-- Column: Actions -->
            <template #cell(actions)="data">
              <div class="text-nowrap">
                <feather-icon icon="TrashIcon" size="16" class="mx-1" @click="del(data.index)" />
              </div>
            </template>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      id="modal-pembelian"
      scrollable
      hide-backdrop
      ok-only
      centered
      no-close-on-backdrop
      content-class="shadow"
      title="Detail Pembelian"
      ok-variant="success"
      ok-title="Submit"
      @ok="tambah"
      @hidden="resetModal"
    >
      <template v-if="barangSelect">
        <b-col cols="12">
          <b-form-group label="Nama" label-cols-md="3">
            <b-form-input v-model="barangSelect.nama" type="text" placeholder="Nama Barang" readonly />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Satuan" label-cols-md="3">
            <b-form-input v-model="barangSelect.satuan" type="text" placeholder="Satuan" readonly />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Jumlah Pembelian" label-cols-md="3">
            <b-form-input v-model="barangSelect.jumlah" value="0" type="number" placeholder="Jumlah Pembelian" />
          </b-form-group>
        </b-col>
      </template>
    </b-modal>
  </section>
</template>

<script>
import { BFormTextarea, BModal, BTable, BBadge, BFormFile, BCard, BRow, BCol, BButton, BFormInput, BFormGroup, BFormDatepicker } from 'bootstrap-vue'

import { ref } from '@vue/composition-api'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'

export default {
  components: {
    BFormTextarea,
    BModal,
    BTable,
    BCard,
    BRow,
    BCol,
    BButton,
    BFormInput,
    BFormGroup,
    BFormDatepicker,
    BBadge,
    BFormFile,
    vSelect,
  },
  directives: {
    Ripple,
  },
  computed: {
    barangOption() {
      return this.$store.getters['app-barang/getBarang']
    },
  },
  mounted() {
    this.loadBarang()
  },
  methods: {
    loadBarang() {
      this.$store.dispatch('app-barang/fetchBarang').then(res => {
        this.$store.commit('app-barang/SET_BARANG', res.data)
      })
    },
    showModal() {
      this.barangSelect = this.barangOption.find(x => x.id === this.barang)
      this.barangSelect.jumlah = 0
      this.$bvModal.show('modal-pembelian')
    },
    /* eslint-disable */
    uploadFiles(e) {
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.form.lampiran.push(selectedFiles[i])
      }
    },
    /* eslint-enable */
    success() {
      this.$swal({
        title: 'Success!',
        text: 'Pembelian berhasil di proses!!',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    },
    resetModal() {
      this.barangSelect = {
        nama: null,
        satuan: null,
        jumlah: 0,
      }
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
      const b = this.form
      if (
        b.no_invoice === null ||
        b.no_invoice === '' ||
        b.tanggal_invoice === null ||
        b.tanggal_invoice === '' ||
        b.nama_supplier === null ||
        b.nama_supplier === '' ||
        b.data_barang.length <= 0
      ) {
        this.$swal({
          title: 'Oppss!',
          text: 'Data belum lengkap',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        return
      }
      this.$swal({
        title: 'Proses ?',
        text: 'Pembelian barang akan di proses !',
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
          this.$store.dispatch('app-barang/storePembelian', this.form).then(res => {
            if (res.status === 200) {
              const file = new FormData()
              for (let i = 0; i < this.form.lampiran.length; i += 1) {
                file.append('lampiran[]', this.form.lampiran[i])
              }
              file.append('id', res.data.id)
              file.append('user_id', this.userData.id)

              this.$store.dispatch('app-barang/storeLampiranPembelian', file).then(x => {
                if (x.status === 200) {
                  this.success()
                  this.$router.push({ name: 'barang-daftar' })
                }
              })
            } else {
              this.error(res.status)
            }
          })
        }
      })
    },
    tambah(x) {
      x.preventDefault()
      if (this.barangSelect.jumlah <= 0) {
        this.$swal({
          title: 'Opss!',
          text: 'Jumlah barang 0',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        return
      }
      const b = {
        id: this.barangSelect.id,
        nama: this.barangSelect.nama,
        satuan: this.barangSelect.satuan,
        jumlah: this.barangSelect.jumlah,
      }
      this.form.data_barang.push(b)
      this.$nextTick(() => {
        this.$bvModal.hide('modal-pembelian')
      })
      this.resetModal()
    },
    del(i) {
      this.form.data_barang.splice(i, 1)
    },
  },
  setup() {
    const barang = null
    const barangSelect = {
      nama: null,
      satuan: null,
      jumlah: 0,
    }
    const title = ref('Store data Barang .... ')
    const show = ref(false)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const tableColumns = [{ key: 'no', label: '#' }, { key: 'nama', label: 'NAMA BARANG' }, { key: 'satuan' }, { key: 'jumlah' }, { key: 'actions' }]
    const form = ref({
      no_invoice: null,
      tanggal_invoice: null,
      data_barang: [],
      nama_supplier: null,
      keterangan: null,
      lampiran: [],
      user_data: JSON.parse(localStorage.getItem('userData')),
    })

    return {
      barang,
      barangSelect,
      tableColumns,
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
