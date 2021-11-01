<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Rincian Realisasi" footer-tag="footer">
        <b-card-body>
          <b-row v-for="tim in form.susunan_tim" :key="tim.id">
            <b-col cols="3" lg="3" md="3" sm="12">
              <h5 class="mt-2">{{ tim.pegawai.nama }}</h5>
              <!-- <b-form-input :value="tim.pegawai.nama" plaintext /> -->
            </b-col>
            <b-col cols="6" lg="6" md="6" sm="12">
              <p class="mt-2">
                {{ $moment(tim.realisasi.tanggal_berangkat).format('DD MMMM YYYY') }} - {{ $moment(tim.realisasi.tanggal_kembali).format('DD MMMM YYYY') }}
              </p>
            </b-col>

            <b-col cols="12" lg="12" md="12" sm="12">
              <b-table small :fields="tableCol" :items="[...tim.realisasi]" responsive bordered>
                <template #cell(hari)="data">
                  <span>{{ data.item.jumlah_hari }}</span>
                </template>
                <template #cell(uang_harian)="data">
                  <span>{{ formatRupiah(data.item.uang_harian) }}</span>
                </template>
                <template #cell(malam)="data">
                  <span>{{ data.item.jumlah_malam }}</span>
                </template>
                <template #cell(uang_hotel)="data">
                  <span>{{ formatRupiah(data.item.uang_hotel) }}</span>
                </template>
                <template #cell(udara)="data">
                  <span>{{ formatRupiah(data.item.udara) }}</span>
                </template>
                <template #cell(laut)="data">
                  <span>{{ formatRupiah(data.item.laut) }}</span>
                </template>
                <template #cell(darat)="data">
                  <span>{{ formatRupiah(data.item.darat) }}</span>
                </template>
                <template #cell(taksi_jakarta)="data">
                  <span>{{ formatRupiah(data.item.taksi_jakarta) }}</span>
                </template>
                <template #cell(taksi_provinsi)="data">
                  <span>{{ formatRupiah(data.item.taksi_provinsi) }}</span>
                </template>
                <template #cell(representatif)="data">
                  <span>{{ formatRupiah(data.item.representatif) }}</span>
                </template>
                <template #cell(total)="data">
                  <span>{{ formatRupiah(data.item.total) }}</span>
                </template>
                <template #cell(actions)="data">
                  <div class="text-nowrap">
                    <feather-icon icon="PaperclipIcon" size="24" class="mx-1" @click="showLampiran(data.item.lampiran)" />
                    <feather-icon icon="PrinterIcon" size="24" class="mx-1" @click="showPrint(data.item.id)" />
                  </div>
                </template>
              </b-table>
            </b-col>
          </b-row>
          <hr />
          <b-row class="mt-2">
            <b-col cols="3">
              <h4>Total Realisasi</h4>
            </b-col>
            <b-col cols="3">
              <h4>{{ formatRupiah(form.total_realisasi) }}</h4>
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
      id="modal-lampiran-realisasi"
      size="md"
      centered
      scrollable
      hide-backdrop
      ok-only
      no-close-on-backdrop
      content-class="shadow"
      title="Lampiran Realisasi"
      ok-variant="danger"
      ok-title="Tutup"
      lazy
    >
      <b-row>
        <b-col>
          <ol>
            <li v-for="item in lampiran" :key="item.id" class="mb-1">
              <b-link :href="urlGet(item.id, 'perjadin', 'realisasi')" class="font-weight-bold" target="_blank">
                <feather-icon icon="FileIcon" size="18" class="ml-1" @click="showLampiran(data.item.lampiran)" />
                {{ item.nama }}
              </b-link>
            </li>
          </ol>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal
      id="modal-print"
      size="md"
      centered
      scrollable
      hide-backdrop
      ok-only
      no-close-on-backdrop
      content-class="shadow"
      title="Print"
      ok-variant="danger"
      ok-title="Tutup"
      lazy
    >
    </b-modal>
  </b-row>
</template>

<script>
import { ref } from '@vue/composition-api'
import { BLink, BModal, BCard, BCardBody, BRow, BCol, BTable } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { formatRupiah, urlGet } from '@core/utils/filter'

export default {
  components: {
    BLink,
    BModal,
    BCard,
    BRow,
    BCol,
    BCardBody,
    BTable,
  },
  directives: {
    Ripple,
  },

  computed: {
    form() {
      return this.$store.getters['app-perjadin/getDetail']
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
  setup() {
    const lampiran = ref([])
    const tableCol = [
      { key: 'hari' },
      { key: 'uang_harian' },
      { key: 'malam' },
      { key: 'uang_hotel' },
      { key: 'udara' },
      { key: 'laut' },
      { key: 'darat' },
      { key: 'taksi_jakarta' },
      { key: 'taksi_provinsi' },
      { key: 'representatif' },
      { key: 'total' },
      { key: 'actions' },
    ]
    return {
      lampiran,
      tableCol,
    }
  },
}
</script>
