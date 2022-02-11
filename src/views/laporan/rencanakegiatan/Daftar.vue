<template>
  <section>
    <b-card>
      <div class="mb-2">
        <!-- Table Top -->
        <b-row>
          <b-col cols="6" md="2" sm="3" lg="2">
            <label>Tahun Data</label>
            <v-select v-model="tahun" label="nama" :options="tahunOption" :clearable="false" />
          </b-col>
        </b-row>
      </div>
      <b-table
        small
        bordered
        :busy="isBusy"
        responsive
        :fields="tableColumns"
        :items="dataKegiatan"
        show-empty
        empty-text="Tidak ada data"
        class="position-relative"
        foot-clone
      >
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(id)="data">
          <span> {{ data.index + 1 }} </span>
        </template>
        <template #cell(rencana_kegiatan)="data">
          <span> {{ data.item.jenis === 'PERJADIN' ? 'PERJADIN - ' + data.item.maksud : data.item.uraian }} </span>
        </template>
        <template #cell(tanggal_kegiatan)="data">
          <span>
            {{
              data.item.jenis === 'PERJADIN'
                ? $moment(data.item.tanggal_berangkat).format('D MMMM Y') + ' - ' + $moment(data.item.tanggal_kembali).format('D MMMM Y')
                : $moment(data.item.tanggal_rencana_kegiatan).format('D MMMM Y')
            }}
          </span>
        </template>
        <template #cell(anggaran)="data">
          <span> {{ formatRupiah(data.item.total_anggaran) }} </span>
        </template>
        <template #cell(mak)="data">
          <b
            ><span> {{ data.item.mak.kode }} </span></b
          >
          <br /><span> {{ data.item.mak.nama }} </span>
        </template>

        <!-- FOOT -->
        <template #foot(anggaran)>
          <span>{{ formatRupiah(totalAnggaran) }}</span>
        </template>
      </b-table>
    </b-card>
  </section>
</template>

<script>
import { ref } from '@vue/composition-api'
import { formatRupiah } from '@core/utils/filter'
import vSelect from 'vue-select'

import {
  // BButton,
  BSpinner,
  BCard,
  BRow,
  BCol,
  // BFormInput,
  BTable,
} from 'bootstrap-vue'

export default {
  components: {
    // BButton,
    BSpinner,
    BCard,
    BRow,
    BCol,
    // BFormInput,
    BTable,
    vSelect,
  },
  data() {
    return {}
  },
  watch: {
    tahun() {
      this.loadData()
    },
  },
  computed: {
    tahunOption() {
      return this.$store.getters['app-general/getTahun']
    },
    totalAnggaran() {
      let total = 0
      this.dataKegiatan.forEach(x => {
        total += parseFloat(x.total_anggaran)
      })
      return total
    },
  },
  methods: {
    formatRupiah,
    loadData() {
      if (this.tahun !== null) {
        this.isBusy = !this.isBusy
        this.$store
          .dispatch('app-laporan/fetchLaporanRencanaKegiatan', {
            tahun_id: this.tahun.id,
            bidang_id: this.userData.bidang_id,
          })
          .then(res => {
            this.isBusy = !this.isBusy
            this.dataKegiatan = res.data
          })
      }
    },
    loadTahun() {
      this.$store.dispatch('app-general/fetchTahun').then(res => {
        this.$store.commit('app-general/SET_TAHUN', res.data)
      })
    },
  },
  mounted() {
    this.loadTahun()
    this.loadData()
  },
  setup() {
    const d = new Date()
    const dataKegiatan = ref([])
    const userData = JSON.parse(localStorage.getItem('userData'))
    const tahun = ref({
      id: 1,
      nama: d.getFullYear(),
    })
    const isBusy = false
    const tableColumns = [
      { key: 'id', label: '#' },
      { key: 'rencana_kegiatan' },
      { key: 'tanggal_kegiatan' },
      { key: 'anggaran' },
      { key: 'mak' },
      { key: 'status' },
    ]

    return {
      dataKegiatan,
      userData,
      tahun,
      isBusy,
      tableColumns,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.barang-filter-select {
  min-width: 190px;

  ::v-deep .vs__selected-options {
    flex-wrap: nowrap;
  }

  ::v-deep .vs__selected {
    width: 100px;
  }
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
