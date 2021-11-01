<template>
  <b-row>
    <b-col lg="12" sm="12">
      <b-card title="Susunan Tim" footer-tag="footer">
        <b-card-body>
          <b-row>
            <b-col cols="12" lg="12">
              <b-table :fields="tableCol" :items="form.susunan_tim" bordered responsive>
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
                    <b-link :href="spdGet(data.item.id)" class="font-weight-bold" target="_blank">
                      <feather-icon :id="`spd-${data.item.id}`" icon="PrinterIcon" size="24" class="mx-1" />
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
  </b-row>
</template>

<script>
import {
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
    print_spd(id) {
      console.info(id)
      this.$store.dispatch('app-perjadin/printSPD', id)
    },
  },
  setup() {
    const tableCol = [{ key: 'no' }, { key: 'nama' }, { key: 'peran' }, { key: 'actions' }]
    return {
      tableCol,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
