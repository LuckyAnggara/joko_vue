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
            <b-col lg="11">
              <label>Nama Pegawai </label>
            </b-col>
          </b-row>
        </ul>
        <hr />
        <b-table small :fields="tableRAB" :items="form.rencana_anggaran" responsive bordered :sticky-header="stickyHeader" :no-border-collapse="noCollapse">
          <template #thead-top>
            <b-tr>
              <b-th class="text-center" sticky-column style="width:15%" rowspan="2">Nama Pegawai</b-th>
              <b-th class="text-center" colspan="2">Uang Harian</b-th>
              <b-th class="text-center" colspan="2">Hotel</b-th>
              <b-th class="text-center" colspan="5">Biaya</b-th>
              <b-th class="text-center" rowspan="2">representatif</b-th>
              <b-th class="text-center" rowspan="2">Total</b-th>
            </b-tr>
          </template>
          <template #table-colgroup="scope">
            <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'hari' ? '50px' : '50px' }" />
          </template>
          <template #cell(nama_pegawai)="data">
            <span>
              {{ form.susunan_tim[data.index].nama }}
            </span>
          </template>
          <template #cell(hari)="data">
            <b-form-input v-model="data.item.jumlah_hari" />
          </template>
          <template #cell(uang_harian)="data">
            <b-form-input v-model="data.item.uang_harian" />
          </template>
          <template #cell(malam)="data">
            <b-form-input v-model="data.item.jumlah_malam" />
          </template>

          <template #cell(harga)="data">
            <b-form-input v-model="data.item.harga_hotel" />
          </template>

          <template #cell(udara)="data">
            <b-form-input v-model="data.item.udara" />
          </template>

          <template #cell(laut)="data">
            <b-form-input v-model="data.item.laut" />
          </template>

          <template #cell(darat)="data">
            <b-form-input v-model="data.item.darat" />
          </template>

          <template #cell(taksi_jakarta)="data">
            <b-form-input v-model="data.item.taksi_jakarta" />
          </template>
          <template #cell(taksi_provinsi)="data">
            <b-form-input v-model="data.item.taksi_provinsi" />
          </template>
          <template #cell(representatif)="data">
            <b-form-input v-model="data.item.representatif" />
          </template>
        </b-table>
        <!-- <ul style="list-style-type: none;" v-for="(tim, i) in form.susunan_tim" :key="tim.id">
          <b-row>
            <b-col lg="1">
              <p>{{ i + 1 }}</p>
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
                      <b-form-input :value="total" plaintext />
                    </b-td>
                  </b-tr>
                </b-tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </ul> -->
      </b-card-body>
    </b-col>
  </b-row>
</template>

<script>
import {
  BCardBody,
  BRow,
  BCol,
  BFormInput,
  BTable,
  // BTableSimple,
  // BThead,
  // BTbody,
  BTr,
  BTh,
  // BTd,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BRow,
    BCol,
    BCardBody,

    BFormInput,
    BTable,
    // BTableSimple,
    // BThead,
    // BTbody,
    BTr,
    BTh,
    // BTd,

    // vSelect,
  },
  props: {
    form: Object,
  },
  directives: {
    Ripple,
  },
  computed: {
    total() {
      // const a = this.form.rencana_anggaran[i]
      // console.info(a)
      return 0
      // const total =
      //   parseFloat(a.jumlah_hari) * parseFloat(a.uang_harian) +
      //   parseFloat(a.jumlah_malam) * parseFloat(a.uang_hotel) +
      //   parseFloat(a.laut) +
      //   parseFloat(a.darat) +
      //   parseFloat(a.taksi_jakarta) +
      //   parseFloat(a.taksi_provinsi) +
      //   parseFloat(a.representatif)
      // return total
    },
  },
  setup() {
    const stickyHeader = true
    const noCollapse = false
    const tableRAB = [
      { key: 'nama_Pegawai', label: null, stickyColumn: true, isRowHeader: true, variant: 'primary' },
      { key: 'hari' },
      { key: 'uang_harian', label: 'Rp.' },
      { key: 'malam' },
      { key: 'harga', label: 'Rp.' },
      { key: 'udara' },
      { key: 'laut' },
      { key: 'darat' },
      { key: 'taksi_jakarta' },
      { key: 'taksi_provinsi' },
      { key: 'representatif', label: null },
      { key: 'total', label: null },
    ]
    return {
      stickyHeader,
      noCollapse,
      tableRAB,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
