<template>
  <b-row v-if="fake">
    <b-col lg="12" sm="12">
      <b-card title="Susunan Tim dan Anggaran" footer-tag="footer">
        <b-card-body>
          <b-row v-for="(tim, index) in fake.susunan_tim" :key="tim.id">
            <b-col cols="6" lg="6" md="6" sm="12">
              <h5 class="mt-2">{{ tim.pegawai.nama }} - {{ tim.pegawai.jabatan.nama }}</h5>
              <span class="mb-1">({{ tim.peran.nama }})</span>
              <!-- <b-form-input :value="tim.pegawai.nama" plaintext /> -->
            </b-col>
            <b-col cols="6" lg="6" md="6" sm="12">
              <p class="mt-2">
                {{ $moment(tim.anggaran.tanggal_berangkat).format('DD MMMM YYYY') }} - {{ $moment(tim.anggaran.tanggal_kembali).format('DD MMMM YYYY') }}
              </p>
            </b-col>

            <b-col cols="12" lg="12" md="12" sm="12">
              <b-table small :fields="tableCol" :items="[...tim.anggaran]" responsive bordered>
                <template #cell(hari)="data">
                  <span>{{ data.item.jumlah_hari }}</span>
                </template>
                <template #cell(uang_harian)="data">
                  <span>{{ formatRupiah(data.item.uang_harian) }}</span>
                </template>
                <template #cell(malam)="data">
                  <span>{{ data.item.jumlah_malam }}</span>
                </template>
                <template #cell(uang_hotel)="data">
                  <span>{{ formatRupiah(data.item.uang_hotel) }}</span>
                </template>
                <template #cell(udara)="data">
                  <span>{{ formatRupiah(data.item.udara) }}</span>
                </template>
                <template #cell(laut)="data">
                  <span>{{ formatRupiah(data.item.laut) }}</span>
                </template>
                <template #cell(darat)="data">
                  <span>{{ formatRupiah(data.item.darat) }}</span>
                </template>
                <template #cell(taksi_jakarta)="data">
                  <span>{{ formatRupiah(data.item.taksi_jakarta) }}</span>
                </template>
                <template #cell(taksi_provinsi)="data">
                  <span>{{ formatRupiah(data.item.taksi_provinsi) }}</span>
                </template>
                <template #cell(representatif)="data">
                  <span>{{ formatRupiah(data.item.representatif) }}</span>
                </template>
                <template #cell(total)="data">
                  <span>{{ formatRupiah(data.item.total) }}</span>
                </template>
                <template #cell(actions)="data">
                  <div class="text-nowrap">
                    <b-link @click="showModal(data.item.id)" class="font-weight-bold">
                      <feather-icon icon="PrinterIcon" size="24" class="mx-1" />
                    </b-link>
                    <b-dropdown variant="link" toggle-class="p-0" no-caret boundary="window">
                      <template #button-content>
                        <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                      </template>
                      <b-dropdown-item v-if="edit" @click="editModal(tim, index)" class="font-weight-bold">
                        <feather-icon icon="" />
                        <span class="align-middle ml-50">Edit</span>
                      </b-dropdown-item>
                      <b-dropdown-item v-if="edit" @click="hapusTim(tim, index)" class="font-weight-bold">
                        <feather-icon icon="" />
                        <span class="align-middle ml-50">Hapus</span>
                      </b-dropdown-item>
                      <b-dropdown-divider />
                      <b-dropdown-item :href="dopGet('print')" class="font-weight-bold" target="_blank">
                        <feather-icon icon="" />
                        <span class="align-middle ml-50">Download DOP</span>
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                </template>
              </b-table>
            </b-col>
          </b-row>
          <b-button class="mt-2" v-if="edit" v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="secondary" @click="tambahModal()">Tambah</b-button>

          <hr />
          <b-row class="mt-2">
            <b-col cols="3">
              <h4>Total Anggaran</h4>
            </b-col>
            <b-col cols="3">
              <h4>{{ formatRupiah(totalAnggaran) }}</h4>
            </b-col>
          </b-row>
          <b-row class="mt-2" v-if="fake.status !== 'RENCANA' && (userData.role === 'ADMIN KEUANGAN' || userData.role === 'VERIFIKATOR PPK')">
            <b-col cols="12">
              <b-button variant="outline-primary" @click="printRab"> Print RAB </b-button>
            </b-col>
          </b-row>
          <b-row class="mt-4">
            <section v-if="fake.status === 'RENCANA'">
              <b-button variant="outline-warning" class="ml-1" @click="editTim()" v-if="!edit"> Edit </b-button>
              <b-button variant="outline-danger" class="ml-1" @click="batal()" v-if="edit"> Batal </b-button>
              <b-button variant="outline-primary" class="ml-1" v-if="edit" @click="ubah()"> Simpan </b-button>
            </section>
          </b-row>
          <small v-if="fake.status_realisasi === 'SUDAH' ? true : false"
            >Mengubah data Tim dan Anggaran, saat Perjadin sudah dilakukan Input Realisasi akan menghapus Realisasi Eksisting</small
          >
        </b-card-body>
        <template #footer>
          <small
            ><em
              >Created By {{ form.user.pegawai.nama }} - {{ form.bidang.nama }} at <strong>{{ $moment(form.created_at).format('DD MMMM YYYY') }}</strong></em
            ></small
          >
          <br />
          <small
            ><em
              >Updated at <strong>{{ $moment(form.updated_at).format('DD MMMM YYYY') }}</strong></em
            ></small
          >
        </template>
      </b-card>
    </b-col>
    <b-modal
      id="modal-alatangkut"
      size="md"
      scrollable
      hide-backdrop
      ok-only
      centered
      no-close-on-backdrop
      content-class="shadow"
      title="Print Surat Perjalanan Dinas "
      ok-variant="danger"
      ok-title="Tutup"
      @hidden="alatangkut = null"
    >
      <b-row>
        <b-col cols="12">
          <b-form-group label="Alat Angkut" label-cols-md="3">
            <b-form-input v-model="sp.alatangkut" placeholder="Alat angkut yang digunakan Contoh : Pesawat" />
          </b-form-group>
          <b-form-group label="Tanggal Surat" label-cols-md="3">
            <b-form-datepicker
              boundary="window"
              locale="id"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              v-model="sp.tanggal"
              placeholder="Tanggal Surat"
            />
          </b-form-group>
          <b-form-group label="Tempat Surat" label-cols-md="3">
            <b-form-input v-model="sp.tempat" placeholder="Tempat surat dikeluarkan" />
          </b-form-group>
          <b-button :href="spdGet(spdId, sp)" target="_blank" class="font-weight-bold">
            <feather-icon icon="PrinterIcon" size="24" class="mx-1" />
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal id="modal-tambah-tim" size="lg" no-close-on-backdrop content-class="shadow" title="Input Realisasi " hide-footer lazy>
      <form-wizard
        color="#7367F0"
        :subtitle="null"
        layout="vertical"
        finish-button-text="Submit"
        back-button-text="Previous"
        class="wizard-vertical mb-1"
        @on-complete="tambahPegawai"
      >
        <h4 slot="title">Total Anggaran {{ formatRupiah(totalBaru) }}</h4>
        <tab-content title="Data Pegawai" :before-change="cekPegawai">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">
                Data Pegawai
              </h5>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Nama Pegawai" label-cols-md="4">
                <v-select v-model="tambah.pegawai" placeholder="Nama Pegawai" label="nama" :options="pegawaiOption" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Nomor Induk Pegawai" label-cols-md="4">
                <b-form-input :value="tambah.pegawai === null ? null : tambah.pegawai.nip" disabled />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Jabatan" label-cols-md="4">
                <b-form-input :value="tambah.pegawai === null ? null : tambah.pegawai.jabatan.nama" disabled />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Peran" label-cols-md="4">
                <v-select v-model="tambah.peran" placeholder="Peran" label="nama" :options="peranOption" />
              </b-form-group>
            </b-col>
          </b-row>
        </tab-content>
        <tab-content title="Tanggal" :before-change="cekTanggal">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">
                Tanggal Pelaksanaan
              </h5>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tanggal Berangkat" label-cols-md="4">
                <b-form-datepicker
                  :value="fake.tanggal_berangkat"
                  v-model="anggaran.tanggal_berangkat"
                  locale="id"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  placeholder="Tanggal Berangkat"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tanggal Kembali" label-cols-md="4">
                <b-form-datepicker
                  :value="fake.tanggal_kembali"
                  v-model="anggaran.tanggal_kembali"
                  locale="id"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  placeholder="Tanggal Kembali"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </tab-content>
        <tab-content title="Uang Harian">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">
                Uang Harian
              </h5>
            </b-col>
            <!-- Render Tabs, supply a unique `key` to each tab -->
            <b-col cols="12">
              <b-form-group label="Jumlah Hari" label-cols-md="4">
                <b-form-input v-model="anggaran.jumlah_hari" type="number" placeholder="0" />
              </b-form-group>
              <b-form-group label="Nominal" label-cols-md="4">
                <b-form-input v-model="anggaran.uang_harian" type="number" placeholder="Rp. 0" />
              </b-form-group>
              <hr />
              <b-form-group label="Total" label-cols-md="4">
                <b-form-input
                  :value="formatRupiah(parseFloat(anggaran.jumlah_hari) * parseFloat(anggaran.uang_harian))"
                  type="text"
                  placeholder="Rp. 0"
                  readonly
                />
              </b-form-group>
            </b-col>
          </b-row>
        </tab-content>
        <tab-content title="Uang Hotel">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">
                Uang Hotel
              </h5>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Jumlah Malam" label-cols-md="4">
                <b-form-input v-model="anggaran.jumlah_malam" type="number" placeholder="0" />
              </b-form-group>
              <b-form-group label="Nominal" label-cols-md="4">
                <b-form-input v-model="anggaran.uang_hotel" type="number" placeholder="Rp. 0" />
              </b-form-group>
              <hr />
              <b-form-group label="Total" label-cols-md="4">
                <b-form-input
                  :value="formatRupiah(parseFloat(anggaran.jumlah_malam) * parseFloat(anggaran.uang_hotel))"
                  type="text"
                  placeholder="Rp. 0"
                  readonly
                />
              </b-form-group>
            </b-col>
          </b-row>
        </tab-content>
        <tab-content title="Transport">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">
                Transport
              </h5>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Udara" label-cols-md="4">
                <b-form-input v-model="anggaran.udara" type="number" placeholder="0" />
              </b-form-group>

              <b-form-group label="Darat" label-cols-md="4">
                <b-form-input v-model="anggaran.darat" type="number" placeholder="Rp. 0" />
              </b-form-group>
              <b-form-group label="Laut" label-cols-md="4">
                <b-form-input v-model="anggaran.laut" type="number" placeholder="Rp. 0" />
              </b-form-group>
            </b-col>
          </b-row>
        </tab-content>
        <tab-content title="Taksi">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">
                Taksi
              </h5>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Taksi Jakarta" label-cols-md="4">
                <b-form-input v-model="anggaran.taksi_jakarta" type="number" placeholder="0" />
              </b-form-group>

              <b-form-group label="Taksi Provinsi" label-cols-md="4">
                <b-form-input v-model="anggaran.taksi_provinsi" type="number" placeholder="Rp. 0" />
              </b-form-group>
            </b-col>
          </b-row>
        </tab-content>
        <tab-content title="Representatif">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">
                Representatif
              </h5>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Representatif" label-cols-md="4">
                <b-form-input v-model="anggaran.representatif" type="number" placeholder="0" />
              </b-form-group>
            </b-col>
          </b-row>
        </tab-content>
      </form-wizard>
    </b-modal>
  </b-row>
