<template>
  <section>
    <b-overlay :show="show" rounded="lg" variant="transparent" blur="15px" opacity="0.70">
      <div class="mb-2">
        <!-- Table Top -->
        <b-card>
          <b-row>
            <b-col cols="6" md="2" sm="6" class="mb-2">
              <b-button variant="primary" class="btn-icon" size="md" @click="tambah"> <feather-icon icon="PlusIcon" /> Tambah User </b-button>
            </b-col>
          </b-row>
          <b-table
            small
            bordered
            :busy="isBusy"
            :fields="tableColumns"
            :items="dataUser"
            :sort="true"
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
              <span> {{ data.index + 1 }} </span>
            </template>
            <template #cell(pegawai)="data">
              <span> {{ data.item.pegawai.nama }} </span>
            </template>
            <template #cell(bidang)="data">
              <span> {{ data.item.bidang.nama }} </span>
            </template>

            <template #cell(actions)="data">
              <b-dropdown boundary="viewport" variant="link" no-caret>
                <template #button-content>
                  <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                </template>

                <b-dropdown-item @click="edit(data.item.id)">
                  <feather-icon icon="FileTextIcon" />
                  <span class="align-middle ml-50">Edit</span>
                </b-dropdown-item>

                <b-dropdown-item @click="resetPassword(data.item.id)">
                  <feather-icon icon="FileTextIcon" />
                  <span class="align-middle ml-50">Reset Password</span>
                </b-dropdown-item>

                <b-dropdown-item @click="hapus(data.item.id)">
                  <feather-icon icon="FileTextIcon" />
                  <span class="align-middle ml-50">Hapus</span>
                </b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>
        </b-card>
      </div>

      <b-modal
        id="modal-tambah-user"
        scrollable
        ok-only
        centered
        size="lg"
        no-close-on-backdrop
        content-class="shadow"
        title="Tambah Data User"
        ok-variant="primary"
        ok-title="Submit"
        @ok="proses"
        @hidden="hidden"
        lazy
      >
        <b-form @submit="proses">
          <b-row>
            <b-col cols="12">
              <b-form-group label="NIP Pegawai" label-cols-md="3">
                <b-form-input
                  v-model="userBaru.nip"
                  type="number"
                  @blur="cariPegawai"
                  @keyup="userBaru.username = userBaru.nip"
                  placeholder="Masukan NIP Pegawai"
                  required
                />
                <small v-if="info" class="text-danger">NIP Pegawai tidak di temukan</small>
              </b-form-group>
            </b-col>
            <b-col cols="12" class="mb-6">
              <b-form-group label="Role" label-cols-md="3">
                <v-select boundry="window" v-model="userBaru.role" placeholder="User Role" label="nama" :options="roleOption" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Nama Pegawai" label-cols-md="3">
                <b-form-input :value="pegawai.nama !== null ? pegawai.nama : ''" type="text" placeholder="Nama Pegawai" disabled />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Wilayah / Bagian" label-cols-md="3">
                <b-form-input :value="pegawai.bidang.nama !== null ? pegawai.bidang.nama : ''" type="text" placeholder="Wilayah / Bagian Pegawai" disabled />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Username" label-cols-md="3">
                <b-form-input v-model="userBaru.username" type="number" placeholder="Username" required />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-modal>
      <template #overlay>
        <div class="text-center">
          <feather-icon icon="Edit3Icon" size="4x" />
          <h4>User Baru sedang di buat. mohon tunggu ....</h4>
        </div>
      </template>
    </b-overlay>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import vSelect from 'vue-select'

import { BForm, BOverlay, BFormGroup, BModal, BSpinner, BCard, BDropdown, BDropdownItem, BRow, BButton, BCol, BFormInput, BTable } from 'bootstrap-vue'

