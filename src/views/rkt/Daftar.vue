<template>
  <section>
    <b-row class="match-height">
      <b-col lg="12" cols="12">
        <b-card v-for="data in dataRKT" :key="data.id" :title="`Area ${data.nama}`">
          <Table :dataTable="data.rkt" :area="data.id" />
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import store from '@/store'
import { ref } from '@vue/composition-api'

import { BCard, BRow, BCol } from 'bootstrap-vue'
// import vSelect from 'vue-select'
import Table from './component/Table.vue'

export default {
  components: {
    Table,
    BCard,
    BRow,
    BCol,
  },
  data() {
    return {
      filterQuery: '',
      searchQuery: '',
    }
  },

  methods: {
    loadRKT() {
      const tahun = 2021
      store.dispatch('app-rkt/fetchListRKT', tahun).then(res => {
        store.commit('app-rkt/SET_LIST_RKT', res.data)
        this.dataRKT = store.getters['app-rkt/getListRKT']
      })
    },
  },
  mounted() {
    this.loadRKT()
  },
  setup() {
    const dataRKT = ref([])
    const dataTEMP = ref([])
    return {
      dataRKT,
      dataTEMP,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.rkt-filter-select {
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
