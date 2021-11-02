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
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import { BCard, BCardBody, BRow, BCol, BFormGroup, BFormInput } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { formatRupiah, urlGet } from '@core/utils/filter'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BCardBody,
    BFormGroup,
    BFormInput,
  },
  directives: {
    Ripple,
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
    urlGet,
    formatRupiah,
    showLampiran(x) {
      this.lampiran = x
      console.info(this.lampiran)
      this.$bvModal.show('modal-lampiran-realisasi')
    },
    showPrint() {
      this.$bvModal.show('modal-print')
    },
  },
  setup() {},
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
