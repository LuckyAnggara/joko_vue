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
            <b-col cols="3" lg="3" md="3" sm="12">
              <b-form-group label="Tanggal Berangkat">
                <b-form-input :value="$moment(tim.tanggal_berangkat).format('DD, MMMM YYYY')" size="sm" readonly />
              </b-form-group>
            </b-col>
            <b-col cols="3" lg="3" md="3" sm="12">
              <b-form-group label="Tanggal Berangkat">
                <b-form-input :value="$moment(tim.tanggal_kembali).format('DD, MMMM YYYY')" size="sm" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12" lg="12" md="12" sm="12">
              <b-table small :fields="tableCol" :items="[...tim.realisasi]" responsive bordered>
                <template #cell(total_harian)>
                  <ul class="list-unstyled" v-for="i in tim.realisasi.uang_harian" :key="i.id">
                    <li>
                      -
                      {{ i.jumlah_hari }}
                      @
                      {{ formatRupiah(i.uang_harian) }} = {{ formatRupiah(parseFloat(i.jumlah_hari) * parseFloat(i.uang_harian)) }}
                      <b-badge variant="light-success" v-if="i.hari_riil === true">
                        riil
                      </b-badge>
                    </li>
                  </ul>
                  <hr />
                  {{ formatRupiah(tim.realisasi.total_harian) }}
                </template>
                <template #cell(total_hotel)>
                  <ul class="list-unstyled">
                    <li v-for="i in tim.realisasi.uang_hotel" :key="i.id">
                      -
                      {{ i.jumlah_malam }}
                      @
                      {{ formatRupiah(i.uang_hotel) }} = {{ formatRupiah(parseFloat(i.jumlah_malam) * parseFloat(i.uang_hotel)) }}
                      <b-badge variant="light-danger">
                        {{ i.jenis_hotel === 0 ? 'FULL' : '30%' }}
                      </b-badge>
                      <b-badge variant="light-success" v-if="i.hotel_riil === true">
                        riil
                      </b-badge>
                    </li>
                  </ul>
                  <hr />
                  {{ formatRupiah(tim.realisasi.total_hotel) }}
                </template>
                <template #cell(transport)>
                  <ul class="list-unstyled">
                    <li v-for="i in tim.realisasi.transport" :key="i.id">
                      -
                      {{ i.jenis_transport }}
                      =
                      {{ formatRupiah(i.total) }}

                      <b-badge variant="light-success" v-if="i.transport_riil === true">
                        riil
                      </b-badge>
                    </li>
                  </ul>
                  <hr />
                  {{ formatRupiah(tim.realisasi.total_transport) }}
                </template>
                <template #cell(taksi)>
                  <ul class="list-unstyled">
                    <li>
                      - Jakarta = {{ formatRupiah(tim.realisasi.taksi_jakarta) }}
                      <b-badge variant="light-success" v-if="tim.realisasi.jakarta_riil === true">
                        riil
                      </b-badge>
                    </li>

                    <li>
                      - Provinsi = {{ formatRupiah(tim.realisasi.taksi_provinsi) }}
                      <b-badge variant="light-success" v-if="tim.realisasi.provinsi_riil === true">
                        riil
                      </b-badge>
                    </li>
                  </ul>
                </template>
                <template #cell(representatif)>
                  {{ formatRupiah(tim.realisasi.representatif) }}
                </template>
                <template #cell(total)>
                  {{ formatRupiah(tim.realisasi.total) }}
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
import { BBadge, BFormGroup, BFormInput, BLink, BModal, BCard, BCardBody, BRow, BCol, BTable } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { formatRupiah, urlGet } from '@core/utils/filter'

export default {
  components: {
    BBadge,
    BFormGroup,
    BFormInput,
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
      { key: 'total_harian' },
      { key: 'total_hotel' },
      { key: 'transport' },
      { key: 'taksi' },
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
