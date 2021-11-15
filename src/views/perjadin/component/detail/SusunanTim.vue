<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Susunan Tim" footer-tag="footer">
        <b-card-body>
          <b-row>
            <b-col cols="12" lg="12">
              <b-table small :fields="tableCol" :items="form.susunan_tim" bordered responsive>
                <template #cell(no)="data">
                  {{ data.index + 1 }}
                </template>
                <template #cell(nama)="data">
                  {{ data.item.pegawai.nama }}
                </template>
                <template #cell(peran)="data">
                  {{ data.item.peran.nama }}
                </template>
                <template #cell(actions)="data">
                  <div class="text-nowrap">
                    <b-link @click="showModal(data.item.id)" class="font-weight-bold">
                      <feather-icon icon="PrinterIcon" size="24" class="mx-1" />
                    </b-link>
                    <!-- <b-tooltip noninteractive :target="`spd-${data.item.id}`">Print SPD{{ data.item.id }}</b-tooltip> -->
                  </div>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-card-body>
        <template #footer>
          <small
            ><em
              >Created By {{ form.user.pegawai.nama }} - {{ form.bidang.nama }} at <strong>{{ $moment(form.created_at).format('DD MMMM YYYY') }}</strong></em
            ></small
          >
        </template>
      </b-card>
    </b-col>
    <b-modal
      id="modal-alatangkut"
      size="md"
      scrollable
      hide-backdrop
      ok-only
      centered
      no-close-on-backdrop
      content-class="shadow"
      title="Print Surat Perjalanan Dinas "
      ok-variant="danger"
      ok-title="Tutup"
      @hidden="alatangkut = null"
    >
      <b-row>
        <b-col cols="12">
          <b-form-group label="Alat Angkut" label-cols-md="3">
            <b-form-input v-model="sp.alatangkut" placeholder="Alat angkut yang digunakan Contoh : Pesawat" />
          </b-form-group>
          <b-form-group label="Tanggal Surat" label-cols-md="3">
            <b-form-datepicker
              boundary="window"
              locale="id"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              v-model="sp.tanggal"
              placeholder="Tanggal Surat"
            />
          </b-form-group>
          <b-form-group label="Tempat Surat" label-cols-md="3">
            <b-form-input v-model="sp.tempat" placeholder="Tempat surat dikeluarkan" />
          </b-form-group>
          <b-button :href="spdGet(spdId, sp)" target="_blank" class="font-weight-bold">
            <feather-icon icon="PrinterIcon" size="24" class="mx-1" />
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
  </b-row>
</template>

<script>
import { ref } from '@vue/composition-api'
import {
  BFormDatepicker,
  BButton,
  BFormGroup,
  BFormInput,
  BModal,
  BTable,
  BLink,
  // BTooltip,
  BCard,
  BCardBody,
  BRow,
  BCol,
} from 'bootstrap-vue'
import { spdGet } from '@core/utils/filter'

export default {
  components: {
    BFormDatepicker,
    BButton,
    BFormGroup,
    BFormInput,
    BModal,
    BTable,
    BLink,
    // BTooltip,
    BCard,
    BRow,
    BCol,
    BCardBody,
  },
  computed: {
    form() {
      return this.$store.getters['app-perjadin/getDetail']
    },
    lampiran_sp() {
      return this.form.lampiran.filter(x => x.jenis === 'SP')
    },
  },
  methods: {
    spdGet,
    showModal(id) {
      this.spdId = id
      this.$bvModal.show('modal-alatangkut')
    },
    print_spd(id, alat) {
      this.spdGet(id, alat)
      this.$bvModal.hide('modal-alatangkut')
      // this.$store.dispatch('app-perjadin/printSPD', id)
    },
  },
  setup() {
    const spdId = ref(null)
    const sp = ref({
      alatangkut: null,
      tanggal: null,
      tempat: null,
    })
    const tableCol = [{ key: 'no' }, { key: 'nama' }, { key: 'peran' }, { key: 'actions' }]
    return {
      spdId,
      sp,
      tableCol,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
