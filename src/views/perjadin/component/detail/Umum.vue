<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Data Umum" footer-tag="footer">
        <b-card-body>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tahun Anggaran" label-cols-md="3" label-cols-sm="12">
                <b-form-input :value="form.tahun.nama" placeholder="-" readonly />
              </b-form-group>
              <hr />
            </b-col>

            <b-col cols="12">
              <b-form-group label="Nomor Surat Perintah" label-cols-md="3">
                <b-form-input :value="form.surat_perintah.nomor_surat" type="text" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Tanggal Surat Perintah" label-cols-md="3">
                <b-form-input :value="$moment(form.surat_perintah.tanggal_surat).format('DD MMMM YYYY')" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Perihal" label-cols-md="3">
                <b-form-textarea :value="form.surat_perintah.perihal" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Lampiran" label-cols-md="3">
                <template v-if="lampiran_sp.length > 0 ? true : false">
                  <ul>
                    <li v-for="item in lampiran_sp" :key="item.id">
                      <b-link :href="urlGet(item.id, 'perjadin')" class="font-weight-bold" target="_blank"> {{ item.nama }} </b-link>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <span>Tidak ada lampiran</span>
                </template>
              </b-form-group>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col cols="12">
              <b-form-group label="Tujuan" label-cols-md="3">
                <b-form-input :value="form.tujuan" type="text" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Keberangkatan" label-cols-md="3">
                <b-form-input :value="form.keberangkatan" type="text" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Tanggal Pelaksanaan" label-cols-md="3">
                <b-row>
                  <b-col md="6">
                    <b-form-group label="Tanggal Berangkat">
                      <b-form-input :value="$moment(form.tanggal_berangkat).format('DD MMMM YYYY')" placeholder="-" readonly />
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Tanggal Kembali">
                      <b-form-input :value="$moment(form.tanggal_kembali).format('DD MMMM YYYY')" placeholder="-" readonly />
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Jumlah Hari" label-cols-md="3">
                <b-form-input :value="form.jumlah_hari" type="text" placeholder="-" readonly />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group label="Keterangan" label-cols-md="3">
                <b-form-textarea :value="form.keterangan" type="text" placeholder="-" readonly />
              </b-form-group>
            </b-col>
          </b-row>
          <hr />
          <b-row>
            <b-col cols="12">
              <b-form-group label="Objek Pemeriksaan" label-cols-md="3">
                <b-table small :fields="tableCol" :items="form.obrik" responsive>
                  <template #cell(no)="data">
                    <span>{{ data.index + 1 }}</span>
                  </template>
                  <template #cell(satker)="data">
                    <span>{{ data.item.satker.nama }}</span>
                  </template>
                  <template #cell(urusan)="data">
                    <span>{{ data.item.urusan.nama }}</span>
                  </template>
                </b-table>
              </b-form-group>
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
  </b-row>
</template>

<script>
// import { ref } from '@vue/composition-api'
import { BTable, BLink, BCard, BCardBody, BRow, BCol, BFormInput, BFormGroup, BFormTextarea } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { urlGet } from '@core/utils/filter'

export default {
  components: {
    BTable,
    BLink,
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
    lampiran_sp() {
      return this.form.lampiran.filter(x => x.jenis === 'SP')
    },
  },

  methods: {
    urlGet,
  },
  setup() {
    const tableCol = [{ key: 'no' }, { key: 'satker' }, { key: 'urusan' }]
    return {
      tableCol,
    }
  },
}
</script>
