<template>
  <!-- <b-row class="match-height"> -->
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Lampiran" footer-tag="footer">
        <b-card-body>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Surat Perintah" label-cols-md="3">
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
            <b-col cols="12">
              <b-form-group label="Rancangan Anggaran Biaya" label-cols-md="3">
                <template v-if="lampiran_rab.length > 0 ? true : false">
                  <ul>
                    <li v-for="item in lampiran_rab" :key="item.id">
                      <b-link :href="urlGet(item.id, 'perjadin')" class="font-weight-bold" target="_blank"> {{ item.nama }} </b-link>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <span>Tidak ada lampiran</span>
                </template>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Lainnya" label-cols-md="3">
                <template v-if="lampiran_lainnya.length > 0 ? true : false">
                  <ul>
                    <li v-for="item in lampiran_lainnya" :key="item.id">
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
import {
  BLink,
  BCard,
  BCardBody,
  BRow,
  BCol,
  // BFormInput,
  BFormGroup,
  // BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { urlGet, formatRupiah } from '@core/utils/filter'

export default {
  components: {
    BLink,
    BCard,
    BCardBody,
    BRow,
    BCol,
    // BFormInput,
    BFormGroup,
    // BFormTextarea,
  },
  directives: {
    Ripple,
  },
  computed: {
    form() {
      return this.$store.getters['app-perjadin/getDetail']
    },
    lampiran_rab() {
      return this.form.lampiran.filter(x => x.jenis === 'RAB')
    },
    lampiran_sp() {
      return this.form.lampiran.filter(x => x.jenis === 'SP')
    },
    lampiran_lainnya() {
      return this.form.lampiran.filter(x => x.jenis === 'LAINNYA')
    },
  },

  methods: {
    urlGet,
    formatRupiah,
  },
}
</script>
