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

          <b-col cols="6" lg="3" md="5" sm="12">
            <label class="mr-1">Cari Data</label>
            <b-form-input v-model="searchQuery" placeholder="Cari data... " />
          </b-col>
        </b-row>
      </div>
      <b-table
        small
        bordered
        :busy="isBusy"
        responsive
        :fields="tableColumns"
        :items="dataMak"
        show-empty
        empty-text="Tidak ada data"
        class="position-relative"
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
        <template #cell(mak)="data">
          <span> {{ data.item.kode }} - {{ data.item.nama }} </span>
        </template>
        <template #cell(pagu)="data">
          <span>
            {{ formatRupiah(data.item.pagu) }}
          </span>
        </template>
        <template #cell(realisasi)="data">
          <span>
            {{ formatRupiah(data.item.realisasi) }}
          </span>
        </template>
        <template #cell(sisa_saldo)="data">
          <span>
            {{ formatRupiah(parseFloat(data.item.pagu) - parseFloat(data.item.realisasi)) }}
          </span>
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
  BFormInput,
  BTable,
} from 'bootstrap-vue'

export default {
  components: {
    // BButton,
    BSpinner,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    vSelect,
  },
  data() {
    return {}
  },
  watch: {
    tahun() {
      this.loadKegiatan()
    },
  },
  computed: {
    tahunOption() {
      return this.$store.getters['app-general/getTahun']
    },
    totalDipa() {
      let total = 0
      this.dataRealisasi.forEach(x => {
        total += x.dipa
      })
      return total
    },
    totalRealisasi() {
      let total = 0
      this.dataRealisasi.forEach(x => {
        x.realisasi.forEach(v => {
          if (v.status === 'SELESAI') total += v.nominal
        })
      })
      return total
    },
    totalTransaksi() {
      let total = 0
      this.dataRealisasi.forEach(x => {
        total += x.realisasi.length
      })
      return total
    },
  },
  methods: {
    formatRupiah,
    loadMAK() {
      if (this.tahun !== null) {
        this.isBusy = !this.isBusy
        this.$store
          .dispatch('app-mak/fetchMak', {
            tahun_id: this.tahun.id,
            bidang_id: this.userData.bidang_id,
          })
          .then(res => {
            this.isBusy = !this.isBusy
            this.dataMak = res.data
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
    this.loadMAK()
  },
  setup() {
    const dataMak = ref([])
    const userData = JSON.parse(localStorage.getItem('userData'))
    const tahun = ref({
      id: 1,
      nama: 2021,
    })
    const isBusy = false
    const tableColumns = [{ key: 'id', label: '#' }, { key: 'mak' }, { key: 'pagu' }, { key: 'realisasi' }, { key: 'sisa_saldo' }, { key: 'actions' }]

    return {
      dataMak,
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