</template>

<script>
import { ref } from '@vue/composition-api'

import {
  BDropdown,
  BDropdownItem,
  BDropdownDivider,
  BLink,
  BModal,
  BFormDatepicker,
  BFormGroup,
  BFormInput,
  BButton,
  BCard,
  BCardBody,
  BRow,
  BCol,
  BTable,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { FormWizard, TabContent } from 'vue-form-wizard'
import { spdGet, dopGet, formatRupiah } from '@core/utils/filter'
import _ from 'lodash'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BDropdown,
    BDropdownItem,
    BDropdownDivider,

    BLink,
    BModal,
    BFormDatepicker,
    BFormGroup,
    BFormInput,
    BButton,
    BCard,
    BRow,
    BCol,
    BCardBody,
    BTable,
    FormWizard,
    TabContent,
    vSelect,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },
  directives: {
    Ripple,
  },

  computed: {
    form() {
      return this.$store.getters['app-perjadin/getDetail']
    },
    lampiran_sp() {
      return this.fake.lampiran.filter(x => x.jenis === 'SP')
    },
    pegawaiOption() {
      return this.$store.getters['app-general/getPegawai']
    },
    peranOption() {
      return this.$store.getters['app-general/getPeran']
    },
    totalAnggaran() {
      let total = 0
      this.fake.susunan_tim.forEach(x => {
        total += x.anggaran.total
      })
      return total
    },
    totalBaru() {
      const b = this.anggaran
      const harian = parseFloat(b.uang_harian) * parseFloat(b.jumlah_hari)
      const hotel = parseFloat(b.uang_hotel) * parseFloat(b.jumlah_malam)
      const total =
        parseFloat(harian) +
        parseFloat(hotel) +
        parseFloat(b.udara) +
        parseFloat(b.laut) +
        parseFloat(b.darat) +
        parseFloat(b.taksi_jakarta) +
        parseFloat(b.taksi_provinsi) +
        parseFloat(b.representatif)
      // b.total = total
      return total
    },
  },
  mounted() {
    this.fake = _.cloneDeep(this.form)
  },
  methods: {
    cekPegawai() {
      if (this.tambah.pegawai === null || this.tambah.pegawai === '' || this.tambah.peran === null) {
        this.$swal({
          title: 'Opss!',
          text: 'Data pegawai belum lengkap',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        return false
      }
      return true
    },
    cekTanggal() {
      if (
        this.anggaran.tanggal_berangkat === null ||
        this.anggaran.tanggal_berangkat === '' ||
        this.anggaran.tanggal_kembali === null ||
        this.anggaran.tanggal_kembali === ''
      ) {
        this.$swal({
          title: 'Opss!',
          text: 'Tanggal pelaksaan belum lengkap',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        return false
      }
      return true
    },
    editModal(x, i) {
      this.indexEdit = i
      this.tambah.pegawai = _.cloneDeep(x.pegawai)
      this.tambah.peran = _.cloneDeep(x.peran)
      this.anggaran = _.cloneDeep(x.anggaran)
      this.$bvModal.show('modal-tambah-tim')
    },
    hapusTim(x, i) {
      console.info(x)
      if (x.status_realisasi === 'SUDAH') {
        this.$swal({
          title: 'Konfirmasi',
          text: `${x.pegawai.nama} sudah melakukan Realisasi, apa anda yakin tetap menghapus ?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.isConfirmed) {
            this.fake.susunan_tim.splice(i, 1)
            this.showToast('success', 'top-center', 'Data berhasil di hapus')
          }
        })
      } else {
        this.fake.susunan_tim.splice(i, 1)
        this.showToast('success', 'top-center', 'Data berhasil di hapus')
      }
    },
    showToast(variant, position, text) {
      this.$toast(
        {
          component: ToastificationContent,
          props: {
            title: 'Berhasil',
            icon: 'CheckIcon',
            text,
            variant,
          },
        },
        {
          position,
        },
      )
    },
    dopGet,
    spdGet,
    formatRupiah,
    tambahModal() {
      this.indexEdit = null
      this.$bvModal.show('modal-tambah-tim')
    },
    tambahPegawai() {
      if (this.indexEdit !== null) {
        this.fake.susunan_tim.splice(this.indexEdit, 1)
      }
      this.anggaran.total = this.totalBaru
      this.tambah.anggaran = this.anggaran
      this.fake.susunan_tim.push(this.tambah)
      this.$bvModal.hide('modal-tambah-tim')
    },
    showModal(id) {
      this.spdId = id
      this.$bvModal.show('modal-alatangkut')
    },
    print_spd(id, alat) {
      this.spdGet(id, alat)
      this.$bvModal.hide('modal-alatangkut')
    },
    printRab() {
      this.$swal({
        title: 'Opss!',
        text: 'Fitur ini belum tersedia',
        icon: 'error',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    },
    batal() {
      this.edit = !this.edit
      this.fake = _.cloneDeep(this.form)
    },
    editTim() {
      if (this.fake.status_realisasi === 'SUDAH') {
        this.$swal({
          title: 'Kofirmasi?',
          text: 'Perjadin sudah di REALISASI apakah akan tetap melakukan perubahan ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya',
          customClass: {
            confirmButton: 'btn btn-primary',
            cancelButton: 'btn btn-outline-danger ml-1',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.isConfirmed) {
            this.edit = !this.edit
          }
        })
      }
    },
    ubah() {
      let text = 'Data Tim dan Anggaran akan di ubah ?'
      if (this.fake.status_realisasi === 'SUDAH') {
        text = 'Mengubah data Tim dan Anggaran, saat Perjadin sudah dilakukan Input Realisasi akan menghapus Realisasi Eksisting, apa anda Yakin ?'
      }
      this.$swal({
        title: 'Ubah Data ?',
        text,
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
          this.fake.total_anggaran = this.totalAnggaran
          this.$store.dispatch('app-perjadin/editTim', this.fake).then(res => {
            if (res.status === 200) {
              this.$store.commit('app-perjadin/SET_DETAIL', this.fake)
              this.$swal({
                title: 'Sukses!',
                text: 'Tim dan Anggaran berhasil di ubah',
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              this.edit = !this.edit
            }
          })
        }
      })
    },
  },
  setup() {
    const indexEdit = ref(null)
    const edit = ref(false)
    const fake = ref(null)
    const spdId = ref(null)
    const sp = ref({
      alatangkut: null,
      tanggal: null,
      tempat: null,
    })
    const tambah = ref({
      pegawai: {
        nip: null,
        nama: null,
        jabatan: {
          nama: null,
        },
      },
      status_realisasi: 'BELUM',
      peran: null,
    })
    const anggaran = ref({
      jumlah_hari: 0,
      jumlah_malam: 0,
      uang_harian: 0,
      uang_hotel: 0,
      tanggal_berangkat: null,
      tanggal_kembali: null,
      taksi_jakarta: 0,
      taksi_provinsi: 0,
      representatif: 0,
      darat: 0,
      laut: 0,
      udara: 0,
      total: 0,
    })
    const userData = JSON.parse(localStorage.getItem('userData'))
    const tableCol = [
      { key: 'hari' },
      { key: 'uang_harian' },
      { key: 'malam' },
      { key: 'uang_hotel' },
      { key: 'udara' },
      { key: 'laut' },
      { key: 'darat' },
      { key: 'taksi_jakarta' },
      { key: 'taksi_provinsi' },
      { key: 'representatif' },
      { key: 'total' },
      { key: 'actions' },
    ]
    return {
      tambah,
      fake,
      indexEdit,
      edit,
      spdId,
      sp,
      anggaran,
      userData,
      tableCol,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
