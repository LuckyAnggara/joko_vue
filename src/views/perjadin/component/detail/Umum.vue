<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Data Umum" footer-tag="footer" v-if="fake">
        <b-card-body>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Nomor Perjadin" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="fake.no_perjadin" placeholder="-" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Tahun Anggaran" label-cols-md="3" label-cols-sm="12">
                <b-form-input v-if="!edit" :value="fake.tahun.nama" placeholder="-" readonly />
                <v-select v-if="edit" v-model="fake.tahun" placeholder="Tahun Anggaran" label="nama" :options="tahunOption" />
                <small v-if="edit">Untuk merubah Tahun, Wajib untuk merubah MAK yang di gunakan disesuaikan Tahun Anggaran yang di Pilih</small>
              </b-form-group>
            </b-col>
          </b-row>
          <hr />

          <b-row>
            <b-col cols="12">
              <b-form-group label="Nomor Surat Perintah" label-cols-md="3">
                <b-form-input v-if="!edit" :value="fake.surat_perintah.nomor_surat" type="text" placeholder="-" readonly />
                <b-form-input v-if="edit" v-model="fake.surat_perintah.nomor_surat" type="text" placeholder="-" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Tanggal Surat Perintah" label-cols-md="3">
                <b-form-input v-if="!edit" :value="$moment(fake.surat_perintah.tanggal_surat).format('DD MMMM YYYY')" placeholder="-" readonly />
                <b-form-datepicker v-if="edit" v-model="fake.surat_perintah.tanggal_surat" locale="id" placeholder="Tanggal Surat Perintah" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Perihal" label-cols-md="3">
                <b-form-textarea v-if="!edit" :value="fake.surat_perintah.perihal" placeholder="-" readonly />
                <b-form-textarea v-if="edit" v-model="fake.surat_perintah.perihal" placeholder="-" />
              </b-form-group>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tujuan" label-cols-md="3">
                <b-form-input v-if="!edit" :value="fake.tujuan" type="text" placeholder="-" readonly />
                <b-form-input v-if="edit" v-model="fake.tujuan" type="text" placeholder="-" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Keberangkatan" label-cols-md="3">
                <b-form-input v-if="!edit" :value="fake.keberangkatan" type="text" placeholder="-" readonly />
                <b-form-input v-if="edit" v-model="fake.keberangkatan" type="text" placeholder="-" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Maksud Perjalanan Dinas" label-cols-md="3">
                <b-form-textarea v-if="!edit" :value="fake.maksud" type="text" placeholder="-" readonly />
                <b-form-textarea v-if="edit" v-model="fake.maksud" placeholder="-" />
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Output Kegiatan" label-cols-md="3">
                <b-form-textarea v-if="!edit" :value="fake.output" type="text" placeholder="-" readonly />
                <b-form-textarea v-if="edit" v-model="fake.output" placeholder="-" />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Tanggal Pelaksanaan" label-cols-md="3">
                <b-row>
                  <b-col md="6">
                    <b-form-group label="Tanggal Berangkat">
                      <b-form-input v-if="!edit" :value="$moment(fake.tanggal_berangkat).format('DD MMMM YYYY')" placeholder="-" readonly />
                      <b-form-datepicker
                        v-if="edit"
                        locale="id"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        v-model="fake.tanggal_berangkat"
                        placeholder="Tanggal Berangkat"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Tanggal Kembali">
                      <b-form-input v-if="!edit" :value="$moment(fake.tanggal_kembali).format('DD MMMM YYYY')" placeholder="-" readonly />
                      <b-form-datepicker
                        v-if="edit"
                        locale="id"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                        v-model="fake.tanggal_kembali"
                        placeholder="Tanggal Kembali"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Jumlah Hari" label-cols-md="3">
                <b-form-input v-if="!edit" :value="fake.jumlah_hari" type="text" placeholder="-" readonly />
                <b-form-input v-if="edit" v-model="fake.jumlah_hari" type="number" placeholder="-" />
              </b-form-group>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col cols="12">
              <b-form-group label="Objek Pemeriksaan" label-cols-md="3">
                <b-table v-if="!edit" small :fields="tableCol" :items="fake.obrik" responsive>
                  <template #cell(no)="data">
                    <span>{{ data.index + 1 }}</span>
                  </template>
                  <template #cell(satker)="data">
                    <span>{{ data.item.satker.nama }}</span>
                  </template>
                  <template #cell(urusan)="data">
                    <span>{{ data.item.urusan.nama }}</span>
                  </template>
                </b-table>
                <b-table v-if="edit" small :fields="tableColEdit" :items="fake.obrik" responsive>
                  <template #cell(no)="data">
                    <span>{{ data.index + 1 }}</span>
                  </template>
                  <template #cell(satker)="data">
                    <span>{{ data.item.satker.nama }}</span>
                  </template>
                  <template #cell(urusan)="data">
                    <span>{{ data.item.urusan.nama }}</span>
                  </template>
                  <template #cell(action)="data">
                    <div class="text-nowrap">
                      <feather-icon icon="TrashIcon" size="16" class="mx-1 text-danger" @click="hapusObrik(data.index)" />
                    </div>
                  </template>
                </b-table>
                <b-button v-if="edit" v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="secondary" @click="tambahObrikModal()">Tambah</b-button>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <section v-if="fake.status === 'RENCANA'">
              <b-button variant="outline-warning" class="ml-1" @click="edit = !edit" v-if="!edit"> Edit </b-button>
              <b-button variant="outline-danger" class="ml-1" @click="batal()" v-if="edit"> Batal </b-button>
              <b-button variant="outline-primary" class="ml-1" v-if="edit" @click="ubah()"> Simpan </b-button>
            </section>
          </b-row>
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
    <b-modal id="modal-obrik" size="md" centered no-close-on-backdrop content-class="shadow" title="Objek Pemeriksaan" @submit="tambahObrik()" lazy>
      <b-row>
        <b-col cols="12" sm="12">
          <b-form-group label="Kantor Wilayah">
            <v-select v-model="kanwilId" placeholder="Pilih Kantor Wilayah" label="nama" :options="kanwilOption" />
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="12">
          <b-form-group label="Satuan Kerja">
            <v-select placeholder="Pilih Satuan Kerja" label="nama" :options="satkerOption" />
          </b-form-group>
        </b-col>
        <b-col cols="12" sm="12">
          <b-form-group label="Urusan">
            <v-select placeholder="Pilih Urusan" label="nama" :options="urusanOption" />
          </b-form-group>
        </b-col>
      </b-row>
    </b-modal>
  </b-row>