export default {
  components: {
    BForm,
    BOverlay,
    BModal,
    BFormGroup,

    BFormInput,
    BSpinner,
    BCard,
    BDropdown,
    BDropdownItem,
    BRow,
    BButton,

    BCol,
    BTable,
    vSelect,
  },
  computed: {
    dataPegawai() {
      return this.$store.getters['app-general/getPegawai']
    },
    dataUser() {
      return this.$store.getters['app-superuser/getUserData']
    },
  },
  methods: {
    cariPegawai() {
      const d = this.dataPegawai.find(x => x.nip === this.userBaru.nip)
      console.info(d)
      console.info(this.userBaru.nip)
      if (d) {
        const b = this.dataUser.find(x => x.pegawai_id === d.id)
        if (b) {
          this.$swal({
            title: 'User sudah ada!',
            text: 'User yang akan di Daftarkan sudah terdaftar',
            icon: 'info',
          })
          this.userBaru.nip = ''
          this.pegawai = {
            nama: null,
            bidang: {
              nama: null,
            },
          }
        } else {
          this.pegawai = d
          this.userBaru.pegawai = d
        }
      } else {
        this.info = !this.info
        this.pegawai = {
          nama: null,
          bidang: {
            nama: null,
          },
        }
      }
    },
    tambah() {
      this.$bvModal.show('modal-tambah-user')
    },
    edit(id) {
      console.info(id)
    },
    resetPassword(id) {
      console.info(id)
    },
    hapus(id) {
      console.info(id)
    },
    hidden() {
      this.pegawai = {
        nama: null,
        bidang: {
          nama: null,
        },
      }
      this.userBaru = {
        username: null,
        nip: null,
        pegawai: null,
        role: null,
      }
    },
    proses(bvModalEvt) {
      bvModalEvt.preventDefault()
      if (this.userBaru.nip === null || this.userBaru.role === null || this.userBaru.username === null) {
        this.$swal({
          title: 'Opss',
          text: 'Form belum lengkap',
          icon: 'warning',
        })
      } else {
        this.$swal({
          title: 'Proses ?',
          text: `User ${this.pegawai.nama} akan dibuat!`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ok!',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.isConfirmed) {
            this.$bvModal.hide('modal-tambah-user')
            this.show = !this.show
            this.$store.dispatch('app-superuser/storeUser', this.userBaru).then(res => {
              this.show = !this.show
              if (res.status === 200) {
                this.$store.commit('app-superuser/UPDATE_USER_DATA', res.data)
                this.$swal({
                  title: 'Berhasil',
                  text: 'User baru berhasil dibuat',
                  icon: 'success',
                })
              }
            })
          }
        })
      }
    },
    loadData() {
      if (this.tahun !== null) {
        this.isBusy = !this.isBusy
        this.$store.dispatch('app-superuser/fetchUserData').then(res => {
          this.isBusy = !this.isBusy
          this.$store.commit(
            'app-superuser/SET_USER_DATA',
            res.data.filter(x => x.role !== 'SUPERUSER'),
          )
        })
      }
    },
    loadPegawai() {
      this.$store.dispatch('app-general/fetchPegawai').then(res => {
        this.$store.commit('app-general/SET_PEGAWAI', res.data)
      })
    },
  },
  mounted() {
    this.loadData()

    this.loadPegawai()
  },
  setup() {
    const show = ref(false)
    const info = ref(false)
    const userData = JSON.parse(localStorage.getItem('userData'))
    const isBusy = false
    const tableColumns = [
      { key: 'id', label: '#' },
      { key: 'username', sortable: true },
      { key: 'pegawai', sortable: true },
      { key: 'bidang', label: 'Wilayah / Bagian', sortable: true },
      { key: 'role', sortable: true },
      { key: 'actions' },
    ]
    const pegawai = ref({
      nama: null,
      bidang: {
        nama: null,
      },
    })
    const userBaru = ref({
      username: null,
      nip: null,
      pegawai: null,
      role: null,
    })
    const roleOption = [
      {
        nama: 'USER',
        ability: [
          { action: 'manage', subject: 'user' },
          { action: 'manage', subject: 'auth' },
          { action: 'manage', subject: 'dashboard_user' },
          { action: 'manage', subject: 'permintaan_persediaan' },
          { action: 'manage', subject: 'kegiatan' },
          { action: 'manage', subject: 'perjadin' },
          { action: 'manage', subject: 'laporan' },
          { action: 'manage', subject: 'data_pegawai' },
          { action: 'manage', subject: 'mak' },
          { action: 'manage', subject: 'revisi_anggaran' },
        ],
      },
      {
        nama: 'BENDAHARA',
        ability: [
          { action: 'manage', subject: 'bendahara' },
          { action: 'manage', subject: 'auth' },
          { action: 'manage', subject: 'dashboard_bendahara' },
          { action: 'manage', subject: 'kegiatan' },
          { action: 'manage', subject: 'perjadin' },
        ],
      },
      {
        nama: 'PPK',
        ability: [
          { action: 'manage', subject: 'auth' },
          { action: 'manage', subject: 'dashboard_ppk' },
          { action: 'manage', subject: 'kegiatan' },
          { action: 'manage', subject: 'perjadin' },
        ],
      },
      {
        nama: 'ADMIN KEUANGAN',
        ability: [
          { action: 'manage', subject: 'admin_keuangan' },
          { action: 'manage', subject: 'auth' },
          { action: 'manage', subject: 'dashboard_keuangan' },
          { action: 'manage', subject: 'kegiatan' },
          { action: 'manage', subject: 'perjadin' },
          { action: 'manage', subject: 'revisi_anggaran' },
        ],
      },
      {
        nama: 'ADMIN KEPEGAWAIAN',
        ability: [
          { action: 'manage', subject: 'admin_kepegawaian' },
          { action: 'manage', subject: 'data_pegawai' },
        ],
      },
      {
        nama: 'ADMIN UMUM',
        ability: [
          { action: 'manage', subject: 'admin_umum' },
          { action: 'manage', subject: 'auth' },
          { action: 'manage', subject: 'dashboard_umum' },
          { action: 'manage', subject: 'permintaan_persediaan' },
        ],
      },
    ]

    return {
      info,
      show,
      userData,
      userBaru,
      pegawai,
      isBusy,
      tableColumns,
      roleOption,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.barang-filter-select {
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
