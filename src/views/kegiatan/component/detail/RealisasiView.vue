<template>
  <section>
    <b-row>
      <b-col lg="12" sm="12">
        <b-card title="Realisasi Kegiatan" footer-tag="footer">
          <b-card-body>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Tanggal Kegiatan" label-cols-md="3">
                  <b-form-datepicker
                    v-if="edit"
                    locale="id"
                    :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    v-model="data.tanggal_realisasi_kegiatan"
                    placeholder="Tanggal Kegiatan"
                    :disabled="!edit"
                  />
                  <b-form-input v-if="!edit" :value="$moment(data.tanggal_realisasi_kegiatan).format('DD MMMM YYYY')" type="text" :readonly="!edit" />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Total anggaran yang di gunakan" label-cols-md="3">
                  <b-form-input v-if="edit" v-model="data.total_realisasi" :value="formatRupiah(data.total_realisasi)" type="number" :disabled="!edit" />
                  <b-form-input v-if="!edit" :value="formatRupiah(data.total_realisasi)" type="text" :disabled="!edit" />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Diperiksa Oleh" label-cols-md="3">
                  <v-select v-if="edit" v-model="data.checker" placeholder="Nama Atasan Langsung" :options="pegawaiOption" label="nama" />
                  <b-form-input v-if="!edit" :value="data.checker.nama" type="text" :disabled="!edit" />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Pejabat Pembuat Komitmen" label-cols-md="3">
                  <v-select v-if="edit" v-model="data.ppk" placeholder="Nama PPK" :options="pegawaiOption" label="nama" />
                  <b-form-input v-if="!edit" :value="data.ppk.nama" type="text" :disabled="!edit" />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Bendahara" label-cols-md="3">
                  <v-select v-if="edit" v-model="data.bendahara" placeholder="Nama Bendahara" :options="pegawaiOption" label="nama" />
                  <b-form-input v-if="!edit" :value="data.bendahara.nama" type="text" :disabled="!edit" />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Lampiran" label-cols-md="3">
                  <b-form-input value="Bisa di lihat di Tab Lampiran" type="text" plaintext />
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <section v-if="data.status === 'PELAKSANAAN'">
                <b-button variant="outline-warning" class="ml-1" @click="edit = !edit" v-if="!edit"> Edit </b-button>
                <b-button variant="outline-danger" class="ml-1" @click="edit = !edit" v-if="edit"> Batal </b-button>
                <b-button variant="outline-primary" class="ml-1" v-if="edit" @click="ow"> Simpan </b-button>
              </section>

              <b-button variant="primary" v-b-modal="'modal-spb'" class="ml-1" v-if="!edit"> Cetak SPB </b-button>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <b-modal id="modal-spb" size="md" hide-backdrop centered no-close-on-backdrop ok-variant="success" ok-title="print" hide-footer>
      <b-form-group label="Tanggal Cetak SPB">
        <b-form-datepicker locale="id" v-model="tanggal" />
      </b-form-group>
      <b-button variant="primary" :href="spbGet(data.id, tanggal)" class="ml-1"> Print SPB </b-button>
    </b-modal>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BFormDatepicker, BButton, BCard, BCardBody, BRow, BCol, BFormGroup, BFormInput } from 'bootstrap-vue'
import { formatRupiah, spbGet } from '@core/utils/filter'
import vSelect from 'vue-select'
import _ from 'lodash'

export default {
  components: {
    BFormDatepicker,
    BButton,
    BCard,
    BRow,
    BCol,
    BCardBody,
    BFormGroup,
    BFormInput,
    vSelect,
  },
  computed: {
    data() {
      return this.$store.getters['app-kegiatan/getDetail']
    },
    pegawaiOption() {
      return this.$store.getters['app-general/getPegawai']
    },
  },
  mounted() {
    this.fake = _.cloneDeep(this.data)
  },
  methods: {
    spbGet,
    formatRupiah,
    printSPB() {
      console.info('ss')
      this.$bvModal.show('spb')
    },
    print() {
      console.info('sss')
      return this.spbGet(this.data.id, this.tanggal)
    },
    ow() {
      console.info(this.fake)
    },
  },
  setup() {
    const fake = ref(null)
    const edit = ref(false)
    const tanggal = ref(null)
    return {
      fake,
      edit,
      tanggal,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
