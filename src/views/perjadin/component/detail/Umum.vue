<template>
  <!-- <b-row class="match-height"> -->
  <b-row>
    <b-card>
      <b-col lg="8" sm="12">
        <form autocomplete="off">
          <b-card-body>
            <b-row>
              <b-col cols="12">
                <b-form-group label="Tahun Anggaran" label-cols-md="3" label-cols-sm="12">
                  <b-form-input :value="form.tahun.nama" placeholder="Tahun Anggaran" label="nama" readonly />
                </b-form-group>
                <hr />
              </b-col>

              <b-col cols="12">
                <b-form-group label="Nomor Surat Perintah" label-cols-md="3">
                  <b-form-input :value="form.surat_perintah.nomor_surat" type="text" placeholder="Nomor Surat Perintah" readonly />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Tanggal Surat Perintah" label-cols-md="3">
                  <b-form-datepicker :value="form.surat_perintah.tanggal_surat" locale="id" placeholder="Tanggal Surat Perintah" readonly />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Perihal" label-cols-md="3">
                  <b-form-textarea :value="form.surat_perintah.perihal" placeholder="Perihal" readonly />
                </b-form-group>
              </b-col>
            </b-row>
            <hr />
            <b-row>
              <b-col cols="12">
                <b-form-group label="Tujuan" label-cols-md="3">
                  <b-form-input :value="form.tujuan" type="text" placeholder="Tujuan Perjalanan Dinas" readonly />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Keberangkatan" label-cols-md="3">
                  <b-form-input :value="form.keberangkatan" type="text" placeholder="Keberangkatan Perjalanan Dinas" readonly />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Tanggal Pelaksanaan" label-cols-md="3">
                  <b-row>
                    <b-col md="6">
                      <b-form-group label="Tanggal Berangkat">
                        <b-form-datepicker locale="id" :value="form.tanggal_berangkat" placeholder="Tanggal Berangkat" readonly />
                      </b-form-group>
                    </b-col>
                    <b-col md="6">
                      <b-form-group label="Tanggal Kembali">
                        <b-form-datepicker locale="id" :value="form.tanggal_kembali" placeholder="Tanggal Kembali" readonly />
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Jumlah Hari" label-cols-md="3">
                  <b-form-input :value="form.jumlah_hari" type="text" placeholder="Jumlah Hari Pelaksanaan Perjalanan Dinas" readonly />
                </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group label="Keterangan" label-cols-md="3">
                  <b-form-textarea :value="form.keterangan" type="text" placeholder="Keterangan lainnya (Seperti urusan)" readonly />
                </b-form-group>
              </b-col>
            </b-row>
          </b-card-body>
        </form>
      </b-col>
    </b-card>
  </b-row>
</template>

<script>
// import { ref } from '@vue/composition-api'
import { BFormDatepicker, BCard, BCardBody, BRow, BCol, BFormInput, BFormGroup, BFormTextarea } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BFormDatepicker,
    BCard,
    BCardBody,
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    BFormTextarea,
  },
  directives: {
    Ripple,
  },
  computed: {
    form() {
      return this.$store.getters['app-perjadin/getDetail']
    },
  },
  mounted() {
    console.info(this.form)
    // const { id } = this.$router.currentRoute.params
    // if (this.$router.currentRoute.params.id) {
    //   this.loadPerjadin(id)
    // }
  },
}
</script>
