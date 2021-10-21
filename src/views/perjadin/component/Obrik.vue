<template>
  <!-- <b-row class="match-height"> -->
  <b-row>
    <b-col lg="6" sm="12">
      <form autocomplete="off">
        <b-card-body>
          <b-row>
            <b-col cols="12" sm="12">
              <b-form-group label="Kantor Wilayah" label-cols-md="12" label-cols-lg="3" label-cols-sm="12">
                <v-select v-model="form.obrik.kanwil" placeholder="Pilih Kantor Wilayah" label="nama" :options="kanwilOption" />
              </b-form-group>
            </b-col>
            <b-col cols="12" sm="12">
              <b-row>
                <b-col cols="6" sm="12">
                  <b-form-group label="Satuan Kerja">
                    <v-select v-model="chooseSatker" placeholder="Pilih Satuan Kerja" label="nama" :options="satkerOption" />
                  </b-form-group>
                </b-col>
                <b-col cols="6" sm="12">
                  <b-form-group label="Urusan">
                    <v-select v-model="chooseUrusan" placeholder="Pilih Urusan" label="nama" :options="urusanOption" />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="secondary" @click="tambahObrik()">Tambah</b-button>
              <b-table small :fields="tableRAB" fixed :items="form.obrik.detail" responsive class="mt-1">
                <template #cell(nama_satker)="data">
                  <b-form-input plaintext :value="data.item.satker.nama" />
                </template>
                <template #cell(urusan)="data">
                  <b-form-input plaintext :value="data.item.urusan.nama" />
                </template>
              </b-table>
            </b-col>
          </b-row>
          <b-row> </b-row>
        </b-card-body>
      </form>
    </b-col>
  </b-row>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BCardBody, BRow, BFormInput, BCol, BTable, BFormGroup, BButton } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'

export default {
  components: {
    BCardBody,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BTable,
    BButton,
    vSelect,
  },
  directives: {
    Ripple,
  },
  props: {
    form: Object,
  },
  watch: {
    form: {
      deep: true,
      handler() {
        if (this.form.obrik.kanwil !== null) {
          this.satkerOption = this.kanwilOption.find(x => x.id === this.form.obrik.kanwil.id).satker
        }
      },
    },
  },
  computed: {
    kanwilOption() {
      return this.$store.getters['app-general/getKanwil']
    },
    urusanOption() {
      return this.$store.getters['app-general/getUrusan']
    },
  },
  methods: {
    tambahObrik() {
      const dataObrik = {
        satker: this.chooseSatker,
        urusan: this.chooseUrusan,
      }
      this.form.obrik.detail.push(dataObrik)
      this.chooseSatker = null
      this.chooseUrusan = null
    },
    deleteObrik(i) {
      this.form.susunan_tim.splice(i, 1)
      this.form.rencana_anggaran.splice(i, 1)
    },
  },
  setup() {
    const satkerOption = ref([])
    const chooseSatker = ref(null)
    const chooseUrusan = ref(null)
    const tableRAB = [{ key: 'nama_satker' }, { key: 'urusan' }]
    return {
      chooseSatker,
      chooseUrusan,
      satkerOption,
      tableRAB,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
