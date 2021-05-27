<template>
  <section>
    <b-row>
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
    </b-row>
    <div>
      <b-row>
        <b-col lg="6" cols="6"> <table-component :title="`Assets`" :dataItem="dataAssets" /> </b-col>
      </b-row>
      <b-row>
        <b-col lg="12" cols="12">
          <b-card class="text-center">
            <b-card-text
              ><h3>
                Total Aset = <span class="text-primary">{{ totalAssets }}</span>
              </h3>
            </b-card-text>
          </b-card></b-col
        >
      </b-row>
      <b-row>
        <b-col lg="6" cols="12"> <table-component :title="`Liabilities`" :dataItem="dataLiabilities" /> </b-col>
        <b-col lg="6" cols="12"> <table-component :title="`Equity`" :dataItem="dataEquity" /> </b-col>
      </b-row>
      <b-row>
        <b-col lg="12" cols="12">
          <b-card class="text-center">
            <b-card-text
              ><h3>
                Total Liabilities + Equity = <span class="text-primary">{{ totalLiabilities }}</span>
              </h3></b-card-text
            >
          </b-card></b-col
        >
      </b-row>
    </div>
  </section>
</template>

<script>
import store from '@/store'
import { ref } from '@vue/composition-api'

import { BButton, BCard, BCardText, BRow, BCol } from 'bootstrap-vue'
import vSelect from 'vue-select'

import TableComponent from './component/Table.vue'

export default {
  components: {
    TableComponent,
    BCardText,
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
  computed: {
    totalAssets() {
      let saldo = 0
      this.dataAssets.forEach(x => {
        saldo += x.saldo
      })
      return this.formatRupiah(saldo)
    },
    totalLiabilities() {
      let saldoEquity = 0
      let saldoLibilities = 0

      this.dataLiabilities.forEach(x => {
        saldoLibilities += x.saldo
      })

      this.dataEquity.forEach(y => {
        saldoEquity += y.saldo
      })

      return this.formatRupiah(parseFloat(saldoLibilities) + parseFloat(saldoEquity))
    },
  },
  methods: {
    formatRupiah(value) {
      return `Rp. ${value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')}`
    },
    setSelected() {
      this.loadData()
    },
    loadData() {
      const loader = this.$loading.show({})
      store.dispatch('app-keuangan/fetchNeraca', this.tahun).then(res => {
        loader.hide()
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
