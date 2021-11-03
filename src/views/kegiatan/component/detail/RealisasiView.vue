<template>
  <section>
    <b-row>
      <b-col lg="12" sm="12">
        <b-card title="Realisasi Kegiatan" footer-tag="footer">
          <b-card-body>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Tanggal Kegiatan" label-cols-md="3">
                  <b-form-input :value="$moment(data.tanggal_realisasi_kegiatan).format('DD MMMM YYYY')" type="text" readonly />
                </b-form-group>
              </b-col>
              <b-col cols="12">
                <b-form-group label="Total anggaran yang di gunakan" label-cols-md="3">
                  <b-form-input :value="formatRupiah(data.total_realisasi)" type="text" readonly />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Diperiksa Oleh" label-cols-md="3">
                  <b-form-input :value="data.checker.nama" type="text" readonly />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Pejabat Pembuat Komitmen" label-cols-md="3">
                  <b-form-input :value="data.ppk.nama" type="text" readonly />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Bendahara" label-cols-md="3">
                  <b-form-input :value="data.bendahara.nama" type="text" readonly />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Lampiran" label-cols-md="3">
                  <b-form-input value="Bisa di lihat di Tab Lampiran" type="text" plaintext />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-button variant="primary" class="ml-1" @click="printSPB()"> Cetak SPB </b-button>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-modal id="spb" size="md" hide-backdrop centered no-close-on-backdrop ok-variant="success" ok-title="print" @ok="spbGet(data.id, tanggal)">
      <b-form-group label="Tanggal Cetak SPB">
        <b-form-datepicker locale="id" v-modal="tanggal" />
      </b-form-group>
    </b-modal>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BFormDatepicker, BButton, BCard, BCardBody, BRow, BCol, BFormGroup, BFormInput } from 'bootstrap-vue'
import { formatRupiah, spbGet } from '@core/utils/filter'

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
  },

  computed: {
    data() {
      return this.$store.getters['app-kegiatan/getDetail']
    },
    pegawaiOption() {
      return this.$store.getters['app-general/getPegawai']
    },
  },
  methods: {
    spbGet,
    formatRupiah,
    printSPB() {
      console.info('ss')
      this.$bvModal.show('spb')
    },
    print() {
      this.spbGet(this.data.id, this.tanggal)
    },
  },
  setup() {
    const tanggal = ref(null)
    return {
      tanggal,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
