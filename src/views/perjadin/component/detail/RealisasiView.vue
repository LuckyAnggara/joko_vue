<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Rincian Realisasi" footer-tag="footer">
        <b-card-body>
          <b-row v-for="(tim, index) in form.susunan_tim" :key="tim.id">
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
              <b-table small :fields="tableCol" :items="[...tim.realisasi]" responsive bordered>
                <template #cell(total_harian)>
                  <ul class="list-unstyled" v-for="i in tim.realisasi.uang_harian" :key="i.id">
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
                  {{ formatRupiah(tim.realisasi.total_harian) }}
                </template>
                <template #cell(total_hotel)>
                  <ul class="list-unstyled">
                    <li v-for="i in tim.realisasi.uang_hotel" :key="i.id">
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
                  {{ formatRupiah(tim.realisasi.total_hotel) }}
                </template>
                <template #cell(transport)>
                  <ul class="list-unstyled">
                    <li v-for="i in tim.realisasi.transport" :key="i.id">
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
                  {{ formatRupiah(tim.realisasi.total_transport) }}
                </template>
                <template #cell(taksi)>
                  <ul class="list-unstyled">
                    <li>
                      - Jakarta = {{ formatRupiah(tim.realisasi.taksi_jakarta) }}
                      <b-badge variant="light-success" v-if="tim.realisasi.jakarta_riil === true">
                        riil
                      </b-badge>
                    </li>

                    <li>
                      - Provinsi = {{ formatRupiah(tim.realisasi.taksi_provinsi) }}
                      <b-badge variant="light-success" v-if="tim.realisasi.provinsi_riil === true">
                        riil
                      </b-badge>
                    </li>
                  </ul>
                </template>
                <template #cell(representatif)>
                  {{ formatRupiah(tim.realisasi.representatif) }}
                </template>
                <template #cell(total)>
                  {{ formatRupiah(tim.realisasi.total) }}
                </template>

                <template #cell(actions)="data">
                  <b-dropdown boundary="window" variant="link" no-caret>
                    <template #button-content>
                      <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                    </template>

                    <b-dropdown-item @click="tambahLampiran(data.item.id, index)">
                      <feather-icon icon="FileTextIcon" />
                      <span class="align-middle ml-50">Tambah Lampiran</span>
                    </b-dropdown-item>
                    <b-dropdown-item @click="showLampiran(data.item.lampiran)">
                      <feather-icon icon="FileTextIcon" />
                      <span class="align-middle ml-50">Lihat Lampiran</span>
                    </b-dropdown-item>
                    <b-dropdown-divider />

                    <b-dropdown-item @click="showPrint('KUITANSI', data.item.id)">
                      <feather-icon icon="PrinterIcon" />
                      <span class="align-middle ml-50">Cetak Kwitansi</span>
                    </b-dropdown-item>
                    <b-dropdown-item @click="showPrint('DPR', data.item.id)">
                      <feather-icon icon="PrinterIcon" />
                      <span class="align-middle ml-50">Cetak DPR</span>
                    </b-dropdown-item>
                    <b-dropdown-item @click="showPrint('SPTJM', data.item.id)">
                      <feather-icon icon="PrinterIcon" />
                      <span class="align-middle ml-50">Cetak SPTJM</span>
                    </b-dropdown-item>
                    <b-dropdown-item v-if="form.status_realisasi !== 'SUDAH'" @click="deletePegawai(index)">
                      <feather-icon icon="TrashIcon" />
                      <span class="align-middle ml-50">Delete</span>
                    </b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-table>
            </b-col>
          </b-row>
          <hr />
          <b-row class="mt-2">
            <b-col cols="3">
              <h4>Total Realisasi</h4>
            </b-col>
            <b-col cols="3">
              <h4>{{ formatRupiah(form.total_realisasi) }}</h4>
            </b-col>
          </b-row>
        </b-card-body>
        <template #footer>
          <small
            ><em
              >Created by {{ form.user.pegawai.nama }} - {{ form.bidang.nama }} at <strong>{{ $moment(form.created_at).format('DD MMMM YYYY') }}</strong></em
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
      id="modal-lampiran-realisasi"
      size="md"
      centered
      scrollable
      ok-only
      no-close-on-backdrop
      content-class="shadow"
      title="Lampiran"
      ok-variant="danger"
      ok-title="Tutup"
      lazy
    >
      <b-row>
        <b-col>
          <span>Harian</span>
          <ol>
            <li v-for="item in lampiran.filter(x => x.jenis === 'HARIAN')" :key="item.id" class="mb-1">
              <b-link :href="urlGet(item.id, 'perjadin', 'realisasi')" class="font-weight-bold" target="_blank">
                <feather-icon icon="FileIcon" size="18" class="ml-1" />
                {{ item.nama }}
              </b-link>
            </li>
          </ol>
          <span>Hotel</span>
          <ol>
            <li v-for="item in lampiran.filter(x => x.jenis === 'HOTEL')" :key="item.id" class="mb-1">
              <b-link :href="urlGet(item.id, 'perjadin', 'realisasi')" class="font-weight-bold" target="_blank">
                <feather-icon icon="FileIcon" size="18" class="ml-1" />
                {{ item.nama }}
              </b-link>
            </li>
          </ol>
          <span>Transport</span>
          <ol>
            <li v-for="item in lampiran.filter(x => x.jenis === 'TRANSPORT')" :key="item.id" class="mb-1">
              <b-link :href="urlGet(item.id, 'perjadin', 'realisasi')" class="font-weight-bold" target="_blank">
                <feather-icon icon="FileIcon" size="18" class="ml-1" />
                {{ item.nama }}
              </b-link>
            </li>
          </ol>
          <span>Taksi</span>
          <ol>
            <li v-for="item in lampiran.filter(x => x.jenis === 'TAKSI')" :key="item.id" class="mb-1">
              <b-link :href="urlGet(item.id, 'perjadin', 'realisasi')" class="font-weight-bold" target="_blank">
                <feather-icon icon="FileIcon" size="18" class="ml-1" />
                {{ item.nama }}
              </b-link>
            </li>
          </ol>
          <span>Representatif</span>
          <ol>
            <li v-for="item in lampiran.filter(x => x.jenis === 'REPRESENTATIF')" :key="item.id" class="mb-1">
              <b-link :href="urlGet(item.id, 'perjadin', 'realisasi')" class="font-weight-bold" target="_blank">
                <feather-icon icon="FileIcon" size="18" class="ml-1" />
                {{ item.nama }}
              </b-link>
            </li>
          </ol>
          <span>Lainnya</span>
          <ol>
            <li v-for="item in lampiran.filter(x => x.jenis === 'LAINNYA')" :key="item.id" class="mb-1">
              <b-link :href="urlGet(item.id, 'perjadin', 'realisasi')" class="font-weight-bold" target="_blank">
                <feather-icon icon="FileIcon" size="18" class="ml-1" />
                {{ item.nama }}
              </b-link>
            </li>
          </ol>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      id="modal-print"
      size="md"
      centered
      scrollable
      ok-only
      no-close-on-backdrop
      content-class="shadow"
      title="Print"
      ok-variant="danger"
      ok-title="Tutup"
      lazy
    >
      <template v-if="lampiran.length > 0 ? true : false">
        <ul>
          <li v-for="item in lampiran" :key="item.id">
            <b-link :href="urlGet(item.id, 'perjadin')" class="font-weight-bold" target="_blank"> {{ item.nama }} </b-link>
          </li>
        </ul>
      </template>
      <template v-else>
        <span>Tidak ada lampiran</span>
      </template>
    </b-modal>
    <b-modal id="modal-cetak" size="md" centered no-close-on-backdrop ok-variant="success" ok-title="print" hide-footer @hidden="reset">
      <b-form-group label="Tempat" v-if="jenis === 'KUITANSI' ? false : true">
        <b-form-input locale="id" v-model="tempat" placeholder="Tempat Surat" />
      </b-form-group>
      <b-form-group label="Tanggal" v-if="jenis === 'KUITANSI' ? false : true">
        <b-form-datepicker locale="id" v-model="tanggal" placeholder="Tangggal Surat" />
      </b-form-group>
      <b-button variant="primary" :href="href" class="ml-1"> Download </b-button>
    </b-modal>
    <b-modal
      id="modal-tambah-lampiran"
      size="md"
      centered
      ok-only
      no-close-on-backdrop
      content-class="shadow"
      title="Tambahan Lampiran"
      ok-variant="success"
      ok-title="Upload"
      @ok="submit"
      lazy
    >
      <b-row>
        <b-col cols="12">
          <b-form-group label="Jenis Lampiran / Bukti">
            <v-select v-model="upload.jenis" placeholder="Jenis Lampiran" label="name" :options="jenisOption" />
          </b-form-group>
          <b-form-group label="Lampiran">
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
  </b-row>
