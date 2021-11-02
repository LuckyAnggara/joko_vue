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
              <b-table small responsive :fields="tableCol" :items="data.realisasi">
                <template #cell(nama_pegawai)="data">
                  {{ data.item.pegawai.nama }}
                </template>
                <template #cell(total_harian)="data">
                  {{ formatRupiah(data.item.total_harian) }}
                </template>
                <template #cell(total_hotel)="data">
                  {{ formatRupiah(data.item.total_hotel) }}
                  <b-badge variant="light-danger">
                    {{ data.item.jenis_hotel === 0 ? 'FULL' : '30%' }}
                  </b-badge>
                </template>
                <template #cell(udara)="data">
                  {{ formatRupiah(data.item.udara) }}
                </template>
                <template #cell(laut)="data">
                  {{ formatRupiah(data.item.laut) }}
                </template>
                <template #cell(darat)="data">
                  {{ formatRupiah(data.item.darat) }}
                </template>
                <template #cell(taksi_jakarta)="data">
                  {{ formatRupiah(data.item.taksi_jakarta) }}
                </template>
                <template #cell(taksi_provinsi)="data">
                  {{ formatRupiah(data.item.taksi_provinsi) }}
                </template>
                <template #cell(representatif)="data">
                  {{ formatRupiah(data.item.representatif) }}
                </template>
                <template #cell(lampiran)="data">
                  <ul>
                    <li v-for="item in data.item.lampiran" :key="item.id">
                      {{ truncate(item.name, 15) }}
                    </li>
                  </ul>
                </template>
                <template #cell(total)="data">
                  {{ formatRupiah(data.item.total) }}
                </template>

                <template #cell(actions)="data">
                  <div class="text-nowrap" v-if="!proses">
                    <feather-icon :id="`spd-${data.item.id}`" icon="TrashIcon" size="24" class="mx-1 text-danger" @click="deletePegawai(data.index)" />
                    <!-- <b-tooltip noninteractive :target="`spd-${data.item.id}`">Print SPD{{ data.item.id }}</b-tooltip> -->
                  </div>
                </template>
              </b-table>
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
      hide-backdrop
      ok-only
      no-close-on-backdrop
      content-class="shadow"
      title="Input Realisasi "
      ok-variant="success"
      ok-title="Submit"
      @ok="tambahRealisasi()"
      @hidden="resetModal"
      lazy
    >
      <b-row>
        <b-col cols="12">
          <b-form-group label="Tanggal Pelaksanaan" label-cols-md="3">
            <b-row>
              <b-col md="6">
                <b-form-group label="Tanggal Berangkat">
                  <b-form-datepicker
                    locale="id"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    v-model="realisasi.tanggal_berangkat"
                    placeholder="Tanggal Berangkat"
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Tanggal Kembali">
                  <b-form-datepicker
                    locale="id"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    v-model="realisasi.tanggal_kembali"
                    placeholder="Tanggal Kembali"
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group label="Uang Harian" label-cols-md="3">
            <b-row>
              <b-col md="2">
                <b-form-group label="Hari">
                  <b-form-input v-model="realisasi.jumlah_hari" type="number" placeholder="0" />
                </b-form-group>
              </b-col>
              <b-col md="5">
                <b-form-group label="Uang Harian">
                  <b-form-input v-model="realisasi.uang_harian" type="number" placeholder="Rp. 0" />
                </b-form-group>
              </b-col>
              <b-col md="5">
                <b-form-group label="Total">
                  <b-form-input
                    :value="formatRupiah(parseFloat(realisasi.uang_harian) * parseFloat(realisasi.jumlah_hari))"
                    type="text"
                    placeholder="Rp. 0"
                    readonly
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Uang Hotel" label-cols-md="3">
            <b-row>
              <b-col md="6">
                <v-select v-model="realisasi.jenis_hotel" :reduce="x => x.key" placeholder="Jenis Pengunaan Uang Hotel" :options="hotelOption" label="nama" />
              </b-col>
            </b-row>
            <b-row>
              <b-col md="2">
                <b-form-group label="Malam">
                  <b-form-input v-model="realisasi.jumlah_malam" type="number" placeholder="0" />
                </b-form-group>
              </b-col>
              <b-col md="5">
                <b-form-group label="Harga">
                  <b-form-input v-model="realisasi.uang_hotel" type="number" placeholder="Rp. 0" />
                </b-form-group>
              </b-col>
              <b-col md="5">
                <b-form-group label="Total">
                  <b-form-input
                    :value="formatRupiah(parseFloat(realisasi.jumlah_malam) * parseFloat(realisasi.uang_hotel))"
                    type="text"
                    placeholder="Rp. 0"
                    readonly
                  />
                </b-form-group>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group label="Transport" label-cols-md="3">
            <b-row>
              <b-col md="4">
                <b-form-group label="Darat">
                  <b-form-input v-model="realisasi.darat" type="number" placeholder="Rp. 0" />
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Laut">
                  <b-form-input v-model="realisasi.laut" type="number" placeholder="Rp. 0" />
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group label="Udara">
                  <b-form-input v-model="realisasi.udara" type="number" placeholder="Rp. 0" />
                </b-form-group>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group label="Taksi" label-cols-md="3">
            <b-row>
              <b-col md="6">
                <b-form-group label="Jakarta">
                  <b-form-input v-model="realisasi.taksi_jakarta" type="number" placeholder="Rp. 0" />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Provinsi">
                  <b-form-input v-model="realisasi.taksi_provinsi" type="number" placeholder="Rp. 0" />
                </b-form-group>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-form-group label="Representatif" label-cols-md="3">
            <b-form-input v-model="realisasi.representatif" type="number" placeholder="Rp. 0" />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group label="Total" label-cols-md="3">
            <b-form-input :value="formatRupiah(total)" type="text" placeholder="Rp. 0" readonly />
          </b-form-group>
        </b-col>
      </b-row>

      <hr />

      <b-row>
        <b-col cols="12">
          <b-form-group label="Lampiran / Bukti" label-cols-md="3">
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
    </b-modal>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BOverlay, BFormDatepicker, BButton, BBadge, BModal, BCard, BCardBody, BRow, BCol, BTable, BFormGroup, BFormInput, BFormFile } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { formatRupiah, truncate } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
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
    total() {
      const b = this.realisasi
      const harian = parseFloat(b.uang_harian) * parseFloat(b.jumlah_hari)
      const hotel = parseFloat(b.uang_hotel) * parseFloat(b.jumlah_malam)
      return (
        parseFloat(harian) +
        parseFloat(hotel) +
        parseFloat(b.udara) +
        parseFloat(b.laut) +
        parseFloat(b.darat) +
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
      this.realisasi.jumlah_hari = 0
      this.realisasi.uang_harian = 0
      this.realisasi.jumlah_malam = 0
      this.realisasi.uang_hotel = 0
      this.realisasi.udara = 0
      this.realisasi.laut = 0
      this.realisasi.darat = 0
      this.realisasi.taksi_jakarta = 0
      this.realisasi.taksi_provinsi = 0
      this.realisasi.representatif = 0
      this.realisasi.total = 0
      this.realisasi.jenis_hotel = 0
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
        jumlah_hari: this.realisasi.jumlah_hari,
        uang_harian: this.realisasi.uang_harian,
        total_harian: parseFloat(this.realisasi.jumlah_hari) * parseFloat(this.realisasi.uang_harian),
        jumlah_malam: this.realisasi.jumlah_malam,
        uang_hotel: this.realisasi.uang_hotel,
        total_hotel: parseFloat(this.realisasi.jumlah_malam) * parseFloat(this.realisasi.uang_hotel),
        udara: this.realisasi.udara,
        laut: this.realisasi.laut,
        darat: this.realisasi.darat,
        taksi_jakarta: this.realisasi.taksi_jakarta,
        taksi_provinsi: this.realisasi.taksi_provinsi,
        representatif: this.realisasi.representatif,
        jenis_hotel: this.realisasi.jenis_hotel,
        total:
          parseFloat(parseFloat(this.realisasi.jumlah_hari) * parseFloat(this.realisasi.uang_harian)) +
          parseFloat(parseFloat(this.realisasi.jumlah_malam) * parseFloat(this.realisasi.uang_hotel)) +
          parseFloat(this.realisasi.udara) +
          parseFloat(this.realisasi.laut) +
          parseFloat(this.realisasi.darat) +
          parseFloat(this.realisasi.taksi_jakarta) +
          parseFloat(this.realisasi.taksi_provinsi) +
          parseFloat(this.realisasi.representatif),
        lampiran: this.realisasi.lampiran,
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
    const hotelOption = [
      { key: 0, nama: 'FULL' },
      { key: 1, nama: '30%' },
    ]
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
      jumlah_hari: 0,
      uang_harian: 0,
      jumlah_malam: 0,
      uang_hotel: 0,
      udara: 0,
      laut: 0,
      darat: 0,
      taksi_jakarta: 0,
      taksi_provinsi: 0,
      representatif: 0,
      total: 0,
      jenis_hotel: 0,
      lampiran: [],
    })
    const tableCol = [
      { key: 'nama_pegawai' },
      // { key: 'jumlah_hari', label: 'hari' },
      { key: 'total_harian' },
      // { key: 'jumlah_malam', label: 'malam' },
      { key: 'total_hotel' },
      { key: 'udara' },
      { key: 'laut' },
      { key: 'darat' },
      { key: 'taksi_jakarta' },
      { key: 'taksi_provinsi' },
      { key: 'representatif' },
      { key: 'total' },
      { key: 'lampiran' },
      { key: 'actions' },
    ]
    return {
      hotelOption,
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
</style>