</template>

<script>
import { ref } from '@vue/composition-api'
import {
  BModal,
  BTable,
  // BLink,
  BButton,
  BCard,
  BCardBody,
  BRow,
  BCol,
  BFormInput,
  BFormGroup,
  BFormTextarea,
  BFormDatepicker,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import _ from 'lodash'
import vSelect from 'vue-select'

export default {
  components: {
    BModal,
    BTable,
    // BLink,
    BButton,
    BCard,
    BCardBody,
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    BFormTextarea,
    BFormDatepicker,
    vSelect,
  },
  directives: {
    Ripple,
  },
  computed: {
    form() {
      return this.$store.getters['app-perjadin/getDetail']
    },
    lampiran_sp() {
      return this.form.lampiran.filter(x => x.jenis === 'SP')
    },
    tahunOption() {
      return this.$store.getters['app-general/getTahun']
    },
    kanwilOption() {
      return this.$store.getters['app-general/getKanwil']
    },
    satkerOption() {
      return this.kanwilOption.find(x => x.id === this.kanwilId.id).satker
    },
    urusanOption() {
      return this.$store.getters['app-general/getUrusan']
    },
  },
  methods: {
    tambahObrikModal() {
      this.$bvModal.show('modal-obrik')
    },
    batal() {
      this.edit = !this.edit
      this.fake = _.cloneDeep(this.form)
    },
    hapusObrik(i) {
      this.fake.obrik.splice(i, 1)
    },
  },
  mounted() {
    this.fake = _.cloneDeep(this.form)
  },
  setup() {
    const kanwilId = ref({
      nama: 'Aceh',
      id: 1,
    })
    const edit = ref(false)
    const fake = ref(null)
    const tableCol = [{ key: 'no' }, { key: 'satker' }, { key: 'urusan' }]
    const tableColEdit = [{ key: 'no' }, { key: 'satker' }, { key: 'urusan' }, { key: 'action' }]
    return {
      kanwilId,
      edit,
      fake,
      tableCol,
      tableColEdit,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
