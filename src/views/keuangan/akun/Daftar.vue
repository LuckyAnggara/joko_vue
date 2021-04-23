<template>
  <section>
    <b-row class="match-height">
      <b-col lg="12" cols="12">
        <b-card>
          <div v-for="item in dataAkun" :key="item.id">
            <table-component :header="item" :dataTable="item.subheader" />
          </div>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import store from '@/store'
import { ref } from '@vue/composition-api'

import { BCard, BRow, BCol } from 'bootstrap-vue'
import TableComponent from './TableComponent.vue'

export default {
  components: {
    BCard,
    TableComponent,
    BRow,
    BCol,
  },
  mounted() {
    this.loadAkun()
  },
  methods: {
    loadAkun() {
      store.dispatch('app-keuangan/fetchListAkun').then(res => {
        store.commit('app-keuangan/SET_LIST_AKUN', res.data)
        this.dataAkun = store.getters['app-keuangan/getListAkun']
      })
    },
  },
  setup() {
    const dataAkun = ref([])
    return {
      dataAkun,
    }
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}

.keuangan-filter-select {
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
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
