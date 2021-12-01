<template>
  <section>
    <b-overlay :show="show" rounded="lg" variant="transparent" blur="15px" opacity="0.70">
      <b-row>
        <b-col lg="12" sm="12">
          <b-card title="Realisasi Kegiatan" footer-tag="footer">
            <b-card-body>
              <b-row v-if="!proses">
                <b-col cols="12">
                  <b-form-group label="Nama Pegawai" label-cols-md="3">
                    <v-select v-model="selectedPegawai" placeholder="Nama Pegawai" :options="pegawaiOption" label="nama" @input="showModal()" />
                  </b-form-group>
                </b-col>
              </b-row>
              <hr />
              <b-row v-for="(tim, index) in data.realisasi" :key="tim.id" class="mb-2">
                <b-col cols="3" lg="3" md="3" sm="12">
                  <h5 class="mt-2">{{ tim.pegawai.nama }}</h5>
                  <!-- <b-form-input :value="tim.pegawai.nama" plaintext /> -->
                </b-col>
                <b-col cols="3" lg="3" md="3" sm="12">
                  <b-form-group label="Tanggal Berangkat">
                    <b-form-input :value="$moment(tim.tanggal_berangkat).format('DD, MMMM YYYY')" size="sm" readonly />
                  </b-form-group>
                </b-col>
                <b-col cols="3" lg="3" md="3" sm="12">
                  <b-form-group label="Tanggal Berangkat">
                    <b-form-input :value="$moment(tim.tanggal_kembali).format('DD, MMMM YYYY')" size="sm" readonly />
                  </b-form-group>
                </b-col>
                <b-col cols="12" lg="12" md="12" sm="12">
                  <b-table small responsive :fields="tableCol" :items="[...tim]" striped bordered>
                    <template #cell(total_harian)>
                      <ul class="list-unstyled" v-for="i in tim.uang_harian" :key="i.id">
                        <li>
                          -
                          {{ i.jumlah_hari }}
                          @
                          {{ formatRupiah(i.uang_harian) }} = {{ formatRupiah(parseFloat(i.jumlah_hari) * parseFloat(i.uang_harian)) }}
                          <b-badge variant="light-success" v-if="i.hari_riil === true">
                            riil
                          </b-badge>
                        </li>
                      </ul>
                      <hr />
                      {{ formatRupiah(tim.total_harian) }}
                    </template>
                    <template #cell(total_hotel)>
                      <ul class="list-unstyled">
                        <li v-for="i in tim.uang_hotel" :key="i.id">
                          -
                          {{ i.jumlah_malam }}
                          @
                          {{ formatRupiah(i.uang_hotel) }} = {{ formatRupiah(parseFloat(i.jumlah_malam) * parseFloat(i.uang_hotel)) }}
                          <b-badge variant="light-danger">
                            {{ i.jenis_hotel === 0 ? 'FULL' : '30%' }}
                          </b-badge>
                          <b-badge variant="light-success" v-if="i.hotel_riil === true">
                            riil
                          </b-badge>
                        </li>
                      </ul>
                      <hr />
                      {{ formatRupiah(tim.total_hotel) }}
                    </template>
                    <template #cell(transport)>
                      <ul class="list-unstyled">
                        <li v-for="i in tim.transport" :key="i.id">
                          -
                          {{ i.jenis_transport }}
                          =
                          {{ formatRupiah(i.total) }}

                          <b-badge variant="light-success" v-if="i.transport_riil === true">
                            riil
                          </b-badge>
                        </li>
                      </ul>
                      <hr />
                      {{ formatRupiah(tim.total_transport) }}
                    </template>
                    <template #cell(taksi)>
                      <ul class="list-unstyled">
                        <li>
                          - Jakarta = {{ formatRupiah(tim.taksi_jakarta) }}
                          <b-badge variant="light-success" v-if="tim.jakarta_riil === true">
                            riil
                          </b-badge>
                        </li>

                        <li>
                          - Provinsi = {{ formatRupiah(tim.taksi_provinsi) }}
                          <b-badge variant="light-success" v-if="tim.provinsi_riil === true">
                            riil
                          </b-badge>
                        </li>
                      </ul>
                    </template>

                    <template #cell(representatif)>
                      {{ formatRupiah(tim.representatif) }}
                    </template>
                    <template #cell(lampiran)>
                      <ul>
                        <li v-for="item in tim.lampiran" :key="item.id">
                          {{ truncate(item.name, 15) }}
                        </li>
                      </ul>
                    </template>
                    <template #cell(total)>
                      {{ formatRupiah(tim.total) }}
                    </template>

                    <template #cell(actions)="data">
                      <b-dropdown boundary="window" variant="link" no-caret v-if="!proses">
                        <template #button-content>
                          <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                        </template>
                        <b-dropdown-item>
                          <feather-icon icon="FileTextIcon" />
                          <span class="align-middle ml-50">Tambah Lampiran</span>
                        </b-dropdown-item>
                        <b-dropdown-item :to="{ name: 'apps-users-view', params: { id: data.item.id } }">
                          <feather-icon icon="PrinterIcon" />
                          <span class="align-middle ml-50">Cetak RPD</span>
                        </b-dropdown-item>
                        <b-dropdown-item @click="deletePegawai(index)">
                          <feather-icon icon="TrashIcon" />
                          <span class="align-middle ml-50">Delete</span>
                        </b-dropdown-item>
                      </b-dropdown>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
              <hr />
              <b-row class="mt-2" v-if="!proses">
                <b-button variant="outline-success" class="ml-1" @click="prosesRealisasi()"> Proses </b-button>
              </b-row>
            </b-card-body>
            <template #footer>
              <small
                ><em
                  >Created By {{ form.user.pegawai.nama }} - {{ form.bidang.nama }} at
                  <strong>{{ $moment(form.created_at).format('DD MMMM YYYY') }}</strong></em
                ></small
              >
            </template>
          </b-card>
        </b-col>
      </b-row>
      <template #overlay>
        <div v-if="!processing" class="text-center">
          <feather-icon icon="Edit3Icon" size="4x" />
          <h4>{{ titleLoading }}</h4>
        </div>
        <div v-if="processing" class="text-center rounded">
          <feather-icon icon="UploadIcon" size="4x" />
          <h4>{{ titleLoading }}</h4>
        </div>
      </template>
    </b-overlay>
    <b-modal
      id="modal-realisasi"
      size="lg"
      scrollable
      no-close-on-backdrop
      centered
      content-class="shadow"
      title="Input Realisasi "
      @hidden="resetModal"
      hide-footer
      lazy
    >
      <form-wizard
        color="#7367F0"
        :subtitle="null"
        layout="vertical"
        finish-button-text="Submit"
        back-button-text="Previous"
        class="wizard-vertical mb-1"
        @on-complete="tambahRealisasi"
      >
        <h4 slot="title">Total Realisasi {{ formatRupiah(total) }}</h4>
        <tab-content title="Tanggal">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">
                Tanggal Pelaksanaan
              </h5>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tanggal Berangkat" label-cols-md="4">
                <b-form-datepicker
                  locale="id"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  v-model="realisasi.tanggal_berangkat"
                  placeholder="Tanggal Berangkat"
                />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tanggal Kembali" label-cols-md="4">
                <b-form-datepicker
                  locale="id"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  v-model="realisasi.tanggal_kembali"
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
            <b-col cols="12">
              <b-tabs>
                <!-- Render Tabs, supply a unique `key` to each tab -->
                <b-tab lazy v-for="(i, index) in realisasi.uang_harian" :key="'dyn-tab-' + index" :title="'Uang Harian ' + (index + 1)">
                  <b-form-group label="Riil" label-cols-md="4">
                    <b-form-checkbox v-model="i.hari_riil" checked="true" switch class="custom-control-primary mt-50">
                      Pengeluaran Rill
                    </b-form-checkbox>
                  </b-form-group>
                  <b-form-group label="Jumlah Hari" label-cols-md="4">
                    <b-form-input v-model="i.jumlah_hari" type="number" placeholder="0" />
                  </b-form-group>
                  <b-form-group label="Nominal" label-cols-md="4">
                    <b-form-input v-model="i.uang_harian" type="number" placeholder="Rp. 0" />
                  </b-form-group>
                  <hr />
                  <b-form-group label="Total" label-cols-md="4">
                    <b-form-input :value="formatRupiah(parseFloat(i.uang_harian) * parseFloat(i.jumlah_hari))" type="text" placeholder="Rp. 0" readonly />
                  </b-form-group>
                  <b-button size="sm" variant="danger" class="float-right" @click="closeTab(index, realisasi.uang_harian)">
                    <feather-icon icon="TrashIcon" />
                  </b-button>
                </b-tab>

                <!-- New Tab Button (Using tabs-end slot) -->
                <template #tabs-end>
                  <b-nav-item role="presentation" @click.prevent="newTab('HARIAN')">
                    <b>+</b>
                  </b-nav-item>
                </template>

                <!-- Render this if no tabs -->
                <template #empty>
                  <div class="text-center text-muted">
                    Tidak ada Tab terbuka<br />
                    Buka tab baru menggunakan tombol <b>+</b> button diatas.
                  </div>
                </template>
              </b-tabs>
            </b-col>
          </b-row>
        </tab-content>
        <tab-content title="Hotel">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">
                Hotel
              </h5>
            </b-col>
            <b-col cols="12">
              <b-tabs>
                <!-- Render Tabs, supply a unique `key` to each tab -->
                <b-tab lazy v-for="(i, index) in realisasi.uang_hotel" :key="'dyn-tab-' + index" :title="'Hotel ' + (index + 1)">
                  <b-form-group label="Riil" label-cols-md="4">
                    <b-form-checkbox v-model="i.hotel_riil" checked="true" switch class="custom-control-primary mt-50">
                      Pengeluaran Rill
                    </b-form-checkbox>
                  </b-form-group>
                  <b-form-group label="Jenis" label-cols-md="4">
                    <v-select
                      v-model="i.jenis_hotel"
                      :reduce="x => x.key"
                      placeholder="Jenis Pengunaan Uang Hotel"
                      :options="hotelOption"
                      label="nama"
                      :clearable="false"
                    />
                  </b-form-group>
                  <b-form-group label="Nama Hotel" label-cols-md="4" v-if="i.jenis_hotel === 0">
                    <b-form-input v-model="i.nama_hotel" placeholder="Nama Hotel" :options="hotelOption" label="nama" />
                  </b-form-group>
                  <b-form-group label="Jumlah Malam" label-cols-md="4">
                    <b-form-input v-model="i.jumlah_malam" type="number" placeholder="0" />
                  </b-form-group>
                  <b-form-group label="Harga" label-cols-md="4">
                    <b-form-input v-model="i.uang_hotel" type="number" placeholder="Rp. 0" />
                  </b-form-group>
                  <hr />
                  <b-form-group label="Total" label-cols-md="4">
                    <b-form-input :value="formatRupiah(parseFloat(i.jumlah_malam) * parseFloat(i.uang_hotel))" type="text" placeholder="Rp. 0" readonly />
                  </b-form-group>
                  <b-button size="sm" variant="danger" class="float-right" @click="closeTab(index, realisasi.uang_hotel)">
                    <feather-icon icon="TrashIcon" />
                  </b-button>
                </b-tab>

                <!-- New Tab Button (Using tabs-end slot) -->
                <template #tabs-end>
                  <b-nav-item role="presentation" @click.prevent="newTab('HOTEL')">
                    <b>+</b>
                  </b-nav-item>
                </template>

                <!-- Render this if no tabs -->
                <template #empty>
                  <div class="text-center text-muted">
                    Tidak ada Tab terbuka<br />
                    Buka tab baru menggunakan tombol <b>+</b> button diatas.
                  </div>
                </template>
              </b-tabs>
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
              <b-tabs>
                <!-- Render Tabs, supply a unique `key` to each tab -->
                <b-tab lazy v-for="(i, index) in realisasi.transport" :key="'dyn-tab-' + index" :title="'Transport ' + (index + 1)">
                  <b-form-group label="Riil" label-cols-md="4">
                    <b-form-checkbox v-model="i.transport_riil" checked="true" switch class="custom-control-primary mt-50">
                      Pengeluaran Rill
                    </b-form-checkbox>
                  </b-form-group>
                  <b-form-group label="Jenis" label-cols-md="4">
                    <v-select v-model="i.jenis_transport" placeholder="Jenis Pengunaan Transport" :options="transportOption" :clearable="false" />
                  </b-form-group>

                  <b-form-group label="Darat" label-cols-md="4">
                    <b-form-input v-model="i.total" type="number" placeholder="Rp. 0" />
                  </b-form-group>
                  <b-button size="sm" variant="danger" class="float-right" @click="closeTab(index, realisasi.transport)">
                    <feather-icon icon="TrashIcon" />
                  </b-button>
                </b-tab>

                <!-- New Tab Button (Using tabs-end slot) -->
                <template #tabs-end>
                  <b-nav-item role="presentation" @click.prevent="newTab('TRANSPORT')">
                    <b>+</b>
                  </b-nav-item>
                </template>

                <!-- Render this if no tabs -->
                <template #empty>
                  <div class="text-center text-muted">
                    Tidak ada Tab terbuka<br />
                    Buka tab baru menggunakan tombol <b>+</b> button diatas.
                  </div>
                </template>
              </b-tabs>
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
              <b-form-group label="Riil" label-cols-md="4">
                <b-form-checkbox v-model="realisasi.jakarta_riil" checked="true" switch class="custom-control-primary mt-50">
                  Pengeluaran Rill Taksi Jakarta
                </b-form-checkbox>
              </b-form-group>
              <b-form-group label="Jakarta" label-cols-md="4">
                <b-form-input v-model="realisasi.taksi_jakarta" type="number" placeholder="Rp. 0" />
              </b-form-group>
              <hr />
              <b-form-group label="Riil" label-cols-md="4">
                <b-form-checkbox v-model="realisasi.provinsi_riil" checked="true" switch class="custom-control-primary mt-50">
                  Pengeluaran Rill Taksi Provinsi
                </b-form-checkbox>
              </b-form-group>
              <b-form-group label="Provinsi" label-cols-md="4">
                <b-form-input v-model="realisasi.taksi_provinsi" type="number" placeholder="Rp. 0" />
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
              <b-form-group label="Uang Representatif" label-cols-md="4">
                <b-form-input v-model="realisasi.representatif" type="number" placeholder="Rp. 0" />
              </b-form-group>
            </b-col>
          </b-row>
        </tab-content>

        <tab-content title="Lampiran">
          <b-row>
            <b-col cols="12" class="mb-2">
              <h5 class="mb-0">
                Lampiran
              </h5>
              <small class="text-muted">Pilih data atau Drag and Drop, bisa upload sekaligus</small>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Lampiran / Bukti" label-cols-md="4">
                <b-form-file
                  @change="uploadLampiran"
                  placeholder="Pilih data atau Drag and Drop di sini.. bisa Upload Sekaligus"
                  drop-placeholder="Drop file disini..."
                  multiple
                  ref="file_input"
                >
                  <template slot="file-name" slot-scope="{ names }">
                    <b-badge variant="dark">{{ names[0] }}</b-badge>
                    <b-badge v-if="names.length > 1" variant="dark" class="ml-1"> + {{ names.length - 1 }} More files </b-badge>
                  </template>
                </b-form-file>
              </b-form-group>
            </b-col>
          </b-row>
        </tab-content>
      </form-wizard>
    </b-modal>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
  BTabs,
  BTab,
  BNavItem,
  BFormCheckbox,
  BDropdown,
  BDropdownItem,
  BOverlay,
  BFormDatepicker,
  BButton,
  BBadge,
  BModal,
  BCard,
  BCardBody,
  BRow,
  BCol,
  BTable,
  BFormGroup,
  BFormInput,
  BFormFile,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { formatRupiah, truncate } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
    FormWizard,
    TabContent,
    BTabs,
    BTab,
    BNavItem,
    BFormCheckbox,
    BDropdown,
    BDropdownItem,
    BOverlay,
    BFormDatepicker,
    BButton,
    BBadge,
    BModal,
    BCard,
    BRow,
    BCol,
    BCardBody,
    BTable,
    BFormGroup,
    BFormInput,
    BFormFile,
    vSelect,
  },
  directives: {
    Ripple,
  },
  computed: {
    total_harian() {
      let harian = 0
      this.realisasi.uang_harian.forEach(x => {
        harian += parseFloat(x.jumlah_hari) * parseFloat(x.uang_harian)
      })
      return harian
    },
    total_hotel() {
      let hotel = 0
      this.realisasi.uang_hotel.forEach(x => {
        hotel += parseFloat(x.jumlah_malam) * parseFloat(x.uang_hotel)
      })
      return hotel
    },
    total_transport() {
      let transport = 0
      this.realisasi.transport.forEach(x => {
        transport += parseFloat(x.total)
      })
      return transport
    },
    total() {
      const b = this.realisasi
      return (
        parseFloat(this.total_harian) +
        parseFloat(this.total_hotel) +
        parseFloat(this.total_transport) +
        parseFloat(b.taksi_jakarta) +
        parseFloat(b.taksi_provinsi) +
        parseFloat(b.representatif)
      )
    },
    form() {
      return this.$store.getters['app-perjadin/getDetail']
    },
    pegawaiOption() {
      const b = []
      this.form.susunan_tim.forEach(x => {
        const pegawai = {
          susunan_tim_id: x.id,
          id: x.id,
          nama: x.pegawai.nama,
          nip: x.pegawai.nip,
        }
        b.push(pegawai)
      })
      return b
    },
  },
  methods: {
    truncate,
    formatRupiah,

    closeTab(i, array) {
      array.splice(i, 1)
    },
    newTab(x) {
      if (x === 'HARIAN') {
        const uangHarian = {
          jumlah_hari: 0,
          uang_harian: 0,
          jumlah_malam: 0,
          hari_riil: true,
          total: 0,
        }
        this.realisasi.uang_harian.push(uangHarian)
      } else if (x === 'HOTEL') {
        const uangHotel = {
          nama_hotel: null,
          jenis_hotel: 0,
          uang_hotel: 0,
          jumlah_malam: 0,
          hotel_riil: false,
          total: 0,
        }
        this.realisasi.uang_hotel.push(uangHotel)
      } else if (x === 'TRANSPORT') {
        const transport = {
          transport_riil: false,
          jenis_transport: 'UDARA',
          total: 0,
        }
        this.realisasi.transport.push(transport)
      }
    },
    /* eslint-disable */
    uploadLampiran(e) {
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.realisasi.lampiran.push(selectedFiles[i])
      }
    },
    /* eslint-enable */
    prosesRealisasi() {
      if (this.data.realisasi.length !== this.pegawaiOption.length) {
        this.$swal({
          title: 'Opss!',
          text: 'Belum semua Tim melakukan Input Realisasi!',
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
        text: 'Apa anda yakin Data Realisasi sudah sesuai ?',
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

          this.data.perjadin = this.form
          this.$store
            .dispatch('app-perjadin/storeRealisasi', this.data)
            .then(res => {
              if (res.status === 200) {
                this.titleLoading = 'Upload lampiran ...'
                this.processing = !this.processing
                res.data.forEach((y, index) => {
                  const file = new FormData()
                  for (let i = 0; i < this.data.realisasi[index].lampiran.length; i += 1) {
                    file.append('lampiran[]', this.data.realisasi[index].lampiran[i])
                  }
                  file.append('id', y.id)
                  this.$store.dispatch('app-perjadin/storePerjadinRealisasiLampiran', file).then(
                    this.$swal({
                      title: 'Sukses!',
                      icon: 'success',
                      customClass: {
                        confirmButton: 'btn btn-primary',
                      },
                      buttonsStyling: false,
                    }),
                    this.$store.commit('app-perjadin/UPDATE_STATUS_REALISASI', 'SUDAH'),
                  )
                })
                this.show = !this.show

                this.proses = !this.proses
              }
            })
            .catch(err => {
              this.show = !this.show
              this.file = new FormData()
              this.$swal({
                title: 'Error!',
                text: err.message,
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            })
        }
      })
    },

    showModal() {
      const b = this.data.realisasi.find(x => x.pegawai.id === this.selectedPegawai.id)
      if (b) {
        this.$swal({
          title: 'Oopss!',
          text: `Data pegawai ${b.pegawai.nama} sudah di Input`,
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      } else {
        this.$bvModal.show('modal-realisasi')
        this.realisasi.tanggal_berangkat = this.form.tanggal_berangkat
        this.realisasi.tanggal_kembali = this.form.tanggal_kembali
      }
    },
    resetModal() {
      this.selectedPegawai = null
      this.realisasi.tanggal_berangkat = null
      this.realisasi.tanggal_kembali = null
      this.realisasi.total_hotel = 0
      this.realisasi.total_harian = 0
      this.realisasi.total_transport = 0
      this.realisasi.uang_harian = [
        {
          jumlah_hari: 0,
          uang_harian: 0,
          jumlah_malam: 0,
          hari_riil: true,
          total: 0,
        },
      ]
      this.realisasi.uang_hotel = [
        {
          nama_hotel: null,
          jenis_hotel: 0,
          uang_hotel: 0,
          jumlah_malam: 0,
          hotel_riil: false,
          total: 0,
        },
      ]
      this.realisasi.transport = [
        {
          jenis_transport: 'DARAT',
          total: 0,
          transport_riil: false,
        },
      ]
      this.realisasi.taksi_jakarta = 0
      this.realisasi.taksi_provinsi = 0
      this.realisasi.representatif = 0
      this.realisasi.total = 0
      this.jakarta_riil = false
      this.provinsi_riil = false
      this.realisasi.lampiran = []
    },
    tambahRealisasi() {
      if (this.realisasi.tanggal_berangkat === null || this.realisasi.tanggal_kembali === null) {
        this.$swal({
          title: 'Oopss!',
          text: 'Tanggal belum di lengkapi',
          icon: 'warning',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        return
      }
      const realisasi = {
        pegawai: this.selectedPegawai,
        tanggal_berangkat: this.realisasi.tanggal_berangkat,
        tanggal_kembali: this.realisasi.tanggal_kembali,
        uang_harian: this.realisasi.uang_harian,
        uang_hotel: this.realisasi.uang_hotel,
        transport: this.realisasi.transport,
        total_hotel: this.total_hotel,
        total_harian: this.total_harian,
        total_transport: this.total_transport,
        taksi_jakarta: this.realisasi.taksi_jakarta,
        taksi_provinsi: this.realisasi.taksi_provinsi,
        jakarta_riil: this.realisasi.jakarta_riil,
        provinsi_riil: this.realisasi.provinsi_riil,
        representatif: this.realisasi.representatif,
        lampiran: this.realisasi.lampiran,
        total: this.total,
      }
      this.data.realisasi.push(realisasi)
      this.selectedPegawai = {
        id: null,
        nama: null,
      }
      this.$bvModal.hide('modal-realisasi')
    },
    deletePegawai(i) {
      this.data.realisasi.splice(i, 1)
    },
  },
  setup() {
    const tabs = ref([1])
    const tabCounter = 1
    const hotelOption = [
      { key: 0, nama: 'FULL' },
      { key: 1, nama: '30%' },
    ]
    const transportOption = ['UDARA', 'LAUT', 'DARAT']
    const titleLoading = 'Proses realisasi ....'
    const processing = ref(false)
    const show = ref(false)
    const proses = ref(false)
    const data = ref({
      perjadin: {},
      realisasi: [],
    })
    const selectedPegawai = ref({
      id: null,
      nama: null,
    })
    const realisasi = ref({
      pegawai: {},
      tanggal_berangkat: null,
      tanggal_kembali: null,
      uang_harian: [
        {
          jumlah_hari: 0,
          uang_harian: 0,
          jumlah_malam: 0,
          hari_riil: true,
          total: 0,
        },
      ],
      uang_hotel: [
        {
          nama_hotel: null,
          jenis_hotel: 0,
          jumlah_hari: 0,
          uang_hotel: 0,
          jumlah_malam: 0,
          hotel_riil: false,
          total: 0,
        },
      ],
      transport: [
        {
          jenis_transport: 'UDARA',
          total: 0,
          transport_riil: false,
        },
      ],
      taksi_jakarta: 0,
      taksi_provinsi: 0,
      representatif: 0,
      total: 0,
      lampiran: [],
      jakarta_riil: false,
      provinsi_riil: false,
    })
    const tableCol = [
      { key: 'total_harian' },
      { key: 'total_hotel' },
      { key: 'transport' },
      { key: 'taksi' },
      { key: 'representatif' },
      { key: 'total' },
      { key: 'lampiran' },
      { key: 'actions' },
    ]
    return {
      tabs,
      tabCounter,
      hotelOption,
      transportOption,
      titleLoading,
      processing,
      show,
      proses,
      data,
      realisasi,
      selectedPegawai,
      tableCol,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-wizard.scss';
</style>
