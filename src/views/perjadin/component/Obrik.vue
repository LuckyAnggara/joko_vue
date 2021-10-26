<template>
  <!-- <b-row class="match-height"> -->
  <b-card-body>
    <b-row>
      <b-col lg="5" sm="12">
        <b-row>
          <b-col cols="12" sm="12">
            <b-form-group label="Kantor Wilayah">
              <v-select v-model="form.obrik.kanwil" placeholder="Pilih Kantor Wilayah" label="nama" :options="kanwilOption" />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="12">
            <b-form-group label="Satuan Kerja">
              <v-select v-model="chooseSatker" placeholder="Pilih Satuan Kerja" label="nama" :options="satkerOption" />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="12">
            <b-form-group label="Urusan">
              <v-select v-model="chooseUrusan" placeholder="Pilih Urusan" label="nama" :options="urusanOption" />
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="12" class="mb-5">
            <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="secondary" @click="tambahObrik()">Tambah</b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col lg="7" sm="12">
        <b-col cols="12">
          <p>Daftar Objek Pemeriksaan</p>
          <b-table small :fields="tableRAB" :items="form.obrik.detail" responsive class="mt-1">
            <template #cell(no)="data">
              {{ data.index + 1 }}
            </template>
            <template #cell(nama_satker)="data">
              <b-form-input plaintext :value="data.item.satker.nama" />
            </template>
            <template #cell(urusan)="data">
              <b-form-input plaintext :value="data.item.urusan.nama" />
            </template>
            <template #cell(action)="data">
              <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-danger" class="btn-icon rounded-circle" @click="deleteObrik(data.index)">
                <feather-icon icon="TrashIcon" />
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-col>
    </b-row>
  </b-card-body>
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
      if (this.chooseSatker !== null || this.chooseUrusan !== null) {
        const dataObrik = {
          satker: this.chooseSatker,
          urusan: this.chooseUrusan,
        }
        this.form.obrik.detail.push(dataObrik)
        this.chooseSatker = null
        this.chooseUrusan = null
      } else {
        this.$swal({
          title: 'Opss!',
          text: ' Data belum lengkap!',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      }
    },
    deleteObrik(i) {
      this.form.obrik.detail.splice(i, 1)
    },
  },
  setup() {
    const satkerOption = ref([])
    const chooseSatker = ref(null)
    const chooseUrusan = ref(null)
    const tableRAB = [{ key: 'no' }, { key: 'nama_satker' }, { key: 'urusan' }, { key: 'action' }]
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