</template>

<script>
import { ref } from '@vue/composition-api'
import {
  BButton,
  BFormDatepicker,
  BDropdownDivider,
  BDropdown,
  BDropdownItem,
  BBadge,
  BFormGroup,
  BFormInput,
  BFormFile,
  BLink,
  BModal,
  BCard,
  BCardBody,
  BRow,
  BCol,
  BTable,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { urlGet, formatRupiah, dprGet, sptjmGet, kuitansiGet } from '@core/utils/filter'
import vSelect from 'vue-select'

export default {
  components: {
    BButton,
    BFormDatepicker,
    BDropdownDivider,
    BDropdown,
    BDropdownItem,
    BBadge,
    BFormGroup,
    BFormInput,
    BLink,
    BModal,
    BFormFile,

    BCard,
    BRow,
    BCol,
    BCardBody,
    BTable,
    vSelect,
  },
  directives: {
    Ripple,
  },

  computed: {
    form() {
      return this.$store.getters['app-perjadin/getDetail']
    },
  },
  methods: {
    urlGet,
    dprGet,
    kuitansiGet,
    sptjmGet,
    formatRupiah,
    reset() {
      this.tanggal = null
      this.tempat = null
      this.href = null
    },
    tambahLampiran(x, i) {
      this.idLampiran = x
      this.index = i
      this.$bvModal.show('modal-tambah-lampiran')
    },
    showLampiran(x) {
      this.lampiran = x
      this.$bvModal.show('modal-lampiran-realisasi')
    },
    showPrint(x, id) {
      this.$bvModal.show('modal-cetak')
      this.jenis = x
      if (x === 'DPR') {
        this.href = this.dprGet(id, this.tanggal, this.tempat)
      } else if (x === 'KUITANSI') {
        this.href = this.kuitansiGet(id, this.tanggal)
      } else if (x === 'SPTJM') {
        this.href = this.sptjmGet(id, this.tanggal, this.tempat)
      }
      // this.$bvModal.hide('modal-cetak')
    },
    /* eslint-disable */
    uploadLampiran(e) {
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.upload.file.push(selectedFiles[i])
      }
      /* eslint-enable */
    },
    submit(bvModalEvt) {
      bvModalEvt.preventDefault()
      console.info(this.upload)
      if (this.upload.file.length > 0) {
        const file = new FormData()
        if (this.upload.jenis.key === 'HARIAN') {
          for (let i = 0; i < this.upload.file.length; i += 1) {
            file.append('lampiran_harian[]', this.upload.file[i])
          }
        } else if (this.upload.jenis.key === 'HOTEL') {
          for (let i = 0; i < this.upload.file.length; i += 1) {
            file.append('lampiran_hotel[]', this.upload.file[i])
          }
        } else if (this.upload.jenis.key === 'TRANSPORT') {
          for (let i = 0; i < this.upload.file.length; i += 1) {
            file.append('lampiran_transport[]', this.upload.file[i])
          }
        } else if (this.upload.jenis.key === 'TAKSI') {
          for (let i = 0; i < this.upload.file.length; i += 1) {
            file.append('lampiran_taksi[]', this.upload.file[i])
          }
        } else if (this.upload.jenis.key === 'REPRESENTATIF') {
          for (let i = 0; i < this.upload.file.length; i += 1) {
            file.append('lampiran_representatif[]', this.upload.file[i])
          }
        } else if (this.upload.jenis.key === 'LAINNYA') {
          for (let i = 0; i < this.upload.file.length; i += 1) {
            file.append('lampiran_lainnya[]', this.upload.file[i])
          }
        }

        file.append('id', this.idLampiran)
        file.append('user_id', this.userData.id)
        this.$store.dispatch('app-perjadin/storePerjadinRealisasiLampiran', file).then(x => {
          if (x.status === 200) {
            this.$swal({
              title: 'Sukses!',
              text: 'File berhasil di Upload!',
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            this.form.susunan_tim[this.index].realisasi.lampiran.push(...x.data)
            this.$bvModal.hide('modal-tambah-lampiran')
          }
        })
        this.upload.file = []
        this.idLampiran = null
      } else {
        this.$swal({
          title: 'Error!',
          text: 'Cek file yang akan di Upload',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }
    },
  },
  setup() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const index = ref(null)
    const idLampiran = ref(null)
    const jenis = ref(null)
    const href = ref(null)
    const tanggal = ref(null)
    const tempat = ref(null)
    const lampiran = ref([])
    const upload = ref({
      jenis: ref(null),
      file: ref([]),
    })
    const jenisOption = [
      { key: 'HARIAN', name: 'UANG HARIAN' },
      { key: 'HOTEL', name: 'UANG HOTEL' },
      { key: 'TRANSPORT', name: 'TRANSPORT' },
      { key: 'TAKSI', name: 'TAKSI' },
      { key: 'REPRESENTATIF', name: 'REPRESENTATIF' },
      { key: 'LAINNYA', name: 'LAINNYA' },
    ]
    const tableCol = [
      { key: 'total_harian' },
      { key: 'total_hotel' },
      { key: 'transport' },
      { key: 'taksi' },
      { key: 'representatif' },
      { key: 'total' },
      { key: 'actions' },
    ]
    return {
      userData,
      index,
      idLampiran,
      jenis,
      href,
      tanggal,
      tempat,
      lampiran,
      upload,
      jenisOption,
      tableCol,
    }
  },
}
</script>
