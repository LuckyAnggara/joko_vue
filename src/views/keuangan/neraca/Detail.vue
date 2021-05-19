<template>
  <section>
    <b-row class="match-height">
      <b-col lg="12" cols="12">
        <b-card>
          <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Tahun Buku</label>
            <v-select v-model="tahun" :options="option" :clearable="false" @input="setSelected" class="per-page-selector d-inline-block ml-50 mr-1" />
            <b-button variant="success" class="d-inline-block ml-50 mr-1">
              Print Data
            </b-button>
          </b-col>
        </b-card>
      </b-col>
      <b-col lg="6" cols="12"> <table-component :title="`Assets`" :dataItem="dataAssets" /> </b-col>
      <b-col lg="6" cols="12"> <table-component :title="`Liabilities`" :dataItem="dataLiabilities" /> </b-col>
      <b-col lg="6" cols="12"> <table-component :title="`Equity`" :dataItem="dataEquity" /> </b-col>
    </b-row>
  </section>
</template>

<script>
import store from '@/store'
import { ref } from '@vue/composition-api'

import { BButton, BCard, BRow, BCol } from 'bootstrap-vue'
import vSelect from 'vue-select'

import TableComponent from './component/Table.vue'

export default {
  components: {
    TableComponent,
    vSelect,
    BButton,
    BCard,
    BRow,
    BCol,
  },
  data() {
    return {
      tahun: '2021',
      option: ['2021', '2022', '2023'],
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    setSelected() {
      this.loadData()
    },
    loadData() {
      store.dispatch('app-keuangan/fetchNeraca', this.tahun).then(res => {
        store.commit('app-keuangan/SET_NERACA', res.data)
        this.dataAssets = store.getters['app-keuangan/getNeracaAssets']
        this.dataLiabilities = store.getters['app-keuangan/getNeracaLiabilities']
        this.dataEquity = store.getters['app-keuangan/getNeracaEquity']
        this.totalAssets = store.getters['app-keuangan/getTotalAssets']
      })
    },
  },

  setup() {
    const dataAssets = ref([])
    const totalAssets = ref([])
    const dataLiabilities = ref([])
    const dataEquity = ref([])

    return {
      totalAssets,
      dataAssets,
      dataLiabilities,
      dataEquity,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 180px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
