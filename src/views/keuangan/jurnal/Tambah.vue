<template>
  <section>
    <b-row class="match-height">
      <b-col lg="6" cols="6">
        <b-card>
          <h5>Debit</h5>
          <hr />
          <b-form-group label="Nama Akun" label-for="nama-akun" label-cols-md="4">
            <v-select placeholder="Nama Akun" label="nama" :clearable="false" :options="output" />
          </b-form-group>
        </b-card>
      </b-col>
      <b-col lg="6" cols="6">
        <b-card>
          <h5>Kredit</h5>
          <hr />
          <b-form-group label="Nama Akun" label-for="nama-akun" label-cols-md="4">
            <v-select placeholder="Nama Akun" label="nama" :clearable="false" :options="output" />
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import store from '@/store'
import { ref } from '@vue/composition-api'

import { BCard, BFormGroup, BRow, BCol } from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
    BCard,
    BRow,
    BCol,
    BFormGroup,
  },
  mounted() {
    this.loadAkun()
  },
  methods: {
    loadAkun() {
      store.dispatch('app-keuangan/fetchListAkun').then(res => {
        store.commit('app-keuangan/SET_LIST_AKUN', res.data)
        this.dataAkun = this.load(store.getters['app-keuangan/getListAkun'])
      })
    },
    load(data) {
      data.forEach(x => {
        x.subheader.forEach(y => {
          this.output.push(y)
        })
      })
      console.info(this.output)
      return this.output
    },
  },
  setup() {
    const dataAkun = ref([])
    const output = ref([])
    return {
      output,
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
