<template>
  <!-- <b-row class="match-height"> -->

  <b-row class="match-height">
    <b-col lg="12" sm="12">
      <b-card-body>
        <ul style="list-style-type: none;">
          <b-row>
            <b-col lg="1">
              <label>No. </label>
            </b-col>
            <b-col lg="4">
              <label>Nama Pegawai </label>
            </b-col>
          </b-row>
        </ul>
        <hr />
        <ul style="list-style-type: none;" v-for="(tim, i) in form.susunan_tim" :key="tim.id">
          <b-row>
            <b-col lg="1">
              <b-form-input plaintext :value="i + 1" />
            </b-col>
            <b-col lg="11">
              <b-form-input :value="form.susunan_tim[i].nama" plaintext />
              <b-table-simple small responsive>
                <b-thead>
                  <b-tr>
                    <b-th colspan="2" class="text-center">UANG HARIAN (RP.) </b-th>
                    <b-th colspan="2" class="text-center">HOTEL (RP.)</b-th>
                    <b-th colspan="5" class="text-center">BIAYA TRANSPORT (RP.)</b-th>
                    <b-th rowspan="2" class="text-center" style="width:10%">REPRESENTATIF</b-th>
                    <b-th rowspan="2" class="text-center" style="width:20%">TOTAL</b-th>
                  </b-tr>
                  <b-tr>
                    <b-th class="text-center" style="width:5%">HARI</b-th>
                    <b-th class="text-center" style="width:10%">BIAYA </b-th>
                    <b-th class="text-center" style="width:5%">MALAM</b-th>
                    <b-th class="text-center" style="width:10%">BIAYA </b-th>
                    <b-th class="text-center" style="width:10%">UDARA</b-th>
                    <b-th class="text-center" style="width:10%">LAUT</b-th>
                    <b-th class="text-center" style="width:10%">DARAT</b-th>
                    <b-th class="text-center" style="width:10%">TAKSI JAKARTA</b-th>
                    <b-th class="text-center" style="width:10%">TAKSI PROVINSI</b-th>
                  </b-tr>
                </b-thead>
                <b-tbody>
                  <b-tr>
                    <b-td>
                      <b-form-input v-model="form.rencana_anggaran[i].jumlah_hari" />
                    </b-td>
                    <b-td>
                      <b-form-input v-model="form.rencana_anggaran[i].uang_harian" />
                    </b-td>
                    <b-td>
                      <b-form-input v-model="form.rencana_anggaran[i].jumlah_malam" />
                    </b-td>
                    <b-td>
                      <b-form-input v-model="form.rencana_anggaran[i].harga_hotel" />
                    </b-td>
                    <b-td>
                      <b-form-input v-model="form.rencana_anggaran[i].udara" />
                    </b-td>
                    <b-td>
                      <b-form-input v-model="form.rencana_anggaran[i].laut" />
                    </b-td>
                    <b-td>
                      <b-form-input v-model="form.rencana_anggaran[i].darat" />
                    </b-td>
                    <b-td>
                      <b-form-input v-model="form.rencana_anggaran[i].taksi_jakarta" />
                    </b-td>
                    <b-td>
                      <b-form-input v-model="form.rencana_anggaran[i].taksi_provinsi" />
                    </b-td>
                    <b-td>
                      <b-form-input v-model="form.rencana_anggaran[i].representatif" />
                    </b-td>
                    <b-td>
                      <b-form-input :value="total(i)" plaintext />
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </ul>
      </b-card-body>
    </b-col>
  </b-row>
</template>

<script>
import { BCardBody, BRow, BCol, BFormInput, BTableSimple, BThead, BTbody, BTr, BTh, BTd } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    BCardBody,

    BFormInput,
    BTableSimple,
    BThead,
    BTbody,
    BTr,
    BTh,
    BTd,

    // vSelect,
  },
  props: {
    form: Object,
  },
  directives: {
    Ripple,
  },
  computed: {
    total(i) {
      const a = this.form.rencana_anggaran[i]
      const total =
        parseFloat(a.jumlah_hari) * parseFloat(a.uang_harian) +
        parseFloat(a.jumlah_malam) * parseFloat(a.uang_hotel) +
        parseFloat(a.laut) +
        parseFloat(a.darat) +
        parseFloat(a.taksi_jakarta) +
        parseFloat(a.taksi_provinsi) +
        parseFloat(a.representatif)
      return total
    },
  },
  setup() {
    const tableRAB = [
      { key: 'uang_harian' },
      { key: 'malam' },
      { key: 'harga' },
      { key: 'udara' },
      { key: 'laut' },
      { key: 'darat' },
      { key: 'taksi_jakarta' },
      { key: 'taksi_provinsi' },
      { key: 'representatif' },
    ]
    return {
      tableRAB,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
